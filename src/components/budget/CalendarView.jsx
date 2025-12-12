import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";

const CalendarView = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const getTransactionsForMonth = () => {
    return transactions.filter((tx) => {
      const txDate = new Date(tx.timestamp || tx.date);
      return (
        txDate.getMonth() === selectedMonth &&
        txDate.getFullYear() === selectedYear
      );
    });
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const getTransactionsByDay = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const transactionsByDay = {};

    for (let day = 1; day <= daysInMonth; day++) {
      transactionsByDay[day] = [];
    }

    getTransactionsForMonth().forEach((tx) => {
      const txDate = new Date(tx.timestamp || tx.date);
      const day = txDate.getDate();
      if (!transactionsByDay[day]) transactionsByDay[day] = [];
      transactionsByDay[day].push(tx);
    });

    return transactionsByDay;
  };

  const transactionsByDay = getTransactionsByDay();
  const firstDayOfMonth = getFirstDayOfMonth(selectedMonth, selectedYear);
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

  // Generate calendar days array
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <FiCalendar className="text-emerald-600" />
          Calendar View -{" "}
          {new Date(selectedYear, selectedMonth).toLocaleString(
            "default",
            { month: "long", year: "numeric" }
          )}
        </h2>
        <div className="flex gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - 2 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div
              key={day}
              className="text-center font-medium text-gray-500 py-2 text-sm"
            >
              {day}
            </div>
          )
        )}

        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`min-h-20 p-2 border rounded-lg ${
              day
                ? transactionsByDay[day]?.length > 0
                  ? "bg-rose-50 border-rose-200"
                  : "bg-gray-50 border-gray-200"
                : "bg-transparent border-transparent"
            }`}
          >
            {day && (
              <>
                <div className="flex justify-between items-start mb-1">
                  <span
                    className={`font-medium text-sm ${
                      transactionsByDay[day]?.length > 0
                        ? "text-rose-700"
                        : "text-gray-700"
                    }`}
                  >
                    {day}
                  </span>
                  {transactionsByDay[day]?.length > 0 && (
                    <span className="text-xs bg-rose-500 text-white px-1 rounded">
                      {transactionsByDay[day].length}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {transactionsByDay[day]?.slice(0, 2).map((tx) => (
                    <div
                      key={tx.id}
                      className="text-xs p-1 bg-white rounded text-gray-600 truncate border"
                      title={tx.note}
                    >
                      <span
                        className={
                          tx.type === "income"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }
                      >
                        {tx.type === "income" ? "+" : "-"}${tx.amount}
                      </span>
                      <div className="truncate">{tx.note}</div>
                    </div>
                  ))}
                  {transactionsByDay[day]?.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{transactionsByDay[day].length - 2} more
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CalendarView;