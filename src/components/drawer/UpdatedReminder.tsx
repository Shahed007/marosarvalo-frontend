"use client";
import { Button, Drawer, Form, Input, Select, Checkbox } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

const { TextArea } = Input;

const UpdateReminderForm = () => {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "Email", value: "email" },
    { label: "SMS", value: "sms" },
    { label: "WhatsApp", value: "whatsapp" },
  ];

  // Mock initial values for update mode
  const initialValues = {
    reminder: "Appointment",
    priorToAppointment: "3",
    priorUnit: "hr",
    message: "Your appointment is scheduled soon. Please be prepared.",
    preferences: ["email", "sms"],
    subject: "Appointment Reminder",
    body: "Hello, this is a reminder for your appointment tomorrow.",
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)} icon={<FiEdit />} />

      <Drawer
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
            Update Reminder
          </Title>
        }
      >
        <Form layout="vertical" initialValues={initialValues}>
          <Form.Item
            label={<Title level={5}>Select Reminder</Title>}
            name="reminder"
          >
            <Select
              options={[
                {
                  label: "Appointment",
                  value: "Appointment",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={<Title level={5}>Prior to the appointment</Title>}
            name="priorToAppointment"
          >
            <Input
              addonAfter={
                <Form.Item noStyle name="priorUnit">
                  <Select
                    options={[
                      { label: "Hours", value: "hr" },
                      { label: "Minutes", value: "m" },
                    ]}
                  />
                </Form.Item>
              }
            />
          </Form.Item>

          <Form.Item label={<Title level={5}>Message</Title>} name="message">
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label={<Title level={5}>Communication Preferences</Title>}
            name="preferences"
          >
            <Checkbox.Group options={options} />
          </Form.Item>

          <Form.Item label={<Title level={5}>Template</Title>}>
            <Input addonBefore="Subject" value={initialValues.subject} />
          </Form.Item>

          <Form.Item name="body">
            <TextArea rows={4} />
          </Form.Item>

          <div className="flex items-center gap-6">
            <Button block size="large" htmlType="submit" type="primary">
              Update
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

export default UpdateReminderForm;
