/* eslint-disable @typescript-eslint/no-explicit-any */
// components/AddVoucherDrawer.tsx
import { Drawer, Form, Input, Button, DatePicker } from "antd";

interface AddVoucherDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  form: any;
}

export default function AddVoucherDrawer({ visible, onClose, onSubmit, form }: AddVoucherDrawerProps) {
  return (
    <Drawer
      title="Sell Voucher"
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
          fontSize: "40px",
        },
      }}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            padding: "16px 24px",
            borderTop: "1px solid #e5e7eb",
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
          label="Voucher Name"
          name="voucherName"
          rules={[{ required: true, message: "Please enter voucher name" }]}
        >
          <Input placeholder="Xyz" size="large" />
        </Form.Item>

        <Form.Item
          label="Voucher Amount"
          name="voucherAmount"
          rules={[{ required: true, message: "Please enter voucher amount" }]}
        >
          <Input
            placeholder="1245"
            size="large"
            prefix="$"
            type="number"
            min={0}
          />
        </Form.Item>

        <Form.Item
          label="Expire Date"
          name="expireDate"
          rules={[{ required: true, message: "Please select expire date" }]}
        >
          <DatePicker
            placeholder="12 April, 2025"
            size="large"
            style={{ width: "100%" }}
            format="DD MMMM, YYYY"
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}