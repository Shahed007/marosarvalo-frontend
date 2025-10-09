/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, Table, Button, Input, Space, Typography, Select } from "antd";
import { PlusOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
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
            // onClick={() => handleView(record.key)}
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
      bodyStyle={{ padding: 0 }}
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
          size="large"
          type="primary"
          style={{
            fontSize: "14px",
            color: "#D3DEE5",
            backgroundColor: "#225A7F",
            borderColor: "#225A7F",
            borderRadius: "6px",
            fontWeight: 500,
          }}
        >
          Add Clinic
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clip-path="url(#clip0_1088_5426)">
              <path
                d="M10 20C9.741 20 9.49261 19.8971 9.30947 19.714C9.12632 19.5308 9.02344 19.2824 9.02344 19.0234V0.976562C9.02344 0.717562 9.12632 0.46917 9.30947 0.286029C9.49261 0.102888 9.741 0 10 0C10.259 0 10.5074 0.102888 10.6905 0.286029C10.8737 0.46917 10.9766 0.717562 10.9766 0.976562V19.0234C10.9766 19.2824 10.8737 19.5308 10.6905 19.714C10.5074 19.8971 10.259 20 10 20Z"
                fill="white"
              />
              <path
                d="M19.0234 10.9766H0.976562C0.717562 10.9766 0.46917 10.8737 0.286029 10.6905C0.102888 10.5074 0 10.259 0 10C0 9.741 0.102888 9.49261 0.286029 9.30947C0.46917 9.12632 0.717562 9.02344 0.976562 9.02344H19.0234C19.2824 9.02344 19.5308 9.12632 19.714 9.30947C19.8971 9.49261 20 9.741 20 10C20 10.259 19.8971 10.5074 19.714 10.6905C19.5308 10.8737 19.2824 10.9766 19.0234 10.9766Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1088_5426">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
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
        <h1 className="pb-2 pt-8 md:pt-6  text-[#3c4149] text-base sm:text-xl md:text-[25px] font-medium">
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
       <div>
           <Input
            allowClear
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="large"
            addonAfter={<SearchOutlined />}
          />
       </div>

          {/* Time Filter Dropdown */}
          <Select
            value={timeFilter}
            onChange={(value) => setTimeFilter(value)}
            style={{ width: 120, height: 38 }}
            size="middle"
            bordered={false}
          >
             <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
            <Option value="daily">Daily</Option>
           
          </Select>
        </div>
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
