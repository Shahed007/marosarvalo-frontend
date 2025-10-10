/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Select,
  Space,
  Drawer,
  Form,
  Radio,
  Modal,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import CustomPagination from "../shared/CustomPagination";
import editIcon from "@/assets/icons/editIcon.png";
import Image from "next/image";

// TypeScript interface for data
export interface Bond {
  id: string;
  name: string;
  discipline: string;
  services: string;
  sessions: number;
  price: string;
  status: "Active" | "Inactive";
}

interface BondTableProps {
  data: Bond[];
}

const BondTable: React.FC<BondTableProps> = ({ data }) => {
  const [statusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState<boolean>(false);
  const [, setEditingBond] = useState<Bond | null>(null);
  const pathName = usePathname();
  const hiddenClass = pathName.startsWith("/specillist") ? "hidden" : "";
  const hideUI = pathName.startsWith("/specillist");
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // ✅ Apply filters
  const filteredData = data.filter((record) => {
    // Status filter
    const statusMatch =
      statusFilter === "All" || record.status === statusFilter;

    // Search filter
    const searchLower = searchText.toLowerCase();
    const searchMatch =
      record.name.toLowerCase().includes(searchLower) ||
      record.discipline.toLowerCase().includes(searchLower) ||
      record.services.toLowerCase().includes(searchLower);

    return statusMatch && searchMatch;
  });

  // Calculate pagination values
  const totalRecords = filteredData.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRecords);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle new bond form submission
  const handleFormSubmit = (values: any) => {
    console.log("New bond form values:", values);
    Modal.success({
      title: "Success",
      content: "Bond added successfully!",
    });
    setDrawerVisible(false);
    form.resetFields();
  };

  // Handle edit bond form submission
  const handleEditFormSubmit = (values: any) => {
    console.log("Edit bond form values:", values);
    Modal.success({
      title: "Success",
      content: "Bond updated successfully!",
    });
    setEditDrawerVisible(false);
    setEditingBond(null);
    editForm.resetFields();
  };

  // Handle edit button click
  const handleEditClick = (record: Bond) => {
    setEditingBond(record);
    editForm.setFieldsValue({
      packageName: record.name,
      discipline: record.discipline,
      services: record.services,
      totalSessions: record.sessions,
      price: record.price,
      status: record.status,
    });
    setEditDrawerVisible(true);
  };

  // Table columns
  const columns: ColumnsType<Bond> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => (
        <span style={{ color: "#0B121B", fontWeight: 500 }}>{text}</span>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      render: (status: string) =>
        status === "Active" ? (
          <Tag
            color="#007A9C"
            style={{
              backgroundColor: "#E6F7FE",
              color: "#007A9C",
              padding: "8px 8px",
              borderRadius: "8px",
            }}
          >
            Active
          </Tag>
        ) : (
          <Tag
            color="#F45B69"
            style={{
              backgroundColor: "#FEF7F7",
              color: "#F45B69",
              padding: "8px 8px",
              borderRadius: "8px",
            }}
          >
            Inactive
          </Tag>
        ),
    },
    ...(!hideUI
      ? [
          {
            title: "Action",
            key: "action",
            render: (_: any, record: any) => (
              <Button
                type="default"
                icon={
                  <div className="flex items-center justify-center w-3 h-3">
                    <Image
                      src={editIcon}
                      alt="edit"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                }
                style={{ border: "1px solid #CCCCCC", padding: "10px 10px" }}
                size="small"
                onClick={() => handleEditClick(record)}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <div>
      {/* Search + Add Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-4">
        {/* Search Input */}
        <div className="w-full sm:w-[400px] lg:w-[625px]">
          <Input
            placeholder="Search patient or type"
            allowClear
            size="large"
            addonAfter={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Action Button */}
        <div className={`${hiddenClass} w-full sm:w-auto`}>
          <Button
            size="large"
            type="primary"
            className="w-full sm:w-auto"
            style={{ borderRadius: "12px" }}
            icon={<PlusOutlined />}
            onClick={() => setDrawerVisible(true)}
          >
            New Bond
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 16, display: "flex", gap: 12 }}></div>

      {/* Table */}
      <Table
        style={{
          borderRadius: "12px",
          overflow: "auto",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
        }}
        rowKey="id"
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

      {/* Custom Pagination - matches the screenshot design */}
      <CustomPagination
        currentPage={currentPage}
        total={data.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      {/* New Bond Drawer (Modal from right side) */}
      <Drawer
        title={
          <div className="text-[#0B121B] text-[30px] font-[500]">New Bonds</div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        closable={false}
        width={500}
        styles={{
          body: { padding: 24 },
          header: {
            borderBottom: "1px solid #e5e7eb",
            padding: "0 0 16px 0",
            width: "430px",
            margin: "0 auto",
        paddingTop: "16px",
          },
        }}
        footer={
          <div
            style={{
              textAlign: "center",
              padding: "16px 24px",
            }}
          >
            <Space className="flex flex-row sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full">
              <Button
                type="primary"
                size="large"
                onClick={() => form.submit()}
                className="w-full sm:w-[200px] rounded-[12px]"
              >
                Add Bond
              </Button>

              <Button
                size="large"
                onClick={() => setDrawerVisible(false)}
                className="w-full sm:w-[200px] rounded-[12px]"
              >
                Not Now
              </Button>
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
          <Form.Item
            label="Package Name"
            name="packageName"
            rules={[{ required: true, message: "Please enter package name" }]}
            className="text-[#0B121B] text-[20px] font-semibold"
          >
            <Input placeholder="Package name" />
          </Form.Item>

          <Form.Item
            label="Select Discipline"
            name="discipline"
            rules={[{ required: true, message: "Please select discipline" }]}
              className="text-[#0B121B] text-[20px] font-semibold"
          >
            <Select placeholder="Select discipline">
              <Select.Option value="Operation">Operation</Select.Option>
              <Select.Option value="Consultation">Consultation</Select.Option>
              <Select.Option value="Emergency">Emergency</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Services"
            name="services"
            rules={[{ required: true, message: "Please select service" }]}
              className="text-[#0B121B] text-[20px] font-semibold"
          >
            <Select placeholder="Select service">
              <Select.Option value="Surgery">Surgery</Select.Option>
              <Select.Option value="Therapy">Therapy</Select.Option>
              <Select.Option value="Diagnosis">Diagnosis</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Total Sessions"
            name="totalSessions"
            rules={[{ required: true, message: "Please enter total sessions" }]}
              className="text-[#0B121B] text-[20px] font-semibold"
          >
            <Input placeholder="e.g 10" type="number" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
              className="text-[#0B121B] text-[20px] font-semibold"
          >
            <Input placeholder="e.g $200" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
              className="text-[#0B121B] text-[20px] font-semibold"
          >
            <Radio.Group>
              <Radio value="Active">Active</Radio>
              <Radio value="Inactive">Inactive</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Drawer>

      {/* Edit Bond Drawer (Modal from right side) */}
      <Drawer
        title={
          <div className="text-center text-[30px] font-[500]">Edit Bond</div>
        }
        placement="right"
        onClose={() => {
          setEditDrawerVisible(false);
          setEditingBond(null);
        }}
        closable={false}
        open={editDrawerVisible}
        width={500}
        styles={{
          body: { padding: 24},
          header: { borderBottom: "1px solid #e5e7eb", padding: "16px 24px" },
        }}
        footer={
          <div
            style={{
              textAlign: "center",
              padding: "16px 24px",
            }}
          >
            <Space className="flex justify-center items-center gap-4">
              <div>
                <Button
                  size="large"
                  type="primary"
                  onClick={() => editForm.submit()}
                  className="w-full sm:w-[200px] rounded-[12px]"
                >
                  Save
                </Button>
              </div>
              <div>
                <Button
                  size="large"
                  onClick={() => {
                    setEditDrawerVisible(false);
                    setEditingBond(null);
                  }}
                  className="w-full sm:w-[200px] rounded-[12px]"
                >
                  Not Now
                </Button>
              </div>
            </Space>
          </div>
        }
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditFormSubmit}
          requiredMark={false}
        >
          <Form.Item
            label="Package Name"
            name="packageName"
            rules={[{ required: true, message: "Please enter package name" }]}
          >
            <Input placeholder="Package name" />
          </Form.Item>

          <Form.Item
            label="Select Discipline"
            name="discipline"
            rules={[{ required: true, message: "Please select discipline" }]}
          >
            <Select placeholder="Select discipline">
              <Select.Option value="Operation">Operation</Select.Option>
              <Select.Option value="Consultation">Consultation</Select.Option>
              <Select.Option value="Emergency">Emergency</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Services"
            name="services"
            rules={[{ required: true, message: "Please select service" }]}
          >
            <Select placeholder="Select service">
              <Select.Option value="Surgery">Surgery</Select.Option>
              <Select.Option value="Therapy">Therapy</Select.Option>
              <Select.Option value="Diagnosis">Diagnosis</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Total Sessions"
            name="totalSessions"
            rules={[{ required: true, message: "Please enter total sessions" }]}
          >
            <Input placeholder="e.g 10" type="number" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input placeholder="e.g $200" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Radio.Group>
              <Radio value="Active">Active</Radio>
              <Radio value="Inactive">Inactive</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Drawer>

      <style jsx global>{`
        /* Responsive Drawer width */
        .ant-drawer-right .ant-drawer-content-wrapper {
          width: 100% !important; /* Mobile: full width */
        }

        @media (min-width: 640px) {
          .ant-drawer-right .ant-drawer-content-wrapper {
            width: 400px !important; /* Small screens */
          }
        }

        @media (min-width: 1024px) {
          .ant-drawer-right .ant-drawer-content-wrapper {
            width: 500px !important; /* Large screens */
          }
        }
      `}</style>
    </div>
  );
};

export default BondTable;
