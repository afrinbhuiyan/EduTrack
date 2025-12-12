import React from "react";
import { motion } from "framer-motion";
import { FiSettings, FiDownload, FiUpload } from "react-icons/fi";

const DataTools = ({ onExport, onImport }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/80 backdrop-blur-sm rounded-lg p-5 shadow-sm border border-rose-100/50"
    >
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-rose-700">
        <FiSettings className="text-rose-500" />
        Data Tools
      </h3>

      <div className="space-y-3">
        <button
          onClick={onExport}
          className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors font-medium"
        >
          <FiDownload />
          Export Data
        </button>
        <label className="w-full flex items-center justify-center gap-2 p-3 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors font-medium cursor-pointer">
          <FiUpload />
          Import Data
          <input
            type="file"
            accept=".json"
            onChange={onImport}
            className="hidden"
          />
        </label>
      </div>
    </motion.div>
  );
};

export default DataTools;