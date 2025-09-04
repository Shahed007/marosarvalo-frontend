"use client";
import { useState } from "react";
import { Input, Button, Select, Typography, Space, Card } from "antd";
import {
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const invoiceData = [
  {
    id: "#FA65665",
    name: "Jhon Wick",
    email: "jhon32@gmail.com",
    product: "Xyz",
    type: "Services",
    due: "$00",
    paid: "$120",
  },
  {
    id: "#FA65665",
    name: "Jhon Wick",
    email: "jhon32@gmail.com",
    product: "Xyz",
    type: "Services",
    due: "$00",
    paid: "$120",
  },
  {
    id: "#FA65665",
    name: "Jhon Wick",
    email: "jhon32@gmail.com",
    product: "Xyz",
    type: "Services",
    due: "$00",
    paid: "$120",
  },
  {
    id: "#FA65665",
    name: "Jhon Wick",
    email: "jhon32@gmail.com",
    product: "Xyz",
    type: "Services",
    due: "$00",
    paid: "$120",
  },
];

export default function ReceiptHistory() {
  const [pageSize, setPageSize] = useState("10");

  return (
    <div>
      {/* Header */}
      <Title level={2} style={{ marginBottom: 32, color: "#262626" }}>
        Billing & Payments
      </Title>

      {/* Search Bar */}
      <div style={{ marginBottom: 24 }} className="!flex justify-between">
        {/* Receipt History Tab */}
        <div style={{ marginBottom: 24 }}>
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
        </div>

        <div>
          <Input
            placeholder="Search by id"
            suffix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
            style={{ width: 600, padding: 8 }}
          />
        </div>
      </div>

      {/* Invoice List */}
      <div style={{ marginBottom: 32 }}>
        {invoiceData.map((invoice, index) => (
          <Card
            key={index}
            style={{
              marginBottom: 16,
              border: "1px solid #f0f0f0",
              borderRadius: 8,
            }}
            bodyStyle={{ padding: 16 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{ display: "flex", gap: 32, alignItems: "flex-start" }}
                >
                  <div style={{ minWidth: 0 }}>
                    <Text
                      type="secondary"
                      style={{
                        display: "block",
                        marginBottom: 8,
                        fontSize: 12,
                      }}
                    >
                      Invoice ID: {invoice.id}
                    </Text>
                    <Text
                      strong
                      style={{
                        display: "block",
                        marginBottom: 8,
                        fontSize: 14,
                      }}
                    >
                      Name: {invoice.name}
                    </Text>
                    <Text
                      type="secondary"
                      style={{
                        display: "block",
                        marginBottom: 8,
                        fontSize: 12,
                      }}
                    >
                      Email: {invoice.email}
                    </Text>
                    <Space size={24}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Product: {invoice.product}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Type: {invoice.type}
                      </Text>
                    </Space>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 32,
                      marginLeft: "auto",
                      marginRight: 32,
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <Text
                        type="secondary"
                        style={{
                          display: "block",
                          marginBottom: 4,
                          fontSize: 12,
                        }}
                      >
                        Due
                      </Text>
                      <Text strong style={{ fontSize: 14 }}>
                        {invoice.due}
                      </Text>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Text
                        type="secondary"
                        style={{
                          display: "block",
                          marginBottom: 4,
                          fontSize: 12,
                        }}
                      >
                        Paid
                      </Text>
                      <Text strong style={{ fontSize: 14 }}>
                        {invoice.paid}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                type="default"
                size="small"
                icon={<EyeOutlined />}
                style={{ marginLeft: 16, background: "transparent" }}
              >
                View details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Showing
          </Text>
          <Select
            defaultValue="10"
            value={pageSize}
            onChange={setPageSize}
            style={{ width: 80 }}
            size="small"
          >
            <Option value="10">10</Option>
            <Option value="25">25</Option>
            <Option value="50">50</Option>
          </Select>
        </Space>

        <Space size={16}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Showing 1 to 10 out of 60 records
          </Text>

          <Space size={4}>
            <Button
              type="default"
              size="small"
              icon={<LeftOutlined />}
              style={{ width: 32, height: 32, background: "transparent" }}
            />
            <Button
              type="primary"
              size="small"
              style={{ width: 32, height: 32 }}
            >
              1
            </Button>
            <Button
              type="default"
              size="small"
              style={{ width: 32, height: 32, background: "transparent" }}
            >
              2
            </Button>
            <Button
              type="default"
              size="small"
              style={{ width: 32, height: 32, background: "transparent" }}
            >
              3
            </Button>
            <Button
              type="default"
              size="small"
              style={{ width: 32, height: 32, background: "transparent" }}
            >
              4
            </Button>
            <Button
              type="default"
              size="small"
              icon={<RightOutlined />}
              style={{ width: 32, height: 32, background: "transparent" }}
            />
          </Space>
        </Space>
      </div>
    </div>
  );
}
