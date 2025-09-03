import React from "react";
import { Card, Typography, Row, Col, Space } from "antd";


interface UserInfoProps {
  number?: string;
  email?: string;
  dateOfBirth?: string;
  contactsWay?: string[];
  address?: string;
  gender?: string;
  lastAppoint?: string;
}

const UserInfoCard: React.FC<UserInfoProps> = ({
  number = "+144 2154 212",
  email = "xyz32@gmail.com",
  dateOfBirth = "12/02/1995",
  contactsWay = ["Whatsapp", "SMS"],
  address = "Dhaka Bangladesh",
  gender = "Male",
  lastAppoint = "12 April, 2025",
}) => {
  const InfoItem: React.FC<{
    label: string;
    value: React.ReactNode;
    span?: number;
  }> = ({ label, value, span = 6 }) => (
    <Col span={span}>
      <Space direction="vertical" size={4}>
        <Typography  style={{ fontSize: "13px", fontWeight: 400 }}>
          {label}:
        </Typography>
        <div style={{ minHeight: "20px" }}>{value}</div>
      </Space>
    </Col>
  );

  return (
    <Card
      style={{
        borderRadius: "8px",
        border: "1px solid #e8e8e8",
        boxShadow: "none",
      }}
    >
      <Row gutter={[24, 20]}>
        <InfoItem
          label="Number"
          value={
            <Typography  style={{ fontSize: "14px", color: "#262626", fontWeight: 700 }}>
              {number}
            </Typography>
          }
        />

        <InfoItem
          label="Email"
          value={
            <Typography  style={{ fontSize: "14px", color: "#262626", fontWeight: 700 }}>
              {email}
            </Typography>
          }
        />

        <InfoItem
          label="Date of birth"
          value={
            <Typography  style={{ fontSize: "14px", color: "#262626", fontWeight: 700 }}>
              {dateOfBirth}
            </Typography>
          }
        />

        <InfoItem
          label="Contacts way"
          value={
            <Space direction="vertical" size={2}>
              {contactsWay.map((contact, index) => (
                <Typography
                  key={index}
                  
                  style={{ fontSize: "14px", color: "#262626", fontWeight: 700 }}
                >
                  {contact}
                </Typography>
              ))}
            </Space>
          }
        />

        <InfoItem
          label="Address"
          value={
            <Typography  style={{ fontSize: "14px", color: "#262626", fontWeight: 700 }}>
              {address}
            </Typography>
          }
        />

        <InfoItem
          label="Gender"
          value={
            <Typography  style={{ fontSize: "14px", color: "#262626", fontWeight: 700 }}>
              {gender}
            </Typography>
          }
        />

        <InfoItem
          label="Last Appoint"
          value={
            <Typography  style={{ fontSize: "14px", color: "#262626", fontWeight: 700 }}>
              {lastAppoint}
            </Typography>
          }
        />

        {/* Empty column to maintain grid alignment */}
        <Col span={6}></Col>
      </Row>
    </Card>
  );
};

export default UserInfoCard;
