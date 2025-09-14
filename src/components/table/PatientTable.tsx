"use client";

import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Dropdown,
  Menu,
  DatePicker,
  Space,
  Input,
} from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { EyeOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { LiaUserPlusSolid } from "react-icons/lia";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { RangePicker } = DatePicker;

// ✅ TypeScript interface for data
export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastAppointment: string; // YYYY-MM-DD
  status: "Active" | "Inactive";
}

interface PatientTableProps {
  data: Patient[];
}

const PatientTable: React.FC<PatientTableProps> = ({ data }) => {
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );
  const [searchText, setSearchText] = useState<string>("");
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: data.length,
    showSizeChanger: true,
  });

  // ✅ Apply filters
  const filteredData = data.filter((record) => {
    // Status filter
    const statusMatch =
      statusFilter === "All" || record.status === statusFilter;

    // Date filter
    const dateMatch = dateRange
      ? dayjs(record.lastAppointment).isAfter(dateRange[0], "day") &&
        dayjs(record.lastAppointment).isBefore(dateRange[1], "day")
      : true;

    // Search filter
    const searchLower = searchText.toLowerCase();
    const searchMatch =
      record.name.toLowerCase().includes(searchLower) ||
      record.email.toLowerCase().includes(searchLower) ||
      record.phone.toLowerCase().includes(searchLower);

    return statusMatch && dateMatch && searchMatch;
  });

  // ✅ Table columns
  const columns: ColumnsType<Patient> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <span>#{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Last Appointment",
      dataIndex: "lastAppointment",
      key: "lastAppointment",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === "Active" ? (
          <Tag color="blue">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: () => <Button type="text" icon={<EyeOutlined />} />,
    },
  ];

  // ✅ Status Filter Menu
  const menu = (
    <Menu
      onClick={(e) => setStatusFilter(e.key as "All" | "Active" | "Inactive")}
      selectedKeys={[statusFilter]}
    >
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Active">Active</Menu.Item>
      <Menu.Item key="Inactive">Inactive</Menu.Item>
    </Menu>
  );
  const pathName = usePathname();
  let patientLink = "/clinic/patient/add-patient"; 
  if (pathName.startsWith("/clinic")) {
    patientLink = "/clinic/patient/add-patient";
  } else if (pathName.startsWith("/reception")) {
    patientLink = "/reception/new-patient";
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 w-full">
        {/* Search Input */}
        <Input
          placeholder="Search by name, email, or phone"
          addonAfter={<SearchOutlined />}
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          className="w-full sm:w-auto sm:flex-1"
        />

        {/* New Patient Button */}
        <Link href={patientLink} className="w-full sm:w-auto">
          <Button
            type="primary"
            icon={<LiaUserPlusSolid />}
            className="w-full sm:w-auto !p-[18px]"
          >
            New Patients
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div
        style={{ marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap" }}
      >
        {/* Date Range Picker */}
        <Space>
          <span style={{ fontWeight: 500 }}>Date:</span>
          <RangePicker
            onChange={(dates) =>
              setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
            }
            format="YYYY-MM-DD"
            suffixIcon={<FilterOutlined />}
          />
        </Space>

        {/* Status Dropdown */}
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button>Status: {statusFilter}</Button>
        </Dropdown>
      </div>

      {/* Table */}
      <Table
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          fontFamily: "'Inter', sans-serif",
        }}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: "#6B91A31A",
                  padding: "16px",
                  fontWeight: "600",
                  color: "#334155",
                  borderBottom: "2px solid #e2e8f0",
                }}
              />
            ),
          },
          body: {
            cell: (props) => (
              <td
                {...props}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #f1f5f9",
                  color: "#475569",
                }}
              />
            ),
            row: (props) => (
              <tr
                {...props}
                style={{
                  transition: "background-color 0.2s ease",
                  ":hover": {
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            ),
          },
        }}
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        pagination={{
          ...pagination,
          total: filteredData.length,
          onChange: (page, pageSize) => {
            setPagination({ ...pagination, current: page, pageSize });
          },
          style: { marginRight: "16px" },
        }}
      />
    </div>
  );
};

export default PatientTable;
