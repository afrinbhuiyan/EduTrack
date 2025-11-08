import { motion } from "framer-motion";

const ScheduleCard = ({ cls, onEdit, onDelete, calculateEndTime }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "backOut" }}
      className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200/50"
      style={{
        background: `linear-gradient(135deg, white 0%, ${cls.color}08 100%)`,
      }}
    >
      {/* Geometric background pattern */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div
          className="absolute -right-4 -top-4 w-16 h-16 sm:w-20 sm:h-20 rotate-45 opacity-5"
          style={{ backgroundColor: cls.color }}
        />
        <div
          className="absolute -left-4 -bottom-4 w-12 h-12 sm:w-16 sm:h-16 rotate-12 opacity-5"
          style={{ backgroundColor: cls.color }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 sm:mb-5 md:mb-6 pb-3 sm:pb-4 border-b border-gray-200/50">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-lg transform rotate-45"
              style={{ backgroundColor: cls.color }}
            />
            <h3 className="text-lg sm:text-lg md:text-xl lg:2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {cls.subject}
            </h3>
          </div>

          <div className="flex space-x-1 sm:space-x-2 bg-white/80 rounded-xl sm:rounded-2xl p-0.5 sm:p-1 backdrop-blur-sm border border-gray-200/50">
            <button
              onClick={() => onEdit(cls)}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-110"
              title="Edit"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(cls.id)}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-110"
              title="Delete"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Type & Time */}
        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
          <span
            className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium border"
            style={{
              backgroundColor: `${cls.color}15`,
              color: cls.color,
              borderColor: `${cls.color}30`,
            }}
          >
            {cls.type}
          </span>
          <div className="text-right">
            <div className="text-xs sm:text-sm text-gray-500">{cls.day}</div>
            <div className="text-sm sm:text-base font-semibold text-gray-900">
              {cls.time} - {calculateEndTime(cls.time)}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 sm:space-y-4">
          {cls.instructor && (
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 sm:space-x-4 group"
            >
              <div
                className="p-2 sm:p-3 rounded-2xl border border-gray-200/50 group-hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: `${cls.color}10` }}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: cls.color }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium">
                  Instructor
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">
                  {cls.instructor}
                </div>
              </div>
            </motion.div>
          )}

          {cls.room && (
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 sm:space-x-4 group"
            >
              <div
                className="p-2 sm:p-3 rounded-2xl border border-gray-200/50 group-hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: `${cls.color}10` }}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: cls.color }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium">
                  Location
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">
                  {cls.room}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Corner accent */}
        <div
          className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 rounded-tl-3xl opacity-10"
          style={{ backgroundColor: cls.color }}
        />
      </div>
    </motion.div>
  );
};

export default ScheduleCard;
