/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, Typography } from "antd";
import Title from "antd/es/typography/Title";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

interface ServiceData {
  name: string;
  value: number; // percentage usage
}

interface PopularServicesProps {
  services: ServiceData[];
}

const PopularServices: React.FC<PopularServicesProps> = ({ services }) => {
  const data = {
    labels: services.map((s) => s.name),
    datasets: [
      {
        data: services.map((s) => s.value),
        backgroundColor: "rgba(34, 90, 127, 0.5)", // blue bars
        borderRadius: 10,
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const, // horizontal bar
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => `${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
      },
      y: {
        grid: { display: false, drawBorder: false },
        ticks: { font: { size: 12 } },
      },
    },
  };

  return (
    <Card
      style={{
        marginTop: 20,
      }}
    >
      <div className="mb-4">
        <Typography>Most Popular Services</Typography>
        <Title level={3} className="!m-0">
          Various
        </Title>
        <Typography>This Month</Typography>
      </div>
      <div style={{ height: services.length * 50 }}>
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
};

export default PopularServices;
