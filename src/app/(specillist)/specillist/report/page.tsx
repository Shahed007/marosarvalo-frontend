import PerformanceOverview from "@/components/pages/clinic/report/PerformanceOverview";
import PopularServices from "@/components/pages/clinic/report/PopularServices";
import RevenueByService from "@/components/pages/clinic/report/RevenueByService";
import Title from "antd/es/typography/Title";
import React from "react";

const Report = () => {
  const data = {
    revenue: {
      total: 25500,
      weeklyData: [
        { week: "Week 1", value: 4000 },
        { week: "Week 2", value: 6000 },
        { week: "Week 3", value: 5500 },
        { week: "Week 4", value: 7500 },
      ],
    },
    attendance: {
      rate: 98,
      attended: 72,
      missed: 28,
    },
    patients: {
      total: 75000,
      old: 72,
      new: 28,
    },
  };
  const servicesData = [
    { name: "Massage Therapy", value: 55 },
    { name: "Acupuncture", value: 25 },
    { name: "Chiropractic Care", value: 10 },
    { name: "Physical Therapy", value: 30 },
  ];
  const revenueData = [
    { label: "xyz", value: 140 },
    { label: "xyz", value: 60 },
    { label: "xyz", value: 200 },
    { label: "xyz", value: 100 },
    { label: "xyz", value: 120 },
    { label: "xyz", value: 90 },
    { label: "xyz", value: 95 },
    { label: "xyz", value: 50 },
  ];
  return (
    <div>
      <Title level={2}>Report</Title>
      <Title level={5}>Performance Overview</Title>
      <PerformanceOverview {...data} />
      <div>
        <PopularServices services={servicesData} />
      </div>
      <div className="mt-10">
        <RevenueByService totalRevenue={2659} data={revenueData} />
      </div>
    </div>
  );
};

export default Report;
