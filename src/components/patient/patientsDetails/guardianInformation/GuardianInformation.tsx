"use client";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import Title from "antd/es/typography/Title";

const GuardianInformation = () => {
  return (
    <Card
      style={{
        marginTop: 26,
      }}
    >
      <Title level={3}>Guardian Information (If under 18)</Title>
      <Form
        initialValues={{
          name: "Shahed",
          relations: "Mother",
        }}
        size="large"
        layout="vertical"
        className="grid grid-cols-3 gap-6"
      >
        <div>
          <Form.Item label="Name" name="name">
            <Input disabled={true} placeholder="" />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Relations" name="relations">
            <Input disabled={true} placeholder="" />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            style={{
              marginTop: 47,
            }}
            label={null}
          >
            <Button
              style={{
                minWidth: 320,
              }}
              icon={<UploadOutlined />}
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
