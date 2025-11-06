import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({barData}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Classes by Day</h2>
      <Bar data={barData} options={{ responsive: true }} />
    </div>
  );
};

export default BarChart;
