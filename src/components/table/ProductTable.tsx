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
import {ProductTab, SettingService } from "@/types/global";
import SettingServices from "../pages/clinic/Settings/SettingServices";

interface ProductTabelProps {
  data: ProductTab[];
}

const { Title } = Typography;

const ProductTable: React.FC<ProductTabelProps> = ({ data }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState<boolean>(false);
  const [, setEditingProduct] = useState<ProductTab | null>(null);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // ✅ Apply filters
  const filteredData = data.filter((record) => {
    // Search filter
    const searchLower = searchText.toLowerCase();
    const searchMatch =
      record.id.toLowerCase().includes(searchLower) ||
      record.discipline.toLowerCase().includes(searchLower);

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

  // Handle new product form submission
  const handleFormSubmit = (values: any) => {
    console.log("New product form values:", values);
    Modal.success({
      title: "Success",
      content: "Discipline added successfully!",
    });
    setDrawerVisible(false);
    form.resetFields();
  };

  // Handle edit product form submission
  const handleEditFormSubmit = (values: any) => {
    console.log("Edit product form values:", values);
    Modal.success({
      title: "Success",
      content: "Discipline updated successfully!",
    });
    setEditDrawerVisible(false);
    setEditingProduct(null);
    editForm.resetFields();
  };

  // Handle edit button click
  const handleEditClick = (record: ProductTab) => {
    setEditingProduct(record);
    editForm.setFieldsValue({
      discipline: record.discipline,
    });
    setEditDrawerVisible(true);
  };

  // ✅ Table columns
  const columns: ColumnsType<ProductTab> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "left",
      className: "table-id-column",
      render: (text: string) => (
        <span style={{ color: "#0B121B", fontWeight: 500 }}>{text}</span>
      ),
    },
    {
      title: "Discipline",
      dataIndex: "discipline",
      key: "discipline",
      align: "center",
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
const serviceData: SettingService[] = [
  {
    name: "Premium Package",
    discipline: "Operation",
    services: "Surgery",
    price: "$250",
  },
  {
    name: "Standard Package",
    discipline: "Operation",
    services: "Surgery",
    price: "$200",
  },
  {
    name: "Trial Package",
    discipline: "Operation",
    services: "Surgery",
    price: "$100",
  },
];
  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
      <Title level={4}>Discipline</Title>
      {/* Search + Add Button */}
      <div className="flex items-center justify-between mb-6">
        <Input
          placeholder="Search discipline"
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
          Add Discipline
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
        <SettingServices data={serviceData}/>
      {/* New Discipline Drawer */}
      <Drawer
        title="Add New Discipline"
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
                  Add Discipline
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
            label="Discipline Name"
            name="discipline"
            rules={[
              { required: true, message: "Please enter discipline name" },
            ]}
          >
            <Input placeholder="Discipline name" />
          </Form.Item>
        </Form>
      </Drawer>

      {/* Edit Discipline Drawer */}
      <Drawer
        title="Edit Discipline"
        placement="right"
        onClose={() => {
          setEditDrawerVisible(false);
          setEditingProduct(null);
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
                    setEditingProduct(null);
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
            label="Discipline Name"
            name="discipline"
            rules={[
              { required: true, message: "Please enter discipline name" },
            ]}
          >
            <Input placeholder="Discipline name" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ProductTable;
