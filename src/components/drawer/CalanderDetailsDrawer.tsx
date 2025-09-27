/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DownloadOutlined } from "@ant-design/icons";
import { Drawer, Button, Form, Input, Row, Col, Typography } from "antd";

const { Paragraph } = Typography;

interface DetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  appointment: any;
  onDelete: any;
}

const CalanderDetailsDrawer = ({ open, onClose }: DetailsDrawerProps) => {
  return (
    <Drawer
      title={
        <div style={{ textAlign: "center", width: "100%", fontSize: "28px" }}>
          View Details
        </div>
      }
      placement="right"
      closable
      onClose={onClose}
      open={open}
      width={800}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            padding: "16px 24px",
            marginBottom: "40px"
          }}
        >
          <Button
            size="large"
            style={{
              width: "100%",
              backgroundColor: "#F45B69",
              border: 0,
              color: "white",
            }}
          >
            Delete
          </Button>
          <Button
            size="large"
            style={{ width: "100%", border: "1px solid #CCCCCC" }}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Patient Name">
              <Input value="Emily" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Contact">
              <Input value="+8 845 4541" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Date & Time">
              <Input value="12:00am - 1:00pm | 12 April, 2025" disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Discipline">
              <Input value="xyz" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Services">
              <Input value="xyz" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Form.Item label="Assigned Specialist">
              <Input value="Dr. John Wick" disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Note">
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </Paragraph>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Status">
              <Button
                size="large"
                style={{
                  width: "100%",
                  backgroundColor: "#E6F7FE",
                  color: "#007A9C",
                  border: 0,
                }}
                color="blue"
              >
                Scheduled
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Status">
              <Button
                size="large"
                style={{
                  backgroundColor: "#CCCCCC",
                  color: "#0B121B",
                  border: 0,
                }}
                icon={<DownloadOutlined style={{ color: "#0B121B" }} />} // force icon color
              >
                Attachments
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CalanderDetailsDrawer;
