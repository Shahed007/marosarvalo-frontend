/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Row,
  Col,
  Drawer,
  Form,
  Modal,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, EditFilled, PlusOutlined } from "@ant-design/icons";
import { SettingService } from "@/types/global";
import CustomPagination from "@/components/shared/CustomPagination";

interface ProductTabelProps {
  data: SettingService[];
}

const { Title } = Typography;

// Service options by discipline
const serviceOptions = {
  Operation: [
    {
      value: "surgery",
      label: "Surgery (0.9 - $1000)",
      price: "1000",
      lengthTime: "02:00",
    },
    {
      value: "minor_surgery",
      label: "Minor Surgery (0.7 - $600)",
      price: "600",
      lengthTime: "01:00",
    },
    {
      value: "post_op",
      label: "Post-Op Care (0.5 - $300)",
      price: "300",
      lengthTime: "00:30",
    },
  ],
  Consultation: [
    {
      value: "general",
      label: "General Consultation (0.6 - $200)",
      price: "200",
      lengthTime: "00:30",
    },
    {
      value: "specialist",
      label: "Specialist Consultation (0.8 - $400)",
      price: "400",
      lengthTime: "00:45",
    },
    {
      value: "follow_up",
      label: "Follow-up (0.4 - $150)",
      price: "150",
      lengthTime: "00:20",
    },
  ],
  Emergency: [
    {
      value: "emergency_visit",
      label: "Emergency Visit (1.0 - $800)",
      price: "800",
      lengthTime: "01:30",
    },
    {
      value: "urgent_care",
      label: "Urgent Care (0.9 - $600)",
      price: "600",
      lengthTime: "01:00",
    },
    {
      value: "triage",
      label: "Triage (0.3 - $100)",
      price: "100",
      lengthTime: "00:15",
    },
  ],
};

const SettingServices: React.FC<ProductTabelProps> = ({ data }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState<boolean>(false);
  const [, setEditingService] = useState<SettingService | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [, setSelectedService] = useState<string>("");

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

  // Handle discipline change
  const handleDisciplineChange = (value: string) => {
    setSelectedDiscipline(value);
    setSelectedService("");
    form.setFieldsValue({ service: "", price: "", lengthTime: "" });
  };

  // Handle service change
  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    if (selectedDiscipline && value) {
      const service = serviceOptions[
        selectedDiscipline as keyof typeof serviceOptions
      ].find((s) => s.value === value);
      if (service) {
        form.setFieldsValue({
          price: service.price,
          lengthTime: service.lengthTime,
        });
      }
    }
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
    setSelectedDiscipline("");
    setSelectedService("");
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
      lengthTime: "30 mins",
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
      <div className="flex items-center justify-between mb-6 mt-4">
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
        rowKey="name"
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

      {/* Custom Pagination */}
      {/* Custom pagination */}
      <CustomPagination
        currentPage={currentPage}
        total={data.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      {/* New Service Drawer */}
      <Drawer
        title={
          <Title level={2} color="#0B121B" style={{ textAlign: "center" }}>
            Add Service
          </Title>
        }
        closable={false}
        placement="right"
        onClose={() => {
          setDrawerVisible(false);
          setSelectedDiscipline("");
          setSelectedService("");
          form.resetFields();
        }}
        open={drawerVisible}
        width={698}
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
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              <Button
                type="primary"
                style={{
                  padding: "20px 40px",
                  flex: "1 1 200px",
                  minWidth: "150px",
                }}
                onClick={() => form.submit()}
              >
                Add Now
              </Button>
              <Button
                style={{
                  padding: "20px 40px",
                  flex: "1 1 200px",
                  minWidth: "150px",
                }}
                onClick={() => {
                  setDrawerVisible(false);
                  setSelectedDiscipline("");
                  setSelectedService("");
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
          <Form.Item
            label="Discipline"
            name="discipline"
            rules={[{ required: true, message: "Please select discipline" }]}
          >
            <Select
              placeholder="Select Discipline"
              onChange={handleDisciplineChange}
              size="large"
            >
              <Select.Option value="Operation">Operation</Select.Option>
              <Select.Option value="Consultation">Consultation</Select.Option>
              <Select.Option value="Emergency">Emergency</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Service"
            name="service"
            rules={[{ required: true, message: "Please select service" }]}
          >
            <Select
              placeholder="Select Service"
              onChange={handleServiceChange}
              disabled={!selectedDiscipline}
              size="large"
            >
              {selectedDiscipline &&
                serviceOptions[
                  selectedDiscipline as keyof typeof serviceOptions
                ].map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Length & Time" name="lengthTime">
                <Input placeholder="00:00" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Price" name="price">
                <Input placeholder="0.00" size="large" prefix="$" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      {/* Edit Service Drawer */}
      <Drawer
        title={
          <Title level={2} color="#0B121B" style={{ textAlign: "center" }}>
            Edit Service
          </Title>
        }
        placement="right"
        onClose={() => {
          setEditDrawerVisible(false);
          setEditingService(null);
        }}
        closable={false}
        open={editDrawerVisible}
        width={698}
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
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              <Button
                type="primary"
                style={{
                  padding: "20px 40px",
                  flex: "1 1 200px",
                  minWidth: "150px",
                }}
                onClick={() => editForm.submit()}
              >
                Save
              </Button>
              <Button
                style={{
                  padding: "20px 40px",
                  flex: "1 1 200px",
                  minWidth: "150px",
                }}
                onClick={() => {
                  setEditDrawerVisible(false);
                  setEditingService(null);
                }}
              >
                Not Now
              </Button>
            </div>
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

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <Input placeholder="e.g $200" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Length & Time"
                name="lengthTime"
                rules={[
                  { required: true, message: "Please enter length & time" },
                ]}
              >
                <Input placeholder="e.g 30 minutes" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      <style jsx global>{`
        .ant-card.ant-card-bordered {
          border: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default SettingServices;
