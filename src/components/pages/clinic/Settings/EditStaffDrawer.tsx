/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Drawer, Form, Input, Select } from "antd";

interface EditStaffDrawerProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
}

const EditStaffDrawer = ({ visible, onClose, onSave }: EditStaffDrawerProps) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {
    onSave(values);
    form.resetFields();
  };

  return (
    <Drawer
      title={
        <div className="text-2xl font-semibold text-center">Edit Staff</div>
      }
      placement="right"
      onClose={() => {
        onClose();
        form.resetFields();
      }}
      open={visible}
      width={700}
      styles={{
        body: { padding: 24 },
        header: {
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 24px",
        },
      }}
      footer={
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              type="primary"
              className="flex-1 min-w-[150px] py-5"
              onClick={() => form.submit()}
            >
              Save Now
            </Button>
            <Button
              className="flex-1 min-w-[150px] py-5"
              onClick={() => {
                onClose();
                form.resetFields();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        requiredMark={false}
      >
        {/* ✅ Responsive grid: 1 col on mobile, 2 cols from md */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item
            label="Staff Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Full name" size="large" />
          </Form.Item>
          <Form.Item
            label="User ID"
            name="userId"
            rules={[{ required: true, message: "Please enter user ID" }]}
          >
            <Input placeholder="User ID" size="large" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email address" size="large" />
          </Form.Item>
          <Form.Item
            label="Number"
            name="number"
            rules={[{ required: true, message: "Please enter number" }]}
          >
            <Input placeholder="Enter number" size="large" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item
            label="Discipline"
            name="discipline"
            rules={[{ required: true, message: "Please select discipline" }]}
          >
            <Select placeholder="Select discipline" size="large">
              <Select.Option value="Operation">Operation</Select.Option>
              <Select.Option value="Consultation">Consultation</Select.Option>
              <Select.Option value="Emergency">Emergency</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please enter role" }]}
          >
            <Select placeholder="Select role" size="large">
              <Select.Option value="Cleaner">Cleaner</Select.Option>
              <Select.Option value="Consultation">Consultation</Select.Option>
              <Select.Option value="Emergency">Emergency</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select placeholder="Select gender" size="large">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input placeholder="Address" size="large" />
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
};

export default EditStaffDrawer;