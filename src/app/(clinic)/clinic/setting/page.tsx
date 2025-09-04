"use client";

import BasicInformation from "@/components/pages/clinic/Settings/BasicInformation";
import ProductTable from "@/components/table/ProductTable";
import ReminderTable, {
  ReminderRecord,
} from "@/components/table/ReminderTable";
import { ProductTab } from "@/types/global";
import { Tabs } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";

const Communications = () => {
  const [activeTab, setActiveTab] = useState("reminders");
  const [loading] = useState(false);

  const mockData: ReminderRecord[] = [
    {
      key: "1",
      patientName: "Emily Carter",
      reminderType: "Appointment",
      communicationType: "Email, SMS",
      subject: "Appointment Reminder",
      sentDateTime: "2024-07-26 10:00 AM",
      status: "Delivered",
    },
  ];
const bondsData: ProductTab[] = [
  {
    id: "#1254",
    discipline: "Operation",
  },
  {
    id: "#1255",
    discipline: "Operation",
  },
  {
    id: "#1256",
    discipline: "Operation",
  },
];
  const tabItems = [
    {
      key: "basicInfo",
      label: "Basic Info",
      children: (
        <div>
          <BasicInformation/>
        </div>
      ),
    },
    {
      key: "product",
      label: "Product",
      children: (
        <div>
            <ProductTable data={bondsData}/>
        </div>
      ),
    },
    {
      key: "branding",
      label: "Branding",
      children: (
        <div>
          <ReminderTable loading={loading} data={mockData} />
        </div>
      ),
    },
    {
      key: "integration",
      label: "Integration",
      children: (
        <div>
          <ReminderTable loading={loading} data={mockData} />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Title level={2}>Settings-Basic info</Title>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="mb-6"
      />
    </div>
  );
};

export default Communications;
