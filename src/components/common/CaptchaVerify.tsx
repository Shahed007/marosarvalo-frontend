/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const CaptchaVerify = () => {
  const [form] = Form.useForm();
  const [captchaCode, setCaptchaCode] = useState("72L0VW");
  const [isLoading, setIsLoading] = useState(false);

  // Generate a random captcha (in a real app, this would come from backend)
  const generateCaptcha = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCaptchaCode(result);
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form submitted:", values);
    }, 1000);
  };

  const handleRefreshCaptcha = () => {
    generateCaptcha();
  };

  // Initial captcha generation
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "50px auto",
        padding: "0 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Title
          level={2}
          style={{ color: "#0B121B", marginBottom: 8, fontSize: "50px" }}
        >
          Captcha Verify
        </Title>
        <Paragraph
          style={{
            color: "#666",
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          Your path to recovery starts here. Select a date and time that works
          for you.
        </Paragraph>
      </div>

      {/* Form Section */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="captcha"
          rules={[
            { required: true, message: "Please enter the captcha code" },
            {
              validator: (_, value) => {
                if (value && value.toUpperCase() === captchaCode) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Captcha code is incorrect"));
              },
            },
          ]}
        >
          <div>
            <Paragraph
              style={{
                fontSize: 14,
                color: "#666",
                marginBottom: 8,
              }}
            >
              Enter captcha digits
            </Paragraph>

            <div
              className="flex"
              style={{ gap: "12px", alignItems: "flex-start" }}
            >
              {/* Captcha Input */}
              <div style={{ flex: "1" }}>
                <Input
                  placeholder="Enter captcha code"
                  className="hover:!outline-none focus:!outline-none !border-[#CCC]"
                  style={{
                    height: 48,
                    fontSize: 16,
                    width: "100%",
                  }}
                  maxLength={6}
                />
              </div>

              {/* Captcha Display + Refresh */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "fit-content",
                }}
              >
                <div
                  style={{
                    outline: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "164px",
                    height: "50px",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "0.5px solid #CCC",
                    background: "#EFEFEF",
                    flexShrink: 0,
                    fontFamily: "monospace",
                    fontSize: "20px",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                    color: "#333",
                    userSelect: "none",
                  }}
                >
                  {captchaCode}
                </div>
                <Button
                  type="text"
                  icon={<ReloadOutlined />}
                  onClick={handleRefreshCaptcha}
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "12px",
                    background: "#EFEFEF",
                  }}
                />
              </div>
            </div>
          </div>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item
          style={{
            marginBottom: 0,
            marginTop: 24,
            width: "206px",
            margin: "0 auto",
          }}
        >
          <Button
            type="primary"
            className="!bg-[#225A7F]"
            htmlType="submit"
            loading={isLoading}
            block
            size="large"
            style={{
              height: 48,
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 6,
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CaptchaVerify;
