/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const GetInTouch = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    const { fullName, email, subject, message: msg } = values;

    if (!fullName || !email || !subject || !msg) {
      message.error("Please fill all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Your message has been sent successfully!");
    }, 1500);
  };

  return (
    <div className="custom-container mt-[116px] mb-20 min-h-[100vh] flex items-center justify-center">
      <div className="grid lg:grid-cols-2 gap-12 w-full">
        {/* Left Section */}
        <div className="grid grid-cols-1 gap-5">
          <h1 className="text-4xl font-bold text-primary">
            Have Questions? Reach Out to Us
          </h1>

          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded bg-blue-50">
                <MailOutlined className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Send E-Mail</p>
                <p className="text-gray-500 text-sm">info@scapracticehub.com</p>
              </div>
            </div>
          </Card>

          <Card className="mt-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0194!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064!2sHayes%20Valley%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="400px"
              className="border-0"
              allowFullScreen
              loading="lazy"
            />
          </Card>
        </div>

        {/* Right Section - Form */}
        <div>
          <Card>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Get in touch
            </h2>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true }]}
              >
                <Input placeholder="Subject" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true }]}
              >
                <TextArea rows={6} placeholder="Write your message" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-[#225A7F]"
                  loading={loading}
                >
                  Send Now
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
