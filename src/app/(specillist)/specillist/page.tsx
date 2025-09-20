import StatisticsCard from "@/components/card/statisticsCard/StatisticsCard";
import StaffSchedule from "@/components/dashboard/staffSchedule/StaffSchedule";
import ClinicAppointmentOverview from "@/components/pages/clinic/appointmentOverview/ClinicAppointmentOverview";
import ServicesByTypeClinic from "@/components/pages/clinic/servicesByType/ServicesByTypeClinic";
import UpcomingAppointments, {
  Appointment,
} from "@/components/table/UpcomingAppointments";
import Title from "antd/es/typography/Title";
import React from "react";

const SpecillistDashboard = () => {
  const staffData = [
    {
      name: "Jhon Son",
      role: "Cleaner",
      availability: "Available Today",
      time: "5:30 am - 10:04 am",
    },
    {
      name: "Jhon Son",
      role: "Cleaner",
      availability: "Available Today",
      time: "5:30 am - 10:04 am",
    },
    {
      name: "Jhon Son",
      role: "Cleaner",
      availability: "Available Today",
      time: "5:30 am - 10:04 am",
    },
    {
      name: "Jhon Son",
      role: "Cleaner",
      availability: "Available Today",
      time: "5:30 am - 10:04 am",
    },
    {
      name: "Jhon Son",
      role: "Cleaner",
      availability: "Available Today",
      time: "5:30 am - 10:04 am",
    },
  ];
  const appointments: Appointment[] = [
    {
      id: "#12454",
      patientName: "Sophia Clark",
      discipline: "Checkup",
      serviceType: "Checkup",
      dateTime: "July 26, 2024, 10:00 AM",
      specialist: "Dr. Emily Carter",
      status: "Scheduled",
    },
    {
      id: "#12455",
      patientName: "Sophia Clark",
      discipline: "Checkup",
      serviceType: "Checkup",
      dateTime: "July 26, 2024, 10:00 AM",
      specialist: "Dr. Emily Carter",
      status: "Cancelled",
    },
  ];
  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
      <div>
        <Title level={2}>Dashboard</Title>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatisticsCard graph={true} name="Monthly Appointment" count={15} />
          <StatisticsCard graph={true} name="Total Doctor" count={509} />
          <StatisticsCard graph={true} name="New Customer" count={1254} />
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-6 mt-10">
        <div className="lg:w-[70%] ">
          <ClinicAppointmentOverview />
        </div>
        <div className="lg:w-[30%] ">
          <StaffSchedule staffList={staffData} />
        </div>
      </div>
      <div>
        <ServicesByTypeClinic />
      </div>
<div className="!border-0">
  <UpcomingAppointments data={appointments} />
</div>

    </div>
  );
};

export default SpecillistDashboard;
