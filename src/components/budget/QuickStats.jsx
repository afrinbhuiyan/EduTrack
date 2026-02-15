import React from "react";
import { motion } from "framer-motion";
import { FiDollarSign } from "react-icons/fi";
import TransactionForm from "./TransactionForm";

const QuickStats = ({ balance, income, expense, onAddTransaction }) => {
  return (
    <motion.div className="bg-gradient-to-br from-[#7ea6b3] via-[#376e8bbe] to-[#7ea6b3] rounded-lg p-6 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          {/* <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <FiDollarSign className="text-xl" />
          </div> */}
          <h3 className="font-semibold">Current Balance</h3>
        </div>
        <p className="text-4xl font-semibold mb-2">${balance.toLocaleString()}</p>
        <div className="flex gap-4 text-sm">
          <div>
            <p className="opacity-80">Income</p>
            <p className="font-semibold">+${income.toLocaleString()}</p>
          </div>
          <div>
            <p className="opacity-80">Expense</p>
            <p className="font-semibold">-${expense.toLocaleString()}</p>
          </div>
        </div>

        <TransactionForm onAddTransaction={onAddTransaction} />
      </div>
    </motion.div>
  );
};

export default QuickStats;