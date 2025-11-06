import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign,
  FiCalendar,
  FiTag,
  FiTrash2,
  FiPieChart,
  FiBarChart2
} from "react-icons/fi";

export default function Budget() {
  const [transactions, setTransactions] = useState([]);
  const [newTx, setNewTx] = useState({ 
    type: "income", 
    amount: "", 
    note: "",
    category: "salary",
    date: new Date().toISOString().split('T')[0]
  });
  const [activeFilter, setActiveFilter] = useState("all");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("budget-transactions");
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("budget-transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Handle input change
  const handleChange = (e) => {
    setNewTx({ ...newTx, [e.target.name]: e.target.value });
  };

  // Add new transaction
  const addTransaction = (e) => {
    e.preventDefault();
    if (!newTx.amount || !newTx.note) return;
    
    const transaction = {
      id: Date.now(),
      ...newTx,
      amount: Math.abs(Number(newTx.amount)),
      date: new Date(newTx.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    };

    setTransactions([transaction, ...transactions]);
    setNewTx({ 
      type: "income", 
      amount: "", 
      note: "",
      category: "salary",
      date: new Date().toISOString().split('T')[0]
    });
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    if (activeFilter === "all") return true;
    return tx.type === activeFilter;
  });

  // Calculate totals
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  
  const balance = income - expense;

  // Category options
  const categories = {
    income: [
      { value: "salary", label: "Salary", color: "bg-green-500" },
      { value: "freelance", label: "Freelance", color: "bg-blue-500" },
      { value: "investment", label: "Investment", color: "bg-purple-500" },
      { value: "other", label: "Other", color: "bg-gray-500" }
    ],
    expense: [
      { value: "food", label: "Food", color: "bg-red-500" },
      { value: "transport", label: "Transport", color: "bg-orange-500" },
      { value: "entertainment", label: "Entertainment", color: "bg-pink-500" },
      { value: "bills", label: "Bills", color: "bg-yellow-500" },
      { value: "shopping", label: "Shopping", color: "bg-indigo-500" },
      { value: "other", label: "Other", color: "bg-gray-500" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            💰 Budget Tracker
          </h1>
          <p className="text-gray-600">Track your income and expenses effortlessly</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-6  border border-green-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Income</p>
                <p className="text-3xl font-bold text-green-600">${income.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiTrendingUp className="text-green-600 text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-6  border border-red-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Expense</p>
                <p className="text-3xl font-bold text-red-600">${expense.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FiTrendingDown className="text-red-600 text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`bg-white rounded-2xl p-6  border ${
              balance >= 0 ? 'border-blue-100' : 'border-red-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Balance</p>
                <p className={`text-3xl font-bold ${
                  balance >= 0 ? 'text-blue-600' : 'text-red-600'
                }`}>
                  ${balance.toLocaleString()}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                balance >= 0 ? 'bg-blue-100' : 'bg-red-100'
              }`}>
                <FiDollarSign className={`text-xl ${
                  balance >= 0 ? 'text-blue-600' : 'text-red-600'
                }`} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Add Transaction Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6  mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiPlus className="text-indigo-600" />
            Add New Transaction
          </h2>
          
          <form onSubmit={addTransaction} className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Type Select */}
            <div className="relative">
              <select
                name="type"
                value={newTx.type}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <FiBarChart2 className="absolute left-3 top-3.5 text-gray-400" />
            </div>

            {/* Amount */}
            <div className="relative">
              <input
                type="number"
                name="amount"
                value={newTx.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <FiDollarSign className="absolute left-3 top-3.5 text-gray-400" />
            </div>

            {/* Category */}
            <div className="relative">
              <select
                name="category"
                value={newTx.category}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                {categories[newTx.type].map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <FiTag className="absolute left-3 top-3.5 text-gray-400" />
            </div>

            {/* Note */}
            <input
              type="text"
              name="note"
              value={newTx.note}
              onChange={handleChange}
              placeholder="Description"
              className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all  hover:shadow-xl flex items-center justify-center gap-2"
            >
              <FiPlus />
              Add Transaction
            </button>
          </form>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {["all", "income", "expense"].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeFilter === filter
                  ? filter === 'income' 
                    ? 'bg-green-100 text-green-700'
                    : filter === 'expense'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl  overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiPieChart className="text-indigo-600" />
              Recent Transactions
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            <AnimatePresence>
              {filteredTransactions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center text-gray-500"
                >
                  <FiBarChart2 className="text-4xl mx-auto mb-3 text-gray-300" />
                  <p>No transactions yet. Add your first transaction above!</p>
                </motion.div>
              ) : (
                filteredTransactions.map((tx) => {
                  const category = categories[tx.type].find(c => c.value === tx.category);
                  return (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${category?.color} bg-opacity-10`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${category?.color} text-white text-xs`}>
                              {category?.label.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold">{tx.note}</p>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                tx.type === 'income' 
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {tx.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiCalendar className="text-xs" />
                                {tx.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <p className={`text-lg font-bold ${
                            tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {tx.type === 'income' ? '+' : '-'}${tx.amount}
                          </p>
                          <button
                            onClick={() => deleteTransaction(tx.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}