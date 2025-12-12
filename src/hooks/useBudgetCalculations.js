import { useMemo, useEffect, useState } from "react";

export const useBudgetCalculations = (transactions, budgetLimits, savingsTarget) => {
  const [spendingForecast, setSpendingForecast] = useState(0);
  const [expenseInsights, setExpenseInsights] = useState(null);

  // Calculate totals
  const income = useMemo(() => 
    transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );

  const expense = useMemo(() => 
    transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );

  const balance = income - expense;
  
  // Calculate category spending
  const categorySpending = useMemo(() => {
    const spending = {};
    transactions
      .filter(t => t.type === "expense")
      .forEach(tx => {
        if (!spending[tx.category]) {
          spending[tx.category] = 0;
        }
        spending[tx.category] += tx.amount;
      });
    return spending;
  }, [transactions]);

  // Calculate savings progress
  const savingsProgress = useMemo(() => 
    savingsTarget > 0 ? Math.min((balance / savingsTarget) * 100, 100) : 0,
    [balance, savingsTarget]
  );

  // Calculate spending forecast
  useEffect(() => {
    if (transactions.length === 0) return;
    
    const expenseTransactions = transactions.filter(t => t.type === "expense");
    if (expenseTransactions.length === 0) return;
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const currentMonthExpenses = expenseTransactions.filter(tx => {
      const txDate = new Date(tx.timestamp || tx.date);
      return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
    });
    
    const totalThisMonth = currentMonthExpenses.reduce((sum, tx) => sum + tx.amount, 0);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = currentDate.getDate();
    
    const dailyAverage = totalThisMonth / today;
    const forecast = dailyAverage * daysInMonth;
    
    setSpendingForecast(forecast);
  }, [transactions]);

  // Calculate expense insights
  useEffect(() => {
    if (transactions.length === 0) {
      setExpenseInsights(null);
      return;
    }
    
    const expenseTransactions = transactions.filter(t => t.type === "expense");
    if (expenseTransactions.length === 0) {
      setExpenseInsights(null);
      return;
    }
    
    const categorySpending = {};
    expenseTransactions.forEach((tx) => {
      if (!categorySpending[tx.category]) {
        categorySpending[tx.category] = 0;
      }
      categorySpending[tx.category] += tx.amount;
    });

    const highestCategory = Object.keys(categorySpending).reduce(
      (a, b) => (categorySpending[a] > categorySpending[b] ? a : b),
      "other"
    );

    const dates = expenseTransactions.map(
      (tx) => new Date(tx.timestamp || tx.date)
    );
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    const daysDiff =
      Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) || 1;
    const totalExpense = expenseTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );
    const avgDailySpending = totalExpense / daysDiff;

    // Budget limit alerts
    const limitAlerts = [];
    Object.keys(budgetLimits).forEach((category) => {
      const spent = categorySpending[category] || 0;
      const limit = budgetLimits[category];
      if (spent > limit * 0.8) {
        limitAlerts.push({
          category,
          spent,
          limit,
          percentage: (spent / limit) * 100,
        });
      }
    });

    setExpenseInsights({
      highestCategory,
      highestAmount: categorySpending[highestCategory],
      avgDailySpending: Math.round(avgDailySpending),
      totalExpense,
      limitAlerts: limitAlerts
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 2),
    });
  }, [transactions, budgetLimits]);

  return {
    income,
    expense,
    balance,
    categorySpending,
    savingsProgress,
    spendingForecast,
    expenseInsights
  };
};