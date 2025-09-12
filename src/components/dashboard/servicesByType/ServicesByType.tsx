/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";
import Title from "antd/es/typography/Title";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface ServiceData {
  name: string;
  value: number;
}

interface ServicesByTypeProps {
  title?: string;
  data: ServiceData[];
  height?: number; // make height configurable
}

const ServicesByType: React.FC<ServicesByTypeProps> = ({
  title = "Services by type",
  data,
  height = 400,
}) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const maxValue = Math.max(...data.map((d) => d.value));

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: "Services",
        data: data.map((d) => d.value),
        backgroundColor: "#8AB3CF", // Tailwind blue-400
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ allow manual height control
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            if (context.raw === maxValue) {
              return "Top Sale: " + context.raw;
            }
            return "Value: " + context.raw;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: false },
        display: false,
      },
    },
  };

  return (
    <Card style={{ height }} className="rounded-2xl shadow-md">
      <Title level={3} className="!text-primary font-medium">
        {title}
      </Title>
      <div className="flex flex-col gap-6 mt-2 h-full">
        {/* Total */}
        <p className="text-3xl font-bold">{total}</p>

        {/* Chart */}
        <div className="flex-1">
          <Bar
            style={{
              height: 350,
            }}
            data={chartData}
            options={options}
          />
        </div>
      </div>
    </Card>
  );
};

export default ServicesByType;
