"use client";
import { Card, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

const { Title, Text } = Typography;

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

interface PerformanceOverviewProps {
  revenue: {
    total: number;
    weeklyData: { week: string; value: number }[];
  };
  attendance: {
    rate: number;
    attended: number;
    missed: number;
  };
  patients: {
    total: number;
    old: number;
    new: number;
  };
}

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({
  revenue,
  attendance,
  patients,
}) => {
  // Chart Data Configs
  const revenueData = {
    labels: revenue.weeklyData.map((d) => d.week),
    datasets: [
      {
        label: "Revenue",
        data: revenue.weeklyData.map((d) => d.value),
        borderColor: "#225A7F",
        backgroundColor: "rgba(34,90,127,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const attendanceData = {
    labels: ["Attended", "Missed"],
    datasets: [
      {
        label: "Attendance",
        data: [attendance.attended, attendance.missed],
        backgroundColor: ["#225A7F", "#ccc"],
        borderRadius: 8,
      },
    ],
  };

  const patientsData = {
    labels: ["Old", "New"],
    datasets: [
      {
        label: "Patients",
        data: [patients.old, patients.new],
        backgroundColor: ["#225A7F", "#ccc"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue Card */}
      <Card>
        <Title level={5}>Total Revenue</Title>
        <Title level={3}>${revenue.total.toLocaleString()}</Title>
        <Line
          data={revenueData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
          }}
          height={100}
        />
      </Card>

      {/* Attendance Rate */}
      <Card>
        <Title level={5}>Appointment Attendance Rate</Title>
        <Title level={3}>{attendance.rate}%</Title>
        <Bar
          data={attendanceData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
          }}
          height={120}
        />
        <div className="flex justify-around text-xs mt-2">
          <Text type="secondary">{attendance.attended}% Attended</Text>
          <Text type="secondary">{attendance.missed}% Missed</Text>
        </div>
      </Card>

      {/* Total Patients */}
      <Card>
        <Title level={5}>Total Patients</Title>
        <Title level={3}>{patients.total.toLocaleString()}</Title>
        <Bar
          data={patientsData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
          }}
          height={120}
        />
        <div className="flex justify-around text-xs mt-2">
          <Text type="secondary">{patients.old}% Old</Text>
          <Text type="secondary">{patients.new}% New</Text>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceOverview;
