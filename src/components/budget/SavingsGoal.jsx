import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiAward } from "react-icons/fi";

const SavingsGoal = ({ 
  savingsTarget, 
  setSavingsTarget, 
  savingsProgress, 
  balance 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-sm rounded-lg p-5 shadow-sm border border-rose-100/50"
    >
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-rose-700">
        <FiTarget className="text-rose-500" />
        Savings Goal
      </h3>

      {savingsTarget > 0 ? (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-rose-600 mb-2">
              {savingsProgress.toFixed(0)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-400 to-rose-400 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${savingsProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">
            <p>
              ${balance.toLocaleString()} of ${savingsTarget.toLocaleString()}
            </p>
            {savingsProgress >= 100 && (
              <p className="text-emerald-600 font-semibold mt-2 flex items-center justify-center gap-2">
                <FiAward />
                🎉 Goal Achieved!
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="number"
            value={savingsTarget}
            onChange={(e) => setSavingsTarget(Number(e.target.value))}
            placeholder="Set savings target"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
          />
          <button
            onClick={() => setSavingsTarget(Number(savingsTarget))}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all"
          >
            Set Target
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default SavingsGoal;