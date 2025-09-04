"use client";

import { Avatar, Button, Card, Tabs, Table, Select, Pagination } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import ProfileEditDrawer from "./ProfileEditDrawer";
import { useState } from "react";

const { TabPane } = Tabs;

interface WorkingDay {
  key: string;
  day: string;
  time: string;
  hours: string;
}

export default function SingleStaff() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleOpenDrawer = () => setDrawerVisible(true);
  const handleCloseDrawer = () => setDrawerVisible(false);
  const workingDays: WorkingDay[] = [
    { key: "1", day: "Sunday", time: "09:00 AM-5 Pm", hours: "5Hour 30 Min" },
    { key: "2", day: "Monday", time: "09:00 AM-5 Pm", hours: "5Hour 30 Min" },
    { key: "3", day: "Tuesday", time: "09:00 AM-5 Pm", hours: "5Hour 30 Min" },
    {
      key: "4",
      day: "Wednesday",
      time: "09:00 AM-5 Pm",
      hours: "5Hour 30 Min",
    },
    { key: "5", day: "Thursday", time: "09:00 AM-5 Pm", hours: "5Hour 30 Min" },
    { key: "6", day: "Friday", time: "09:00 AM-5 Pm", hours: "5Hour 30 Min" },
    { key: "7", day: "Saturday", time: "09:00 AM-5 Pm", hours: "5Hour 30 Min" },
  ];

  const columns: ColumnsType<WorkingDay> = [
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

      render: () => (
        <Button
          type="text"
          icon={<EditOutlined />}
          size="small"
          style={{ color: "#9ca3af" }}
        />
      ),
    },
  ];

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
                        color: "#6b7280",
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
          <Tabs defaultActiveKey="working-hour" style={{ width: "320px" }}>
            <TabPane tab="Working Hour" key="working-hour" />
            <TabPane tab="Unavailability" key="unavailability" />
          </Tabs>
          <Button type="primary" className="bg-primary border-primary">
            Add Hours
          </Button>
        </div>

        <Card>
          <Table
            columns={columns}
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "14px", color: "#6b7280" }}>
                Showing
              </span>
              <Select defaultValue="10" size="small" style={{ width: "64px" }}>
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
      </div>
      {/* Drawer for Editing */}
      <ProfileEditDrawer visible={drawerVisible} onClose={handleCloseDrawer} />
    </div>
  );
}
