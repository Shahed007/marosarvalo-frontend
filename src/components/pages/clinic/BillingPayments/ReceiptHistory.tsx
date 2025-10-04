"use client";
import { useState } from "react";
import { Input, Button, Typography, Space, Card, Row, Col, Empty } from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import CustomPagination from "@/components/shared/CustomPagination";

const { Title, Text } = Typography;

// Sample data
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
    id: "#FA65666",
    name: "Alice Johnson",
    email: "alice.j@gmail.com",
    product: "ABC Kit",
    type: "Product",
    due: "$50",
    paid: "$50",
  },
  {
    id: "#FA65667",
    name: "Robert Chen",
    email: "robertc@example.com",
    product: "Consultation",
    type: "Services",
    due: "$100",
    paid: "$0",
  },
  {
    id: "#FA65668",
    name: "Emma Davis",
    email: "emma.d@domain.com",
    product: "Dental X-Ray",
    type: "Service",
    due: "$40",
    paid: "$40",
  },
];

export default function ReceiptHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // 🔍 Filter invoices based on search query
  const filteredInvoices = invoiceData.filter((invoice) =>
    Object.values(invoice).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8" style={{ marginBottom: "30px" }}>
      {/* Header */}
      <Title level={2} style={{ marginBottom: 32, color: "#262626" }}>
        Billing & Payments
      </Title>

      {/* Search Bar */}
      <Row
        gutter={[16, 16]}
        justify="space-between"
        align="middle"
        style={{ marginBottom: 24 }}
      >
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
            size="large"
            placeholder="Search by ID, name, or email"
            addonAfter={<SearchOutlined style={{ color: "#8c8c8c" }} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      {/* Invoice List */}
      <div style={{ marginBottom: 32 }}>
        {filteredInvoices.length === 0 ? (
          // ✅ Show Ant Design Empty state when no results
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <Empty description="No matching receipts found" />
          </div>
        ) : (
          filteredInvoices.map((invoice, index) => (
            <Card
              key={index}
              style={{
                marginBottom: 16,
                border: "1px solid #f0f0f0",
                borderRadius: 8,
              }}
              bodyStyle={{ padding: 16 }}
            >
              <Row gutter={[16, 16]} align="middle">
                {/* Invoice Info */}
                <Col xs={24} md={16}>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Invoice ID: {invoice.id}
                    </Text>
                    <Text strong style={{ fontSize: 14 }}>
                      Name: {invoice.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Email: {invoice.email}
                    </Text>
                    <Space size={16}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Product: {invoice.product}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Type: {invoice.type}
                      </Text>
                    </Space>
                  </Space>
                </Col>

                {/* Payment Info */}
                <Col xs={24} md={6}>
                  <Row justify="space-around">
                    <Col>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Due
                      </Text>
                      <Text strong style={{ fontSize: 14 }}>
                        {invoice.due}
                      </Text>
                    </Col>
                    <Col>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Paid
                      </Text>
                      <Text strong style={{ fontSize: 14 }}>
                        {invoice.paid}
                      </Text>
                    </Col>
                  </Row>
                </Col>

                {/* Action */}
                <Col xs={24} md={2} style={{ textAlign: "right" }}>
                  <Button
                    type="default"
                    size="small"
                    icon={<EyeOutlined />}
                    style={{ background: "transparent" }}
                  >
                    View details
                  </Button>
                </Col>
              </Row>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        total={filteredInvoices.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
