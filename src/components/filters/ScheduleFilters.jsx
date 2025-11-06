import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const ScheduleFilters = ({
  searchTerm,
  setSearchTerm,
  activeDay,
  setActiveDay,
  filters,
  setFilters,
  days,
  classTypes,
  uniqueInstructors,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <p className="absolute left-3 top-3 h-5 w-5 text-gray-400">
          <IoSearchOutline />
        </p>
        <input
          type="text"
          placeholder="Search classes..."
          className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Type Filter */}
      <div className="relative">
        <select
          className="w-full p-2 pl-5 pr-8 border border-gray-200 text-sm rounded-sm focus:ring-1 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-white appearance-none"
          value={activeDay}
          onChange={(e) => setActiveDay(e.target.value)}
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-2 text-gray-400 pointer-events-none">
          <MdOutlineKeyboardArrowDown size={22} />
        </div>
      </div>
      <div className="relative">
        <select
          className="p-2 pl-5 pr-8 border border-gray-200 text-sm rounded-sm focus:ring-1 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-white appearance-none"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="All">All Types</option>
          {classTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-2 text-gray-400 pointer-events-none">
          <MdOutlineKeyboardArrowDown size={22} />
        </div>
      </div>

      {/* Instructor Filter */}
      <div className="relative">
        <select
          className="p-2 border border-gray-200 text-sm rounded-sm focus:ring-1 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-white appearance-none"
          value={filters.instructor}
          onChange={(e) =>
            setFilters({ ...filters, instructor: e.target.value })
          }
        >
          {uniqueInstructors.map((inst) => (
            <option key={inst} value={inst}>
              {inst}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-2 text-gray-400 pointer-events-none">
          <MdOutlineKeyboardArrowDown size={22} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleFilters;
