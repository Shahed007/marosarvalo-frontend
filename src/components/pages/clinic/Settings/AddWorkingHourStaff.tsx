/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Drawer, Form, Button, Select, TimePicker } from "antd";
import { Dayjs } from "dayjs";
interface WorkingHoursData {
  profession: string;
  workingHours: {
    [key: string]: [Dayjs | null, Dayjs | null];
  };
}
interface AddWorkingHourStaffProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: WorkingHoursData) => void;
}

// interface WorkingHours {
//   [key: string]: [Dayjs | null, Dayjs | null];
// }

const AddWorkingHourStaff: React.FC<AddWorkingHourStaffProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Working Hours:", values);
    onSave(values);
    onClose();
  };

  const daysOfWeek = [
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
  ];

  return (
    <Drawer
      title="Add Working Hour"
      placement="right"
      onClose={onClose}
      open={visible}
      width={600}
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
          profession: "Receptionist",
          workingHours: {
            saturday: [null, null],
            sunday: [null, null],
            monday: [null, null],
            tuesday: [null, null],
            wednesday: [null, null],
            thursday: [null, null],
            friday: [null, null],
          },
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16 }}>Working Days & Time</h3>
          <div style={{ border: "1px solid #d9d9d9", borderRadius: 6 }}>
            {daysOfWeek.map((day) => (
              <div
                key={day.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderBottom:
                    day.value !== "friday" ? "1px solid #f0f0f0" : "none",
                }}
              >
                <div style={{ width: 100, fontWeight: 500 }}>{day.label}</div>
                <Form.Item
                  name={["workingHours", day.value]}
                  style={{ marginBottom: 0, flex: 1 }}
                >
                  <TimePicker.RangePicker
                    format="h:mm a"
                    use12Hours
                    style={{ width: "100%" }}
                    placeholder={["Start time", "End time"]}
                  />
                </Form.Item>
              </div>
            ))}
          </div>
        </div>

        <Form.Item
          label="Profession"
          name="profession"
          rules={[{ required: true, message: "Please select a profession" }]}
        >
          <Select placeholder="Select profession">
            <Select.Option value="Receptionist">Receptionist</Select.Option>
            <Select.Option value="Doctor">Doctor</Select.Option>
            <Select.Option value="Nurse">Nurse</Select.Option>
            <Select.Option value="Therapist">Therapist</Select.Option>
            <Select.Option value="Technician">Technician</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddWorkingHourStaff;
