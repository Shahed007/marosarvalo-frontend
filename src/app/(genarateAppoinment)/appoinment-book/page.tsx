"use client";
import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, Typography } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import Link from "next/link";

// import Calendar from "react-calendar"; // <-- Import react-calendar
// import "react-calendar/dist/Calendar.css";
// Optional base styles (we'll override with Tailwind)

const { Title } = Typography;

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(2025, 4, 18)
  ); // May 18, 2025
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

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
  const [selectedDiscipline, setSelectedDiscipline] = useState<
    string | undefined
  >(undefined);

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

  // Time slots (can be filtered per day later)
  const timeSlots = ["10:00am - 12:30pm", "1:00pm - 3:00pm", "3:30pm - 5:00pm"];

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full mx-auto bg-white font-sans sm:w-[500px] md:w-[650px] lg:w-[790px]">
      <div className="text-center  mb-[60px]">
        <Title className="!text-[24px] sm:!text-[35px] md:!text-[40px] lg:!text-[50px] !font-[500] !text-[#0B121B] text-center">
          Book Your Physiotherapy Appointment Easily
        </Title>
        <p>
          Your path to recovery starts here. Select a date and time that works
          for you.
        </p>
      </div>

      <Form
        className="w-full  mx-auto"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        {/* Patient Info */}
        <Row gutter={16} className="mb-6 ">
          <Col xs={24} md={12}>
            <Form.Item name="patient" label="Your Name">
              <Input placeholder="Write your name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="contact" label="Contact">
              <Input />
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
            <Form.Item name="note" label="Note">
              <Input placeholder="Write or select Note" />
            </Form.Item>
          </Col>
        </Row>

        {/* Date & Time Selection */}
        <h3 className="text-[16px] font-[600] text-[#0B121B] mb-3">
          Select Date and Time
        </h3>
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200 mb-6">
          <Row
            gutter={[
              { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 }, // horizontal
              { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 }, // vertical
            ]}
            align="top"
          >
            {/* Custom Calendar */}
            <Col xs={24} md={12}>
              <div className="flex items-center justify-start gap-3 mb-3">
                <span className="text-xs text-primary font-semibold">
                  • Available
                </span>
                <span className="text-xs text-gray-500">• Unavailable</span>
              </div>

              <div className="relative border border-gray-200 rounded-md overflow-hidden bg-white">
                {/* Month Navigation */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gray-50 border-b border-gray-200">
                  <button
                    onClick={() =>
                      setSelectedDate((prev) => {
                        const d = new Date(prev!);
                        d.setMonth(d.getMonth() - 1);
                        return d;
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20 10C20 15.5229 15.5229 20 10 20C4.4772 20 0 15.5229 0 10C0 4.4772 4.4772 0 10 0C15.5229 0 20 4.4772 20 10ZM9.7071 7.7071C10.0976 7.3166 10.0976 6.6834 9.7071 6.2929C9.3166 5.9024 8.6834 5.9024 8.2929 6.2929L5.3799 9.2059C5.13 9.4352 5 9.7024 5 10C5 10.2976 5.13 10.5648 5.3363 10.748L8.2929 13.7071C8.6834 14.0976 9.3166 14.0976 9.7071 13.7071C10.0976 13.3166 10.0976 12.6834 9.7071 12.2929L8.4142 11H14C14.5523 11 15 10.5523 15 10C15 9.4477 14.5523 9 14 9H8.4142L9.7071 7.7071Z"
                        fill="#225A7F"
                      />
                    </svg>
                  </button>

                  <span className="font-medium text-gray-800 text-xs sm:text-sm">
                    {selectedDate?.toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <button
                    onClick={() =>
                      setSelectedDate((prev) => {
                        const d = new Date(prev!);
                        d.setMonth(d.getMonth() + 1);
                        return d;
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
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10.2929 12.2929C9.9024 12.6834 9.9024 13.3166 10.2929 13.7071C10.6834 14.0976 11.3166 14.0976 11.7071 13.7071L14.6201 10.7941C14.87 10.5648 15 10.2976 15 10C15 9.7024 14.87 9.4352 14.6637 9.252L11.7071 6.29289C11.3166 5.90237 10.6834 5.90237 10.2929 6.29289C9.9024 6.68342 9.9024 7.31658 10.2929 7.70711L11.5858 9H6C5.44772 9 5 9.4477 5 10C5 10.5523 5.44772 11 6 11H11.5858L10.2929 12.2929Z"
                        fill="#225A7F"
                      />
                    </svg>
                  </button>
                </div>

                {/* Days of Week */}
                <div className="grid grid-cols-7 text-center text-[10px] sm:text-xs font-medium text-gray-500 py-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div key={day} className="px-1">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 p-1 sm:p-2 w-fit mx-auto place-items-center">
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
                  w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm
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
            <Col xs={24} md={12}>
              <div className="space-y-2 mt-10 md:mt-[100px]">
                {timeSlots?.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`
              w-full p-2 text-center text-sm border !text-[#0B121B] bg-[#F2F2F2] rounded-md transition-colors
              ${
                selectedTimeSlot === slot
                  ? "bg-blue-50 text-[#225A7F] cursor-pointer border-0"
                  : "border-gray-300 hover:bg-[#225A7F] hover:!text-white cursor-pointer"
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

        {/* Action Buttons */}
        <Form.Item className="flex justify-center items-center">
          <Row gutter={16}>
            <Col>
              <Link href={'/captcha-verify'}>
              <Button
                style={{
                  padding: "12px 16px",
                }}
                type="primary"
                htmlType="submit"
                size="large"
                className=" text-white px-6 !bg-[#225A7F]"
              >
                Submit Now
              </Button>
              </Link>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AppointmentForm;
