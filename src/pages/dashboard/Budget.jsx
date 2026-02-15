import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiDollarSign } from "react-icons/fi";

// Custom hooks
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useBudgetCalculations } from "../../hooks/useBudgetCalculations";

// Components
import TransactionForm from "../../components/budget/TransactionForm";
import QuickStats from "../../components/budget/QuickStats";
import SpendingForecast from "../../components/budget/SpendingForecast";
import SavingsGoal from "../../components/budget/SavingsGoal";
import InsightsCard from "../../components/budget/InsightsCard";
import ViewToggle from "../../components/budget/ViewToggle";
import TransactionList from "../../components/budget/TransactionList";
import CalendarView from "../../components/budget/CalendarView";
import BudgetGoals from "../../components/budget/BudgetGoals";
import BudgetLimits from "../../components/budget/BudgetLimits";
import DataTools from "../../components/budget/DataTools";
import SpendingCategories from "../../components/budget/SpendingCategories";

export default function Budget() {
  // State management with localStorage
  const [transactions, setTransactions] = useLocalStorage("budget-transactions", []);
  const [budgetGoals, setBudgetGoals] = useLocalStorage("budget-goals", []);
  const [budgetLimits, setBudgetLimits] = useLocalStorage("budget-limits", {});
  const [savingsTarget, setSavingsTarget] = useLocalStorage("savings-target", 0);
  const [recurringTransactions, setRecurringTransactions] = useLocalStorage("recurring-transactions", []);
  
  // UI state
  const [activeFilter, setActiveFilter] = useState("all");
  const [showCalendar, setShowCalendar] = useState(false);

  // Calculations
  const {
    income,
    expense,
    balance,
    categorySpending,
    savingsProgress,
    spendingForecast,
    expenseInsights
  } = useBudgetCalculations(transactions, budgetLimits, savingsTarget);

  // Handlers
  const handleAddTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
    
    if (transaction.recurring) {
      setRecurringTransactions(prev => [
        ...prev,
        {
          id: Date.now(),
          ...transaction,
          frequency: 'monthly'
        }
      ]);
    }
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleAddBudgetLimit = (category, amount) => {
    setBudgetLimits(prev => ({
      ...prev,
      [category]: Number(amount)
    }));
  };

  const handleExportData = () => {
    const data = {
      transactions,
      budgetGoals,
      savingsTarget,
      budgetLimits,
      recurringTransactions,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `budget-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          if (data.transactions) setTransactions(data.transactions);
          if (data.budgetGoals) setBudgetGoals(data.budgetGoals);
          if (data.savingsTarget) setSavingsTarget(data.savingsTarget);
          if (data.budgetLimits) setBudgetLimits(data.budgetLimits);
          if (data.recurringTransactions) setRecurringTransactions(data.recurringTransactions);
        } catch (error) {
          console.error("Error importing data:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 w-full py-6 px-4 lg:px-12">
      <div className="">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-semibold">BudgetFlow</h1>
              <p className="text-gray-600">
                Smart money management made simple
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3 space-y-6">
            <QuickStats balance={balance} income={income} expense={expense} onAddTransaction={handleAddTransaction} />
            <SpendingForecast spendingForecast={spendingForecast} balance={balance} />
            {/* <TransactionForm onAddTransaction={handleAddTransaction} /> */}
            <SavingsGoal 
              savingsTarget={savingsTarget}
              setSavingsTarget={setSavingsTarget}
              savingsProgress={savingsProgress}
              balance={balance}
            />
          </div>

          {/* Main Content Area */}
          <div className="col-span-6 space-y-6">
            <InsightsCard expenseInsights={expenseInsights} />
            <ViewToggle showCalendar={showCalendar} setShowCalendar={setShowCalendar} />
            
            {!showCalendar ? (
              <TransactionList 
                transactions={transactions}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                onDeleteTransaction={handleDeleteTransaction}
              />
            ) : (
              <CalendarView transactions={transactions} />
            )}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-6">
            <BudgetGoals 
              budgetGoals={budgetGoals}
              setBudgetGoals={setBudgetGoals}
            />
            
            <BudgetLimits 
              budgetLimits={budgetLimits}
              setBudgetLimits={setBudgetLimits}
              categorySpending={categorySpending}
              onAddBudgetLimit={handleAddBudgetLimit}
            />
            
            <DataTools 
              onExport={handleExportData}
              onImport={handleImportData}
            />
            
            <SpendingCategories 
              categorySpending={categorySpending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}