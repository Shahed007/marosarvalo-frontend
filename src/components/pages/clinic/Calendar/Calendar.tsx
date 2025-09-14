/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Layout,
  Button,
  Card,
  Select,
  Typography,
  Table,
  Spin,
  Input,
  Dropdown,
  Menu,
  Switch,
} from "antd";
import {
  UserOutlined,
  MoreOutlined,
  PlusOutlined,
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Link from "next/link";
import img1 from "@/assets/1.png";
import img2 from "@/assets/2.png";
import img3 from "@/assets/3.png";
import Image, { StaticImageData } from "next/image";
import Title from "antd/es/typography/Title";

const { Header, Content } = Layout;
const { Option } = Select;
const { Text } = Typography;

interface Appointment {
  id: string;
  time: string;
  endTime: string;
  patient: string;
  type: string;
  color: string;
  specialistId: string;
  date: string;
  hasActions?: boolean;
}

interface Specialist {
  id: string;
  name: string;
  avatar: string | StaticImageData;
}

export default function Calendar() {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [filterSpecialist, setFilterSpecialist] = useState<string>("all");
  const [filterView, setFilterView] = useState<string>("Today");
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleViewDetails = (id: string) => {
    console.log("View details for appointment", id);
  };

  const handleCancelAppointment = (id: string) => {
    console.log("Cancel appointment", id);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSpecialists([
        { id: "1", name: "Drg Soap Mactavish", avatar: img1 },
        { id: "2", name: "Drg Jerald O'Hara", avatar: img2 },
        { id: "3", name: "Drg Putri Larasati", avatar: img3 },
      ]);

      // Added date field dynamically
      setAppointments([
        {
          id: "1",
          time: "09:00 AM",
          endTime: "10:00 AM",
          patient: "Rafli Janudin",
          type: "General Checkup",
          color: "red",
          specialistId: "1",
          date: dayjs().format("YYYY-MM-DD"),
          hasActions: true,
        },
        {
          id: "2",
          time: "10:00 AM",
          endTime: "11:00 AM",
          patient: "Sekar Nandita",
          type: "Scaling",
          color: "green",
          specialistId: "2",
          date: dayjs().format("YYYY-MM-DD"),
        },
        {
          id: "3",
          time: "11:00 AM",
          endTime: "12:00 PM",
          patient: "Angkasa Pura",
          type: "Bleaching",
          color: "blue",
          specialistId: "1",
          date: dayjs().add(1, "day").format("YYYY-MM-DD"),
        },
        {
          id: "4",
          time: "12:00 PM",
          endTime: "01:00 PM",
          patient: "Lembayung Senja",
          type: "Extraction",
          color: "blue",
          specialistId: "3",
          date: dayjs().add(2, "day").format("YYYY-MM-DD"),
        },
      ]);

      setTimeSlots([
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Dynamic filtered appointments (date + search + specialist)
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesSpecialist =
        filterSpecialist === "all" || apt.specialistId === filterSpecialist;
      const matchesSearch =
        apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.type.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by date
      let matchesDate = true;
      if (filterView === "Today")
        matchesDate = dayjs(apt.date).isSame(dayjs(), "day");
      else if (filterView === "Day")
        matchesDate = dayjs(apt.date).isSame(currentDate, "day");
      else if (filterView === "Week")
        matchesDate = dayjs(apt.date).isSame(currentDate, "week");

      return matchesSpecialist && matchesSearch && matchesDate;
    });
  }, [appointments, filterSpecialist, searchQuery, currentDate, filterView]);

  const getAppointmentColorClasses = (color: string) => {
    switch (color) {
      case "red":
        return { background: "#FEF7F7", text: "#991b1b", border: "#991b1b" };
      case "green":
        return { background: "#dcfce7", border: "#22c55e", text: "#14532d" };
      case "blue":
        return { background: "#dbeafe", border: "#3b82f6", text: "#1e3a8a" };
      default:
        return { background: "#f3f4f6", border: "#9ca3af", text: "#111827" };
    }
  };

  const getAppointmentForSpecialistAndTime = (
    specialistId: string,
    time: string
  ) =>
    filteredAppointments.filter(
      (apt) => apt.specialistId === specialistId && apt.time === time
    );

  const getTotalAppointmentsForSpecialist = (specialistId: string) =>
    filteredAppointments.filter((apt) => apt.specialistId === specialistId)
      .length;

  const totalAppointments = filteredAppointments.length;

  const handleViewChange = (view: string) => {
    setFilterView(view);
    if (view === "Today") setCurrentDate(dayjs());
  };

  const handlePrev = () =>
    setCurrentDate((prev) =>
      filterView === "Week" ? prev.subtract(1, "week") : prev.subtract(1, "day")
    );
  const handleNext = () =>
    setCurrentDate((prev) =>
      filterView === "Week" ? prev.add(1, "week") : prev.add(1, "day")
    );

  const formattedDate =
    filterView === "Week"
      ? `${currentDate.startOf("week").format("DD MMM")} - ${currentDate
          .endOf("week")
          .format("DD MMM YYYY")}`
      : currentDate.format("ddd, DD MMM YYYY");

  const columns: any[] = [
    {
      title: "GMT +07:00",
      dataIndex: "time",
      key: "time",
      fixed: "left" as const,
      width: 120,
    },
    ...specialists
      .filter(
        (spec) => filterSpecialist === "all" || spec.id === filterSpecialist
      )
      .map((spec) => ({
        title: (
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 items-center">
            <Image
              src={spec.avatar || img1}
              width={48}
              height={48}
              alt="avatar"
              className="rounded-full"
            />
            <div className="text-center sm:text-left">
              <div>{spec.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                <span className="text-gray-400">Today‘s appointment: </span>
                <span>
                  {getTotalAppointmentsForSpecialist(spec.id)} patient(s)
                </span>
              </div>
            </div>
          </div>
        ),
        dataIndex: spec.id,
        key: spec.id,
        render: (appointments: Appointment[]) =>
          appointments?.length ? (
            appointments.map((apt) => {
              const colorStyle = getAppointmentColorClasses(apt.color);
              return (
                <Card
                  key={apt.id}
                  size="small"
                  className="mb-2 relative rounded-md"
                  style={{
                    borderLeft: `4px solid ${colorStyle.border}`,
                    background: colorStyle.background,
                    color: colorStyle.text,
                  }}
                >
                  <div className="font-semibold text-sm">{apt.patient}</div>
                  <div className="text-xs">
                    {apt.time} - {apt.endTime}
                  </div>
                  <div
                    className="text-[11px] bg-white text-black px-2 py-0.5 rounded-full mt-1 w-fit border"
                    style={{ borderColor: colorStyle.border }}
                  >
                    {apt.type}
                  </div>
                  {apt.hasActions && (
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key="view"
                            onClick={() => handleViewDetails(apt.id)}
                          >
                            View Details
                          </Menu.Item>
                          <Menu.Item
                            key="cancel"
                            onClick={() => handleCancelAppointment(apt.id)}
                          >
                            Cancel Appointment
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <Button
                        type="text"
                        icon={<MoreOutlined />}
                        size="small"
                        className="absolute top-1 right-1"
                      />
                    </Dropdown>
                  )}
                </Card>
              );
            })
          ) : (
            <div className="text-xs text-center text-gray-400 p-2 border border-dashed rounded-md">
              Not Available
            </div>
          ),
      })),
  ];

  const dataSource = timeSlots.map((time, index) => {
    const row: any = { key: index, time };
    specialists
      .filter(
        (spec) => filterSpecialist === "all" || spec.id === filterSpecialist
      )
      .forEach((spec) => {
        row[spec.id] = getAppointmentForSpecialistAndTime(spec.id, time);
      });
    return row;
  });

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <Layout className="min-h-screen bg-white ">
      {/* 🔎 Search + Add */}
      <div className="ms-6 ">
        <Title level={2}>Calendar</Title>
      </div>
      <div className="flex flex-wrap gap-2 justify-between items-center p-4 md:p-6 lg:p-8 mb-8 sm:p-6">
        <Input
          placeholder="Search patient or type"
          allowClear
          size="large"
          addonAfter={<SearchOutlined />}
          className="w-full sm:w-auto sm:flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link
          href={"/clinic/appointment/add-appointment"}
          className="w-full sm:w-auto"
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="w-full sm:w-auto mt-2 sm:mt-0"
          >
            Add New Appointment
          </Button>
        </Link>
      </div>

      {/* 📅 Filters */}
      <Header className="bg-white p-4 sm:p-4 flex flex-col sm:flex-row sm:justify-center items-center gap-4 rounded-lg">
        {/* Left: Total appointments */}

        <div className="flex flex-row items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
          <CalendarOutlined className="bg-gray-200 text-gray-600 p-2 rounded-md text-lg" />
          <div className="flex flex-col">
            <Text strong className="text-lg whitespace-nowrap leading-none">
              {totalAppointments} <span>total appointments</span>
            </Text>
          </div>
        </div>

        {/* Center: View buttons + switch */}
        <div className="flex flex-wrap sm:flex-row items-center justify-center gap-2 w-full">
          {/* Buttons + Date */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
            <Button
              className="!ms-1"
              type={filterView === "Today" ? "primary" : "default"}
              onClick={() => handleViewChange("Today")}
            >
              Today
            </Button>
            <Button
              className="!ms-1"
              icon={<LeftOutlined />}
              onClick={handlePrev}
            />
            <Button
              className="!ms-1"
              icon={<RightOutlined />}
              onClick={handleNext}
            />
            <Text strong className="px-2 whitespace-nowrap">
              {formattedDate}
            </Text>
          </div>

          {/* Switch */}
          <div className="w-full sm:w-auto flex justify-center mt-2 sm:mt-0">
            <Switch
              checked={filterView === "Week"}
              onChange={(checked) => handleViewChange(checked ? "Week" : "Day")}
              checkedChildren="Week"
              unCheckedChildren="Day"
            />
          </div>
        </div>

        {/* Right: Specialist select */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-2 sm:mt-0">
          <Select
            value={filterSpecialist}
            className="w-full sm:w-64 min-w-[160px]"
            onChange={(value) => setFilterSpecialist(value)}
            suffixIcon={<UserOutlined />}
            placeholder="Select Specialist"
          >
            <Option value="all">All Specialists</Option>
            {specialists.map((spec) => (
              <Option key={spec.id} value={spec.id}>
                {spec.name}
              </Option>
            ))}
          </Select>
        </div>
      </Header>

      {/* Table */}
      <Content className="p-4 sm:p-6 mt-38 sm:mt-0 mb-12">
        <div className="overflow-x-auto">
          <Card className="rounded-lg border-gray-200">
            <Table
              columns={columns}
              dataSource={dataSource}
              bordered
              pagination={false}
              scroll={{ x: "max-content" }}
            />
          </Card>
        </div>
      </Content>
    </Layout>
  );
}
