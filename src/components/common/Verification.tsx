"use client";

import React, { useState, useRef } from "react";
import { Button, Input, Typography, Space, Card } from "antd";
import type { InputRef } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import logo from "@/assets/logo.svg";
import Image from "next/image";
const { Title, Text } = Typography;

export default function Verification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(InputRef | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      console.log("Verification code:", fullCode);
      // Handle verification logic here
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image src={logo} width={170} height={40} alt="logo" />
        </div>
      </div>

      {/* Main Content */}
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
        bodyStyle={{ padding: "24px" }}
      >
        {/* Heading */}
        <Title level={3} style={{ color: "#111827", marginBottom: "16px" }}>
          Verification!
        </Title>

        {/* Subtitle */}
        <Text
          type="secondary"
          style={{
            display: "block",
            marginBottom: "32px",
            lineHeight: "1.5",
          }}
        >
          Please enter code 6 digit verification code we&#39;ve sent to your
          registered mail id/phone no.
        </Text>

        {/* Input Label */}
        <div
          style={{
            textAlign: "left",
            marginBottom: "16px",
          }}
        >
          <Text strong style={{ color: "#374151" }}>
            Enter 6 Digit Code
          </Text>
        </div>

        {/* OTP Input Fields */}
        <Space
          direction="horizontal"
          size="middle"
          style={{
            marginBottom: "32px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              style={{
                width: "48px",
                height: "48px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
              }}
            />
          ))}
        </Space>

        {/* Continue Button */}
        <Button
          type="primary"
          size="large"
          icon={<CheckCircleOutlined />}
          onClick={handleVerify}
          style={{
            width: "100%",
            backgroundColor: "#225A7F",
            borderColor: "#225A7F",
            height: "48px",
            fontWeight: 500,
            borderRadius: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#225A7F";
            e.currentTarget.style.borderColor = "##225A7F";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#225A7F";
            e.currentTarget.style.borderColor = "#225A7F";
          }}
        >
          Continue
        </Button>
      </Card>
    </div>
  );
}
