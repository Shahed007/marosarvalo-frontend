/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Card, Select, Row, Col } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Title from "antd/es/typography/Title";
import vectorIcon from "../../../../public/Vector.png";
import Image from "next/image";
// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

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
            className="!text-primary !font-semibold !mb-0"
            style={{ margin: 0, color: "#225A7F" }}
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
            <Image
              src={vectorIcon}
              alt="dropdown icon"
              width={12}
              height={12}
              style={{ marginRight: 4 }}
            />
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
      <style jsx>{`
        :global(.ant-card .ant-card-head) {
          border-bottom: 0 !important;
        }
      `}</style>
    </Card>
  );
};

export default AppointmentOverview;
