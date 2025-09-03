/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  // Checkbox,
  Upload,
  Button,
  Card,
  Row,
  Col,
  Calendar,
  Typography,
  Divider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

interface Patient {
  id: string;
  name: string;
  contact: string;
}

interface Specialist {
  id: string;
  name: string;
  discipline: string;
}

const AppointmentForm: React.FC = () => {
  const [form] = Form.useForm();
  // const [setSelectedDate] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Mock data - in a real app this would come from an API
  const patients: Patient[] = [
    { id: "1", name: "Jhon bin kuna", contact: "+12 1245 1524" },
    { id: "2", name: "Sarah Johnson", contact: "+12 3456 7890" },
    { id: "3", name: "Michael Smith", contact: "+12 5555 1234" },
  ];

  const specialists: Specialist[] = [
    { id: "1", name: "Dr. Olivia", discipline: "Pharmacist" },
    { id: "2", name: "Dr. James", discipline: "Cardiologist" },
    { id: "3", name: "Dr. Emma", discipline: "Neurologist" },
  ];

  const disciplines = [
    "Pharmacist",
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
  ];

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    // Here you would handle form submission, e.g., send to API
  };

  // const handleDateSelect = (date: any, selectInfo?: any) => {
  //   setSelectedDate(date.format("YYYY-MM-DD"));
  // };

  const uploadProps = {
    onRemove: (file: UploadFile) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: UploadFile) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <div style={{ padding: "24px", margin: "0 auto" }}>
      <Title level={2}>Appointments</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ status: "scheduled" }}
      >
        <Card title="Search Patients" style={{ marginBottom: "24px" }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="patient"
                label="Patient Name"
                rules={[{ required: true, message: "Please select a patient" }]}
              >
                <Select placeholder="Select patient">
                  {patients.map((patient) => (
                    <Option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.contact}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="discipline" label="Discipline">
                <Select placeholder="Select discipline">
                  {disciplines.map((discipline) => (
                    <Option key={discipline} value={discipline}>
                      {discipline}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="service" label="Service">
            <Input placeholder="Write or select Services" />
          </Form.Item>
        </Card>

        <Card title="Specialist Details" style={{ marginBottom: "24px" }}>
          <Form.Item
            name="specialist"
            label="Select Specialist"
            rules={[{ required: true, message: "Please select a specialist" }]}
          >
            <Select placeholder="Select specialist">
              {specialists.map((specialist) => (
                <Option key={specialist.id} value={specialist.id}>
                  {specialist.name} ({specialist.discipline})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Radio.Group>
              <Radio value="scheduled">Scheduled</Radio>
              <Radio value="confirmed">Confirmed</Radio>
              <Radio value="completed">Completed</Radio>
            </Radio.Group>
          </Form.Item>
        </Card>

        <Card title="Select Date and Time" style={{ marginBottom: "24px" }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="date"
                label="Appointment Date"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  // onChange={handleDateSelect}
                />
              </Form.Item>

              <Form.Item name="availability" label="Availability">
                <Radio.Group>
                  <Radio value="available">Available</Radio>
                  <Radio value="unavailable">Unavailable</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <div style={{ border: "1px solid #d9d9d9", borderRadius: "4px" }}>
                <Calendar
                  fullscreen={false}
                  // onSelect={handleDateSelect}
                  headerRender={() => null}
                />
              </div>
            </Col>
          </Row>
        </Card>

        <Card title="Documents" style={{ marginBottom: "24px" }}>
          <Form.Item name="documents" label="Upload attachment">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
        </Card>

        <Card title="Additional Information" style={{ marginBottom: "24px" }}>
          <Form.Item name="note" label="Note">
            <TextArea rows={4} placeholder="Write note here" />
          </Form.Item>
        </Card>

        <Divider />

        <Form.Item>
          <Row gutter={16}>
            <Col>
              <Button type="primary" htmlType="submit" size="large">
                Save Now
              </Button>
            </Col>
            <Col>
              <Button size="large">Cancel</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AppointmentForm;
