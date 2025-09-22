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

// Your data
export const appointmentList: AppointmentListProps[] = [
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Pending",
  },
  {
    id: "#12346",
    time: "1:00 PM - 2:30 PM",
    patientName: "Aisha Khan",
    specialist: "Dr. Farida Ahmed",
    reason: "Dental Consultation",
    status: "Confirmed",
  },
  {
    id: "#12347",
    time: "3:00 PM - 4:00 PM",
    patientName: "Karim Rahman",
    specialist: "Shakil ur Rahman",
    reason: "Follow-up Visit",
    status: "Cancelled",
  },
];

const AppointmentListPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 🔍 Filter appointments dynamically
  const filteredData = appointmentList.filter((item) =>
    Object.values(item).some((field) =>
      String(field).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
      {/* Page Title */}
      <Title className="" level={2}>Appointment List</Title>

      {/* Search + Add Button */}
      <div className="flex flex-col justify-between sm:flex-row sm:items-center gap-4 mb-6 mt-7">
        <Input
          size="large"
          placeholder="Search appointments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // 👈 Connects input
          addonAfter={<SearchOutlined />}
          style={{ maxWidth: 420 }}
          allowClear
        />
        <Link href={"/reception/appointment/add-appointment"}>
          <Button type="primary" size="large" icon={<FaPlus />}>
            Add New Appointment
          </Button>
        </Link>
      </div>

      {/* Table */}
      <AppointmentListTable data={filteredData} loading={false} />
    </div>
  );
};

export default AppointmentListPage;