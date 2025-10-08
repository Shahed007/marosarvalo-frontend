"use client";

import React, { useState } from "react";
import { Button, Input, Card, Typography, Space, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const SettingIntegration = () => {
  const [appointmentUrl, setAppointmentUrl] = useState("fhcfghtgkjld545445");
  const [restfulApi, setRestfulApi] = useState("fhcfghtgkjld545445");
  const [apiKey, setApiKey] = useState("fhcfghtgkjld545445");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard!");
  };

  const generateNew = (type: "appointment" | "api") => {
    const newValue =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    if (type === "appointment") {
      setAppointmentUrl(newValue);
      message.success("New appointment URL generated!");
    } else {
      setApiKey(newValue);
      message.success("New API key generated!");
    }
  };

  return (
    <div className="max-w-2xl mx-start space-y-8  mb-8">
      {/* Generate Appointment Link/URL Section */}
      <Card
        style={{
          border: 0,
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Title level={4} style={{ margin: 0 }}>
            Generate Appointment Link\URL
          </Title>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              value={appointmentUrl}
              onChange={(e) => setAppointmentUrl(e.target.value)}
              readOnly
              style={{
                display: "flex",
                height: "41px",
                padding: "12px 16px",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
                borderRadius: "12px",
                border: "0.5px solid var(--nautral-n-4-stroke, #CCC)",
                background: "var(--card-color, #FFF)",
                position: "relative",
              }}
            />

            <Button
              icon={<CopyOutlined />}
              onClick={() => copyToClipboard(appointmentUrl)}
              style={{
                background: "#f5f5f5",
                height: "41px",
                padding: "12px 16px",
                position: "absolute",
                right: 0,
              }}
            />
          </Space.Compact>
          <Button
            type="primary"
            onClick={() => generateNew("appointment")}
            style={{
              display: "flex",
              width: "225px",
              height: "46px",
              padding: "12px 16px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "12px",
              background: "var(--primary-color, #225A7F)",
            }}
          >
            Generate New
          </Button>
        </Space>
      </Card>

      {/* Security Notice Section */}
      <Card
        style={{
          border: 0,
        }}
      >
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Text strong style={{ fontSize: "14px" }}>
            Security Notice: Handle API Keys with Care
          </Text>
          <Paragraph
            type="secondary"
            style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}
          >
            This section contains sensitive credentials used for system
            integration. API keys act as digital passwords—keep them
            confidential and avoid hardcoding in public repositories or frontend
            code. If a key is exposed, rotate it immediately to prevent
            unauthorized access.
          </Paragraph>
        </Space>
      </Card>

      {/* Restful API Section */}
      <Card
        style={{
          border: 0,
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Title level={4} style={{ margin: 0 }}>
            Restful API
          </Title>
          <Input
            value={restfulApi}
            onChange={(e) => setRestfulApi(e.target.value)}
            readOnly
            style={{
              display: "flex",
              height: "41px",
              padding: "12px 16px",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "stretch",
              borderRadius: "12px",
              border: "0.5px solid var(--nautral-n-4-stroke, #CCC)",
              background: "var(--card-color, #FFF)",
            }}
          />
        </Space>
      </Card>

      {/* API Key auth Section */}
      <Card
        style={{
          border: 0,
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Title level={4} style={{ margin: 0 }}>
            API Key auth
          </Title>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              readOnly
              style={{
                display: "flex",
                position: "relative",
                height: "41px",
                padding: "12px 16px",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
                borderRadius: "12px",
                border: "0.5px solid var(--nautral-n-4-stroke, #CCC)",
                background: "var(--card-color, #FFF)",
              }}
            />

            <Button
              icon={<CopyOutlined />}
              onClick={() => copyToClipboard(apiKey)}
              style={{
                background: "#f5f5f5",
                height: "41px",
                padding: "12px 16px",
                position: "absolute",
                right: 0,
              }}
            />
          </Space.Compact>

          <Button
            type="primary"
            onClick={() => generateNew("api")}
            style={{
              display: "flex",
              width: "225px",
              height: "46px",
              padding: "12px 16px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "12px",
              background: "var(--primary-color, #225A7F)",
            }}
          >
            Generate New
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default SettingIntegration;
