import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiTrendingUp,
  FiTrendingDown,
  FiRepeat,
  FiMapPin,
  FiEdit3,
} from "react-icons/fi";
import { categories } from "../../utils/categories";

const TransactionForm = ({ onAddTransaction }) => {
  const [newTx, setNewTx] = useState({
    type: "income",
    amount: "",
    note: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    recurring: false,
    location: "",
  });
  
  const [quickAmounts] = useState([10, 20, 50, 100, 200, 500]);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const handleChange = (e) => {
    setNewTx({ ...newTx, [e.target.name]: e.target.value });
  };

  const handleQuickAmount = (amount) => {
    setNewTx({ ...newTx, amount: amount.toString() });
    setShowCustomAmount(false);
  };

  const handleCustomAmount = () => {
    if (customAmount) {
      setNewTx({ ...newTx, amount: customAmount });
      setCustomAmount("");
      setShowCustomAmount(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTx.amount || !newTx.note) return;

    // Set default category if not selected
    const transactionCategory =
      newTx.category || (newTx.type === "income" ? "salary" : "other");

    const transaction = {
      id: Date.now(),
      ...newTx,
      category: transactionCategory,
      amount: Math.abs(Number(newTx.amount)),
      date: new Date(newTx.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      timestamp: new Date().toISOString(),
    };

    // Call parent function
    onAddTransaction(transaction);

    // Reset form
    setNewTx({
      type: "income",
      amount: "",
      note: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      recurring: false,
      location: "",
    });
    setShowCustomAmount(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-lg p-5 shadow-sm border border-emerald-100/50"
    >
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-emerald-700">
        <FiPlus className="text-emerald-500" />
        Quick Add
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction Type */}
        <div className="flex gap-2 bg-gray-100/50 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setNewTx({ ...newTx, type: "income" })}
            className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              newTx.type === "income"
                ? "bg-emerald-500 text-white shadow-md"
                : "bg-transparent text-gray-600 hover:bg-white/50"
            }`}
          >
            <FiTrendingUp className="text-sm" />
            Income
          </button>
          <button
            type="button"
            onClick={() => setNewTx({ ...newTx, type: "expense" })}
            className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              newTx.type === "expense"
                ? "bg-rose-500 text-white shadow-md"
                : "bg-transparent text-gray-600 hover:bg-white/50"
            }`}
          >
            <FiTrendingDown className="text-sm" />
            Expense
          </button>
        </div>

        {/* Quick Amount Buttons */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Quick Amount
          </label>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {quickAmounts.slice(0, 6).map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handleQuickAmount(amount)}
                className={`py-2 rounded-lg font-medium transition-all ${
                  newTx.amount === amount.toString()
                    ? "bg-emerald-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>

          {showCustomAmount ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 p-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={handleCustomAmount}
                className="bg-emerald-500 text-white px-3 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Set
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowCustomAmount(true)}
              className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <FiEdit3 className="text-sm" />
              Custom Amount
            </button>
          )}
        </div>

        {/* Amount Display */}
        {newTx.amount && (
          <div className="text-center p-3 bg-emerald-50 rounded-lg">
            <span className="text-2xl font-bold text-emerald-600">
              ${Number(newTx.amount).toLocaleString()}
            </span>
          </div>
        )}

        {/* Category Select */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Category
          </label>
          <select
            name="category"
            value={newTx.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
            required
          >
            <option value="">Select a category</option>
            {categories[newTx.type].map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Description
          </label>
          <textarea
            name="note"
            value={newTx.note}
            onChange={handleChange}
            placeholder="What's this for? Add details here..."
            rows="3"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Location (Optional)
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="location"
              value={newTx.location}
              onChange={handleChange}
              placeholder="Where was this?"
              className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={newTx.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Recurring Option */}
        <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
          <input
            type="checkbox"
            checked={newTx.recurring}
            onChange={(e) =>
              setNewTx({ ...newTx, recurring: e.target.checked })
            }
            className="rounded text-emerald-500 focus:ring-emerald-500"
          />
          <FiRepeat className="text-blue-500" />
          <span className="text-sm font-medium text-blue-700">
            Make this recurring
          </span>
        </label>

        <button
          type="submit"
          disabled={!newTx.amount || !newTx.note}
          className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FiPlus />
          Add Transaction
        </button>
      </form>
    </motion.div>
  );
};

export default TransactionForm;