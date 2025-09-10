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
    id: "1",
    time: "2025-08-31 09:00",
    patientName: "John Doe",
    specialist: "Dr. Sarah Smith (Cardiologist)",
    reason: "Chest pain follow-up",
    status: "Confirmed",
  },
  {
    id: "2",
    time: "2025-08-31 09:30",
    patientName: "Emily Johnson",
    specialist: "Dr. Mark Evans (Dermatologist)",
    reason: "Skin rash consultation",
    status: "Pending",
  },
  {
    id: "3",
    time: "2025-08-31 10:00",
    patientName: "Michael Brown",
    specialist: "Dr. Alice Carter (Dentist)",
    reason: "Routine dental check-up",
    status: "Confirmed",
  },
  {
    id: "4",
    time: "2025-08-31 10:30",
    patientName: "Sophia Miller",
    specialist: "Dr. Robert Wilson (Orthopedic)",
    reason: "Knee pain evaluation",
    status: "Rescheduled",
  },
  {
    id: "5",
    time: "2025-08-31 11:00",
    patientName: "James Davis",
    specialist: "Dr. Linda Garcia (Neurologist)",
    reason: "Migraine assessment",
    status: "Cancelled",
  },
  {
    id: "6",
    time: "2025-08-31 11:30",
    patientName: "Olivia Martinez",
    specialist: "Dr. Daniel Lopez (Pediatrician)",
    reason: "Child vaccination",
    status: "Confirmed",
  },
  {
    id: "7",
    time: "2025-08-31 12:00",
    patientName: "William Taylor",
    specialist: "Dr. Emma Thomas (ENT)",
    reason: "Hearing loss consultation",
    status: "Pending",
  },
  {
    id: "8",
    time: "2025-08-31 12:30",
    patientName: "Isabella Anderson",
    specialist: "Dr. Richard Moore (Psychiatrist)",
    reason: "Anxiety disorder session",
    status: "Confirmed",
  },
  {
    id: "9",
    time: "2025-08-31 13:00",
    patientName: "Ethan White",
    specialist: "Dr. Karen Hall (Gynecologist)",
    reason: "Prenatal check-up",
    status: "Confirmed",
  },
  {
    id: "10",
    time: "2025-08-31 13:30",
    patientName: "Mia Harris",
    specialist: "Dr. David Martin (Urologist)",
    reason: "Kidney stone consultation",
    status: "Rescheduled",
  },
  {
    id: "11",
    time: "2025-08-31 14:00",
    patientName: "Alexander Clark",
    specialist: "Dr. Susan Allen (Oncologist)",
    reason: "Cancer treatment follow-up",
    status: "Confirmed",
  },
  {
    id: "12",
    time: "2025-08-31 14:30",
    patientName: "Charlotte Lewis",
    specialist: "Dr. Brian Young (Endocrinologist)",
    reason: "Thyroid disorder check",
    status: "Pending",
  },
  {
    id: "13",
    time: "2025-08-31 15:00",
    patientName: "Benjamin Walker",
    specialist: "Dr. Nancy King (General Physician)",
    reason: "Annual health check-up",
    status: "Confirmed",
  },
  {
    id: "14",
    time: "2025-08-31 15:30",
    patientName: "Amelia Scott",
    specialist: "Dr. Paul Wright (Ophthalmologist)",
    reason: "Vision test",
    status: "Confirmed",
  },
  {
    id: "15",
    time: "2025-08-31 16:00",
    patientName: "Lucas Adams",
    specialist: "Dr. Jennifer Hill (Dermatologist)",
    reason: "Acne treatment",
    status: "Cancelled",
  },
  {
    id: "16",
    time: "2025-08-31 16:30",
    patientName: "Harper Nelson",
    specialist: "Dr. George Baker (Orthopedic)",
    reason: "Back pain consultation",
    status: "Confirmed",
  },
  {
    id: "17",
    time: "2025-08-31 17:00",
    patientName: "Daniel Perez",
    specialist: "Dr. Patricia Green (Pediatrician)",
    reason: "Child growth monitoring",
    status: "Pending",
  },
  {
    id: "18",
    time: "2025-08-31 17:30",
    patientName: "Ella Rivera",
    specialist: "Dr. Thomas Gonzalez (Cardiologist)",
    reason: "High blood pressure review",
    status: "Confirmed",
  },
  {
    id: "19",
    time: "2025-08-31 18:00",
    patientName: "Matthew Roberts",
    specialist: "Dr. Barbara Lee (Psychologist)",
    reason: "Stress management session",
    status: "Rescheduled",
  },
  {
    id: "20",
    time: "2025-08-31 18:30",
    patientName: "Abigail Turner",
    specialist: "Dr. Kevin Phillips (Dentist)",
    reason: "Tooth extraction",
    status: "Confirmed",
  },
];

const AppointmentListPage = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
      <Title level={2}>Appointment list</Title>

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
