/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Drawer,
  Form,
  Modal,
  Typography,
  Tag,
  Dropdown,
  MenuProps,
  Space,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { AllStaffs } from "@/types/global";
import { BsThreeDotsVertical } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import EditStaffDrawer from "./EditStaffDrawer"; // Import the component
import CustomPagination from "@/components/shared/CustomPagination";

interface ProductTabelProps {
  data: AllStaffs[];
}

const { Title } = Typography;

const AllStaff: React.FC<ProductTabelProps> = ({ data }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [editStaffDrawer, setEditStaffDrawer] = useState(false);
  const [, setSelectedStaff] = useState<AllStaffs | null>(null);
  const router = useRouter();
  const [form] = Form.useForm();

  // Apply filters
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
  // const handlePageSizeChange = (size: number) => {
  //   setPageSize(size);
  //   setCurrentPage(1);
  // };

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

  //  Table columns for Staff Management
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
      render: (status: string) =>
        status === "Active" ? (
          <Tag color="#E6F7FE" className="!px-4 !py-1 !text-[#007A9C]">
            Active
          </Tag>
        ) : (
          <Tag color="#FEF7F7" className="!px-4 !py-1 !text-[#F45B69]">
            Inactive
          </Tag>
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
    <div className="!mt-[32px]">
      <Title level={4}>All Staff</Title>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 mt-[30px]">
        {/* Search input */}
        <div className="w-full sm:w-[400px] lg:w-[625px]">
          <Input
            placeholder="Search staff"
            allowClear
            size="large"
            addonAfter={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Add Staff button */}
        <Button
          type="primary"
          block
          style={{ borderRadius: "12px" }}
          className="!py-5 sm:!px-7 sm:!w-auto"
          icon={<PlusOutlined />}
          onClick={() => setDrawerVisible(true)}
        >
          Add Staff
        </Button>
      </div>

      {/* Table */}
      <Table
        className="!overflow-x-auto"
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
                  color: "#4180AB",
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

      {/* Custom pagination */}
      <CustomPagination
        currentPage={currentPage}
        total={data.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      {/* New Staff Drawer */}
      <Drawer
        title={
          <Title level={2} color="#0B121B" style={{ textAlign: "center" }}>
            Add Staff
          </Title>
        }
    
        closable={false}
        placement="right"
        onClose={() => {
          setDrawerVisible(false);
          form.resetFields();
        }}
        open={drawerVisible}
        width={650}
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
              textAlign: "center",
              padding: "16px 24px",
              width: "100%",
            }}
          >
            <Space
              className="flex flex-row sm:flex-row justify-center items-center gap-4 w-full"
              style={{ width: "100%" }}
            >
              <div className="w-full sm:w-auto">
                <Button
                  type="primary"
                  className="w-full sm:w-auto text-sm sm:text-base"
                  style={{
                    padding: "12px 16px",
                    minWidth: "200px",
                    height: "auto",
                    fontSize: "inherit",
                  }}
                  onClick={() => form.submit()}
                >
                  Submit
                </Button>
              </div>
              <div className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto text-sm sm:text-base"
                  style={{
                    padding: "12px 16px",
                    minWidth: "200px",
                    height: "auto",
                    fontSize: "inherit",
                  }}
                  onClick={() => setDrawerVisible(false)}
                >
                  Not Now
                </Button>
              </div>
            </Space>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input placeholder="Password" size="large" />
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
