/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Typography,
  Dropdown,
  Modal,
} from "antd";
import { PlusOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";

const { Title, Text } = Typography;

export const BookingTable = () => {
  const clinicData = [
    {
      key: "1",
      clinicName: "The Mayo Clinic in Rochester",
      contact: "+91*******",
      email: "name@email.com",
      subject: "For XYZ",
      status: "Pending",
      userName: "XYZ Clint",
      message: "I want to more info",
    },
    {
      key: "2",
      clinicName: "The Mayo Clinic in Rochester",
      contact: "+91*******",
      email: "name@email.com",
      subject: "For XYZ",
      status: "Pending",
      userName: "ABC Patient",
      message: "Need appointment details",
    },
    {
      key: "3",
      clinicName: "The Mayo Clinic in Rochester",
      contact: "+91*******",
      email: "name@email.com",
      subject: "For XYZ",
      status: "Cancel",
      userName: "DEF Client",
      message: "Not interested anymore",
    },
    {
      key: "4",
      clinicName: "The Mayo Clinic in Rochester",
      contact: "+91*******",
      email: "name@email.com",
      subject: "For XYZ",
      status: "Complete",
      userName: "GHI User",
      message: "Appointment confirmed",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const filteredData = clinicData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Status badge renderer
  const renderStatus = (status: string) => {
    let bgColor, textColor;
    switch (status) {
      case "Pending":
        bgColor = "#E2E8F0";
        textColor = "#4180AB";
        break;
      case "Cancel":
        bgColor = "#FEE2E2";
        textColor = "#DC2626";
        break;
      case "Complete":
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

  const handleDetailsClick = (record: any) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleRemoveClick = (record: any) => {
    console.log("Remove:", record);
  };

  const columns = [
    {
      title: "Clinic Name",
      dataIndex: "clinicName",
      key: "clinicName",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
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
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "Details",
                  onClick: () => handleDetailsClick(record),
                },
                {
                  key: "2",
                  label: "Remove",
                  danger: true,
                  onClick: () => handleRemoveClick(record),
                },
              ],
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
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
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Input
          placeholder="Search by name/email/number"
          prefix={<SearchOutlined style={{ color: "#94A3B8" }} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          style={{
            flex: 1,
            minWidth: "220px",
            maxWidth: "500px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            height: "38px",
          }}
        />
        <Link href={"/admin/add-clinic"}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{
              backgroundColor: "#225A7F",
              borderColor: "#225A7F",
              height: "36px",
              borderRadius: "6px",
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            Add Clinic
          </Button>
        </Link>
      </div>

      <Title
        level={4}
        style={{
          margin: 0,
          color: "#1E293B",
          fontWeight: 600,
          marginBottom: "16px",
        }}
      >
        All Clinics
      </Title>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            position: ["bottomRight"],
            total: filteredData.length,
            pageSize: 5,
            showTotal: (total) => `Total ${total} clinics`,
          }}
          rowKey="key"
          scroll={{ x: "max-content" }}
          style={{
            borderRadius: "8px",
            overflow: "hidden",
          }}
        />
      </div>

      {/* Modal */}
      <Modal
        title="Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width="90%"
        style={{
          maxWidth: "400px",
          borderRadius: "12px",
        }}
      >
        <div style={{ padding: "10px" }}>
          <p>
            <strong>User Name: </strong> {selectedRecord?.userName}
          </p>
          <p>
            <strong>Email: </strong> {selectedRecord?.email}
          </p>
          <p>
            <strong>Subject: </strong> {selectedRecord?.subject}
          </p>
          <p>
            <strong>Message: </strong> {selectedRecord?.message}
          </p>
        </div>
      </Modal>
    </Card>
  );
};
