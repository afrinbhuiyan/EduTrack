import React from "react";
import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
import { categories } from "../../utils/categories";

const BudgetLimits = ({ 
  budgetLimits, 
  categorySpending, 
  onAddBudgetLimit 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 rounded-lg p-5 shadow-sm border border-orange-100/50"
    >
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-orange-700">
        <FiZap className="text-orange-500" />
        Budget Limits
      </h3>

      <div className="space-y-3">
        {Object.keys(budgetLimits).map((category) => {
          const spent = categorySpending[category] || 0;
          const limit = budgetLimits[category];
          const percentage = Math.min((spent / limit) * 100, 100);

          return (
            <div key={category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium capitalize">
                  {category}
                </span>
                <span>
                  ${spent.toLocaleString()} / ${limit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    percentage > 90
                      ? "bg-red-500"
                      : percentage > 75
                      ? "bg-orange-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}

        <div className="flex gap-2">
          <select
            className="flex-1 p-2 border border-gray-200 rounded-lg text-sm outline-none"
            onChange={(e) => {
              const category = e.target.value;
              if (category) {
                const amount = prompt(
                  `Set budget limit for ${category}:`
                );
                if (amount && !isNaN(amount)) {
                  onAddBudgetLimit(category, amount);
                }
              }
            }}
          >
            <option value="">Add limit for...</option>
            {categories.expense.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetLimits;