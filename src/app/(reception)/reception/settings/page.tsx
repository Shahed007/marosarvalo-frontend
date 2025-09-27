"use client";

import BasicInformation from "@/components/pages/clinic/Settings/BasicInformation";
import SettingBranding from "@/components/pages/clinic/Settings/SettingBranding";
import SettingIntegration from "@/components/pages/clinic/Settings/SettingIntegration";
import ProductTable from "@/components/table/ProductTable";

import { ProductTab } from "@/types/global";
import { Tabs } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";

const Communications = () => {
  const [activeTab, setActiveTab] = useState("basicInfo");

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
          <BasicInformation />
        </div>
      ),
    },
    {
      key: "product",
      label: "Product",
      children: (
        <div>
          <ProductTable data={bondsData} />
        </div>
      ),
    },
    {
      key: "branding",
      label: "Branding",
      children: (
        <div>
          <SettingBranding />
        </div>
      ),
    },
    {
      key: "integration",
      label: "Integration",
      children: (
        <div>
          <SettingIntegration />
        </div>
      ),
    },
  ];
  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
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
