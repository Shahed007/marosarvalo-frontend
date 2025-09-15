// components/CalanderDetailsDrawer.js
"use client"
import { Drawer, Button, Form, Input, Row, Col, Tag, Typography } from 'antd';

const { Paragraph } = Typography;
interface DetailsDrawerProps {
  visible: boolean;
  onClose: () => void; 
}
const CalanderDetailsDrawer = ({ visible, onClose }:DetailsDrawerProps) => {
  return (
    <Drawer
      title="View Details"
      placement="right"
      closable={true}
      onClose={onClose}
      open={visible}
      width={600}
      footer={
        <div style={{ textAlign: 'center' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Close
          </Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </div>
      }
    >
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Patient Name">
              <Input value="Emily" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Contact">
              <Input value="+8 845 4541" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Discipline">
              <Input value="xyz" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Services">
              <Input value="xyz" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Date & Time">
              <Input value="12:00am - 1:00pm | 12 April, 2025" disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Assigned Specialist">
              <Input value="Dr. Jhon Wick" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Note">
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis
          </Paragraph>
        </Form.Item>
        <Form.Item label="Status">
          <Tag color="blue">Scheduled</Tag>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CalanderDetailsDrawer;