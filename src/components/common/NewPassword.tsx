"use client";
import { Button, Card, Input, Typography, Space } from "antd";
import {  LockOutlined } from "@ant-design/icons";
import logo from "@/assets/logo.svg";
import Image from "next/image";

const { Title, Text } = Typography;

export default function NewPassword() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // ✅ centers logo & card
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "32px" }}>
          <Image src={logo} width={175} height={40} alt="logo" />
        </div>

        {/* Login Card */}
        <Card
          style={{
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            width: "100%", // ✅ card matches container width
          }}
          bodyStyle={{ padding: 0 }}
        >
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <Title level={4} style={{ marginBottom: "4px", color: "#111827" }}>
              Set New Password
            </Title>
          </div>

          <div style={{ padding: "24px" }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div>
                <Text
                  strong
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                  }}
                >
                  Enter Password
                </Text>
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
                  placeholder="password"
                  style={{
                    backgroundColor: "#f3f4f6",
                    borderColor: "#e5e7eb",
                    color: "#6b7280",
                  }}
                />
              </div>
              <div>
                <Text
                  strong
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                  }}
                >
                  Confirm Password
                </Text>
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
                  placeholder="Confirm Password"
                  style={{
                    backgroundColor: "#f3f4f6",
                    borderColor: "#e5e7eb",
                    color: "#6b7280",
                  }}
                />
              </div>

              <Button
                type="primary"
                size="large"
                style={{
                  width: "100%",
                  backgroundColor: "#225A7F",
                  height: "42px",
                  fontWeight: 500,
                  marginTop: "24px",
                }}
              >
                Save Now
              </Button>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
}
