/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Card, Table, Button, Typography, Modal } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

export const BondTable = () => {
  // Mock bond/package data
  const bondData = [
    {
      key: "1",
      id: "#1254",
      name: "Premium Package",
      discipline: "Operation",
      services: "Surgery",
      sessions: 5,
      price: "$250",
      status: "Active",
    },
    {
      key: "2",
      id: "#1254",
      name: "Standard Package",
      discipline: "Operation",
      services: "Surgery",
      sessions: 5,
      price: "$250",
      status: "Active",
    },
    {
      key: "3",
      id: "#1254",
      name: "Trail Package",
      discipline: "Operation",
      services: "Surgery",
      sessions: 5,
      price: "$250",
      status: "Inactive",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  // Render status badge
  const renderStatus = (status: string) => {
    let bgColor, textColor;
    switch (status) {
      case "Active":
        bgColor = "#E0F7E0";
        textColor = "#0D9488";
        break;
      case "Inactive":
        bgColor = "#FEF3F2";
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
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: 500,
          display: "inline-block",
        }}
      >
        {status}
      </Text>
    );
  };

  // Handle view details
  const handleViewDetails = (record: any) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  // Modal content
  const modalContent = (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <Title level={4} style={{ margin: "0 0 16px 0", color: "#1E293B" }}>
        Package Details
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="#4180AB" />
            <path d="M12 18C15.866 18 19 14.866 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 14.866 8.13401 18 12 18Z" fill="#4180AB" />
          </svg>
          <span style={{ fontWeight: 500 }}>Name</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>{selectedRecord?.name}</Text>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 6.25329 6.25329 2 11.5 2C16.7467 2 21 6.25329 21 11.5Z" stroke="#4180AB" strokeWidth="2" />
            <path d="M15 11.5C15 13.433 13.433 15 11.5 15C9.56705 15 8 13.433 8 11.5C8 9.56705 9.56705 8 11.5 8C13.433 8 15 9.56705 15 11.5Z" stroke="#4180AB" strokeWidth="2" />
          </svg>
          <span style={{ fontWeight: 500 }}>Discipline</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>{selectedRecord?.discipline}</Text>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" stroke="#4180AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 6L12 13L2 6" stroke="#4180AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: 500 }}>Services</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>{selectedRecord?.services}</Text>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4180AB" strokeWidth="2" />
            <path d="M12 8V12L15 15" stroke="#4180AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: 500 }}>Sessions</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>{selectedRecord?.sessions}</Text>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="#4180AB" />
            <path d="M12 18C15.866 18 19 14.866 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 14.866 8.13401 18 12 18Z" fill="#4180AB" />
          </svg>
          <span style={{ fontWeight: 500 }}>Price</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>{selectedRecord?.price}</Text>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="#4180AB" />
            <path d="M12 18C15.866 18 19 14.866 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 14.866 8.13401 18 12 18Z" fill="#4180AB" />
          </svg>
          <span style={{ fontWeight: 500 }}>Status</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>{selectedRecord?.status}</Text>
      </div>
    </div>
  );

  // Columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Discipline",
      dataIndex: "discipline",
      key: "discipline",
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
    },
    {
      title: "Sessions",
      dataIndex: "sessions",
      key: "sessions",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
          style={{ padding: 0 }}
        />
      ),
    },
  ];

  return (
    <Card
      style={{
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <Title level={2} style={{ margin: 0, color: "#1E293B" }}>
          Packages
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{
            backgroundColor: "#3B82F6",
            borderColor: "#3B82F6",
            height: "36px",
            borderRadius: "6px",
            fontWeight: 500,
          }}
        >
          Add Package
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={bondData}
        pagination={{
          current: 1,
          pageSize: 10,
          total: bondData.length,
          showTotal: (total) => `Showing 1 to ${Math.min(10, total)} out of ${total} records`,
          position: ["bottomRight"],
          showSizeChanger: false,
          hideOnSinglePage: false,
          itemRender: (_, type, element) => {
            return type === 'prev' ? <span>‹</span> : type === 'next' ? <span>›</span> : element;
          },
          style: {
            textAlign: "center",
            padding: "16px 0",
            borderTop: "1px solid #E2E8F0",
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
  );
};