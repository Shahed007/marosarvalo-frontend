/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Card, Table, Button, Input, Space, Typography, Dropdown, Modal } from "antd";
import { PlusOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import EditClinicModal from "./EditCliclModal";

// ✅ Import your EditClinicModal


const { Title, Text } = Typography;

export const ClickingListTable = () => {
  // ✅ Enhanced mock data with user fields for editing
  const clinicData = [
    {
      key: "1",
      clinicName: "The Mayo Clinic in Rochester",
      contact: "+91 9876543210",
      email: "clinic.rochester@mayo.com",
      countdown: "162 Day, 17 Hours, 24 min",
      status: "Active",
      userName: "Dr. Henry Evans",
      userEmail: "henry.evans@mayo.com",
      userPhone: "+91 9876501234",
      userAddress: "123 Medical Lane, Rochester, MN",
      clinicAddress: "1 Mayo Blvd, Rochester, MN 55905",
    },
    {
      key: "2",
      clinicName: "Cleveland Clinic Main Campus",
      contact: "+91 9876543211",
      email: "info@clevelandclinic.org",
      countdown: "120 Day, 5 Hours, 10 min",
      status: "Active",
      userName: "Dr. Sarah Lin",
      userEmail: "sarah.lin@cleveland.org",
      userPhone: "+91 9876501235",
      userAddress: "45 Health Ave, Cleveland, OH",
      clinicAddress: "9500 Euclid Ave, Cleveland, OH 44195",
    },
    {
      key: "3",
      clinicName: "Johns Hopkins Hospital",
      contact: "+91 9876543212",
      email: "admissions@jh.edu",
      countdown: "90 Day, 2 Hours, 30 min",
      status: "Inactive",
      userName: "Dr. Michael Rao",
      userEmail: "michael.rao@jh.edu",
      userPhone: "+91 9876501236",
      userAddress: "78 Care Blvd, Baltimore, MD",
      clinicAddress: "1800 Orleans St, Baltimore, MD 21287",
    },
    {
      key: "4",
      clinicName: "Massachusetts General Hospital",
      contact: "+91 9876543213",
      email: "info@mgh.harvard.edu",
      countdown: "200 Day, 10 Hours, 15 min",
      status: "Active",
      userName: "Dr. Lisa Wong",
      userEmail: "lisa.wong@mgh.org",
      userPhone: "+91 9876501237",
      userAddress: "32 Healing St, Boston, MA",
      clinicAddress: "55 Fruit St, Boston, MA 02114",
    },
    {
      key: "5",
      clinicName: "Stanford Health Care",
      contact: "+91 9876543214",
      email: "contact@stanfordhealth.org",
      countdown: "85 Day, 22 Hours, 55 min",
      status: "Active",
      userName: "Dr. Robert Chen",
      userEmail: "robert.chen@stanford.edu",
      userPhone: "+91 9876501238",
      userAddress: "66 Wellness Rd, Palo Alto, CA",
      clinicAddress: "300 Pasteur Dr, Palo Alto, CA 94304",
    },
    {
      key: "6",
      clinicName: "UCLA Medical Center",
      contact: "+91 9876543215",
      email: "info@uclahealth.org",
      countdown: "130 Day, 8 Hours, 40 min",
      status: "Active",
      userName: "Dr. Amanda Ruiz",
      userEmail: "amanda.ruiz@med.ucla.edu",
      userPhone: "+91 9876501239",
      userAddress: "99 Care Circle, Los Angeles, CA",
      clinicAddress: "757 Westwood Plaza, Los Angeles, CA 90095",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // ✅ New state for Edit Modal
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
      <Text style={{ backgroundColor: bgColor, color: textColor, padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>
        {status}
      </Text>
    );
  };

  // Handle Details Click
  const handleDetailsClick = (record: any) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  // ✅ Handle Edit Click → Open Edit Modal
  const handleEditClick = (record: any) => {
    setSelectedRecord(record);
    setIsEditModalVisible(true);
  };

  // Handle Reminder / Remove
  const handleActionClick = (action: string, record: any) => {
    console.log(`${action} clicked for:`, record);
    if (action === "Remove") {
      alert(`Removed: ${record.clinicName}`);
    } else if (action === "Reminder") {
      alert(`Reminder sent to: ${record.email}`);
    }
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
      title: "Countdown",
      dataIndex: "countdown",
      key: "countdown",
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
                { key: "1", label: "Details", onClick: () => handleDetailsClick(record) },
                { key: "2", label: "Edit", onClick: () => handleEditClick(record) }, // ✅ Updated to open modal
                { key: "3", label: "Reminder", onClick: () => handleActionClick("Reminder", record) },
                { key: "4", label: "Remove", danger: true, onClick: () => handleActionClick("Remove", record) },
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

  // Modal Content (Details View)
  const modalContent = (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <Title level={4} style={{ margin: "0 0 16px 0", color: "#1E293B" }}>
        Clinic Details
      </Title>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="#4180AB" />
            <path d="M12 18C15.866 18 19 14.866 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 14.866 8.13401 18 12 18Z" fill="#4180AB" />
          </svg>
          <span style={{ fontWeight: 500 }}>User Name</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>{selectedRecord?.userName || "N/A"}</Text>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" stroke="#4180AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 6L12 13L2 6" stroke="#4180AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: 500 }}>Email</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>{selectedRecord?.email}</Text>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4180AB" strokeWidth="2" />
            <path d="M12 8V12L15 15" stroke="#4180AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: 500 }}>Countdown</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>{selectedRecord?.countdown}</Text>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 6.25329 6.25329 2 11.5 2C16.7467 2 21 6.25329 21 11.5Z" stroke="#4180AB" strokeWidth="2" />
            <path d="M15 11.5C15 13.433 13.433 15 11.5 15C9.56705 15 8 13.433 8 11.5C8 9.56705 9.56705 8 11.5 8C13.433 8 15 9.56705 15 11.5Z" stroke="#4180AB" strokeWidth="2" />
          </svg>
          <span style={{ fontWeight: 500 }}>Status</span>
        </div>
        <Text style={{ fontSize: "14px", color: "#1E293B" }}>{selectedRecord?.status}</Text>
      </div>
    </div>
  );

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
        <Title level={4} style={{ margin: 0, color: "#1E293B", fontWeight: 600 }}>
          All Clinics
        </Title>
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
          {/* ✅ Fixed typo and path */}
          <Link href="/admin/add-clinic" style={{ color: "white", textDecoration: "none" }}>
            Add Clinic
          </Link>
        </Button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px" }}>
        <Input
          placeholder="Search by name/email/number"
          prefix={<SearchOutlined style={{ color: "#94A3B8" }} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          style={{
            width: "100%",
            maxWidth: "500px",
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

      {/* Details Modal */}
      <Modal
        title=""
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        closable={true}
        centered
        maskClosable={true}
        width={400}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        {modalContent}
      </Modal>

      {/* ✅ Edit Modal */}
<EditClinicModal
  visible={isEditModalVisible}
  onCancel={() => setIsEditModalVisible(false)}
  data={selectedRecord}
/>
    </Card>
  );
};