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
        <div className="text-3xl font-semibold text-center">Add Holiday</div>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={698}
      closable={false}
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
          <Button
            type="primary"
            htmlType="submit"
            style={{
              flex: 1,
              padding: "12px 16px",
              height: 44,
              fontWeight: 600,
              borderRadius: 8,
            }}
          >
            Add Now
          </Button>

          <Button
            style={{
              flex: 1,
              padding: "12px 16px",
              height: 44,
              fontWeight: 600,
              borderRadius: 8,
            }}
            onClick={onClose}
          >
            Cancel
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
