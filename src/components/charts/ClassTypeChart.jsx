import React from "react";
import { Pie } from "react-chartjs-2";

export default function ClassTypeChart({ pieData }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Class Types</h2>
      <div className="h-64">
        <Pie
          data={pieData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}
