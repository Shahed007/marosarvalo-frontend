"use client";
import { useState } from "react";
import { Input, Button, Select, Typography, Space, Card, Row, Col } from "antd";
import { SearchOutlined, LeftOutlined, RightOutlined, EyeOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const invoiceData = [
  { id: "#FA65665", name: "Jhon Wick", email: "jhon32@gmail.com", product: "Xyz", type: "Services", due: "$00", paid: "$120" },
  { id: "#FA65665", name: "Jhon Wick", email: "jhon32@gmail.com", product: "Xyz", type: "Services", due: "$00", paid: "$120" },
  { id: "#FA65665", name: "Jhon Wick", email: "jhon32@gmail.com", product: "Xyz", type: "Services", due: "$00", paid: "$120" },
  { id: "#FA65665", name: "Jhon Wick", email: "jhon32@gmail.com", product: "Xyz", type: "Services", due: "$00", paid: "$120" },
];

export default function ReceiptHistory() {
  const [pageSize, setPageSize] = useState("10");

  return (
    <div style={{ padding: "16px", marginBottom: "30px" }}>
      {/* Header */}
      <Title level={2} style={{ marginBottom: 32, color: "#262626" }}>
        Billing & Payments
      </Title>

      {/* Search Bar */}
      <Row gutter={[16, 16]} justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          <span
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#262626",
              borderBottom: "5px solid #225A7F",
              paddingBottom: 4,
              display: "inline-block",
            }}
          >
            Receipt History
          </span>
        </Col>
        <Col xs={24} sm={12}>
          <Input
            placeholder="Search by id"
            suffix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      {/* Invoice List */}
      <div style={{ marginBottom: 32 }}>
        {invoiceData.map((invoice, index) => (
          <Card
            key={index}
            style={{ marginBottom: 16, border: "1px solid #f0f0f0", borderRadius: 8 }}
            bodyStyle={{ padding: 16 }}
          >
            <Row gutter={[16, 16]} align="middle">
              {/* Invoice Info */}
              <Col xs={24} md={16}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Invoice ID: {invoice.id}</Text>
                  <Text strong style={{ fontSize: 14 }}>Name: {invoice.name}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>Email: {invoice.email}</Text>
                  <Space size={16}>
                    <Text type="secondary" style={{ fontSize: 12 }}>Product: {invoice.product}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>Type: {invoice.type}</Text>
                  </Space>
                </Space>
              </Col>

              {/* Payment Info */}
              <Col xs={24} md={6}>
                <Row justify="space-around">
                  <Col>
                    <Text type="secondary" style={{ fontSize: 12 }}>Due</Text>
                    <Text strong style={{ fontSize: 14 }}>{invoice.due}</Text>
                  </Col>
                  <Col>
                    <Text type="secondary" style={{ fontSize: 12 }}>Paid</Text>
                    <Text strong style={{ fontSize: 14 }}>{invoice.paid}</Text>
                  </Col>
                </Row>
              </Col>

              {/* Action */}
              <Col xs={24} md={2} style={{ textAlign: "right" }}>
                <Button type="default" size="small" icon={<EyeOutlined />} style={{ background: "transparent" }}>
                  View details
                </Button>
              </Col>
            </Row>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={8}>
          <Space>
            <Text type="secondary" style={{ fontSize: 12 }}>Showing</Text>
            <Select defaultValue="10" value={pageSize} onChange={setPageSize} style={{ width: 80 }} size="small">
              <Option value="10">10</Option>
              <Option value="25">25</Option>
              <Option value="50">50</Option>
            </Select>
          </Space>
        </Col>
        <Col xs={24} sm={16} style={{ marginTop: 8 }}>
          <Row justify="end" gutter={8} wrap>
            <Col>
              <Text type="secondary" style={{ fontSize: 12 }}>Showing 1 to 10 out of 60 records</Text>
            </Col>
            <Col>
              <Space size={4}>
                <Button type="default" size="small" icon={<LeftOutlined />} />
                <Button type="primary" size="small">1</Button>
                <Button type="default" size="small">2</Button>
                <Button type="default" size="small">3</Button>
                <Button type="default" size="small">4</Button>
                <Button type="default" size="small" icon={<RightOutlined />} />
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
