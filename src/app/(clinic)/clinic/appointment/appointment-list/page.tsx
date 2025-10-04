"use client";

import AppointmentListTable, {
  AppointmentListProps,
} from "@/components/table/AppointmentListTable";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

// Your sample data
export const appointmentList: AppointmentListProps[] = [
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Confirm",
  },
  {
    id: "#12346",
    time: "1:00 PM - 2:30 PM",
    patientName: "Aisha Khan",
    specialist: "Dr. Farida Ahmed",
    reason: "Dental Consultation",
    status: "Pending",
  },
  {
    id: "#12347",
    time: "3:00 PM - 4:00 PM",
    patientName: "Karim Rahman",
    specialist: "Shakil ur Rahman",
    reason: "Follow-up Visit",
    status: "Confirm",
  },
  {
    id: "#12348",
    time: "9:00 AM - 10:00 AM",
    patientName: "Nadia Islam",
    specialist: "Dr. Emily Carter",
    reason: "Eye Exam",
    status: "Cancelled",
  },
];

const AppointmentListPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 🔍 Filter data dynamically
  const filteredData = appointmentList.filter((item) =>
    Object.values(item).some((val) =>
      val.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
      {/* Page Title */}
      <Title level={2}>Appointment List</Title>

      {/* Search + Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-0 mt-10">
        {/* Search Input */}
        <div className="w-full sm:w-[400px] lg:w-[625px]">
          <Input
            placeholder="Search patient or type"
            allowClear
            size="large"
            addonAfter={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Add Button */}
        <Link
          href="/clinic/appointment/add-appointment"
          className="w-full sm:w-auto"
        >
          <Button
            type="primary"
            size="large"
            icon={<FaPlus />}
            className="w-full sm:w-auto"
          >
            Add New Appointment
          </Button>
        </Link>
      </div>

      {/* Always render the table wrapper */}
      <div className="overflow-x-auto">
        <AppointmentListTable data={filteredData} loading={false} />
      </div>
    </div>
  );
};

export default AppointmentListPage;
