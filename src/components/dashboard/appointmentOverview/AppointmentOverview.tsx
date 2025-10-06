/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Card, Select, Row, Col } from "antd";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import Title from "antd/es/typography/Title";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

interface AppointmentDataPoint {
  day: string;
  value: number;
}

interface AppointmentOverviewProps {
  title: React.ReactNode;
  totalAppointments: number;
  timeFrameData: AppointmentDataPoint[];
  timeFrameOptions: string[];
  onTimeFrameChange?: (value: string) => void;
  currentTimeFrame: string;
  maxValue?: number;
}

const AppointmentOverview: React.FC<AppointmentOverviewProps> = ({
  title,
  totalAppointments,
  timeFrameData,
  timeFrameOptions,
  onTimeFrameChange,
  currentTimeFrame,
  maxValue = 200,
}) => {
  // Chart data
  const chartData = {
    labels: timeFrameData.map((item) => item.day),
    datasets: [
      {
        data: timeFrameData.map((item) => item.value),
        backgroundColor: "#8AB3CF",
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: maxValue,
        ticks: { stepSize: 40 },
        grid: { color: "#f0f0f0" },
      },
      x: {
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw}`,
        },
      },
    },
  };

  return (
    <Card
      className="!shadow-sm"
      style={{ minHeight: 405 }}
      // Custom title with vertical alignment
      title={
        <div className="flex items-center">
          <Title
            level={3}
             className="!text-[#9DA0A4] !font-normal !text-xl  !mb-0"
            style={{ margin: 0, color: '#225A7F' }}
          >
            {title}
          </Title>
        </div>
      }
      extra={
        <Select
          variant="borderless"
          value={currentTimeFrame}
          onChange={onTimeFrameChange}
          style={{ width: 95 }}
          options={timeFrameOptions.map((option) => ({
            label: option,
            value: option.toLowerCase(),
          }))}
          className="text-base"
          suffixIcon={
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="5" viewBox="0 0 9 5" fill="none">
  <path d="M3.775 4.62539L0.15 1.00039C0.1 0.950391 0.0626668 0.89639 0.0380001 0.83839C0.0133334 0.78039 0.000666667 0.717724 0 0.650391C0 0.517057 0.046 0.40039 0.138 0.30039C0.23 0.20039 0.350667 0.150391 0.5 0.150391H8.1C8.25 0.150391 8.371 0.20039 8.463 0.30039C8.555 0.40039 8.60067 0.517057 8.6 0.650391C8.6 0.683724 8.55 0.800391 8.45 1.00039L4.825 4.62539C4.74167 4.70872 4.65833 4.76706 4.575 4.80039C4.49167 4.83372 4.4 4.85039 4.3 4.85039C4.2 4.85039 4.10833 4.83372 4.025 4.80039C3.94167 4.76706 3.85833 4.70872 3.775 4.62539Z" fill="#0B121B"/>
</svg>
          }
        />
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={24} className="text-left">
          <div style={{ fontSize: "32px", fontWeight: "bold" }}>
            {totalAppointments}
          </div>
        </Col>
        <Col span={24} style={{ height: "200px" }}>
          <Bar data={chartData} options={chartOptions} />
        </Col>
      </Row>
    </Card>
  );
};

export default AppointmentOverview;