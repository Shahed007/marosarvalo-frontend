"use client";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import Title from "antd/es/typography/Title";

const GuardianInformation = () => {
  return (
    <Card className="mt-6">
      <Title level={3}>Guardian Information (If under 18)</Title>

      <Form
        initialValues={{
          name: "Shahed",
          relations: "Mother",
        }}
        size="large"
        layout="vertical"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4"
      >
        {/* Name */}
        <div>
          <Form.Item label="Name" name="name">
            <Input disabled placeholder="Enter name" />
          </Form.Item>
        </div>

        {/* Relations */}
        <div>
          <Form.Item label="Relations" name="relations">
            <Input disabled placeholder="Enter relation" />
          </Form.Item>
        </div>

        {/* All Documents Button */}
        <div className="flex sm:items-end items-start">
          <Form.Item label={null} className="w-full">
            <Button
              icon={<UploadOutlined />}
              className="w-full sm:w-auto min-w-[200px]"
            >
              All Documents
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
};

export default GuardianInformation;
