import React from 'react'
import { Line } from 'react-chartjs-2'

export default function WeeklyTrendChart({lineData, lineOptions}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Weekly Trend</h2>
                <div className="h-64">
                  <Line data={lineData} options={{ ...lineOptions, maintainAspectRatio: false }} />
                </div>
              </div>
  )
}
