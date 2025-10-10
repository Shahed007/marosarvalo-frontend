"use client";

import AppointmentOverview from "@/components/dashboard/appointmentOverview/AppointmentOverview";
import { useState } from "react";

const AdminOverview = () => {
  const [currentTimeFrame, setCurrentTimeFrame] = useState("weekly");

  // Sample data
  const sampleData = {
    title: "Total Revenue",
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
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      {/* Constrain width to match other cards */}
      <AppointmentOverview
        {...sampleData}
        onTimeFrameChange={handleTimeFrameChange}
      />
    </div>
  );
};

export default AdminOverview;