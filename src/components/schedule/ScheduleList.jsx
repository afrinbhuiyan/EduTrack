import { motion } from "framer-motion";

const ScheduleList = ({ cls, onEdit, onDelete, calculateEndTime, provided }) => {
  return (
    <motion.div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 hover:bg-gray-50 transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div
            className="w-3 h-14 rounded-lg mr-4"
            style={{ backgroundColor: cls.color }}
          ></div>
          <div>
            <h3 className="text-lg font-semibold">
              {cls.subject}
            </h3>
            <div className="flex items-center mt-1">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${cls.color}20`,
                  color: cls.color,
                }}
              >
                {cls.type}
              </span>
              <span className="ml-3 text-sm text-gray-600">
                {cls.day} • {(cls.startTime || cls.time)} - {calculateEndTime(cls.startTime || cls.time)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(cls)}
            className="p-2 text-teal-600 hover:bg-teal-100 rounded-full transition-all"
            title="Edit"
          >
            <svg
              className="h-4 w-4"
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
            onClick={() => onDelete(cls._id)}
            className="p-2 text-rose-600 hover:bg-rose-100 rounded-full transition-all"
            title="Delete"
          >
            <svg
              className="h-4 w-4"
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

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pl-7">
        {cls.instructor && (
          <div className="flex items-center">
            <svg
              className="h-4 w-4 text-gray-400 mr-2"
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
            <div>
              <p className="text-sm font-medium text-gray-700">
                Instructor
              </p>
              <p className="text-sm text-gray-600">
                {cls.instructor}
              </p>
            </div>
          </div>
        )}

        {cls.room && (
          <div className="flex items-center">
            <svg
              className="h-4 w-4 text-gray-400 mr-2"
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
            <div>
              <p className="text-sm font-medium text-gray-700">
                Room
              </p>
              <p className="text-sm text-gray-600">
                {cls.room}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ScheduleList;