import React from "react";
import { motion } from "framer-motion";
import { FiPieChart, FiAlertTriangle } from "react-icons/fi";

const InsightsCard = ({ expenseInsights }) => {
  if (!expenseInsights) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-emerald-400 to-blue-400 rounded-lg p-6 text-white"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FiPieChart />
        
        Smart Insights
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
          <p className="text-sm opacity-90">Top Category</p>
          <p className="text-lg font-semibold mt-1 capitalize">
            {expenseInsights.highestCategory}
          </p>
        </div>
        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
          <p className="text-sm opacity-90">Daily Average</p>
          <p className="text-lg font-semibold mt-1">
            ${expenseInsights.avgDailySpending}
          </p>
        </div>
        <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
          <p className="text-sm opacity-90">Total Spent</p>
          <p className="text-lg font-semibold mt-1">
            ${expenseInsights.totalExpense.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Budget Limit Alerts */}
      {expenseInsights.limitAlerts &&
        expenseInsights.limitAlerts.length > 0 && (
          <div className="mt-4 space-y-2">
            {expenseInsights.limitAlerts.map((alert) => (
              <div
                key={alert.category}
                className="bg-white/20 p-3 rounded-lg backdrop-blur-sm flex items-center gap-3"
              >
                <FiAlertTriangle className="text-yellow-300" />
                <div className="flex-1">
                  <p className="text-sm font-medium capitalize">
                    {alert.category} budget
                  </p>
                  <p className="text-xs opacity-90">
                    ${alert.spent.toLocaleString()} of $
                    {alert.limit.toLocaleString()}(
                    {Math.round(alert.percentage)}%)
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
    </motion.div>
  );
};

export default InsightsCard;