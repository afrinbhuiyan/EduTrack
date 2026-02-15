import React from "react";
import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";

const SpendingForecast = ({ spendingForecast, balance }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-lg p-5 border border-gray-200"
    >
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-[#2e8d94]">
        <FiTrendingUp className="text-[#2e8d94]" />
        Monthly Forecast
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Projected Spending:</span>
          <span className="font-semibold">
            ${Math.round(spendingForecast).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Remaining Budget:</span>
          <span
            className={`font-semibold ${
              balance - spendingForecast > 0
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            ${Math.round(balance - spendingForecast).toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SpendingForecast;