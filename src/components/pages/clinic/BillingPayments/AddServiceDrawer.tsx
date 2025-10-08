/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Drawer, Form, Select, Input, Button } from "antd";

const { Option } = Select;

interface AddServiceDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  form: any;
}

export default function AddServiceDrawer({
  visible,
  onClose,
  onSubmit,
  form,
}: AddServiceDrawerProps) {
  return (
    <Drawer
      title={<div className="text-center text-[28px]">Add Services</div>}
      placement="right"
      onClose={onClose}
      open={visible}
      width={500}
      closable={false}
      styles={{
        body: { padding: 24 },
        header: {
          // borderBottom: "1px solid #0B121B",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 24px",
          width: "430px",
          margin: "0 auto",
        },
      }}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            padding: "16px 24px",
          }}
        >
          <Button
            type="primary"
            size="large"
            style={{ minWidth: 174, height: 46 }}
            onClick={() => form.submit()}
          >
            Add Now
          </Button>
          <Button
            size="large"
            style={{ minWidth: 174, height: 46 }}
            onClick={onClose}
          >
            Not Now
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <Form.Item
          label="Select Discipline"
          name="discipline"
          rules={[{ required: true, message: "Please select discipline" }]}
        >
          <Select placeholder="Operation" size="large">
            <Option value="operation">Operation</Option>
            <Option value="consultation">Consultation</Option>
            <Option value="emergency">Emergency</Option>
            <Option value="therapy">Therapy</Option>
            <Option value="diagnostics">Diagnostics</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Services"
          name="service"
          rules={[{ required: true, message: "Please select service" }]}
        >
          <Select placeholder="Surgery" size="large">
            <Option value="surgery">Surgery</Option>
            <Option value="consultation">Consultation</Option>
            <Option value="therapy">Therapy</Option>
            <Option value="diagnostics">Diagnostics</Option>
            <Option value="emergency">Emergency Care</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Amount of the service"
          name="serviceAmount"
          rules={[{ required: true, message: "Please enter service amount" }]}
        >
          <Input
            placeholder="1245"
            size="large"
            prefix="$"
            type="number"
            min={0}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
