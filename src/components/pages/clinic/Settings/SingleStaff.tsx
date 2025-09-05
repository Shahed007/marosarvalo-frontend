/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, Button, Card, Tabs, Table, Select, Pagination } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import ProfileEditDrawer from "./ProfileEditDrawer";
import { useState } from "react";
import AddWorkingHourStaff from "./AddWorkingHourStaff";
import EditWorkingHourStaff from "./EditWorkingHourStaff";
import dayjs, { Dayjs } from "dayjs";
import AddHolidayDrawer from "./AddHolidayDrawer";
import EditHolidayDrawer from "./EditHolidayDrawer";

const { TabPane } = Tabs;

interface WorkingDay {
  key: string;
  day: string;
  time: string;
  hours: string;
  startTime?: Dayjs | null;
  endTime?: Dayjs | null;
}

interface Holiday {
  key: string;
  date: string;
  day: string;
  reason: string;
  actions: boolean;
}

interface WorkingHoursData {
  profession: string;
  workingHours: {
    [key: string]: [Dayjs | null, Dayjs | null];
  };
}

export default function SingleStaff() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerOpenForAddWorkingHour, setDrawerOpenForAddWorkingHour] =
    useState(false);
  const [editDrawerForWorkingHour, setEditDrawerForWorkingHour] =
    useState(false);

  const [addHoliday, setAddHoliday] = useState(false);
  const [editHolday, setEditHoliday] = useState(false);

  const [selectedDay, setSelectedDay] = useState<WorkingDay | null>(null);
  const [activeTab, setActiveTab] = useState<string>("working-hour");

  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([
    {
      key: "1",
      day: "Sunday",
      time: "09:00 AM-5:00 PM",
      hours: "8 Hours",
      startTime: dayjs("09:00", "HH:mm"),
      endTime: dayjs("17:00", "HH:mm"),
    },
    {
      key: "2",
      day: "Monday",
      time: "09:00 AM-5:00 PM",
      hours: "8 Hours",
      startTime: dayjs("09:00", "HH:mm"),
      endTime: dayjs("17:00", "HH:mm"),
    },
    {
      key: "3",
      day: "Tuesday",
      time: "09:00 AM-5:00 PM",
      hours: "8 Hours",
      startTime: dayjs("09:00", "HH:mm"),
      endTime: dayjs("17:00", "HH:mm"),
    },
    {
      key: "4",
      day: "Wednesday",
      time: "09:00 AM-5:00 PM",
      hours: "8 Hours",
      startTime: dayjs("09:00", "HH:mm"),
      endTime: dayjs("17:00", "HH:mm"),
    },
    {
      key: "5",
      day: "Thursday",
      time: "09:00 AM-5:00 PM",
      hours: "8 Hours",
      startTime: dayjs("09:00", "HH:mm"),
      endTime: dayjs("17:00", "HH:mm"),
    },
    {
      key: "6",
      day: "Friday",
      time: "09:00 AM-5:00 PM",
      hours: "8 Hours",
      startTime: dayjs("09:00", "HH:mm"),
      endTime: dayjs("17:00", "HH:mm"),
    },
    {
      key: "7",
      day: "Saturday",
      time: "09:00 AM-5:00 PM",
      hours: "8 Hours",
      startTime: dayjs("09:00", "HH:mm"),
      endTime: dayjs("17:00", "HH:mm"),
    },
  ]);

  const [holidays, setHolidays] = useState<Holiday[]>([
    {
      key: "1",
      date: "12 April, 2025",
      day: "01 D",
      reason: "New Year",
      actions: true,
    },
    {
      key: "2",
      date: "12 April, 2025",
      day: "01 D",
      reason: "Ed",
      actions: true,
    },
    {
      key: "3",
      date: "12 April, 2025",
      day: "01 D",
      reason: "Christmas",
      actions: true,
    },
  ]);

  const handleOpenAddWorkingHour = () => setDrawerOpenForAddWorkingHour(true);
  const handleCloseAddWorkingHour = () => setDrawerOpenForAddWorkingHour(false);

  const handleOpenDrawer = () => setDrawerVisible(true);
  const handleCloseDrawer = () => setDrawerVisible(false);
  const handleOpenHolidayDrawer = () => setAddHoliday(true);
  const handleCloseHolidayDrawer = () => setAddHoliday(false);
  const handleOpenEditHolidayDrawer = () => setEditHoliday(true);
  const handleCloseEditHolidayDrawer = () => setEditHoliday(false);
  const handleOpenEditDrawer = (day: WorkingDay) => {
    setSelectedDay(day);
    setEditDrawerForWorkingHour(true);
  };

  const handleCloseEditDrawer = () => {
    setEditDrawerForWorkingHour(false);
    setSelectedDay(null);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleSaveWorkingHours = (data: WorkingHoursData) => {
    if (selectedDay) {
      // Update the specific day's working hours
      const dayKey = selectedDay.day.toLowerCase();
      const dayTimes = data.workingHours[dayKey];

      if (dayTimes && dayTimes.length === 2) {
        const [startTime, endTime] = dayTimes;

        // Calculate hours difference
        let hours = "0 Hours";
        if (startTime && endTime) {
          const diffInHours = endTime.diff(startTime, "hour", true);
          const hoursInt = Math.floor(diffInHours);
          const minutesInt = Math.round((diffInHours - hoursInt) * 60);
          hours = `${hoursInt} Hour${hoursInt !== 1 ? "s" : ""} ${
            minutesInt > 0 ? `${minutesInt} Min` : ""
          }`.trim();
        }

        // Format time string
        const timeStr = `${startTime?.format("h:mm A")}-${endTime?.format(
          "h:mm A"
        )}`;

        // Update the working days array
        const updatedDays = workingDays.map((dayItem) =>
          dayItem.key === selectedDay.key
            ? {
                ...dayItem,
                time: timeStr,
                hours: hours,
                startTime,
                endTime,
              }
            : dayItem
        );

        setWorkingDays(updatedDays);
      }
    }
    handleCloseEditDrawer();
  };

  const handleAddWorkingHours = (data: WorkingHoursData) => {
    // This would typically add multiple days at once
    console.log("Add working hours:", data);
    // You would implement logic to update all days based on the form data
    handleCloseAddWorkingHour();
  };

  const handleAddHoliday = (holidayData: any) => {
    // Create a new holiday object
    const newHoliday: Holiday = {
      key: `${holidays.length + 1}`,
      date: holidayData.date.format("DD MMMM, YYYY"),
      day: "01 D",
      reason: holidayData.reason,
      actions: true,
    };

    // Add the new holiday to the list
    setHolidays([...holidays, newHoliday]);
    handleCloseHolidayDrawer();
  };

  const workingHoursColumns: ColumnsType<WorkingDay> = [
    {
      title: "Days",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Working hours",
      dataIndex: "hours",
      key: "hours",
    },
    {
      title: "Actions",
      key: "actions",
      align: "end",
      render: (_, record) => (
        <Button
          onClick={() => handleOpenEditDrawer(record)}
          type="text"
          icon={<EditOutlined />}
          size="small"
          style={{ color: "#9ca3af" }}
        />
      ),
    },
  ];

  const holidaysColumns: ColumnsType<Holiday> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleOpenEditHolidayDrawer}
            type="text"
            icon={<EditOutlined />}
            size="small"
            style={{ color: "#9ca3af" }}
          />
        </div>
      ),
    },
  ];

  // Prepare initial data for the edit drawer
  const getInitialEditData = (): WorkingHoursData | null => {
    if (!selectedDay) return null;

    const dayKey = selectedDay.day.toLowerCase();
    return {
      profession: "Receptionist",
      workingHours: {
        [dayKey]: [selectedDay.startTime ?? null, selectedDay.endTime ?? null],
        saturday: [null, null],
        sunday: [null, null],
        monday: [null, null],
        tuesday: [null, null],
        wednesday: [null, null],
        thursday: [null, null],
        friday: [null, null],
      },
    };
  };

  return (
    <div>
      <div>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#111827",
            marginBottom: "24px",
          }}
        >
          Settings-Working Hour
        </h1>

        <Card style={{ marginBottom: "24px", border: 0 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "24px",
            }}
          >
            {/* Profile Section */}
            <div
              style={{
                width: "250px",
                padding: "24px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <Avatar
                size={80}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: "#e5e7eb",
                  color: "#6b7280",
                  marginBottom: "12px",
                }}
              />
              <h3 style={{ fontWeight: 600, color: "#111827", margin: 0 }}>
                Emily Carter
              </h3>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                ID: 454541
              </p>
            </div>

            {/* Right Section (Details + Edit) */}
            <div style={{ flex: 1, position: "relative" }}>
              {/* Details Grid Wrapper */}
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  background: "#fff",
                  padding: "24px",
                }}
              >
                {/* Edit Button */}
                <Button
                  onClick={handleOpenDrawer}
                  type="text"
                  icon={<EditOutlined />}
                  size="small"
                  style={{
                    color: "#9ca3af",
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                  }}
                />

                {/* Details Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "24px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginBottom: "4px",
                      }}
                    >
                      Number:
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>
                      +144 2154 212
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginBottom: "4px",
                      }}
                    >
                      Email:
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>
                      xyz32@gmail.com
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginBottom: "4px",
                      }}
                    >
                      Date of birth:
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>
                      12/02/1995
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginBottom: "4px",
                      }}
                    >
                      Address:
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>
                      Dhaka Bangladesh
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginBottom: "4px",
                      }}
                    >
                      Gender:
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>
                      Male
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "##6b7280",
                        marginBottom: "4px",
                      }}
                    >
                      Role:
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>
                      Doctor
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginBottom: "4px",
                      }}
                    >
                      Last Appoint:
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>
                      12 April, 2025
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginBottom: "4px",
                      }}
                    >
                      Discipline:
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>
                      Therapist
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Tabs
            defaultActiveKey="working-hour"
            activeKey={activeTab}
            onChange={handleTabChange}
            style={{ width: "320px" }}
          >
            <TabPane tab="Working Hour" key="working-hour" />
            <TabPane tab="Unavailability" key="unavailability" />
          </Tabs>
          {activeTab === "unavailability" ? (
            <Button
              onClick={handleOpenHolidayDrawer}
              type="primary"
              className="bg-primary border-primary"
            >
              Add Holidays
            </Button>
          ) : (
            <Button
              onClick={handleOpenAddWorkingHour}
              type="primary"
              className="bg-primary border-primary"
            >
              Add Hours
            </Button>
          )}
        </div>

        {activeTab === "working-hour" && (
          <Card style={{ marginBottom: "24px" }}>
            <Table
              columns={workingHoursColumns}
              dataSource={workingDays}
              pagination={false}
              size="middle"
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
                borderTop: "1px solid #f0f0f0",
                marginTop: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ fontSize: "14px", color: "#6b7280" }}>
                  Showing
                </span>
                <Select
                  defaultValue="10"
                  size="small"
                  style={{ width: "64px" }}
                >
                  <Select.Option value="10">10</Select.Option>
                  <Select.Option value="25">25</Select.Option>
                  <Select.Option value="50">50</Select.Option>
                </Select>
              </div>

              <div style={{ fontSize: "14px", color: "#6b7280" }}>
                Showing 1 to 10 out of 60 records
              </div>

              <Pagination
                current={1}
                total={60}
                pageSize={10}
                showSizeChanger={false}
                size="small"
              />
            </div>
          </Card>
        )}

        {activeTab === "unavailability" && (
          <Card>
            <Table
              columns={holidaysColumns}
              dataSource={holidays}
              pagination={false}
              size="middle"
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
                borderTop: "1px solid #f0f0f0",
                marginTop: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={{ fontSize: "14px", color: "#6b7280" }}>
                  Showing
                </span>
                <Select
                  defaultValue="10"
                  size="small"
                  style={{ width: "64px" }}
                >
                  <Select.Option value="10">10</Select.Option>
                  <Select.Option value="25">25</Select.Option>
                  <Select.Option value="50">50</Select.Option>
                </Select>
              </div>

              <div style={{ fontSize: "14px", color: "#6b7280" }}>
                Showing 1 to 10 out of 60 records
              </div>

              <Pagination
                current={1}
                total={60}
                pageSize={10}
                showSizeChanger={false}
                size="small"
              />
            </div>
          </Card>
        )}
      </div>
      {/* Drawer for Editing */}
      <ProfileEditDrawer visible={drawerVisible} onClose={handleCloseDrawer} />
      {/* Drawer for Add Working Hour For Staff */}
      <AddWorkingHourStaff
        visible={drawerOpenForAddWorkingHour}
        onClose={handleCloseAddWorkingHour}
        onSave={handleAddWorkingHours}
      />
      {/* Edit drawer for edit the working time */}
      {selectedDay && (
        <EditWorkingHourStaff
          visible={editDrawerForWorkingHour}
          onClose={handleCloseEditDrawer}
          mode="edit"
          initialData={getInitialEditData()}
          onSave={handleSaveWorkingHours}
        />
      )}
      <AddHolidayDrawer
        visible={addHoliday}
        onClose={handleCloseHolidayDrawer}
        onSave={handleAddHoliday}
      />
      <EditHolidayDrawer
        visible={editHolday}
        onClose={handleCloseEditHolidayDrawer}
        onSave={handleOpenEditHolidayDrawer}
      />
    </div>
  );
}
