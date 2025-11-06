import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function InstructorDistributionChart({ instructorData }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Instructors</h2>
      <div className="h-64">
        <Doughnut
          data={instructorData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
