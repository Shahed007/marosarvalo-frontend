"use client";

import { Card, Input, Button, Form, Row, Col, Typography, Divider } from "antd";
import Image from "next/image";
import img from "@/assets/order/order-details.png";
const { Title, Text } = Typography;

export default function OrderDescription() {
  return (
    <div>
      <div className="custom-container ">
        <Row gutter={32}>
          {/* Left Column - Form */}
          <Col xs={24} lg={16}>
            {/* Clinic Information */}
            <Card
              style={{
                marginBottom: 24,
                border: 0,
              }}
              bodyStyle={{ padding: 24 }}
            >
              <Title
                level={4}
                style={{ color: "#1B1F3A", marginBottom: 24, fontSize: 24 }}
              >
                Clinic Information
              </Title>

              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      label={
                        <Text strong style={{ color: "#374151" }}>
                          Clinic Name*
                        </Text>
                      }
                    >
                      <Input
                        placeholder="Enter your clinic name"
                        size="large"
                        className="hover:!border-primary focus:!border-primary"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      label={
                        <Text strong style={{ color: "#374151" }}>
                          Email*
                        </Text>
                      }
                    >
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        size="large"
                        className="hover:!border-primary focus:!border-primary"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      label={
                        <Text strong style={{ color: "#374151" }}>
                          Phone number*
                        </Text>
                      }
                    >
                      <Input
                        placeholder="+0"
                        size="large"
                        className="hover:!border-primary focus:!border-primary"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      label={
                        <Text strong style={{ color: "#374151" }}>
                          Clinic Address*
                        </Text>
                      }
                    >
                      <Input
                        placeholder="Enter your clinic address"
                        size="large"
                        className="hover:!border-primary focus:!border-primary"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>

            {/* User Information */}
            <Card
              style={{
                marginBottom: 24,
                border: 0,
              }}
              bodyStyle={{ padding: 24 }}
            >
              <Title
                level={4}
                style={{ color: "#1B1F3A", marginBottom: 24, fontSize: 24 }}
              >
                User Information
              </Title>

              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      label={
                        <Text strong style={{ color: "#374151" }}>
                          User Name*
                        </Text>
                      }
                    >
                      <Input
                        placeholder="Enter user name"
                        size="large"
                        className="hover:!border-primary focus:!border-primary"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      label={
                        <Text strong style={{ color: "#374151" }}>
                          User Email*
                        </Text>
                      }
                    >
                      <Input
                        type="email"
                        placeholder="Enter user email"
                        size="large"
                        className="hover:!border-primary focus:!border-primary"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      label={
                        <Text strong style={{ color: "#374151" }}>
                          User Phone number
                        </Text>
                      }
                    >
                      <Input
                        placeholder="+0"
                        size="large"
                        className="hover:!border-primary focus:!border-primary"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      label={
                        <Text strong style={{ color: "#374151" }}>
                          User Address*
                        </Text>
                      }
                    >
                      <Input
                        placeholder="Enter user address"
                        size="large"
                        className="hover:!border-primary focus:!border-primary"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>

            {/* Order Description */}
            <Card
              style={{
                border: 0,
              }}
              bodyStyle={{ padding: 24 }}
            >
              <Title
                level={4}
                style={{ color: "#1C2A47", marginBottom: 24, fontSize: 24 }}
              >
                Order Description
              </Title>

              <p className="text-[#B3B3B3] ">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews. Iterative approaches to corporate strategy
                foster collaborative thinking to further the overall value
                proposition. Organically grow the holistic world view of
                disruptive innovation via workplace diversity and empowerment.
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution. User generated
                content in real-time will have multiple touchpoints for
                offshoring. Capitalize on low hanging fruit to identify a
                ballpark value added activity to beta test. Override the digital
                divide with additional clickthroughs from DevOps. Nanotechnology
                immersion along the information highway will close the loop on
                focusing solely on the bottom line.&ldquo;
              </p>
            </Card>
          </Col>

          {/* Right Column - Order Summary */}
          <Col xs={24} lg={8}>
            <Card
              style={{
                borderRadius: 8,
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
              bodyStyle={{ padding: 24 }}
            >
              <Title level={4} style={{ color: "#1F2937", marginBottom: 24 }}>
                Order Summary
              </Title>
              <Divider />

              {/* Order details */}
              <div
                style={{ marginBottom: 24 }}
                className="flex justify-between gap-6"
              >
                <div>
                  <Image
                    className="border-6 border-[#D0ECFF]"
                    src={img}
                    width={90}
                    height={80}
                    alt="img"
                    unoptimized
                    priority
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Text strong style={{ color: "#1F2937" }}>
                      Monthly
                    </Text>
                    <div style={{ display: "block" }}>
                      <Text style={{ color: "#6B7280", fontSize: 14 }}>
                        Subscription Cleaner
                      </Text>
                    </div>
                    <div style={{ display: "block" }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Plan: Premium Cleaner Plan
                      </Text>
                    </div>
                    <div style={{ display: "block" }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Qty: 1 Month | 1 Service
                      </Text>
                    </div>
                  </div>
                </div>
                <div>
                  <Text strong style={{ color: "#1F2937" }}>
                    $49.80
                  </Text>
                </div>
              </div>

              <Divider style={{ margin: "16px 0" }} />

              {/* Summary totals */}
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: "#6B7280" }}>Total</Text>
                  <Text style={{ color: "#1F2937" }}>$49.80</Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: "#6B7280" }}>Platform Charge</Text>
                  <Text style={{ color: "#1F2937" }}>$7.14</Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: "#6B7280" }}>Tax</Text>
                  <Text style={{ color: "#1F2937" }}>$7.34</Text>
                </div>
              </div>

              <Divider style={{ margin: "16px 0" }} />

              {/* Final total */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <Text strong style={{ color: "#1F2937", fontSize: 18 }}>
                    Total
                  </Text>
                  <Text strong style={{ color: "#1F2937", fontSize: 18 }}>
                    $59.28
                  </Text>
                </div>

                <Button
                  type="primary"
                  size="large"
                  style={{
                    width: "100%",
                    backgroundColor: "#225A7F",
                    borderColor: "#225A7F",
                    height: 48,
                  }}
                >
                  Request Order
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
