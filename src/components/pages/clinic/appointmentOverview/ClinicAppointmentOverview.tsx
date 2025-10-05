"use client";

import AppointmentOverview from "@/components/dashboard/appointmentOverview/AppointmentOverview";
import { useState } from "react";

interface AppointmentOverviewProps {
  title: React.ReactNode;
  totalAppointments: number;
  changePercent: number;
  timeFrameData: { day: string; value: number }[];
  timeFrameOptions: string[];
  currentTimeFrame: string;
  maxValue: number;
}

const ClinicAppointmentOverview = () => {
  const [currentTimeFrame, setCurrentTimeFrame] = useState("weekly");
  // Sample data
  const sampleData: AppointmentOverviewProps = {
    title: (
      <span className="text-[#4180AB] text-[20px]">Appointment Overview</span>
    ),
    totalAppointments: 532,
    changePercent: 12,
    timeFrameData: [
      { day: "Sat", value: 100 },
      { day: "Sun", value: 160 },
      { day: "Mon", value: 120 },
      { day: "Tue", value: 80 },
      { day: "Wed", value: 40 },
      { day: "Thu", value: 10 },
      { day: "Fri", value: 200 },
    ],
    timeFrameOptions: ["Daily", "Weekly", "Monthly", "Yearly"],
    currentTimeFrame: currentTimeFrame,
    maxValue: 200,
  };

  const handleTimeFrameChange = (value: string) => {
    setCurrentTimeFrame(value);
    console.log("Selected Time Frame:", value);
  };

  return (
    <div>
      <AppointmentOverview
        {...sampleData}
        onTimeFrameChange={handleTimeFrameChange}
      />
    </div>
  );
};

export default ClinicAppointmentOverview;
