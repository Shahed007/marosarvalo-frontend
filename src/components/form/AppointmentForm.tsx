/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Radio,
  Upload,
  Button,
  Card,
  Row,
  Col,
  Calendar,
  Typography,
  Space,
} from "antd";
import {
  PlusOutlined,
  LinkOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Mock data
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

  const timeSlots = [
    "10:00am - 12:30pm",
    "10:30am - 12:30pm",
    "12:00pm - 2:00pm",
    "2:00pm - 4:00pm",
  ];

  const handleSubmit = (values: any) => {
    console.log("Form values:", { ...values, date: selectedDate, timeSlot: selectedTimeSlot });
  };

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

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

  const selectedPatientData = patients.find((p) => p.id === selectedPatient);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <Title level={2} style={{ margin: 0 }}>
          Appointments
        </Title>
      </div>

      {/* Search & Actions */}
      <Space
        direction="horizontal"
        size="middle"
        className="w-full flex-wrap mb-6"
        align="start"
      >
        <Input
          size="large"
          placeholder="Search Patients"
          prefix={<SearchOutlined />}
          className="flex-1 !min-w-[715px]"
        />
        <Button size="large" icon={<PlusOutlined />} className="min-w-[150px]">
          Add Patients
        </Button>
        <Button size="large" type="primary" icon={<LinkOutlined />} className="min-w-[180px]">
          Generate copy link
        </Button>
      </Space>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          status: "scheduled",
          availability: "available",
          patient: "1",
          discipline: "Pharmacist",
          specialist: "1",
        }}
      >
        <Row gutter={24}>
          <Col xs={24} lg={14}>
            {/* Patient Info */}
            <Card title="Search Patients" style={{ marginBottom: "24px" }} headStyle={{ backgroundColor: "#fafafa", fontWeight: "bold" }}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="patient"
                    label="Patient Name"
                    rules={[{ required: true, message: "Please select a patient" }]}
                  >
                    <Select placeholder="Select patient" onChange={(value) => setSelectedPatient(value)}>
                      {patients.map((patient) => (
                        <Option key={patient.id} value={patient.id}>
                          {patient.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Contact">
                    <Input value={selectedPatientData?.contact || ""} readOnly className="bg-gray-50" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
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
                <Col xs={24} md={12}>
                  <Form.Item name="service" label="Service">
                    <Input placeholder="Write or select Services" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} justify="space-between" align="middle">
                <Col xs={24} md={12}>
                  <Form.Item
                    name="specialist"
                    label="Select Specialist"
                    rules={[{ required: true, message: "Please select a specialist" }]}
                  >
                    <Select placeholder="Select specialist">
                      {specialists.map((specialist) => (
                        <Select.Option key={specialist.id} value={specialist.id}>
                          {specialist.name} ({specialist.discipline})
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: "Please select a status" }]}
                  >
                    <Radio.Group>
                      <Radio value="scheduled">Scheduled</Radio>
                      <Radio value="confirmed">Confirmed</Radio>
                      <Radio value="completed">Completed</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* Date & Time */}
            <Card title="Select Date and Time" style={{ marginBottom: "24px" }} headStyle={{ backgroundColor: "#fafafa", fontWeight: "bold" }}>
              <Form.Item name="availability" label="Availability">
                <Radio.Group>
                  <Radio value="available">Available</Radio>
                  <Radio value="unavailable">Unavailable</Radio>
                </Radio.Group>
              </Form.Item>

              <Row gutter={16} justify="center" align="middle" className="flex-wrap">
                <Col xs={24} md={12} className="flex justify-center items-center mb-4 md:mb-0">
                  <Form.Item
                    name="date"
                    label="Appointment Date"
                    rules={[{ required: true, message: "Please select a date" }]}
                  >
                    <Calendar fullscreen={false} onSelect={handleDateSelect} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} className="flex flex-col justify-center items-center">
                  <div className="time-slots w-full max-w-xs flex flex-col gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        size="small"
                        onClick={() => setSelectedTimeSlot(slot)}
                        style={{
                          width: "100%",
                          textAlign: "center",
                          padding: "16px",
                          backgroundColor: selectedTimeSlot === slot ? "#E6F7FF" : "#F2F2F2",
                          color: "#225a7f"
                        }}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Documents */}
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Card title="Documents (if available)" style={{ marginBottom: "24px" }} headStyle={{ backgroundColor: "#fafafa", fontWeight: "bold" }}>
              <Form.Item name="documents">
                <Upload.Dragger {...uploadProps} style={{ background: "transparent", border: "2px dashed #d9d9d9", borderRadius: "8px" }}>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">Upload documents</p>
                </Upload.Dragger>
              </Form.Item>
            </Card>
          </Col>
        </Row>

        {/* Note */}
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Card title="Note" style={{ marginBottom: "24px" }} headStyle={{ backgroundColor: "#fafafa", fontWeight: "bold" }}>
              <Form.Item name="note">
                <TextArea rows={4} placeholder="Write note here" style={{ border: "none", boxShadow: "none" }} />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" size="large">
              Save Now
            </Button>
            <Button size="large">Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AppointmentForm;
