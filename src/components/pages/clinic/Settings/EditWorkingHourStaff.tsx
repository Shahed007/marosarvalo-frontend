/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { Drawer, Form, Button, Select, TimePicker } from "antd";
import dayjs, { Dayjs } from 'dayjs';

interface WorkingHoursData {
  profession: string;
  workingHours: {
    [key: string]: [Dayjs | null, Dayjs | null];
  };
}

interface EditWorkingHourStaffProps {
  visible: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: WorkingHoursData | null;
  onSave: (data: WorkingHoursData) => void;
}

// Default data for the component
const defaultWorkingHoursData: WorkingHoursData = {
  profession: "Receptionist",
  workingHours: {
    saturday: [dayjs('10:00', 'HH:mm'), dayjs('17:00', 'HH:mm')],
    sunday: [dayjs('10:00', 'HH:mm'), dayjs('17:00', 'HH:mm')],
    monday: [dayjs('10:00', 'HH:mm'), dayjs('17:00', 'HH:mm')],
    tuesday: [dayjs('10:00', 'HH:mm'), dayjs('17:00', 'HH:mm')],
    wednesday: [dayjs('10:00', 'HH:mm'), dayjs('17:00', 'HH:mm')],
    thursday: [dayjs('10:00', 'HH:mm'), dayjs('17:00', 'HH:mm')],
    friday: [dayjs('10:00', 'HH:mm'), dayjs('17:00', 'HH:mm')],
  },
};

const EditWorkingHourStaff: React.FC<EditWorkingHourStaffProps> = ({
  visible,
  onClose,
  mode,
  initialData,
  onSave,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialData) {
        form.setFieldsValue(initialData);
      } else if (mode === 'add') {
        // Use default data for add mode
        form.setFieldsValue(defaultWorkingHoursData);
      }
    }
  }, [visible, initialData, form, mode]);

  const handleFinish = (values: any) => {
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
      title={mode === 'add' ? "Add Working Hour" : "Edit Working Hour"}
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
            {mode === 'add' ? 'Save Now' : 'Update Now'}
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
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

export default EditWorkingHourStaff;