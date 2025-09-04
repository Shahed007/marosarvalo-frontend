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
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { SettingService } from "@/types/global";

interface ProductTabelProps {
  data: SettingService[];
}

const { Title } = Typography;

const SettingServices: React.FC<ProductTabelProps> = ({ data }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState<boolean>(false);
  const [, setEditingService] = useState<SettingService | null>(null);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // ✅ Apply filters
  const filteredData = data.filter((record) => {
    // Search filter
    const searchLower = searchText.toLowerCase();
    const searchMatch =
      record.name.toLowerCase().includes(searchLower) ||
      record.discipline.toLowerCase().includes(searchLower) ||
      record.services.toLowerCase().includes(searchLower) ||
      record.price.toLowerCase().includes(searchLower);

    return searchMatch;
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

  // Handle new service form submission
  const handleFormSubmit = (values: any) => {
    console.log("New service form values:", values);
    Modal.success({
      title: "Success",
      content: "Service added successfully!",
    });
    setDrawerVisible(false);
    form.resetFields();
  };

  // Handle edit service form submission
  const handleEditFormSubmit = (values: any) => {
    console.log("Edit service form values:", values);
    Modal.success({
      title: "Success",
      content: "Service updated successfully!",
    });
    setEditDrawerVisible(false);
    setEditingService(null);
    editForm.resetFields();
  };

  // Handle edit button click
  const handleEditClick = (record: SettingService) => {
    setEditingService(record);
    editForm.setFieldsValue({
      discipline: record.discipline,
      serviceName: record.services,
      price: record.price,
      // Add lengthTime field if needed
    });
    setEditDrawerVisible(true);
  };

  // ✅ Table columns
  const columns: ColumnsType<SettingService> = [
    {
      title: "Discipline",
      dataIndex: "discipline",
      key: "discipline",
      align: "center",
    },
    {
      title: "Service Name",
      dataIndex: "services",
      key: "services",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Length & Time",
      key: "lengthTime",
      align: "center",
      render: () => <span>30 mins</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            paddingRight: "50px",
          }}
        >
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
        </div>
      ),
      align: "right",
      width: 100,
    },
  ];

  return (
    <div className="mt-20">
      <Title level={4}>Services</Title>
      {/* Search + Add Button */}
      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Search service"
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
          Add Service
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
        rowKey="name" // Using name as key since there's no id in SettingService
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

      {/* New Service Drawer */}
      <Drawer
        title="Add New Service"
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
                  Add Service
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
            label="Discipline"
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
            label="Service Name"
            name="serviceName"
            rules={[{ required: true, message: "Please enter service name" }]}
          >
            <Input placeholder="Service name" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input placeholder="e.g $200" />
          </Form.Item>

          <Form.Item
            label="Length & Time"
            name="lengthTime"
            rules={[{ required: true, message: "Please enter length & time" }]}
          >
            <Input placeholder="e.g 30 minutes" />
          </Form.Item>
        </Form>
      </Drawer>

      {/* Edit Service Drawer */}
      <Drawer
        title="Edit Service"
        placement="right"
        onClose={() => {
          setEditDrawerVisible(false);
          setEditingService(null);
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
                    setEditingService(null);
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
            label="Discipline"
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
            label="Service Name"
            name="serviceName"
            rules={[{ required: true, message: "Please enter service name" }]}
          >
            <Input placeholder="Service name" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input placeholder="e.g $200" />
          </Form.Item>

          <Form.Item
            label="Length & Time"
            name="lengthTime"
            rules={[{ required: true, message: "Please enter length & time" }]}
          >
            <Input placeholder="e.g 30 minutes" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default SettingServices;
