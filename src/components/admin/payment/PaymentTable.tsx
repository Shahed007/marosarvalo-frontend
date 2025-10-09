/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, Table, Button, Input, Space, Typography, Select } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Import your full-featured Custom Pagination
import CustomPagination from "@/components/shared/CustomPagination";

const { Text } = Typography;
const { Option } = Select;

export const PaymentTable = () => {
  const paymentData = [
    {
      key: "1",
      clinicName: "Cristofer Curtis",
      transactionId: "DL12653ye765",
      timeAndDate: "06/05/2025 & 11:30pm",
      email: "name@email.com",
      amount: "$500",
      status: "Pending",
    },
    {
      key: "2",
      clinicName: "Cristofer Curtis",
      transactionId: "DL12653ye765",
      timeAndDate: "06/05/2025 & 11:30pm",
      email: "name@email.com",
      amount: "$500",
      status: "Pending",
    },
    {
      key: "3",
      clinicName: "Cristofer Curtis",
      transactionId: "DL12653ye765",
      timeAndDate: "06/05/2025 & 11:30pm",
      email: "name@email.com",
      amount: "$500",
      status: "Active",
    },
  ];

  const router = useRouter();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // ← Now dynamic

  // Filter data
  const filteredData = paymentData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginate
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  // Handle pagination changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing size
  };

  // View handler
  const handleView = (id: string) => {
    // router.push(`payment/${id}`);
  };

  // Status badge
  const renderStatus = (status: string) => {
    let bgColor, textColor;
    switch (status) {
      case "Pending":
        bgColor = "#FEE2E2";
        textColor = "#DC2626";
        break;
      case "Active":
        bgColor = "#E0F7E0";
        textColor = "#0D9488";
        break;
      default:
        bgColor = "#F1F4F6";
        textColor = "#64748B";
    }
    return (
      <Text
        style={{
          backgroundColor: bgColor,
          color: textColor,
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {status}
      </Text>
    );
  };

  const columns = [
    {
      title: "Clinic Name",
      dataIndex: "clinicName",
      key: "clinicName",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Time & Date",
      dataIndex: "timeAndDate",
      key: "timeAndDate",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => renderStatus(status),
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: any) => (
        <Space size="small">
          <Button
            type="text"
            icon={<UserOutlined />}
            onClick={() => handleView(record.key)}
            className="text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Space>
      ),
    },
  ];

  return (
  <Card
  bordered={false}
  style={{
    boxShadow: "none",
    border: "none",
    position: "relative", // Enables absolute positioning inside
  }}
>
  {/* Add Clinic Button - Top Right */}
  <div
    style={{
      position: "absolute",
      top: "1px",
      right: "16px",
      zIndex: 10,
    }}
  >
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => router.push("/admin/add-clinic")}
      style={{
        backgroundColor: "#225A7F",
        borderColor: "#225A7F",
        height: "36px",
        borderRadius: "6px",
        fontWeight: 500,
      }}
    >
      Add Clinic
    </Button>
  </div>

  {/* Header Row: Title + Search + Filter */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "16px",
      marginTop: "48px", // Space for the top-right button (top:10 + height:36 + buffer:2)
    }}
  >
    {/* Left: Title */}
    <h1 className="p-0 m-0 text-[#0B121B] text-base sm:text-xl md:text-[25px] lg:text-3xl font-medium whitespace-nowrap">
      Payments History
    </h1>

    {/* Right Group: Search + Filter */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      {/* Search Input */}
      <Input
        placeholder="Search payments..."
        suffix={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M23 23L17.6919 17.6919M17.6919 17.6919C18.5999 16.784 19.3201 15.7061 19.8115 14.5198C20.3029 13.3335 20.5558 12.062 20.5558 10.7779C20.5558 9.49386 20.3029 8.22238 19.8115 7.03607C19.3202 5.84976 18.5999 4.77185 17.6919 3.86389C16.784 2.95592 15.7061 2.23569 14.5198 1.7443C13.3335 1.25291 12.062 1 10.7779 1C9.49386 1 8.22238 1.25291 7.03607 1.7443C5.84976 2.23569 4.77185 2.95592 3.86389 3.86389C2.03017 5.6976 1 8.18465 1 10.7779C1 13.3712 2.03017 15.8582 3.86389 17.6919C5.6976 19.5257 8.18465 20.5558 10.7779 20.5558C13.3712 20.5558 15.8582 19.5257 17.6919 17.6919Z"
              stroke="#0B121B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
        style={{
          width: 250,
          borderRadius: "12px",
          border: "1px solid #CBD5E1",
          height: "38px",
        }}
        className="hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />

      {/* Time Filter Dropdown */}
      <Select
        value={timeFilter}
        onChange={(value) => setTimeFilter(value)}
        style={{ width: 120, height: 38 }}
        size="middle"
        bordered={false}
      >
        <Option value="daily">Daily</Option>
        <Option value="weekly">Weekly</Option>
        <Option value="monthly">Monthly</Option>
      </Select>
    </div>
  </div>

  {/* Table */}
  <Table
    columns={columns}
    dataSource={paginatedData}
    pagination={false}
    rowKey="key"
    scroll={{ x: "max-content" }}
    components={{
      header: {
        cell: ({ children }) => (
          <th
            style={{
              backgroundColor: "#F1F4F6",
              color: "#4180AB",
              fontWeight: 700,
              fontSize: "14px",
              padding: "12px 16px",
              borderBottom: "1px solid #CBD5E1",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {children}
          </th>
        ),
      },
      body: {
        cell: ({ children }) => (
          <td
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #E2E8F0",
              color: "#1E293B",
              fontSize: "14px",
            }}
          >
            {children}
          </td>
        ),
      },
    }}
    style={{
      borderRadius: "8px",
      overflow: "hidden",
    }}
  />

  {/* ✅ Custom Pagination */}
  <div className="mt-6" style={{ width: "100%" }}>
    <CustomPagination
      currentPage={currentPage}
      total={filteredData.length}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  </div>
</Card>
  );
};

export default PaymentTable;
