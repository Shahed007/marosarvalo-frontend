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
    status: "Pending",
  },
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Pending",
  },
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Pending",
  },
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Pending",
  },
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Pending",
  },
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "General Checkup",
    status: "Pending",
  },
  
];

const AppointmentListPage = () => {
  return (
    <div>
      <Title level={2}>Appointment List</Title>
      <div className="flex items-center justify-between">
        <Input
          size="large"
          style={{
            maxWidth: 420,
          }}
          addonAfter={<SearchOutlined />}
        />
        <Link href={"/reception/appointment/add-appointment"}>
          <Button type="primary" size="large" icon={<FaPlus />}>
            Add New Appointment
          </Button>
        </Link>
      </div>
      <AppointmentListTable data={appointmentList} />
    </div>
  );
};

export default AppointmentListPage;
