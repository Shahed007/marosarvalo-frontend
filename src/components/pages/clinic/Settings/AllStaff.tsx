/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Row,
  Col,
  Drawer,
  Form,
  Modal,
  Typography,
  Tag,
  Dropdown,
  MenuProps,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { AllStaffs } from "@/types/global";
import { BsThreeDotsVertical } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import EditStaffDrawer from "./EditStaffDrawer"; // Import the component

interface ProductTabelProps {
  data: AllStaffs[];
}

const { Title } = Typography;

const AllStaff: React.FC<ProductTabelProps> = ({ data }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [editStaffDrawer, setEditStaffDrawer] = useState(false);
  const [, setSelectedStaff] = useState<AllStaffs | null>(null);
  const router = useRouter();
  const [form] = Form.useForm();

  // ✅ Apply filters
  const filteredData = data.filter((record) => {
    // Search filter
    const searchLower = searchText.toLowerCase();
    const searchMatch =
      record.name.toLowerCase().includes(searchLower) ||
      record.email.toLowerCase().includes(searchLower) ||
      record.discipline.toLowerCase().includes(searchLower) ||
      record.role.toLowerCase().includes(searchLower);

    return searchMatch;
  });

  // Calculate pagination values
  const totalRecords = filteredData.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRecords);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleEditStaffOpen = (record: AllStaffs) => {
    setSelectedStaff(record);
    setEditStaffDrawer(true);
  };

  const handleEditStaffClose = () => {
    setEditStaffDrawer(false);
    setSelectedStaff(null);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Handle new staff form submission
  const handleFormSubmit = (values: any) => {
    console.log("New staff form values:", values);
    Modal.success({
      title: "Success",
      content: "Staff added successfully!",
    });
    setDrawerVisible(false);
    form.resetFields();
  };

  // Handle edit staff form submission
  const handleEditStaffSubmit = (values: any) => {
    console.log("Edit staff form values:", values);
    Modal.success({
      title: "Success",
      content: "Staff updated successfully!",
    });
    setEditStaffDrawer(false);
  };
  const pathName = usePathname();
  // Handle view details
  const handleViewDetails = (record: AllStaffs) => {
    const staffId = record.id;
    if (!staffId) {
      console.error("No ID found for record:", record);
      return;
    }
    if (pathName.startsWith("/clinic")) {
      router.push(`/clinic/single-staff/${staffId}`);
    } else if (pathName.startsWith("/reception")) {
      router.push(`/reception/single-staff/${staffId}`);
    }
    // router.push(`/clinic/single-staff/${staffId}`);
  };

  // Handle remove staff
  const handleRemoveStaff = (record: AllStaffs) => {
    Modal.confirm({
      title: "Remove Staff",
      content: `Are you sure you want to remove ${record.name}?`,
      okText: "Yes, Remove",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        Modal.success({
          title: "Success",
          content: `${record.name} has been removed successfully!`,
        });
      },
    });
  };

  // Dropdown menu items
  const getMenuItems = (record: AllStaffs): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit Staff",
      icon: <FiEdit2 />,
      onClick: () => handleEditStaffOpen(record),
    },
    {
      key: "view",
      label: "View Details",
      icon: <EyeOutlined />,
      onClick: () => handleViewDetails(record),
    },
    {
      key: "remove",
      label: "Remove Staff",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleRemoveStaff(record),
    },
  ];

  // ✅ Table columns for Staff Management
  const columns: ColumnsType<AllStaffs> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Discipline",
      dataIndex: "discipline",
      key: "discipline",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: "Active" | "Inactive") => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 80,
      render: (_, record) => (
        <Dropdown
          menu={{ items: getMenuItems(record) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="default"
            icon={<BsThreeDotsVertical style={{ color: "#225A7F" }} />}
            style={{
              border: "1px solid #CCCCCC",
              padding: "6px 10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
            }}
            size="small"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="mt-20">
      <Title level={4}>All Staff</Title>
      {/* Search + Add Button */}
      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Search staff"
          suffix={<SearchOutlined className="cursor-pointer" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 700, borderRadius: "12px" }}
          allowClear
          className="!px-2 !py-2"
        />
        <Button
          type="primary"
          style={{ borderRadius: "12px" }}
          className="!px-7 !py-5"
          icon={<PlusOutlined />}
          onClick={() => setDrawerVisible(true)}
        >
          Add Staff
        </Button>
      </div>

      {/* Table */}
      <Table
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
        }}
        rowKey="email"
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: "#F1F4F6",
                  padding: "16px",
                  fontWeight: 600,
                  color: "#334155",
                }}
              />
            ),
          },
          body: {
            cell: (props) => (
              <td
                {...props}
                style={{
                  padding: "12px 16px",
                  color: "#475569",
                }}
              />
            ),
          },
        }}
      />

      {/* Custom Pagination */}
      <Row justify="space-between" align="middle" style={{ marginTop: 24 }}>
        <Col>
          <Space>
            <span style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 14 }}>
              Showing
            </span>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              style={{ width: 80, height: 32, borderRadius: "15px" }}
              size="small"
            >
              <Select.Option value={10}>10</Select.Option>
              <Select.Option value={20}>20</Select.Option>
              <Select.Option value={50}>50</Select.Option>
            </Select>
          </Space>
        </Col>

        <Col>
          <span style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 14 }}>
            Showing {startIndex + 1} to {endIndex} of {totalRecords} records
          </span>
        </Col>

        <Col>
          <Space>
            <Button
              icon={<LeftOutlined />}
              size="small"
              type="text"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            <Button
              type={currentPage === 1 ? "primary" : "text"}
              size="small"
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>
            {totalRecords > pageSize && (
              <Button
                type={currentPage === 2 ? "primary" : "text"}
                size="small"
                onClick={() => handlePageChange(2)}
              >
                2
              </Button>
            )}
            {totalRecords > pageSize * 2 && (
              <Button
                type={currentPage === 3 ? "primary" : "text"}
                size="small"
                onClick={() => handlePageChange(3)}
              >
                3
              </Button>
            )}
            {totalRecords > pageSize * 3 && (
              <Button
                type={currentPage === 4 ? "primary" : "text"}
                size="small"
                onClick={() => handlePageChange(4)}
              >
                4
              </Button>
            )}
            <Button
              icon={<RightOutlined />}
              size="small"
              type="text"
              disabled={endIndex >= totalRecords}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Space>
        </Col>
      </Row>

      {/* New Staff Drawer */}
      <Drawer
        title={
          <div className="text-2xl font-semibold text-center">Add Staff</div>
        }
        placement="right"
        onClose={() => {
          setDrawerVisible(false);
          form.resetFields();
        }}
        open={drawerVisible}
        width={700} // ✅ make responsive
        styles={{
          body: { padding: 24 },
          header: {
            borderBottom: "1px solid #e5e7eb",
            padding: "16px 24px",
          },
        }}
        footer={
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                type="primary"
                className="flex-1 min-w-[150px] py-5"
                onClick={() => form.submit()}
              >
                Submit
              </Button>
              <Button
                className="flex-1 min-w-[150px] py-5"
                onClick={() => {
                  setDrawerVisible(false);
                  form.resetFields();
                }}
              >
                Not Now
              </Button>
            </div>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          requiredMark={false}
        >
          {/* ✅ Responsive grid: 1 col on mobile, 2 cols from md */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Form.Item
              label="New Staff Name"
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Full name" size="large" />
            </Form.Item>
            <Form.Item
              label="User ID"
              name="userId"
              rules={[{ required: true, message: "Please enter user ID" }]}
            >
              <Input placeholder="User ID" size="large" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Email address" size="large" />
            </Form.Item>
            <Form.Item
              label="Number"
              name="number"
              rules={[{ required: true, message: "Please enter number" }]}
            >
              <Input placeholder="Enter number" size="large" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Form.Item
              label="Discipline"
              name="discipline"
              rules={[{ required: true, message: "Please select discipline" }]}
            >
              <Select placeholder="Select discipline" size="large">
                <Select.Option value="Operation">Operation</Select.Option>
                <Select.Option value="Consultation">Consultation</Select.Option>
                <Select.Option value="Emergency">Emergency</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please enter role" }]}
            >
              <Select placeholder="Select role" size="large">
                <Select.Option value="Cleaner">Cleaner</Select.Option>
                <Select.Option value="Consultation">Consultation</Select.Option>
                <Select.Option value="Emergency">Emergency</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select gender" size="large">
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input placeholder="Address" size="large" />
            </Form.Item>
          </div>
        </Form>
      </Drawer>

      {/* Edit Staff Drawer */}
      <EditStaffDrawer
        visible={editStaffDrawer}
        onClose={handleEditStaffClose}
        onSave={handleEditStaffSubmit}
      />
    </div>
  );
};

export default AllStaff;
