/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Input, Form, Row, Col, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";

const { TextArea } = Input;

const SettingBranding: React.FC = () => {
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);

  const handleUpload = (info: any, type: "logo" | "signature") => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj);
      reader.onload = () => {
        if (type === "logo") setLogoUrl(reader.result as string);
        else setSignatureUrl(reader.result as string);
      };
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const uploadProps = (type: "logo" | "signature") => ({
    beforeUpload: (file: File) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG files!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must be smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: (info: any) => handleUpload(info, type),
    showUploadList: false,
  });

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    message.success("Business information updated successfully!");
  };

  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 mb-8 rounded-lg shadow-sm">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          specialNote:
            "Example: 'Thank you for your business! Kindly process payment by [due date]. For any discrepancies or queries, contact [your email/phone] within [X] days. Late payments may incur a [X]% fee. We appreciate your prompt attention!'",
        }}
      >
        <Row gutter={24}>
          {/* Left Column */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter title" }]}
            >
              <Input placeholder="e.g. clinico" size="large" />
            </Form.Item>

            <Form.Item label="Logo" name="logo">
              <Upload {...uploadProps("logo")} accept="image/*">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  {logoUrl ? (
                    <Image
                      width={250}
                      height={250}
                      src={logoUrl}
                      alt="Logo"
                      className="mx-auto h-24 object-contain"
                    />
                  ) : (
                    <Button
                      icon={<UploadOutlined />}
                      type="dashed"
                      className="bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      Upload Logo
                    </Button>
                  )}
                </div>
              </Upload>
            </Form.Item>
          </Col>

          {/* Right Column */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="e.g. clinico@yahoo.com" size="large" />
            </Form.Item>

            <Form.Item label="Signature" name="signature">
              <Upload {...uploadProps("signature")} accept="image/*">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  {signatureUrl ? (
                    <Image
                      width={250}
                      height={250}
                      src={signatureUrl}
                      alt="Signature"
                      className="mx-auto h-24 object-contain"
                    />
                  ) : (
                    <Button
                      icon={<UploadOutlined />}
                      type="dashed"
                      className="bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      Upload Signature
                    </Button>
                  )}
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        {/* Special Note Section */}
        <Form.Item label="Special Note:" name="specialNote" className="mt-8">
          <TextArea
            placeholder="Example: 'Thank you for your business! Kindly process payment by [due date]. For any discrepancies or queries, contact [your email/phone] within [X] days. Late payments may incur a [X]% fee. We appreciate your prompt attention!'"
            rows={6}
          />
        </Form.Item>

        {/* Update Button */}
        <Form.Item className="mt-8">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 h-auto border-teal-600"
          >
            Update Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SettingBranding;
