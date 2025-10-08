"use client";

import { AppointmentListProps } from "@/components/table/AppointmentListTable";
import { Button, Dropdown, MenuProps, Space } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import CancellationTabel from "./CancellationTabel";
import { DownOutlined } from "@ant-design/icons";

// Sample appointment data
export const appointmentList: AppointmentListProps[] = [
  {
    id: "#12345",
    time: "10:15 AM - 12:00PM",
    patientName: "Redwan",
    specialist: "Shakil ur Rahman",
    reason: "Physical Therapy",
    status: "Confirm",
    cancleReasons: "Patient illness",
  },
  {
    id: "#12346",
    time: "1:00 PM - 2:30 PM",
    patientName: "Aisha Khan",
    specialist: "Dr. Farida Ahmed",
    reason: "Massage Therapy",
    status: "Pending",
    cancleReasons: "Scheduling conflict",
  },
  {
    id: "#12347",
    time: "3:00 PM - 4:00 PM",
    patientName: "Karim Rahman",
    specialist: "Shakil ur Rahman",
    reason: "Chiropractic Adjustment",
    status: "Confirm",
    cancleReasons: "No-show",
  },
  {
    id: "#12348",
    time: "9:00 AM - 10:00 AM",
    patientName: "Nadia Islam",
    specialist: "Dr. Emily Carter",
    reason: "Acupuncture",
    status: "Cancelled",
    cancleReasons: "Emergency",
  },
  {
    id: "#12340",
    time: "9:00 AM - 10:00 AM",
    patientName: "Nadia Islam",
    specialist: "Dr. Emily Carter",
    reason: "Rehabilitation",
    status: "Cancelled",
    cancleReasons: "Patient illness",
  },
];

// Dynamic dropdown configuration
const dropdowns: { label: string; items: MenuProps["items"] }[] = [
  {
    label: "Today",
    items: [
      { key: "1", label: "Today Option 1" },
      { key: "2", label: "Today Option 2" },
    ],
  },
  {
    label: "Specialist",
    items: [
      { key: "1", label: "Specialist Option 1" },
      { key: "2", label: "Specialist Option 2" },
    ],
  },
  {
    label: "Services",
    items: [
      { key: "1", label: "Service Option 1" },
      { key: "2", label: "Service Option 2" },
    ],
  },
];

const CancellationOverview = () => {
  const [searchQuery] = useState<string>("");

  // Filtered data based on search query
  const filteredData = appointmentList.filter((item) =>
    Object.values(item).some((val) =>
      val.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>
      {/* Page Title */}
      <Title className="!text-[20px] sm:!text-[24px] md:!text-[28px] lg:!text-[32px] !font-[600] !text-[#0B121B]">
        Cancellation
      </Title>

      {/*  Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mt-8 mb-0 w-full">
        <div className="w-full sm:flex-1 sm:max-w-[400px] lg:max-w-[625px]">
          <Space direction="vertical">
            <Space wrap>
              {dropdowns.map((dd) => (
                <Dropdown
                  key={dd.label}
                  menu={{ items: dd.items }}
                  placement="bottomLeft"
                >
                  <Button
                    style={{
                      display: "flex",
                      height: "32px",
                      padding: "0 8px 0 16px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "12px",
                      borderRadius: "8px",
                      background: "rgba(34, 90, 127, 0.10)",
                    }}
                  >
                    {dd.label}{" "}
                    <DownOutlined
                      style={{ fontWeight: "bold", color: "black" }}
                    />
                  </Button>
                </Dropdown>
              ))}
            </Space>
          </Space>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <CancellationTabel data={filteredData} loading={false} />
      </div>
    </div>
  );
};

export default CancellationOverview;
