/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Drawer,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Typography,
} from "antd";

interface ProfileEditDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileEditDrawer: React.FC<ProfileEditDrawerProps> = ({
  visible,
  onClose,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Updated Profile:", values);
    onClose();
  };
  const { Title } = Typography;
  return (
    <Drawer
      title={
        <Title level={2} color="#0B121B" style={{ textAlign: "center" }}>
          Edit Profile
        </Title>
      }
      closable={false}
      placement="right"
      onClose={onClose}
      open={visible}
      width={480}
      footer={
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          <Button size="large" style={{ flex: 1 }} onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="large"
            type="primary"
            style={{ flex: 1 }}
            onClick={() => form.submit()}
          >
            Save Now
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          name: "Emily Carter",
          email: "xyz32@gmail.com",
          phone: "+144 2154 212",
          address: "Dhaka Bangladesh",
          gender: "Male",
        }}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Enter full name" }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", required: true, message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Enter phone number" }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input placeholder="Enter address" />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date of Birth" name="dob">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default ProfileEditDrawer;
