/* eslint-disable @typescript-eslint/no-explicit-any */
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
import dayjs from "dayjs";

interface EditVoucherProps {
  voucher?: any;
  onClose: () => void;
  open: boolean;
}

const EditVoucher: React.FC<EditVoucherProps> = ({
  voucher,
  onClose,
  open,
}) => {
  return (
    <Drawer
      width={698}
      footer={
        <div className="flex items-center gap-6 mt-4">
          <Button block size="large" htmlType="submit" type="primary">
            Save Now
          </Button>
          <Button onClick={onClose} block size="large" htmlType="button">
            Cancel
          </Button>
        </div>
      }
      closeIcon={null}
      open={open}
      onClose={onClose}
      title={
        <Title
          style={{ textAlign: "center", margin: 0 }}
          color="#0B121B"
          level={2}
        >
          Edit Voucher
        </Title>
      }
    >
      <Form
        layout="vertical"
        initialValues={{
          associateVoucher: voucher?.associateName || "",
          status: voucher?.status?.toLowerCase() || "active",
          ID: voucher?.id || "",
          voucherName: voucher?.voucherName || "",
          expireDate: voucher?.expireDate ? dayjs(voucher.expireDate) : null,
          amount: voucher?.amount || 0,
        }}
      >
        <div className="grid grid-cols-2 gap-6">
          <Form.Item name="associateVoucher" label="Associate voucher">
            <Input placeholder="John Son" />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </Form.Item>

          <Form.Item name="ID" label="ID">
            <Input placeholder="#2323232" />
          </Form.Item>

          <Form.Item name="voucherName" label="Voucher Name">
            <Input />
          </Form.Item>

          <Form.Item name="expireDate" label="Expire Date">
            <DatePicker className="!w-full" />
          </Form.Item>

          <Form.Item name="amount" label="Amount">
            <InputNumber className="!w-full" />
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
};

export default EditVoucher;
