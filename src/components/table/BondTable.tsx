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
  Row,
  Col,
  Drawer,
  Form,
  Radio,
  Modal,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons";

// ✅ TypeScript interface for data
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
  const [pageSize, setPageSize] = useState<number>(10);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState<boolean>(false);
  const [, setEditingBond] = useState<Bond | null>(null);

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

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
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

  // ✅ Table columns
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="default"
          icon={<EditFilled className="hover:text-[#225A7F]" />}
          style={{
            border: "1px solid #CCCCCC",
            padding: "6px 10px",
          }}
          size="small"
          onClick={() => handleEditClick(record)}
        />
      ),
    },
  ];

  return (
    <div>
      {/* Search + Add Button */}
      <div className="sm:!flex flex-row items-center justify-between mb-6">
        <div>
          <Input
          placeholder="Search by name, discipline, or service"
          suffix={<SearchOutlined className="cursor-pointer" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ borderRadius: "12px" }}
          allowClear
          className="!px-2 !py-2 !w-[320px] !sm:w-[700px]"
        />
        </div>
        <div>
          <Button
          type="primary"
          style={{ borderRadius: "12px" }}
          className="!px-7 !py-5 !mt-2"
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
          overflow: "hidden",
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

      {/* New Bond Drawer (Modal from right side) */}
      <Drawer
        title="New Bonds"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={500}
        styles={{
          body: { padding: 24 },
          header: { borderBottom: "1px solid #e5e7eb", padding: "16px 24px" },
        }}
        footer={
          <div
            style={{
              textAlign: "right",
              padding: "16px 24px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Space className="flex justify-center items-center gap-4">
              <div>
                <Button
                  type="primary"
                  style={{ padding: "20px 70px" }}
                  onClick={() => form.submit()}
                >
                  Add Bond
                </Button>
              </div>
              <div>
                <Button
                  style={{ padding: "20px 70px" }}
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

      {/* Edit Bond Drawer (Modal from right side) */}
      <Drawer
        title="Edit Bond"
        placement="right"
        onClose={() => {
          setEditDrawerVisible(false);
          setEditingBond(null);
        }}
        open={editDrawerVisible}
        width={500}
        styles={{
          body: { padding: 24 },
          header: { borderBottom: "1px solid #e5e7eb", padding: "16px 24px" },
        }}
        footer={
          <div
            style={{
              textAlign: "right",
              padding: "16px 24px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Space className="flex justify-center items-center gap-4">
              <div>
                <Button
                  style={{ padding: "20px 70px" }}
                  type="primary"
                  onClick={() => editForm.submit()}
                >
                  Save
                </Button>
              </div>
              <div>
                <Button
                  style={{ padding: "20px 70px" }}
                  onClick={() => {
                    setEditDrawerVisible(false);
                    setEditingBond(null);
                  }}
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
    </div>
  );
};

export default BondTable;
