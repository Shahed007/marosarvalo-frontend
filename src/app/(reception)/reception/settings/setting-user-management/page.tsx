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

const { Title, Text } = Typography;

export default function SettingsUserManagementPage() {
  // Mock user data
  const userData = [
    {
      key: "1",
      name: "Dr. Emily Carter",
      email: "emily.carter@example.com",
      profession: "Therapist",
      status: "Active",
    },
    {
      key: "2",
      name: "Dr. David Lee",
      email: "david.lee@example.com",
      profession: "Therapist",
      status: "Active",
    },
    {
      key: "3",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      profession: "Receptionist",
      status: "Inactive",
    },
    {
      key: "4",
      name: "James Wilson",
      email: "james.wilson@example.com",
      profession: "Doctor",
      status: "Active",
    },
    {
      key: "5",
      name: "Lisa Park",
      email: "lisa.park@example.com",
      profession: "Nurse",
      status: "Inactive",
    },
    {
      key: "6",
      name: "Mark Thompson",
      email: "mark.thompson@example.com",
      profession: "Admin",
      status: "Active",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Filter users by search term
  const filteredData = userData.filter((user) =>
    Object.values(user).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle view details
  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Status badge renderer
  const renderStatus = (status: string) => {
    let bgColor, textColor;
    switch (status) {
      case "Active":
        bgColor = "#E0F7E0";
        textColor = "#0D9488";
        break;
      case "Inactive":
        bgColor = "#FEE2E2";
        textColor = "#DC2626";
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

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
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
                  label: "User Details",
                  onClick: () => handleViewDetails(record),
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

  // Modal Content
  const modalContent = (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <Title level={4} style={{ margin: "0 0 16px 0", color: "#1E293B" }}>
        User Details
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
              fill="#4180AB"
            />
            <path
              d="M12 18C15.866 18 19 14.866 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 14.866 8.13401 18 12 18Z"
              fill="#4180AB"
            />
          </svg>
          <span style={{ fontWeight: 500 }}>Name</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>
          {selectedUser?.name}
        </Text>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z"
              stroke="#4180AB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 6L12 13L2 6"
              stroke="#4180AB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontWeight: 500 }}>Email</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>
          {selectedUser?.email}
        </Text>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#4180AB"
              strokeWidth="2"
            />
            <path
              d="M12 8V12L15 15"
              stroke="#4180AB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontWeight: 500 }}>Profession</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>
          {selectedUser?.profession}
        </Text>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 6.25329 6.25329 2 11.5 2C16.7467 2 21 6.25329 21 11.5Z"
              stroke="#4180AB"
              strokeWidth="2"
            />
            <path
              d="M15 11.5C15 13.433 13.433 15 11.5 15C9.56705 15 8 13.433 8 11.5C8 9.56705 9.56705 8 11.5 8C13.433 8 15 9.56705 15 11.5Z"
              stroke="#4180AB"
              strokeWidth="2"
            />
          </svg>
          <span style={{ fontWeight: 500 }}>Status</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>
          {selectedUser?.status}
        </Text>
      </div>
    </div>
  );

  return (
    <div className="!p-4 md:!p-6 lg:!p-8 !mb-8">
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
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Input
            placeholder="Search by name/email"
            prefix={<SearchOutlined style={{ color: "#94A3B8" }} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "6px",
              border: "1px solid #CBD5E1",
              height: "38px",
            }}
          />
          <Button
            className="bg-primary"
            type="primary"
            icon={<PlusOutlined />}
            style={{
              borderRadius: "6px",
              fontWeight: 500,
            }}
          >
            Add User
          </Button>
        </div>

        {/* Title */}
        <Title
          level={4}
          style={{
            margin: 0,
            color: "#1E293B",
            fontWeight: 600,
            marginBottom: "16px",
          }}
        >
          All Users
        </Title>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{
            current: 1,
            position: ["bottomRight"],
            total: filteredData.length,
            pageSize: 10,
            showTotal: (total) =>
              `Showing 1 to ${Math.min(10, total)} out of ${total} records`,
            hideOnSinglePage: false,
            style: {
              backgroundColor: "#F8FAFC",
              padding: "16px 0",
              borderTop: "1px solid #E2E8F0",
              margin: 0,
              textAlign: "center",
            },
            itemRender: (_, type, element) => {
              return type === "prev" ? (
                <span>‹</span>
              ) : type === "next" ? (
                <span>›</span>
              ) : (
                element
              );
            },
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

        {/* Modal */}
        <Modal
          title=""
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          closable={true}
          centered
          maskClosable={true}
          width={400}
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          {modalContent}
        </Modal>
      </Card>
    </div>
  );
}
