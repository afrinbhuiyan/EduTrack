import React from "react";
import { BiBuildingHouse } from "react-icons/bi";
import { CiCalendarDate, CiClock1, CiUser } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown, MdOutlineSubject } from "react-icons/md";
import { PiNotepadLight } from "react-icons/pi";
import { TbColorSwatch } from "react-icons/tb";

export default function ClassForm({
  newClass,
  handleChange,
  addClass,
  isEditing,
  cancelEdit,
  days,
  colorOptions,
  classTypes,
}) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-sm p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl roboto text-gray-800">
            {isEditing ? "Edit Class" : "Add New Class"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing
              ? "Update your class details"
              : "Schedule a new class session"}
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-200 to-pink-200 flex items-center justify-center">
          <GoPlus size={20} />
        </div>
      </div>

      <form onSubmit={addClass} className="space-y-5">
        {/* Subject Field */}
        <div className="relative">
          <label className="block text-sm text-gray-700 mb-2 ml-1">
            Subject *
          </label>
          <div className="relative">
            <input
              type="text"
              name="subject"
              value={newClass.subject}
              onChange={handleChange}
              placeholder="e.g. Mathematics"
              className="w-full p-2 pl-11 border border-gray-200 text-sm rounded-sm focus:ring-1 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-white shadow-sm"
              required
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <MdOutlineSubject />
            </div>
          </div>
        </div>

        {/* Day and Time Fields */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            Day *
          </label>
          <div className="relative">
            <select
              name="day"
              value={newClass.day}
              onChange={handleChange}
              className="w-full p-2 pl-11 border border-gray-200 text-sm rounded-sm focus:ring-1 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-white appearance-none shadow-sm"
              required
            >
              {days
                .filter((day) => day !== "All")
                .map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <CiCalendarDate />
            </div>
            <div className="absolute right-3 top-2 text-gray-400 pointer-events-none">
              <MdOutlineKeyboardArrowDown size={22} />
            </div>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            Time *
          </label>
          <div className="relative">
            <input
              type="time"
              name="time"
              value={newClass.time}
              onChange={handleChange}
              className="w-full p-2 pl-11 border text-sm border-gray-200 rounded-sm focus:ring-1 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-white shadow-sm"
              required
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <CiClock1 />
            </div>
          </div>
        </div>

        {/* Instructor and Room Fields */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            Instructor
          </label>
          <div className="relative">
            <input
              type="text"
              name="instructor"
              value={newClass.instructor}
              onChange={handleChange}
              placeholder="e.g. Dr. Smith"
              className="w-full p-2 pl-11 border text-sm border-gray-200 rounded-sm focus:ring-1 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-white shadow-sm"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <CiUser />
            </div>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            Room
          </label>
          <div className="relative">
            <input
              type="text"
              name="room"
              value={newClass.room}
              onChange={handleChange}
              placeholder="e.g. Room 205"
              className="w-full p-2 pl-11 border text-sm border-gray-200 rounded-sm focus:ring-1 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-white shadow-sm"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <BiBuildingHouse />
            </div>
          </div>
        </div>

        {/* Class Type and Color Fields */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            Class Type
          </label>
          <div className="relative">
            <select
              name="type"
              value={newClass.type}
              onChange={handleChange}
              className="w-full p-2 pl-11 border border-gray-200 text-sm rounded-sm focus:ring-1 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-white appearance-none shadow-sm"
            >
              {classTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <PiNotepadLight />
            </div>
            <div className="absolute right-3 top-2 text-gray-400 pointer-events-none">
              <MdOutlineKeyboardArrowDown size={22} />
            </div>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            Color
          </label>
          <div className="relative">
            <select
              name="color"
              value={newClass.color}
              onChange={handleChange}
              className="w-full p-2 pl-11 border border-gray-200 text-sm rounded-sm focus:ring-1 focus:ring-teal-400 focus:border-transparent outline-none transition-all bg-white appearance-none shadow-sm"
            >
              {colorOptions.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.name}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <TbColorSwatch />
            </div>
            <div className="absolute right-3 top-2 text-gray-400 pointer-events-none">
              <MdOutlineKeyboardArrowDown size={22} />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-teal-400 to-pink-400 text-white py-2 rounded-sm font-semibold hover:from-teal-500 hover:to-pink-500 transition-all duration-300 hover:shadow-sm flex items-center justify-center gap-2 group"
          >
            {isEditing ? (
              <>
                <IoCheckmark />
                Update Class
              </>
            ) : (
              <>
                <GoPlus size={20} />
                Add Class
              </>
            )}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-5 bg-gray-100 text-gray-700 rounded-sm font-medium hover:bg-gray-200 transition-all duration-200 border border-gray-200 flex items-center justify-center"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
