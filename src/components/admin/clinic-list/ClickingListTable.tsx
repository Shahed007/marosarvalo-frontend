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
  Row,
  Col,
} from "antd";
import { PlusOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import CustomPagination from "@/components/shared/CustomPagination";

const { Text } = Typography;

export const ClickingListTable = () => {
  // Mock clinic data
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
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [currentPage] = useState(1); // Pagination not dynamic yet
  const [pageSize] = useState(10);

  // Filtered data based on search term
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
      <span
        className="px-4 py-2 rounded text-xs font-medium"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          display: "inline-block",
        }}
      >
        {status}
      </span>
    );
  };

  // Handle Details Click
  const handleDetailsClick = (record: any) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  // Handle Edit Click → Navigate to edit page
  const handleEditClick = (record: any) => {
    window.location.href = `/admin/clinic-list/${record.key}`;
  };

  // Handle Reminder / Remove
  const handleActionClick = (action: string, record: any) => {
    if (action === "Remove") {
      alert(`Removed: ${record.clinicName}`);
    } else if (action === "Reminder") {
      alert(`Reminder sent to: ${record.email}`);
    }
  };

  // Table columns
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
                {
                  key: "1",
                  label: "Details",
                  onClick: () => handleDetailsClick(record),
                },
                {
                  key: "2",
                  label: (
                    <Link href={`/admin/clinic-list/${record.key}`} passHref legacyBehavior>
                      Edit
                    </Link>
                  ),
                  onClick: (e) => {
                    e.domEvent.preventDefault(); // Prevent default dropdown behavior
                    handleEditClick(record);   // Trigger navigation
                  },
                },
                {
                  key: "3",
                  label: "Reminder",
                  onClick: () => handleActionClick("Reminder", record),
                },
                {
                  key: "4",
                  label: "Remove",
                  danger: true,
                  onClick: () => handleActionClick("Remove", record),
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
    <Card bodyStyle={{ padding: 0 }} bordered={false}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        {/* Search Input */}
        <div className="w-full sm:w-[400px] lg:w-[625px]">
          <Input
            allowClear
            placeholder="Search by name/email/number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="large"
            addonAfter={<SearchOutlined />}
          />
        </div>

        {/* Add Clinic Button */}
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
          icon={<PlusOutlined />}
          onClick={() => console.log("Add new clinic")}
        >
          Add Clinic
        </Button>
      </div>

      <h1 className="pb-6 pt-8 md:pt-6 text-[#3c4149] text-base sm:text-xl md:text-[25px] font-medium">
        All Clinics
      </h1>

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
        dataSource={filteredData}
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

      {/* Pagination */}
      <div className="mt-4">
        <CustomPagination
          currentPage={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          onPageChange={() => {}}
        />
      </div>

      {/* Details Modal */}
      <Modal
        title={
          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontWeight: 600,
              fontSize: "18px",
              color: "#1E293B",
            }}
          >
            Details
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width="90%"
        style={{ maxWidth: "400px", borderRadius: "12px", padding: 0 }}
        bodyStyle={{
          padding: "20px",
          background: "#fff",
          borderRadius: "12px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Clinic Name */}
          <Row align="middle" gutter={[8, 0]}>
            <Col flex="0 1 auto" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path d="M3.22714 14.3346C..." fill="black" />
              </svg>
              <Text strong style={{ fontSize: "14px", color: "#333" }}>
                User Name
              </Text>
            </Col>
            <Col flex="1">
              <Text style={{ fontSize: "14px", color: "#666" }}>
                {selectedRecord?.userName || "N/A"}
              </Text>
            </Col>
          </Row>

          {/* Clinic Address */}
          <Row align="middle" gutter={[8, 0]}>
            <Col flex="0 1 auto" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.4665 17.35C..." stroke="#11111B" />
              </svg>
              <Text strong style={{ fontSize: "14px", color: "#333" }}>
                Clinic Address
              </Text>
            </Col>
            <Col flex="1">
              <Text style={{ fontSize: "14px", color: "#666" }}>
                {selectedRecord?.clinicAddress || "N/A"}
              </Text>
            </Col>
          </Row>

          {/* Email */}
          <Row align="middle" gutter={[8, 0]}>
            <Col flex="0 1 auto" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8.28372 2.70703H..." fill="#11111B" />
              </svg>
              <Text strong style={{ fontSize: "14px", color: "#333" }}>
                Email
              </Text>
            </Col>
            <Col flex="1">
              <Text style={{ fontSize: "14px", color: "#666" }}>
                {selectedRecord?.email || "N/A"}
              </Text>
            </Col>
          </Row>

          {/* Contact */}
          <Row align="middle" gutter={[8, 0]}>
            <Col flex="0 1 auto" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3.78586 2.34512C..." fill="#11111B" />
              </svg>
              <Text strong style={{ fontSize: "14px", color: "#333" }}>
                Contact
              </Text>
            </Col>
            <Col flex="1">
              <Text style={{ fontSize: "14px", color: "#666" }}>
                {selectedRecord?.contact || "N/A"}
              </Text>
            </Col>
          </Row>

          {/* User Address */}
          <Row align="middle" gutter={[8, 0]}>
            <Col flex="0 1 auto" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.4665 17.35C..." stroke="#11111B" />
              </svg>
              <Text strong style={{ fontSize: "14px", color: "#333" }}>
                User Address
              </Text>
            </Col>
            <Col flex="1">
              <Text style={{ fontSize: "14px", color: "#666" }}>
                {selectedRecord?.userAddress || "N/A"}
              </Text>
            </Col>
          </Row>
        </div>
      </Modal>
    </Card>
  );
};