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
  Space,
  Spin,
  Input,
  Dropdown,
  Menu,
} from "antd";
import {
  UserOutlined,
  MoreOutlined,
  PlusOutlined,
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Link from "next/link";
import img1 from "@/assets/1.png";
import img2 from "@/assets/2.png";
import img3 from "@/assets/3.png";
import Image from "next/image";
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
  hasActions?: boolean;
}

import type { StaticImageData } from "next/image";

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
    // Navigate to detail page or show modal
    console.log("View details for appointment", id);
  };

  const handleCancelAppointment = (id: string) => {
    // Show confirmation modal before cancel
    console.log("Cancel appointment", id);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSpecialists([
        {
          id: "1",
          name: "Drg Soap Mactavish",
          avatar: img1,
        },
        {
          id: "2",
          name: "Drg Jerald O'Hara",
          avatar: img2,
        },
        {
          id: "3",
          name: "Drg Putri Larasati",
          avatar: img3,
        },
      ]);

      setAppointments([
        {
          id: "1",
          time: "09:00 AM",
          endTime: "10:00 AM",
          patient: "Rafli Janudin",
          type: "General Checkup",
          color: "red",
          specialistId: "1",
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
        },
        {
          id: "3",
          time: "11:00 AM",
          endTime: "12:00 PM",
          patient: "Angkasa Pura",
          type: "Bleaching",
          color: "blue",
          specialistId: "1",
        },
        {
          id: "4",
          time: "12:00 PM",
          endTime: "01:00 PM",
          patient: "Lembayung Senja",
          type: "Extraction",
          color: "blue",
          specialistId: "3",
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

  // Dynamic filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesSpecialist =
        filterSpecialist === "all" || apt.specialistId === filterSpecialist;
      const matchesSearch =
        apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.type.toLowerCase().includes(searchQuery.toLowerCase());
      // Here you can also filter by date if you have a date field for appointment
      return matchesSpecialist && matchesSearch;
    });
  }, [appointments, filterSpecialist, searchQuery]);

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
  ) => {
    return filteredAppointments.filter(
      (apt) => apt.specialistId === specialistId && apt.time === time
    );
  };

  const getTotalAppointmentsForSpecialist = (specialistId: string) =>
    filteredAppointments.filter((apt) => apt.specialistId === specialistId)
      .length;

  const totalAppointments = filteredAppointments.length;

  const handleViewChange = (view: string) => {
    setFilterView(view);
    if (view === "Today") setCurrentDate(dayjs());
  };

  const handlePrev = () => {
    setCurrentDate((prev) =>
      filterView === "Week" ? prev.subtract(1, "week") : prev.subtract(1, "day")
    );
  };

  const handleNext = () => {
    setCurrentDate((prev) =>
      filterView === "Week" ? prev.add(1, "week") : prev.add(1, "day")
    );
  };

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: "80px",
            }}
          >
            <Image
              src={spec?.avatar || "img1"}
              width={52}
              height={52}
              alt="avatar"
            />

            <div>
              <div>{spec.name}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: "5px" }}>
                <span className="text-[#AEB3C1]">Today‘s appointment: </span>
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
                  style={{
                    marginBottom: 6,
                    padding: "8px",
                    borderLeft: `4px solid ${colorStyle.border}`,
                    background: colorStyle.background,
                    color: colorStyle.text,
                    borderRadius: 6,
                    position: "relative",
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    {apt.patient}
                  </div>
                  <div style={{ fontSize: 11 }}>
                    {apt.time} - {apt.endTime}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      backgroundColor: "#fff",
                      color: "black",
                      padding: "4px",
                      borderRadius: "14px",
                      width: 120,
                      textAlign: "center",
                      marginTop: "7px",
                      border: `1px solid ${colorStyle.border}`,
                    }}
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
                        style={{ position: "absolute", top: 4, right: 4 }}
                      />
                    </Dropdown>
                  )}
                </Card>
              );
            })
          ) : (
            <div
              style={{
                fontSize: 12,
                textAlign: "center",
                color: "#9ca3af",
                padding: "8px",
                border: "1px dashed #d1d5db",
                borderRadius: 6,
              }}
            >
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      {/* 🔎 Search + Add */}
      <div
        className="flex flex-wrap gap-2 justify-between items-center"
        style={{ padding: "16px 24px" }}
      >
        <Input
          placeholder="Search patient or type"
          allowClear
          style={{ width: "100%", maxWidth: 500, height: 37 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link href={"/clinic/appointment/add-appointment"}>
          <Button
            className="!p-4 border-primary"
            type="primary"
            icon={<PlusOutlined />}
          >
            Add New Appointment
          </Button>
        </Link>
      </div>

      {/* 📅 Filters */}
      <Header style={{ background: "#fff", padding: "16px 24px" }}>
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Left */}
          <Space size={16} wrap>
            <CalendarOutlined
              style={{
                color: "#80889E",
                fontSize: 18,
                backgroundColor: "#E9EAEC",
                padding: "8px",
                borderRadius: "7px",
              }}
            />
            <Text strong style={{ fontSize: 16 }}>
              {totalAppointments}
            </Text>
            <Text>total appointments</Text>
          </Space>

          {/* Middle */}
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              type={filterView === "Today" ? "primary" : "default"}
              onClick={() => handleViewChange("Today")}
            >
              Today
            </Button>
            <Button icon={<LeftOutlined />} onClick={handlePrev} />
            <Button icon={<RightOutlined />} onClick={handleNext} />
            <Text strong>{formattedDate}</Text>
            <Button
              type={filterView === "Day" ? "primary" : "default"}
              onClick={() => handleViewChange("Day")}
            >
              Day
            </Button>
            <Button
              type={filterView === "Week" ? "primary" : "default"}
              onClick={() => handleViewChange("Week")}
            >
              Week
            </Button>
          </div>

          {/* Right */}
          <Select
            value={filterSpecialist}
            style={{ width: "100%", maxWidth: 200 }}
            onChange={(value) => setFilterSpecialist(value)}
            suffixIcon={<UserOutlined />}
          >
            <Option value="all">Specialist</Option>
            {specialists.map((spec) => (
              <Option key={spec.id} value={spec.id}>
                {spec.name}
              </Option>
            ))}
          </Select>
        </div>
      </Header>

      {/* Table */}
      <Content style={{ padding: "24px" }}>
        <Card style={{ borderColor: "#e5e7eb", borderRadius: "8px" }}>
          <Table
            columns={columns}
            dataSource={dataSource}
            bordered
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        </Card>
      </Content>
    </Layout>
  );
}
