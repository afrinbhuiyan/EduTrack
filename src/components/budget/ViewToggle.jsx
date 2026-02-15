import React from "react";
import { FiBarChart2, FiCalendar } from "react-icons/fi";

const ViewToggle = ({ showCalendar, setShowCalendar }) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => setShowCalendar(false)}
        className={`px-4 py-2 rounded-md font-medium transition-all flex items-center gap-2 ${
          !showCalendar
            ? "bg-[#7ea6b3] text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <FiBarChart2 />
        List View
      </button>
      <button
        onClick={() => setShowCalendar(true)}
        className={`px-4 py-2 rounded-md font-medium transition-all flex items-center gap-2 ${
          showCalendar
            ? "bg-[#7ea6b3] text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <FiCalendar />
        Calendar View
      </button>
    </div>
  );
};

export default ViewToggle;