import React from "react";
import { motion } from "framer-motion";
import { FiPieChart } from "react-icons/fi";
import { categories } from "../../utils/categories";

const SpendingCategories = ({ categorySpending }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/80 backdrop-blur-sm rounded-lg p-5 shadow-sm border border-gray-100/50"
    >
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-800">
        <FiPieChart className="text-gray-600" />
        Spending Categories
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {categories.expense.slice(0, 6).map((cat) => {
          const spent = categorySpending[cat.value] || 0;
          return (
            <div
              key={cat.value}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg">{cat.icon}</span>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">
                  {cat.label}
                </span>
                {spent > 0 && (
                  <p className="text-xs text-gray-500">
                    ${spent.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SpendingCategories;