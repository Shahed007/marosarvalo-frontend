"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Radio,
  Upload,
  Button,
  Row,
  Col,
  Typography,

  Divider,
} from "antd";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
// import Calendar from "react-calendar"; // <-- Import react-calendar
import "react-calendar/dist/Calendar.css"; // Optional base styles (we'll override with Tailwind)

const { TextArea } = Input;
const { Title } = Typography;

// Define types
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

type AppointmentStatus = "scheduled" | "confirmed" | "completed";

interface AppointmentFormData {
  patient: string;
  contact?: string;
  discipline?: string;
  service?: string;
  specialist: string;
  status: AppointmentStatus;
  date?: Date; // Now stores actual Date object
  timeSlot?: string;
  documents?: UploadFile[];
  note?: string;
}

interface AppointmentFormProps {
  [key: string]: unknown;
}

const AppointmentForm: React.FC<AppointmentFormProps> = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(2025, 4, 18)
  ); // May 18, 2025
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Mock data
  const patients: readonly Patient[] = [
    { id: "1", name: "Jhon bin kuna", contact: "+12 1245 1524" },
    { id: "2", name: "Sarah Johnson", contact: "+12 3456 7890" },
    { id: "3", name: "Michael Smith", contact: "+12 5555 1234" },
  ];

  const specialists: readonly Specialist[] = [
    { id: "1", name: "Dr. Olivia", discipline: "Pharmacist" },
    { id: "2", name: "Dr. James", discipline: "Cardiologist" },
    { id: "3", name: "Dr. Emma", discipline: "Neurologist" },
  ];

  const disciplines = [
    "Pharmacist",
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
  ] as const;

  // State for dynamic filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<
    string | undefined
  >(undefined);

  // Filtered patients based on search term
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contact.includes(searchTerm)
  );

  // Filtered specialists by selected discipline
  const availableSpecialists = selectedDiscipline
    ? specialists.filter((s) => s.discipline === selectedDiscipline)
    : specialists;

  // Handle form submission
  const handleSubmit = (
    values: Omit<AppointmentFormData, "date"> & { date?: string }
  ) => {
    const formattedDate = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : undefined;
    console.log("Submitted values:", {
      ...values,
      date: formattedDate,
      timeSlot: selectedTimeSlot,
    });
    alert(`Appointment saved for ${formattedDate} at ${selectedTimeSlot}`);
  };

  // Handle discipline change
  const handleDisciplineChange = (value: string) => {
    setSelectedDiscipline(value);
    form.setFieldsValue({ specialist: undefined });
  };

  // Update contact field when patient is selected
  const handlePatientChange = (value: string) => {
    const patient = patients.find((p) => p.id === value);
    if (patient) {
      form.setFieldsValue({ contact: patient.contact });
    }
  };

  // File upload props
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

  // Time slots (can be filtered per day later)
  const timeSlots = ["10:00am - 12:30pm", "1:00pm - 3:00pm", "3:30pm - 5:00pm"];

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full mx-auto bg-white font-sans">
      <Title level={2} className="mb-6 text-gray-800">
        Appointments
      </Title>

      {/* Search Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <Input
          placeholder="Search Patients"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          suffix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
          style={{ flex: 1, minWidth: 200 }}
          className="rounded-lg"
        />
        <Button
          size="middle"
          className="bg-blue-100 text-blue-700 border-none hover:bg-blue-200 rounded-md"
        >
          <span className="mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                opacity="0.8"
                d="M8.39296 15.1802C7.52412 14.2855 7.0387 13.0871 7.04 11.84C7.04 10.7597 7.39712 9.76192 8 8.96H1.92C1.41078 8.96 0.922425 9.16228 0.562355 9.52235C0.202285 9.88242 0 10.3708 0 10.88V11.3376C0 13.7171 2.6944 15.36 6.4 15.36C7.06843 15.3614 7.73557 15.3012 8.39296 15.1802ZM10.24 3.84C10.24 2.82157 9.83543 1.84485 9.11529 1.12471C8.39515 0.40457 7.41843 0 6.4 0C5.38157 0 4.40485 0.40457 3.68471 1.12471C2.96457 1.84485 2.56 2.82157 2.56 3.84C2.56 4.85843 2.96457 5.83515 3.68471 6.55529C4.40485 7.27543 5.38157 7.68 6.4 7.68C7.41843 7.68 8.39515 7.27543 9.11529 6.55529C9.83543 5.83515 10.24 4.85843 10.24 3.84ZM11.84 16C12.9433 16 14.0014 15.5617 14.7816 14.7816C15.5617 14.0014 16 12.9433 16 11.84C16 10.7367 15.5617 9.67859 14.7816 8.89844C14.0014 8.11828 12.9433 7.68 11.84 7.68C10.7367 7.68 9.67859 8.11828 8.89844 8.89844C8.11828 9.67859 7.68 10.7367 7.68 11.84C7.68 12.9433 8.11828 14.0014 8.89844 14.7816C9.67859 15.5617 10.7367 16 11.84 16ZM11.84 8.96C11.9249 8.96 12.0063 8.99371 12.0663 9.05373C12.1263 9.11374 12.16 9.19513 12.16 9.28V11.52H14.4C14.4849 11.52 14.5663 11.5537 14.6263 11.6137C14.6863 11.6737 14.72 11.7551 14.72 11.84C14.72 11.9249 14.6863 12.0063 14.6263 12.0663C14.5663 12.1263 14.4849 12.16 14.4 12.16H12.16V14.4C12.16 14.4849 12.1263 14.5663 12.0663 14.6263C12.0063 14.6863 11.9249 14.72 11.84 14.72C11.7551 14.72 11.6737 14.6863 11.6137 14.6263C11.5537 14.5663 11.52 14.4849 11.52 14.4V12.16H9.28C9.19513 12.16 9.11374 12.1263 9.05373 12.0663C8.99371 12.0063 8.96 11.9249 8.96 11.84C8.96 11.7551 8.99371 11.6737 9.05373 11.6137C9.11374 11.5537 9.19513 11.52 9.28 11.52H11.52V9.28C11.52 9.19513 11.5537 9.11374 11.6137 9.05373C11.6737 8.99371 11.7551 8.96 11.84 8.96Z"
                fill="#0B121B"
              />
            </svg>
          </span>{" "}
          Add Patients
        </Button>
        <Button
          type="primary"
          size="middle"
          className="bg-blue-100 text-blue-700 border-none hover:bg-blue-200 rounded-lg"
        >
          Generate copy link
        </Button>
      </div>

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
        {/* Patient Info */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} md={12}>
            <Form.Item
              name="patient"
              label="Patient Name"
              rules={[{ required: true, message: "Please select a patient" }]}
            >
              <Select
                placeholder="Select patient"
                showSearch
                optionFilterProp="children"
                filterOption={false}
                onSelect={handlePatientChange}
                options={filteredPatients.map((patient) => ({
                  value: patient.id,
                  label: (
                    <div key={patient.id} className="flex flex-col">
                      <span className="font-medium">{patient.name}</span>
                      {/* <span className="text-sm text-gray-500">{patient.contact}</span> */}
                    </div>
                  ),
                }))}
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="contact" label="Contact">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        {/* Discipline & Service */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} md={12}>
            <Form.Item
              name="discipline"
              label="Discipline"
              rules={[
                { required: true, message: "Please select a discipline" },
              ]}
            >
              <Select
                placeholder="Select discipline"
                onChange={handleDisciplineChange}
              >
                {disciplines.map((discipline) => (
                  <Select.Option key={discipline} value={discipline}>
                    {discipline}
                  </Select.Option>
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

        {/* Specialist & Status */}
        <Row gutter={16} className="mb-6">
          <Col xs={24} md={12}>
            <Form.Item
              name="specialist"
              label="Select Specialist"
              rules={[
                { required: true, message: "Please select a specialist" },
              ]}
            >
              <Select placeholder="Select specialist">
                {availableSpecialists.map((specialist) => (
                  <Select.Option key={specialist.id} value={specialist.id}>
                    {specialist.name} ({specialist.discipline})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="status" label="Status">
              <Radio.Group>
                <Radio value="scheduled">Scheduled</Radio>
                <Radio value="confirmed">Confirmed</Radio>
                <Radio value="completed">Completed</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        {/* Date & Time Selection */}
        {/* // Replace the entire "Date & Time Selection" section */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Select Date and Time
          </h3>
          <Row gutter={24}>
            {/* Custom Calendar */}
            <Col span={12}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-blue-600 font-semibold">
                  • Available
                </span>
                <span className="text-xs text-gray-500">• Unavailable</span>
              </div>

              <div className="relative border border-gray-200 rounded-md overflow-hidden bg-white">
                {/* Month Navigation */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                  <button
                    onClick={() =>
                      setSelectedDate((prev) => {
                        const newDate = new Date(prev!);
                        newDate.setMonth(newDate.getMonth() - 1);
                        return newDate;
                      })
                    }
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20 10C20 15.5229 15.5229 20 10 20C4.4772 20 0 15.5229 0 10C0 4.4772 4.4772 0 10 0C15.5229 0 20 4.4772 20 10ZM9.7071 7.7071C10.0976 7.3166 10.0976 6.6834 9.7071 6.2929C9.3166 5.9024 8.6834 5.9024 8.2929 6.2929L5.3799 9.2059C5.3649 9.2209 5.3503 9.2363 5.3363 9.252C5.13 9.4352 5 9.7024 5 10C5 10.2976 5.13 10.5648 5.3363 10.748C5.3503 10.7637 5.3649 10.7791 5.3799 10.7941L8.2929 13.7071C8.6834 14.0976 9.3166 14.0976 9.7071 13.7071C10.0976 13.3166 10.0976 12.6834 9.7071 12.2929L8.4142 11L14 11C14.5523 11 15 10.5523 15 10C15 9.4477 14.5523 9 14 9L8.4142 9L9.7071 7.7071Z"
                        fill="#225A7F"
                      />
                    </svg>
                  </button>
                  <span className="font-medium text-gray-800 text-sm">
                    {selectedDate?.toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={() =>
                      setSelectedDate((prev) => {
                        const newDate = new Date(prev!);
                        newDate.setMonth(newDate.getMonth() + 1);
                        return newDate;
                      })
                    }
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10.2929 12.2929C9.9024 12.6834 9.9024 13.3166 10.2929 13.7071C10.6834 14.0976 11.3166 14.0976 11.7071 13.7071L14.6201 10.7941C14.6351 10.7791 14.6497 10.7637 14.6637 10.748C14.87 10.5648 15 10.2976 15 10C15 9.7024 14.87 9.4352 14.6637 9.252C14.6497 9.2363 14.6351 9.2209 14.6201 9.2059L11.7071 6.29289C11.3166 5.90237 10.6834 5.90237 10.2929 6.29289C9.9024 6.68342 9.9024 7.31658 10.2929 7.70711L11.5858 9H6C5.44772 9 5 9.4477 5 10C5 10.5523 5.44772 11 6 11H11.5858L10.2929 12.2929Z"
                        fill="#225A7F"
                      />
                    </svg>
                  </button>
                </div>

                {/* Days of Week */}
                <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 py-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div key={day} className="px-1">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 p-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i + 1;
                    const date = new Date(
                      selectedDate!.getFullYear(),
                      selectedDate!.getMonth(),
                      day
                    );
                    const isCurrentMonth =
                      date.getMonth() === selectedDate!.getMonth();
                    const isSelected =
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString();
                    const isToday =
                      date.toDateString() === new Date().toDateString();

                    return (
                      <button
                        key={day}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTimeSlot(null);
                        }}
                        disabled={!isCurrentMonth}
                        className={`
                  w-8 h-8 flex items-center justify-center text-sm
                  ${
                    isCurrentMonth
                      ? "cursor-pointer"
                      : "opacity-50 cursor-default"
                  }
                  ${isSelected ? "bg-[#225A7F] text-white rounded-full" : ""}
                  ${
                    isToday && !isSelected
                      ? "bg-blue-100 text-blue-800 rounded-full"
                      : ""
                  }
                  hover:bg-gray-100 transition-colors
                `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Col>

            {/* Time Slots */}
            <Col span={12}>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Available Time Slots
              </h4>
              <div className="space-y-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`
              w-full p-2 text-left text-sm border rounded-md transition-colors
              ${
                selectedTimeSlot === slot
                  ? "border-[#225A7F] bg-blue-50 text-blue-800"
                  : "border-gray-300 hover:bg-gray-100 text-gray-700"
              }
            `}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </Col>
          </Row>
        </div>

        {/* Documents */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Documents (if available)
          </h3>
          <Form.Item name="documents" valuePropName="fileList">
            <Upload {...uploadProps} accept=".pdf,.doc,.docx" maxCount={1}>
              <Button
                block
                icon={<UploadOutlined />}
                className="border-dashed border-2 border-gray-300 text-gray-500 hover:text-gray-700"
              >
                Upload attachment
              </Button>
            </Upload>
          </Form.Item>
        </div>

        {/* Note */}
        <Form.Item name="note" label="Note">
          <TextArea rows={3} placeholder="Write note here" />
        </Form.Item>

        <Divider />

        {/* Action Buttons */}
        <Form.Item>
          <Row gutter={16}>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="bg-blue-700 hover:bg-blue-800 text-white px-6"
              >
                Save Now
              </Button>
            </Col>
            <Col>
              <Button
                size="large"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 px-6"
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AppointmentForm;
