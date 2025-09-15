"use client";

import React, { useState } from "react";
import { Card, Table, Tag, Typography, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import upcomingAppointIcon from "@/assets/icons/upcomming.png";
import Image from "next/image";
import CustomPagination from "../shared/CustomPagination";

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
  onViewAll?: boolean;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
  data,
  onViewAll,
}) => {
  const columns: ColumnsType<Appointment> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Patient Name", dataIndex: "patientName", key: "patientName" },
    { title: "Discipline", dataIndex: "discipline", key: "discipline" },
    { title: "Service Type", dataIndex: "serviceType", key: "serviceType" },
    { title: "Date & Time", dataIndex: "dateTime", key: "dateTime" },
    { title: "Specialist", dataIndex: "specialist", key: "specialist" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: AppointmentStatus) => {
        const isScheduled = status === "Scheduled";
        return (
          <Tag
            className={`!px-3 !py-1 rounded-full text-sm font-medium ${
              isScheduled
                ? "!bg-[#E6F7FE] !text-[#007A9C] !border-0"
                : "!bg-[#FEF7F7] !text-[#F45B69] !border-0"
            }`}
          >
            {status}
          </Tag>
        );
      },
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };

  // Slice the data based on currentPage and pageSize
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Card
      className="rounded-2xl !mt-6"
      title={
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Title
              level={3}
              className="!mb-0 !text-gray-700 !font-semibold flex items-center gap-3"
            >
              <Image src={upcomingAppointIcon} alt="upcoming icon" /> Upcoming
              Appointments
            </Title>
          </div>
          {onViewAll && (
            <Button type="link" className="!text-[#0B121B]">
              View All
            </Button>
          )}
        </div>
      }
    >
      <Table
        className="[&_.ant-table-thead>tr>th]:bg-gray-50 [&_.ant-table-thead>tr>th]:text-gray-500 [&_.ant-table-thead>tr>th]:font-medium [&_.ant-table-thead>tr>th]:text-sm [&_.ant-table-thead>tr>th]:py-3"
        columns={columns}
        dataSource={paginatedData} // <-- use paginated data here
        scroll={{ x: true }}
        rowKey="id"
        pagination={false} // disable default AntD pagination
      />

      {/* Custom pagination */}
      <CustomPagination
        currentPage={currentPage}
        total={data.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </Card>
  );
};

export default UpcomingAppointments;
