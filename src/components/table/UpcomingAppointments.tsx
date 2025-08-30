"use client";

import React from "react";
import { Card, Table, Tag, Typography, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import upcomingAppointIcon from "@/assets/icons/upcomming.png";
import Image from "next/image";

const { Title } = Typography;

export type AppointmentStatus = "Scheduled" | "Cancelled";

export interface Appointment {
  id: string;
  patientName: string;
  discipline: string;
  serviceType: string;
  dateTime: string;
  specialist: string;
  status: AppointmentStatus;
}

interface UpcomingAppointmentsProps {
  data: Appointment[];
  onViewAll?: () => void;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
  data,
  onViewAll,
}) => {
  const columns: ColumnsType<Appointment> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Discipline",
      dataIndex: "discipline",
      key: "discipline",
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Specialist",
      dataIndex: "specialist",
      key: "specialist",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: AppointmentStatus) => {
        const color = status === "Scheduled" ? "blue" : "red";
        return (
          <Tag
            color={color}
            className={`px-4 py-1 rounded-full text-sm font-medium`}
          >
            {status}
          </Tag>
        );
      },
    },
  ];

  return (
    <Card
      className="rounded-2xl !mt-6"
      title={
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Title
              level={4}
              className="!mb-0 !text-gray-700 flex items-center gap-3"
            >
              <Image src={upcomingAppointIcon} alt="upcoming icon" /> Upcoming
              Appointments
            </Title>
          </div>
          {onViewAll && (
            <Button type="link" onClick={onViewAll}>
              View All
            </Button>
          )}
        </div>
      }
    >
      <Table
        className="[&_.ant-table-thead>tr>th]:bg-gray-50 [&_.ant-table-thead>tr>th]:text-gray-500 [&_.ant-table-thead>tr>th]:font-medium [&_.ant-table-thead>tr>th]:text-sm [&_.ant-table-thead>tr>th]:py-3"
        columns={columns}
        dataSource={data}
        scroll={{ x: true }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `Showing ${range[0]} to ${range[1]} out of ${total} records`,
        }}
        rowKey="id"
      />
    </Card>
  );
};

export default UpcomingAppointments;
