"use client";

import AppointmentListTable, {
  AppointmentListProps,
} from "@/components/table/AppointmentListTable";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";

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
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Confirm",
  },
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Confirm",
  },
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Confirm",
  },
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Confirm",
  },
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Confirm",
  },
];

const AppointmentListPage = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
      <Title level={2}>Appointment List</Title>

      {/* Search + Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Input
          size="large"
          className="w-full sm:w-auto sm:flex-1"
          placeholder="Search appointments..."
          addonAfter={<SearchOutlined />}
        />
        <Link
          href={"/clinic/appointment/add-appointment"}
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

      {/* Table wrapper for horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <AppointmentListTable data={appointmentList} />
      </div>
    </div>
  );
};

export default AppointmentListPage;
