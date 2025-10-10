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
  // === Revenue Data ===
  const revenueData = {
    labels: revenue.weeklyData.map((d) => d.week),
    datasets: [
      {
        label: "Revenue",
        data: revenue.weeklyData.map((d) => d.value),
        borderColor: "#8AB3CF",
        backgroundColor: "rgba(138,179,207,0.25)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // === Attendance Data ===
  const attendanceData = {
    labels: ["Attended", "Missed"],
    datasets: [
      {
        data: [attendance.attended, attendance.missed],
        backgroundColor: ["#8AB3CF", "#E5E5E5"],
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  // === Patients Data ===
  const patientsData = {
    labels: ["Old", "New"],
    datasets: [
      {
        data: [patients.old, patients.new],
        backgroundColor: ["#8AB3CF", "#E5E5E5"],
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  // === Shared Chart Options ===
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: {
          font: { size: 12 },
          color: "#8C8C8C",
        },
      },
    },
  };

  return (
    <div className="flex flex-wrap  gap-6 w-full">
      {/* === Revenue Card === */}
      <Card
        style={{
          width: "350px",
        }}
      >
        <Title
          level={5}
          style={{
            fontWeight: 500,
            fontSize: "16px",
            color: "#0B121B",
          }}
        >
          Total Revenue
        </Title>
        <Title
          style={{
            marginTop: "8px",
            fontWeight: 700,
            fontSize: "32px",
          }}
        >
          ${revenue.total.toLocaleString()}
        </Title>
        <div style={{ height: 160 }}>
          <Line
            data={revenueData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </Card>

      {/* === Appointment Attendance Rate === */}
      <Card
        style={{
          borderRadius: 12,
          textAlign: "center",
          padding: "16px",
          width: "350px",
        }}
        className="w-full"
      >
        <div className="text-left">
          <Title
            level={5}
            style={{
              fontWeight: 500,
              fontSize: "16px",
              color: "#0B121B",
            }}
          >
            Appointment Attendance Rate
          </Title>

          <Title
            style={{
              marginTop: "8px",
              fontWeight: 700,
              fontSize: "32px",
              marginBottom: 20,
            }}
          >
            {attendance.rate}%
          </Title>
        </div>

        <div style={{ position: "relative", height: 150, width: "100%" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              color: "#1F5B85",
              fontWeight: 500,
            }}
          >
            <Text>{attendance.attended}%</Text>
            <Text>{attendance.missed}%</Text>
          </div>

          <Bar data={attendanceData} options={barOptions} />
        </div>

        <div className="flex justify-around text-xs mt-2">
          <Text type="secondary">Attended</Text>
          <Text type="secondary">Missed</Text>
        </div>
      </Card>

      {/* === Total Patients === */}
      <Card
        style={{
          borderRadius: 12,
          textAlign: "center",
          padding: "16px",
          width: "350px",
        }}
        className="w-full"
      >
        <div className="text-left">
          <Title
            level={5}
            style={{
              fontWeight: 500,
              fontSize: "16px",
              color: "#0B121B",
            }}
          >
            Total Patients
          </Title>

          <Title
            style={{
              marginTop: "8px",
              fontWeight: 700,
              fontSize: "32px",
              marginBottom: 20,
            }}
          >
            {patients.total}
          </Title>
        </div>

        <div style={{ position: "relative", height: 150, width: "100%" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              color: "#1F5B85",
              fontWeight: 500,
            }}
          >
            <Text>{patients.old}%</Text>
            <Text>{patients.new}%</Text>
          </div>

          <Bar data={patientsData} options={barOptions} />
        </div>

        <div className="flex justify-around text-xs mt-2">
          <Text type="secondary">Old</Text>
          <Text type="secondary">New</Text>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceOverview;
