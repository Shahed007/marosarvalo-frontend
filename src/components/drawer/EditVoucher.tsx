"use client";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import dayjs from "dayjs";

const EditVoucher = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Edit Voucher</Button>
      <Drawer
        width={500}
        closeIcon={null}
        open={open}
        onClose={() => setOpen(false)}
        title={
          <Title
            style={{
              textAlign: "center",
              margin: 0,
            }}
            level={3}
          >
            Edit Voucher
          </Title>
        }
      >
        <Form
          layout="vertical"
          initialValues={{
            associateVoucher: "John Son",
            status: "active",
            ID: "#2323232",
            voucherName: "Summer Special 2025",
            expireDate: dayjs("2025-12-31"), // ✅ must be a dayjs object
            amount: 200,
          }}
        >
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              name="associateVoucher"
              label={<Title level={5}>Associate voucher</Title>}
            >
              <Input placeholder="John Son" />
            </Form.Item>

            <Form.Item name="status" label={<Title level={5}>Status</Title>}>
              <Select
                options={[
                  {
                    label: "Active",
                    value: "active",
                  },
                  {
                    label: "Inactive",
                    value: "inactive",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item name="ID" label={<Title level={5}>ID</Title>}>
              <Input placeholder="#2323232" />
            </Form.Item>

            <Form.Item
              name="voucherName"
              label={<Title level={5}>Voucher Name</Title>}
            >
              <Input />
            </Form.Item>

            <Form.Item name="expireDate" label={<Title level={5}>Expire Date</Title>}>
              <DatePicker className="!w-full" />
            </Form.Item>

            <Form.Item name="amount" label={<Title level={5}>Amount</Title>}>
              <InputNumber className="!w-full" />
            </Form.Item>
          </div>

          <div className="flex items-center gap-6">
            <Button block size="large" htmlType="submit" type="primary">
              Submit Now
            </Button>
            <Button
              onClick={() => setOpen(false)}
              block
              size="large"
              htmlType="button"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default EditVoucher;
