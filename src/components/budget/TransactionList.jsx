import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBarChart2, FiCalendar, FiRepeat, FiMapPin, FiTrash2 } from "react-icons/fi";
import { categories } from "../../utils/categories";

const TransactionList = ({ 
  transactions, 
  activeFilter, 
  setActiveFilter, 
  onDeleteTransaction 
}) => {
  const filteredTransactions = transactions.filter((tx) => {
    if (activeFilter === "all") return true;
    return tx.type === activeFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <FiBarChart2 className="text-emerald-600" />
          Recent Transactions
        </h2>

        <div className="flex gap-2">
          {["all", "income", "expense"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                activeFilter === filter
                  ? filter === "income"
                    ? "bg-emerald-100 text-emerald-700"
                    : filter === "expense"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-gray-100 text-gray-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredTransactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500"
            >
              <FiBarChart2 className="text-4xl mx-auto mb-3 text-gray-300" />
              <p>No transactions yet. Add your first transaction!</p>
            </motion.div>
          ) : (
            filteredTransactions.map((tx) => {
              const category = categories[tx.type]?.find(
                (c) => c.value === tx.category
              ) || {
                label: tx.category,
                color: "from-gray-400 to-gray-500",
                icon: "📦",
              };
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-lg shadow-sm`}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {tx.note}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="text-xs" />
                          {tx.date}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            tx.type === "income"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {category.label}
                        </span>
                        {tx.recurring && (
                          <FiRepeat className="text-xs text-blue-500" />
                        )}
                        {tx.location && (
                          <span className="flex items-center gap-1">
                            <FiMapPin className="text-xs" />
                            {tx.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p
                      className={`text-lg font-bold ${
                        tx.type === "income"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {tx.type === "income" ? "+" : "-"}$
                      {tx.amount.toLocaleString()}
                    </p>
                    <button
                      onClick={() => onDeleteTransaction(tx.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TransactionList;