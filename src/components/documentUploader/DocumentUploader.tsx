/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Upload,
  Button,
  Card,
  Typography,
  Space,
  List,
  Form,
  message,
} from "antd";
import {
  UploadOutlined,
  FileOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const { Text } = Typography;

interface UploadedFile {
  uid: string;
  name: string;
  size: number;
  originFileObj?: File;
}

const DocumentUploader: React.FC = () => {
  const [fileDocs, setFileDocs] = useState<UploadedFile[]>([]);
  const [imageDocs, setImageDocs] = useState<UploadedFile[]>([]);
  const [form] = Form.useForm();

  // File size/type validation
  const beforeUpload = (file: File, allowedTypes: string[]) => {
    const isValidType = allowedTypes.includes(file.type);
    if (!isValidType) {
      message.error(`File type not allowed: ${file.type}`);
      return Upload.LIST_IGNORE;
    }
    const isValidSize = file.size / 1024 / 1024 < 5;
    if (!isValidSize) {
      message.error("File must be smaller than 5MB!");
      return Upload.LIST_IGNORE;
    }
    return false; // prevent auto upload
  };

  // Remove files manually
  const removeFile = (fileToRemove: UploadedFile, isFile: boolean) => {
    if (isFile) {
      const newList = fileDocs.filter((f) => f.uid !== fileToRemove.uid);
      setFileDocs(newList);
      form.setFieldValue("fileDocs", newList);
    } else {
      const newList = imageDocs.filter((f) => f.uid !== fileToRemove.uid);
      setImageDocs(newList);
      form.setFieldValue("imageDocs", newList);
    }
  };

  // Render uploaded list
  const renderFileList = (files: UploadedFile[], isFile: boolean) => {
    if (files.length === 0) return null;
    return (
      <List
        size="small"
        dataSource={files}
        renderItem={(file: UploadedFile) => (
          <List.Item
            actions={[
              <Button
                key="remove"
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => removeFile(file, isFile)}
                danger
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<FileOutlined style={{ color: "#1890ff" }} />}
              title={file.name}
              description={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
            />
          </List.Item>
        )}
        style={{ marginTop: 12 }}
      />
    );
  };

  // Form submit
  const handleFinish = (values: any) => {
    console.log("Final Values:", values);
    message.success("Documents saved successfully!");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ fileDocs: [], imageDocs: [] }}
      onFinish={handleFinish}
      style={{
        marginTop: 26,
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* PDF Upload Section */}
        <Card>
          <Form.Item
            name="fileDocs"
            label=""
            rules={[
              {
                validator: async (_, value: UploadedFile[]) => {
                  if (!value || value.length !== 2) {
                    return Promise.reject(
                      "You must upload exactly 2 PDF files"
                    );
                  }
                },
              },
            ]}
          >
            <>
              <Upload
                multiple
                beforeUpload={(file) => beforeUpload(file, ["application/pdf"])}
                showUploadList={false}
                accept=".pdf"
                onChange={({ fileList }) => {
                  setFileDocs(fileList as UploadedFile[]);
                  form.setFieldValue("fileDocs", fileList);
                }}
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    border: "2px dashed #d9d9d9",
                    borderRadius: "6px",
                    padding: "40px 20px",
                    textAlign: "center",
                    backgroundColor: "#fafafa",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <UploadOutlined style={{ fontSize: "24px", color: "#999" }} />
                  <div style={{ marginTop: "8px", color: "#999" }}>
                    Upload PDF Files
                  </div>
                </div>
              </Upload>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Only PDF files allowed (max 5MB each).
              </Text>
              {renderFileList(fileDocs, true)}
            </>
          </Form.Item>
        </Card>

        {/* Image Upload Section */}
        <Card>
          <Form.Item
            name="imageDocs"
            label={<Title level={5}>Other Documents*</Title>}
            rules={[
              {
                validator: async (_, value: UploadedFile[]) => {
                  if (!value || value.length !== 2) {
                    return Promise.reject("You must upload exactly 2 images");
                  }
                },
              },
            ]}
          >
            <>
              <Upload
                multiple
                beforeUpload={(file) =>
                  beforeUpload(file, ["image/png", "image/jpeg"])
                }
                showUploadList={false}
                accept=".png,.jpg,.jpeg"
                onChange={({ fileList }) => {
                  setImageDocs(fileList as UploadedFile[]);
                  form.setFieldValue("imageDocs", fileList);
                }}
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    border: "2px dashed #d9d9d9",
                    borderRadius: "6px",
                    padding: "40px 20px",
                    textAlign: "center",
                    backgroundColor: "#fafafa",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <UploadOutlined style={{ fontSize: "24px", color: "#999" }} />
                  <div style={{ marginTop: "8px", color: "#999" }}>
                    Upload Image Files
                  </div>
                </div>
              </Upload>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Only JPG/PNG images allowed (max 5MB each).
              </Text>
              {renderFileList(imageDocs, false)}
            </>
          </Form.Item>
        </Card>

        {/* Save Button */}
        <Form.Item>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            block
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default DocumentUploader;
