/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Drawer,
  Form,
  Modal,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, EditFilled, PlusOutlined } from "@ant-design/icons";
import { ProductTab, SettingService } from "@/types/global";
import SettingServices from "../pages/clinic/Settings/SettingServices";
import CustomPagination from "../shared/CustomPagination";

interface ProductTabelProps {
  data: ProductTab[];
}

const { Title } = Typography;

const ProductTable: React.FC<ProductTabelProps> = ({ data }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
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
    <div>
      <Title level={4} color="#0B121B">
        Discipline
      </Title>
      {/* Search + Add Button */}
      <div className="flex items-center justify-between mb-6 gap-4 mt-4">
        <div className="w-full sm:w-[400px] lg:w-[625px]">
          <Input
            placeholder="Search discipline"
            allowClear
            size="large"
            addonAfter={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
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
      <SettingServices data={serviceData} />
      {/* New Discipline Drawer */}
      <Drawer
        title={
          <Title level={2} color="#0B121B" style={{ textAlign: "center" }}>
            Add New Discipline
          </Title>
        }
        closable={false}
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
        title={
          <Title level={2} color="##0B121B" style={{ textAlign: "center" }}>
            Edit Discipline
          </Title>
        }
        closable={false}
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
