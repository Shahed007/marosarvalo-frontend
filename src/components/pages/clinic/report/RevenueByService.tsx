/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, Typography, Dropdown, MenuProps, Button } from "antd";
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
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

interface RevenueByServiceProps {
  totalRevenue: number;
  data: { label: string; value: number }[];
}

const RevenueByService: React.FC<RevenueByServiceProps> = ({
  totalRevenue,
  data,
}) => {
  const [selectedType, setSelectedType] = useState("Voucher");

  const menuItems: MenuProps["items"] = [
    { label: "Service", key: "Service" },
    { label: "Bond", key: "Bond" },
    { label: "Voucher", key: "Voucher" },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedType(e.key);
  };

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: "Revenue",
        data: data.map((d) => d.value),
        backgroundColor: "rgba(34, 90, 127, 0.8)",
        borderRadius: 4,
        barThickness: 30,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.raw}`,
        },
        displayColors: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { 
          font: { size: 12 },
          color: "#666",
        },
      },
      y: {
        beginAtZero: true,
        grid: { 
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: { 
          font: { size: 12 },
          color: "#666",
          callback: function(value: any) {
            return value === 0 ? '0' : value % 20 === 0 ? value : '';
          },
          stepSize: 20,
          max: 200,
        },
        border: {
          dash: [4, 4],
        },
      },
    },
  };

  // Generate the y-axis labels as in the image
  const yAxisLabels = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200];

  return (
    <Card 
      className="w-full" 
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <Text type="secondary" className="text-base">
            Revenue by service
          </Text>
          <Title level={2} className="!m-0 !text-3xl">
            ${totalRevenue.toLocaleString()}
          </Title>
        </div>
        <Dropdown 
          menu={{ 
            items: menuItems, 
            onClick: handleMenuClick,
            selectedKeys: [selectedType],
          }}
          trigger={['click']}
        >
          <Button size="middle" className="flex items-center">
            {selectedType} <DownOutlined className="ml-2" />
          </Button>
        </Dropdown>
      </div>
      
      {/* Custom Y-axis labels */}
      <div className="flex mb-2 pl-12">
        {yAxisLabels.map((label) => (
          <div 
            key={label} 
            className="flex-1 text-right text-xs text-gray-500 pr-2"
            style={{ flexBasis: `${100 / yAxisLabels.length}%` }}
          >
            {label}
          </div>
        ))}
      </div>
      
      {/* Chart container */}
      <div className="w-full h-[300px] md:h-[400px]">
        <Bar data={chartData} options={options} />
      </div>
      
      {/* X-axis labels */}
      <div className="flex mt-2 pl-12">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex-1 text-center text-xs text-gray-500"
            style={{ flexBasis: `${100 / data.length}%` }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RevenueByService;