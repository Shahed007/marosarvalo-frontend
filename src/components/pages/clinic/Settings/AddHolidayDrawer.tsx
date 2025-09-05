/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Drawer, Form, Input, Button, DatePicker } from "antd";

interface AddHolidayDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
}

const AddHolidayDrawer: React.FC<AddHolidayDrawerProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSave(values);
    form.resetFields();
  };

  return (
    <Drawer
      title={
        <div className="text-2xl font-semibold text-center">Add Holiday</div>
      }
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
          <Button style={{ flex: 1 }} onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            style={{ flex: 1 }}
            onClick={() => form.submit()}
          >
            Add Now
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: "Please enter a reason" }]}
          >
            <Input placeholder="Enter reason for holiday" />
          </Form.Item>

          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please enter a time" }]}
          >
            <Input placeholder="Enter time" />
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
};

export default AddHolidayDrawer;
