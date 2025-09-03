"use client";

import { useState } from "react";
import { Button, Input, Radio, Row, Col, Typography, Divider } from "antd";
import Link from "next/link";
import Image from "next/image";
import img from "@/assets/order/order-details.png";
import { useParams } from "next/navigation";

const { Title, Text } = Typography;
const { Group: RadioGroup } = Radio;

export default function Checkout() {
  const id = useParams()?.id;
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div
      style={{ minHeight: "100vh", paddingTop: "200px", paddingBottom: "48px" }}
    >
      <div className="custom-container ">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Title level={2} style={{ color: "#1F2937", marginBottom: 8 }}>
            Checkout
          </Title>
          <Text type="secondary">Billing Cycle</Text>
        </div>

        <Row gutter={48}>
          {/* Payment Section */}
          <Col xs={24} lg={12}>
            <Title level={3} style={{ color: "#1F2937", marginBottom: 24 }}>
              Payment
            </Title>

            {/* Payment Method */}
            <div style={{ marginBottom: 24 }}>
              <Text
                strong
                style={{ color: "#374151", display: "block", marginBottom: 12 }}
              >
                Pay With:
              </Text>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ display: "flex", gap: 24 }}
              >
                <Radio value="card">
                  <Text style={{ color: "#374151" }}>Card</Text>
                </Radio>
                <Radio value="bank">
                  <Text style={{ color: "#374151" }}>Bank</Text>
                </Radio>

                {/* Local style override */}
                <style jsx>{`
                  :global(.ant-radio-checked .ant-radio-inner) {
                    border-color: #225a7f !important;
                    background-color: #225a7f !important;
                  }
                `}</style>
              </RadioGroup>
            </div>

            {/* Card Number */}
            <div style={{ marginBottom: 24 }}>
              <Text
                strong
                style={{ color: "#374151", display: "block", marginBottom: 8 }}
              >
                Card Number
              </Text>
              <Input
                type="text"
                placeholder="1234 5678 9101 1121"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                size="large"
                style={{ width: "100%" }}
              />
            </div>

            {/* Expiration Date and CVV */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col xs={12}>
                <Text
                  strong
                  style={{
                    color: "#374151",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Expiration Date
                </Text>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  size="large"
                />
              </Col>
              <Col xs={12}>
                <Text
                  strong
                  style={{
                    color: "#374151",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  CVV
                </Text>
                <Input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  size="large"
                />
              </Col>
            </Row>

            {/* Pay Button */}
            <Link href={`/payment-confirm/${id}`}>
              <Button
                type="primary"
                size="large"
                style={{
                  width: "100%",
                  backgroundColor: "#225A7F",
                  borderColor: "#225A7F",
                  height: 48,
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Pay USD59.28
              </Button>
            </Link>

            {/* Privacy Policy */}
            <Text
              type="secondary"
              style={{
                fontSize: 12,
                display: "block",
                marginTop: 16,
                lineHeight: 1.5,
              }}
            >
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </Text>
          </Col>

          {/* Order Summary */}
          <Col xs={24} lg={12}>
            <Title level={3} style={{ color: "#1F2937", marginBottom: 24 }}>
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

            {/* Pricing Breakdown */}
            <div style={{ marginBottom: 24 }}>
              <Row justify="space-between" style={{ marginBottom: 12 }}>
                <Text style={{ color: "#6B7280" }}>Total</Text>
                <Text style={{ color: "#1F2937" }}>$49.80</Text>
              </Row>
              <Row justify="space-between" style={{ marginBottom: 12 }}>
                <Text style={{ color: "#6B7280" }}>Platform Charge</Text>
                <Text style={{ color: "#1F2937" }}>$7.24</Text>
              </Row>
              <Row justify="space-between" style={{ marginBottom: 12 }}>
                <Text style={{ color: "#6B7280" }}>Tax</Text>
                <Text style={{ color: "#1F2937" }}>$7.24</Text>
              </Row>
            </div>

            <Divider style={{ margin: "16px 0" }} />

            {/* Final Total */}
            <Row justify="space-between" align="middle">
              <Text strong style={{ color: "#1F2937", fontSize: 18 }}>
                Total
              </Text>
              <Text strong style={{ color: "#1F2937", fontSize: 24 }}>
                $59.28
              </Text>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
