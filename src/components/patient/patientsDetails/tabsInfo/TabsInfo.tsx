"use client";
import { Tabs } from "antd";
import { useState } from "react";

const TabsInfo = () => {
  const [activeTab, setActiveTab] = useState("bonds-&-appointments");
  const tabItems = [
    {
      key: "bonds-&-appointments",
      label: "Bonds & Appointments",
      children: <div></div>,
    },

    {
      key: "attachments",
      label: "Attachments",
      children: <div></div>,
    },
    {
      key: "medical-history",
      label: "medical-history",
      children: <div></div>,
    },
  ];
  return (
    <div>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="mb-6"
      />
    </div>
  );
};

export default TabsInfo;
