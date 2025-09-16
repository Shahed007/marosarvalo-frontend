/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Drawer, Form, Select, Input, Button } from "antd";

const { Option } = Select;

interface AddBondDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  form: any;
}

export default function AddBondDrawer({
  visible,
  onClose,
  onSubmit,
  form,
}: AddBondDrawerProps) {
  return (
    <Drawer
       title={<div className="text-center text-[28px]">Add Bonds</div>}
      placement="right"
      onClose={onClose}
      open={visible}
      width={500}
      styles={{
        body: { padding: 24 },
        header: {
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 24px",
          textAlign: "center",
          fontSize: 32,
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
            style={{ minWidth: 120, height: 44 }}
            onClick={() => form.submit()}
          >
            Add Now
          </Button>
          <Button
            size="large"
            style={{ minWidth: 120, height: 44 }}
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
          label="Discipline"
          name="discipline"
          rules={[{ required: true, message: "Please select discipline" }]}
        >
          <Select placeholder="Select Discipline" size="large">
            <Option value="cardiology">Cardiology</Option>
            <Option value="neurology">Neurology</Option>
            <Option value="orthopedics">Orthopedics</Option>
            <Option value="pediatrics">Pediatrics</Option>
            <Option value="surgery">Surgery</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Service"
          name="service"
          rules={[{ required: true, message: "Please select service" }]}
        >
          <Select placeholder="Select Services" size="large">
            <Option value="consultation">Consultation</Option>
            <Option value="surgery">Surgery</Option>
            <Option value="therapy">Therapy</Option>
            <Option value="diagnostics">Diagnostics</Option>
            <Option value="emergery">Emergency Care</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Session"
          name="session"
          rules={[{ required: true, message: "Please enter session count" }]}
        >
          <Input placeholder="05" size="large" type="number" min={1} max={99} />
        </Form.Item>

        <Form.Item
          label="Bond Name"
          name="bondName"
          rules={[{ required: true, message: "Please enter bond name" }]}
        >
          <Input placeholder="W2" size="large" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
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
