import React from "react";
import { motion } from "framer-motion";
import { GoPlus } from "react-icons/go";

export default function FloatingActionButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed right-8 bottom-8 w-16 h-16 bg-gradient-to-r from-teal-400 to-pink-400 text-white rounded-full shadow-2xl flex items-center justify-center z-40 
      hover:shadow-3xl transition-all"
    >
      <GoPlus size={24} />
    </motion.button>
  );
}
