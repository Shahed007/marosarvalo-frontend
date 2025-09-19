/* eslint-disable @typescript-eslint/no-explicit-any */
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
  title: string;
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
        backgroundColor: "#8AB3CF", // light blue
        borderRadius: 6, // rounded bars
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
          label: function (context: any) {
            return `${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <Card
    className="!shadow-sm"
      title={
        <Title style={{  margin: '0 auto' }} level={3} className="!text-primary !font-semibold !justify-center !items-center">
          {title}
        </Title>
      }
      style={{
        minHeight: 405,
      }}
      extra={
        <Select
          variant="borderless"
          value={currentTimeFrame}
          onChange={onTimeFrameChange}
          style={{ width: 120 }}
          options={timeFrameOptions.map((option) => ({
            label: option,
            value: option.toLowerCase(),
          }))}
        />
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
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
