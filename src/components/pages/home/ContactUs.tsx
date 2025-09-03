"use client";

import { Card, Col, Row } from "antd";
import "antd/dist/reset.css";

import location from "@/assets/icons/location.svg";
import phone from "@/assets/icons/phone.svg";
import email from "@/assets/icons/email.svg";
import Image from "next/image";
const ContactUs = () => {
  const contacts = [
    {
      id: 1,
      title: "Location",
      description: "Location, 3456, Lore ipsum USA",
      icon: location,
      bgColor: "#EFF6FF", // bg-blue-50
    },
    {
      id: 2,
      title: "Call us",
      description:
        "0123-456789 Share some cool solutions for a mix of online and local businesses.",
      icon: phone,
      bgColor: "#ECFDF5", // bg-green-50
    },
    {
      id: 3,
      title: "Email",
      description:
        "info@yourmail.com Let's collaborate to connect smoothly and empower one another!",
      icon: email,
      bgColor: "#F5F3FF", // bg-purple-50
    },
  ];

  return (
    <div className="custom-container mt-[116px] mb-20">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-[44px] font-bold">Contact Us</h2>
      </div>

      {/* Contact Cards */}
      <Row gutter={[32, 32]} justify="center">
        {contacts.map((contact) => (
          <Col key={contact.id} xs={24} md={8}>
            <Card
              hoverable
              style={{
                textAlign: "center",
                borderRadius: "1rem",
                padding: "2rem",
              }}
              bodyStyle={{ padding: 0 }}
            >
              <div
                className="mb-6 flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: contact.bgColor,
                  width: 80,
                  height: 80,
                  margin: "0 auto 1.5rem",
                }}
              >
                <Image src={contact.icon} alt="icon" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {contact.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {contact.description}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ContactUs;
