"use client";

import AppointmentOverview from "@/components/dashboard/appointmentOverview/AppointmentOverview";
import { useState } from "react";

const ClinicAppointmentOverview = () => {
  const [currentTimeFrame, setCurrentTimeFrame] = useState("weekly");
  // Sample data
  const sampleData = {
    title: "Appointment Overview",
    totalAppointments: 532,
    changePercent: 12,
    timeFrameData: [
      { day: "Sat", value: 100 },
      { day: "Sun", value: 160 },
      { day: "Mon", value: 120 },
      { day: "Tue", value: 80 },
      { day: "Wed", value: 40 },
      { day: "Thu", value: 10 },
    ],
    timeFrameOptions: ["Daily", "Weekly", "Monthly", "Yearly"],
    currentTimeFrame: currentTimeFrame,
    maxValue: 200,
  };

  const handleTimeFrameChange = (value: string) => {
    setCurrentTimeFrame(value);
    // You would typically fetch new data based on the selected timeframe here
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
