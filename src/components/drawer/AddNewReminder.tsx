import { Button, Drawer, Form, Input, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";

import { Checkbox } from "antd";
import type { CheckboxOptionType } from "antd";

const { TextArea } = Input;

const AddNewReminder = () => {
  const [open, setOpen] = useState(false);

  const options: CheckboxOptionType<string>[] = [
    { label: "Email", value: "email", className: "label-1" },
    { label: "SMS", value: "sms", className: "label-2" },
    { label: "WhatsApp", value: "whatsapp", className: "label-3" },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        New Reminder
      </Button>
      <Drawer
        footer={
          <div className="flex items-center gap-6">
            <Button block size="large" htmlType="submit" type="primary">
              Submit
            </Button>
            <Button
              onClick={() => setOpen(false)}
              block
              size="large"
              htmlType="submit"
            >
              Not Now
            </Button>
          </div>
        }
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
            New Remainder
          </Title>
        }
      >
        <Form layout="vertical">
          <Form.Item label={<Title level={5}>Select Reminder</Title>}>
            <Select
              options={[
                {
                  label: "Appointment",
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item label={<Title level={5}>Prior to the appointment</Title>}>
            <Input
              addonAfter={
                <Select
                  defaultValue="hr"
                  options={[
                    {
                      label: "Hours",
                      value: "hr",
                    },
                    {
                      label: "Minute",
                      value: "m",
                    },
                  ]}
                ></Select>
              }
              defaultValue="mysite"
            />
          </Form.Item>
          <Form.Item label={<Title level={5}>Message</Title>}>
            <TextArea />
          </Form.Item>
          <Form.Item label={<Title level={5}>Communication Preferences</Title>}>
            <Checkbox.Group options={options} defaultValue={["Email"]} />
          </Form.Item>
          <Form.Item label={<Title level={5}>Template</Title>}>
            <Input addonBefore="Subject" placeholder="Enter Subject"></Input>
          </Form.Item>
          <Form.Item>
            <TextArea placeholder="Say something for client" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AddNewReminder;
