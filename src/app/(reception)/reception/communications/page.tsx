/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
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
} from "antd"
import { SendOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

const { TabPane } = Tabs
const { TextArea } = Input
const { Title, Text } = Typography
const { Option } = Select

interface CommunicationRecord {
  key: string
  patientName: string
  communicationType: string
  subject: string
  sentDateTime: string
  status: "Delivered" | "Sent" | "Failed"
  message?: string
  recipientGroup?: string
  time?: string
}

const mockData: CommunicationRecord[] = [
  {
    key: "1",
    patientName: "Emily Carter",
    communicationType: "Email",
    subject: "Appointment Reminder",
    sentDateTime: "2024-07-26 10:00 AM",
    status: "Delivered",
    message:
      "Hello Emily! I hope you're doing well I just want to remind you that today is your appoint for Brain Surgery with DR. Liee at 05:00Pm. Please stay in time Thank you!",
    recipientGroup: "Surgery",
    time: "12april, 2025 12:00Am",
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
]

export default function PatientCommunication() {
  const [form] = Form.useForm()
  const [selectedRecord, setSelectedRecord] = useState<CommunicationRecord | null>(null)
  const [showDetails, setShowDetails] = useState(false)

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
        <Tag color={status === "Delivered" ? "green" : status === "Sent" ? "blue" : "red"}>{status}</Tag>
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
            setSelectedRecord(record)
            setShowDetails(true)
          }}
        >
          View Details
        </Button>
      ),
    },
  ]

  const onFinish = (values: any) => {
    console.log("Form values:", values)
    // Handle form submission
  }

  const ComposeTab = () => (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Title level={4}>Select Communication Channel</Title>
        <Form.Item name="channel" initialValue="email">
          <Radio.Group>
            <Radio value="email">Email</Radio>
            <Radio value="sms">SMS</Radio>
            <Radio value="whatsapp">Whatsapp</Radio>
          </Radio.Group>
        </Form.Item>

        <Title level={4}>Compose Message</Title>
        <Form.Item label="Subject:" name="subject" rules={[{ required: true, message: "Please enter subject" }]}>
          <Input placeholder="Enter Subject" />
        </Form.Item>

        <Title level={4}>Message</Title>
        <Form.Item name="message" rules={[{ required: true, message: "Please enter message" }]}>
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
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            Send Communication
          </Button>
        </Form.Item>
      </Form>
    </div>
  )

  const HistoryTab = () => (
    <div style={{ padding: "20px" }}>
      {showDetails && selectedRecord ? (
        <Card
          title={
            <Space>
              <Button type="link" onClick={() => setShowDetails(false)} style={{ padding: 0 }}>
                ← Back to History
              </Button>
              <Text>Communication Details</Text>
            </Space>
          }
          style={{ marginBottom: 20 }}
        >
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Patient Name">{selectedRecord.patientName}</Descriptions.Item>
            <Descriptions.Item label="Communication Channel">{selectedRecord.communicationType}</Descriptions.Item>
            <Descriptions.Item label="Subject">{selectedRecord.subject}</Descriptions.Item>
            <Descriptions.Item label="Recipient Group">{selectedRecord.recipientGroup || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={selectedRecord.status === "Delivered" ? "green" : "blue"}>{selectedRecord.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Time">{selectedRecord.time || selectedRecord.sentDateTime}</Descriptions.Item>
            <Descriptions.Item label="Message" span={2}>
              {selectedRecord.message || "No message content available"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : (
        <>
          <Input placeholder="Search by name" prefix={<SearchOutlined />} style={{ marginBottom: 20, maxWidth: 300 }} />

          <Table columns={columns} dataSource={mockData} pagination={false} style={{ marginBottom: 20 }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Space>
              <Text>Showing</Text>
              <Select defaultValue={10} style={{ width: 60 }}>
                <Option value={10}>10</Option>
                <Option value={25}>25</Option>
                <Option value={50}>50</Option>
              </Select>
            </Space>
            <Space>
              <Text>Showing 1 to 10 out of 60 records</Text>
              <Pagination current={1} total={60} pageSize={10} showSizeChanger={false} size="small" />
            </Space>
          </div>
        </>
      )}
    </div>
  )

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "20px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
    </div>
  )
}
