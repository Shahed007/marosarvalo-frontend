/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Tabs,
  Radio,
  Input,
  Button,
  Select,
  Form,
  Table,
  Tag,
  Space,
  Card,
  Typography,
  Descriptions,
  Pagination,
  DatePicker,
  Drawer,
} from "antd";
import { SendOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

interface CommunicationRecord {
  key: string;
  patientName: string;
  communicationType: string;
  subject: string;
  sentDateTime: string;
  status: "Delivered" | "Sent" | "Failed";
  message?: string;
  recipientGroup?: string;
  time?: string;
}

const mockData: CommunicationRecord[] = [
  {
    key: "1",
    patientName: "Emily Carter",
    communicationType: "WhatsApp",
    subject: "Appointment Reminder",
    sentDateTime: "2024-07-26 10:00 AM",
    status: "Delivered",
    message:
      "Hello Emily! I hope you're doing well. I just want to remind you that today is your appointment for Brain Surgery with Dr. Lee at 05:00 PM. Please stay on time. Thank you!",
    recipientGroup: "Surgery",
    time: "12 April, 2025 12:00 AM",
  },
  {
    key: "2",
    patientName: "Lucas Bennett",
    communicationType: "SMS",
    subject: "Follow-up Exercise Plan",
    sentDateTime: "2024-07-25 03:30 PM",
    status: "Sent",
  },
  {
    key: "3",
    patientName: "Chloe Foster",
    communicationType: "WhatsApp",
    subject: "Payment Confirmation",
    sentDateTime: "2024-07-24 11:45 AM",
    status: "Sent",
  },
  {
    key: "4",
    patientName: "Owen Harper",
    communicationType: "Email",
    subject: "Initial Consultation Details",
    sentDateTime: "2024-07-23 09:15 AM",
    status: "Delivered",
  },
];

export default function PatientCommunication() {
  const [form] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState<CommunicationRecord | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Control drawer visibility

  const columns: ColumnsType<CommunicationRecord> = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (text) => (
        <Text strong style={{ color: "#1890ff" }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Communication Type",
      dataIndex: "communicationType",
      key: "communicationType",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Sent Date/Time",
      dataIndex: "sentDateTime",
      key: "sentDateTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Delivered" ? "green" : status === "Sent" ? "blue" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedRecord(record);
            setIsDrawerVisible(true);
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission
  };

  const ComposeTab = () => (
    <div style={{ margin: "0 auto", padding: "" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Title level={4}>Select Communication Channel</Title>
        <Form.Item name="channel" initialValue="email">
          <Radio.Group>
            <Radio value="email">Email</Radio>
            <Radio value="sms">SMS</Radio>
            <Radio value="whatsapp">WhatsApp</Radio>
          </Radio.Group>
        </Form.Item>

        <Title level={4}>Compose Message</Title>
        <Form.Item
          label="Subject:"
          name="subject"
          rules={[{ required: true, message: "Please enter subject" }]}
        >
          <Input placeholder="Enter Subject" />
        </Form.Item>

        <Title level={4}>Message</Title>
        <Form.Item
          name="message"
          rules={[{ required: true, message: "Please enter message" }]}
        >
          <TextArea rows={6} placeholder="Write message here" style={{ resize: "none" }} />
        </Form.Item>

        <Title level={4}>Recipient</Title>
        <Space style={{ width: "100%", marginBottom: 16 }}>
          <Form.Item name="patientGroup" style={{ width: 200 }}>
            <Select placeholder="Select Patient group">
              <Option value="surgery">Surgery</Option>
              <Option value="cardiology">Cardiology</Option>
              <Option value="pediatrics">Pediatrics</Option>
              <Option value="orthopedics">Orthopedics</Option>
            </Select>
          </Form.Item>
          <Form.Item name="specificPatient" style={{ width: 200 }}>
            <Select placeholder="Select Specific Patient">
              <Option value="emily">Emily Carter</Option>
              <Option value="lucas">Lucas Bennett</Option>
              <Option value="chloe">Chloe Foster</Option>
              <Option value="owen">Owen Harper</Option>
            </Select>
          </Form.Item>
        </Space>

        <Title level={4}>Schedule</Title>
        <Form.Item name="schedule" initialValue="immediate">
          <Radio.Group>
            <Radio value="immediate">
              <Button type="default" style={{ marginRight: 8 }}>
                Send Immediately
              </Button>
            </Radio>
            <Radio value="scheduled">
              <DatePicker showTime placeholder="Select Date and Time" style={{ marginLeft: 8 }} />
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SendOutlined />}
            size="large"
            style={{
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            Send Communication
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  const HistoryTab = () => (
    <div style={{ padding: "20px" }}>
      {/* Search Bar */}
      <Input
        placeholder="Search by name"
        prefix={<SearchOutlined />}
        style={{ marginBottom: 20, maxWidth: 300 }}
      />

      {/* Table */}
      <Table columns={columns} dataSource={mockData} pagination={false} style={{ marginBottom: 20 }} />

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Space>
          <Text>Showing</Text>
          <Select defaultValue={10} style={{ width: 60 }}>
            <Option value={10}>10</Option>
            <Option value={25}>25</Option>
            <Option value={50}>50</Option>
          </Select>
          <Text>entries</Text>
        </Space>
        <Space>
          <Text>Showing 1 to 10 out of 60 records</Text>
          <Pagination current={1} total={60} pageSize={10} showSizeChanger={false} size="small" />
        </Space>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "", backgroundColor: "", padding: "" }}>
      <div style={{  margin: "0 auto" }}>
        <Card>
          <Tabs defaultActiveKey="compose" size="large">
            <TabPane tab="Compose" key="compose">
              <ComposeTab />
            </TabPane>
            <TabPane tab="History" key="history">
              <HistoryTab />
            </TabPane>
          </Tabs>
        </Card>
      </div>

      {/* Right Sidebar (Drawer) */}
  <Drawer
  title={
    <Space>
      <Text className="text-center" strong style={{ fontSize: "26px",alignItems: "center" }}>
        Compose Info
      </Text>
    </Space>
  }
  placement="right"
  width={600}
  closable={true}
  onClose={() => setIsDrawerVisible(false)}
  open={isDrawerVisible}
  maskClosable={true}
  style={{
    borderRadius: "8px 0 0 8px",
    boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
  }}
>
  {selectedRecord ? (
    <div className="p-6 space-y-4">
      {/* Patient Name & Communication Channel */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Text type="secondary" className="text-xs">Patient Name:</Text>
          <Text strong className="block mt-1">{selectedRecord.patientName}</Text>
        </div>
        <div>
          <Text type="secondary" className="text-xs">Communication Channel:</Text>
          <Text strong className="block mt-1">{selectedRecord.communicationType}</Text>
        </div>
      </div>

      {/* Subject & Recipient Group */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Text type="secondary" className="text-xs">Subject:</Text>
          <Text strong className="block mt-1">{selectedRecord.subject}</Text>
        </div>
        <div>
          <Text type="secondary" className="text-xs">Recipient Group:</Text>
          <Text strong className="block mt-1">{selectedRecord.recipientGroup || "N/A"}</Text>
        </div>
      </div>

      {/* Status & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Text type="secondary" className="text-xs">Status:</Text>
          <Tag
            color={
              selectedRecord.status === "Delivered"
                ? "green"
                : selectedRecord.status === "Sent"
                ? "blue"
                : "red"
            }
            className="mt-1"
          >
            {selectedRecord.status}
          </Tag>
        </div>
        <div>
          <Text type="secondary" className="text-xs">Time:</Text>
          <Text strong className="block mt-1">
            {selectedRecord.time || selectedRecord.sentDateTime}
          </Text>
        </div>
      </div>

      {/* Message */}
      <div>
        <Text type="secondary" className="text-xs">Message:</Text>
        <Text className="block mt-1 text-sm leading-relaxed">
          {selectedRecord.message || "No message content available."}
        </Text>
      </div>

      {/* Buttons */}
    <div className="flex flex-col h-full">
  <div className="flex-1 overflow-y-auto">
    {/* All your content here — patient info, message, etc. */}
  </div>

  <div className="flex gap-3 w-full pt-4 border-t border-gray-200 absolute bottom-4">
        <button

      className="flex-1 bg-[#225A7F] text-white px-4 py-2 rounded-md font-medium"
    >
      Delete
    </button>
    <Button
      type="default"
      onClick={() => setIsDrawerVisible(false)}
      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md font-medium"
    >
      Close
    </Button>

  </div>
</div>
    </div>
  ) : null}
</Drawer>
    </div>
  );
}




  // <ReminderTable loading={loading} data={mockData} />


