/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Drawer, Form, Input, Button, Space, Select, DatePicker } from "antd";

interface ProfileEditDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileEditDrawer: React.FC<ProfileEditDrawerProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Updated Profile:", values);
    onClose();
  };

  return (
    <Drawer
      title="Edit Profile"
      placement="right"
      onClose={onClose}
      open={visible}
      width={480}
      footer={
        <div style={{ textAlign: "right" }}>
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={() => form.submit()}>
              Save
            </Button>
          </Space>
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
        <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Enter full name" }]}>
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ type: "email", required: true, message: "Enter a valid email" }]}>
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Enter phone number" }]}>
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
