"use client";

import { useState } from "react";

export const RevenueChartCard = () => {
  const [period, setPeriod] = useState("weekly");

  const revenueData = [
    { name: "Sat", value: 25 },
    { name: "Sun", value: 15 },
    { name: "Mon", value: 35 },
    { name: "Tue", value: 20 },
    { name: "Wed", value: 30 },
    { name: "Thu", value: 32 },
    { name: "Fri", value: 28 },
  ];

  const maxValue = Math.max(...revenueData.map((d) => d.value));
  const roundedMax = Math.ceil(maxValue / 10) * 10;
  const formatYLabel = (value: number) => `$${value}`;

  return (
    <div className="w-full px-6 py-8">
      {/* Full-width container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 pb-4 space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <div className="text-4xl font-extrabold text-gray-900 mt-1">$532</div>
          </div>

          {/* Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto text-gray-700"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-8 pt-0">
          <div className="h-64 w-full"> {/* Taller chart */}
            <div className="relative h-full">
              {/* Y-axis labels & grid */}
              <div className="absolute inset-y-0 left-0 flex flex-col justify-between pr-3">
                {Array.from({ length: 5 }, (_, i) => {
                  const yValue = (roundedMax * (4 - i)) / 4;
                  return (
                    <div key={i} className="flex items-center">
                      <span className="w-8 text-right text-xs text-gray-500 font-medium">
                        {formatYLabel(yValue)}
                      </span>
                      <div className="ml-2 h-px flex-1 border-t border-dashed border-gray-200"></div>
                    </div>
                  );
                })}
              </div>

              {/* X-axis (Bars) */}
              <div className="ml-10  h-full flex items-end justify-between px-2 pb-4 relative">
                {revenueData.map((item) => {
                  const barHeight = (item.value / roundedMax) * 220; // Scale to taller chart
                  return (
                    <div
                      key={item.name}
                      className="flex flex-col items-center flex-1 min-w-0 group"
                    >
                      <div
                        className="w-10 bg-[#8AB3CF] transition-all duration-300 shadow-sm"
                        style={{
                          height: `${barHeight}px`,
                          minHeight: barHeight > 0 ? "6px" : "0",
                        }}
                      ></div>
                      <span className="mt-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};