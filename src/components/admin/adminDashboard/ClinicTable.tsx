import { Card, Table, Button, Input, Space, Typography, Dropdown } from "antd";
import { PlusOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

export const ClinicTableCard = () => {
  const clinicData = [
    {
      key: "1",
      clinicName: "The Mayo Clinic in Rochester",
      orderId: "DL12653",
      contact: "+91*******",
      email: "name@email.com",
      countdown: "162 Day, 17 Hours, 24 min",
      action: "Delete",
    },
    {
      key: "2",
      clinicName: "Cleveland Clinic",
      orderId: "DL12654",
      contact: "+919876543210",
      email: "clinic2@email.com",
      countdown: "90 Day, 5 Hours, 10 min",
      action: "Reminder",
    },
    {
      key: "3",
      clinicName: "Johns Hopkins Hospital",
      orderId: "DL12655",
      contact: "+919988776655",
      email: "hopkins@med.org",
      countdown: "45 Day, 12 Hours, 0 min",
      action: "Remove",
    },
    {
      key: "4",
      clinicName: "Massachusetts General Hospital",
      orderId: "DL12656",
      contact: "+919123456789",
      email: "mgh@hms.harvard.edu",
      countdown: "200 Day, 3 Hours, 45 min",
      action: "",
    },
    {
      key: "5",
      clinicName: "Stanford Health Care",
      orderId: "DL12657",
      contact: "+918765432109",
      email: "stanford@stanford.edu",
      countdown: "75 Day, 8 Hours, 30 min",
      action: "",
    },
    {
      key: "6",
      clinicName: "UCLA Medical Center",
      orderId: "DL12658",
      contact: "+918887776665",
      email: "ucla@mednet.ucla.edu",
      countdown: "30 Day, 15 Hours, 20 min",
      action: "",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = clinicData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = [
    {
      title: "Clinic Name",
      dataIndex: "clinicName",
      key: "clinicName",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
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
      title: "Countdown",
      dataIndex: "countdown",
      key: "countdown",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space>
          <Dropdown
            menu={{
              items: [
                { key: "1", label: "Details" },
                { key: "2", label: "Reminder" },
                { key: "3", label: "Remove", danger: true },
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <Title level={3} style={{ margin: 0, fontSize: "18px", color: "#1F2937", fontWeight: 600 }}>
          Clinic List
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
          Add Clinic
        </Button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "20px", maxWidth: "400px" }}>
        <Input
          placeholder="Search by name/email/number"
          prefix={<SearchOutlined style={{ color: "#94A3B8" }} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          style={{
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            height: "38px",
          }}
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
       
        pagination={{
          current: 1,
          position: ["bottomRight"],
          total: filteredData.length,
          pageSize: 5,
          showTotal: (total) => `Total ${total} clinics`,
          hideOnSinglePage: false,

          // ✅ Set pagination background here
          style: {
            backgroundColor: "#F8FAFC",
            padding: "16px 0",
            borderTop: "1px solid #E2E8F0",
            margin: 0,
            textAlign: "center",
          },
          itemRender: (_, type, element) => {
            return type === 'prev' ? <span>‹</span> : type === 'next' ? <span>›</span> : element;
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
    </Card>
  );
};