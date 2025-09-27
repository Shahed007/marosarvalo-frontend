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
import { usePathname } from "next/navigation";

const { Title, Text } = Typography;

const SettingsServicesPage = () => {
  // Mock data for services
  const serviceData = [
    {
      key: "1",
      discipline: "Operation",
      serviceName: "Therapy",
      price: "$280",
      lengthTime: "2h, 30m",
      action: "Only View",
    },
    {
      key: "2",
      discipline: "Operation",
      serviceName: "Surgery",
      price: "$250",
      lengthTime: "2h, 30m",
      action: "Only View",
    },
    {
      key: "3",
      discipline: "Operation",
      serviceName: "Dengue Check",
      price: "$280",
      lengthTime: "2h, 30m",
      action: "Only View",
    },
    {
      key: "4",
      discipline: "Operation",
      serviceName: "Blood Test",
      price: "$280",
      lengthTime: "2h, 30m",
      action: "Only View",
    },
    {
      key: "5",
      discipline: "Operation",
      serviceName: "CPC",
      price: "$280",
      lengthTime: "2h, 30m",
      action: "Only View",
    },
    {
      key: "6",
      discipline: "Operation",
      serviceName: "X-Ray",
      price: "$150",
      lengthTime: "1h, 15m",
      action: "Only View",
    },
    {
      key: "7",
      discipline: "Consultation",
      serviceName: "Doctor Consult",
      price: "$100",
      lengthTime: "30m",
      action: "Only View",
    },
    {
      key: "8",
      discipline: "Diagnostic",
      serviceName: "MRI Scan",
      price: "$500",
      lengthTime: "45m",
      action: "Only View",
    },
    {
      key: "9",
      discipline: "Laboratory",
      serviceName: "CBC Test",
      price: "$80",
      lengthTime: "1h",
      action: "Only View",
    },
    {
      key: "10",
      discipline: "Pharmacy",
      serviceName: "Medication",
      price: "$40",
      lengthTime: "15m",
      action: "Only View",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const pathName = usePathname();
  const hiddenClass = pathName.startsWith("/specillist") ? "hidden" : "";
  // Filtered data based on search
  const filteredData = serviceData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle view details
  const handleViewClick = (record: any) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  // Column definitions
  const columns = [
    {
      title: "Discipline",
      dataIndex: "discipline",
      key: "discipline",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: string) => (
        <Text type="secondary" style={{ fontWeight: 500 }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Length & Time",
      dataIndex: "lengthTime",
      key: "lengthTime",
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
                  label: "Only View",
                  onClick: () => handleViewClick(record),
                },
                // You can add "Edit" or "Delete" later
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
        Service Details
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
          <span style={{ fontWeight: 500 }}>Discipline</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>
          {selectedRecord?.discipline}
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
              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
              fill="#4180AB"
            />
            <path
              d="M12 18C15.866 18 19 14.866 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 14.866 8.13401 18 12 18Z"
              fill="#4180AB"
            />
          </svg>
          <span style={{ fontWeight: 500 }}>Service Name</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>
          {selectedRecord?.serviceName}
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
              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
              fill="#4180AB"
            />
            <path
              d="M12 18C15.866 18 19 14.866 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 14.866 8.13401 18 12 18Z"
              fill="#4180AB"
            />
          </svg>
          <span style={{ fontWeight: 500 }}>Price</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>
          {selectedRecord?.price}
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
              d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
              fill="#4180AB"
            />
            <path
              d="M12 18C15.866 18 19 14.866 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 14.866 8.13401 18 12 18Z"
              fill="#4180AB"
            />
          </svg>
          <span style={{ fontWeight: 500 }}>Length & Time</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>
          {selectedRecord?.lengthTime}
        </Text>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
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
          <div style={{ flex: 1, marginRight: "16px" }}>
            <Input
              placeholder="Search services..."
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
          </div>
          <div className={`${hiddenClass}`}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                backgroundColor: "#225A7F",
                borderColor: "#225A7F",
                height: "36px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add Services
            </Button>
          </div>
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
          All Services
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
};

export default SettingsServicesPage;
