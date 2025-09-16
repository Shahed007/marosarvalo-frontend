/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, Table, Button, Input, Space, Typography } from "antd";
import { PlusOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";

const { Title, Text } = Typography;

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

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = paymentData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
        <Space>
          <Button
            type="text"
            icon={<UserOutlined />}
            onClick={() => alert(`View user: ${record.clinicName}`)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card
      style={{
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header + Button (Responsive) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <Title
          level={4}
          style={{ margin: 0, color: "#1E293B", fontWeight: 600 }}
        >
          Payment History
        </Title>
        <Link href={"/admin/add-clinic"}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{
              backgroundColor: "#225A7F",
              height: "36px",
              borderRadius: "6px",
              fontWeight: 500,
              width: "100%",
              maxWidth: "200px",
            }}
          >
            Add Clinic
          </Button>
        </Link>
      </div>

      {/* Search Bar (Responsive) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <Input
          placeholder="Search"
          prefix={<SearchOutlined style={{ color: "#94A3B8" }} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          style={{
            flex: "1",
            minWidth: "200px",
            maxWidth: "300px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            height: "38px",
          }}
        />
      </div>

      {/* Responsive Table Wrapper */}
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            current: 1,
            position: ["bottomRight"],
            total: filteredData.length,
            pageSize: 5,
            showTotal: (total) => `Total ${total} payments`,
            itemRender: (_, type, element) =>
              type === "prev" ? (
                <span>‹</span>
              ) : type === "next" ? (
                <span>›</span>
              ) : (
                element
              ),
          }}
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
      </div>
    </Card>
  );
};
