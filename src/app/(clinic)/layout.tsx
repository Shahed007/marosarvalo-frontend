import React, { FC, ReactNode } from "react";
import DashboardLayout from "@/components/dashboardLayout/DashboardLayout";
import {
  BarChartOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GiftOutlined,
  MessageOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const ClinicLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      href: "/clinic",
    },
    {
      key: "2",
      icon: <CalendarOutlined />,
      label: "Appointment",
      href: "/clinic/appointment/appointment-list",
      children: [
        {
          key: "2-1",
          label: "Calendar",
          href: "/clinic/calendar"
        },
        {
          key: "2-2",
          label: "Appointment List",
          href: "/clinic/appointment/appointment-list",
        },
        {
          key: "2-3",
          label: "Add Appointment",
          href: "/clinic/appointment/add-appointment",
        },
      ],
    },
    {
      key: "3",
      icon: <TeamOutlined />,
      label: "Patients",
      href: "/clinic/patient",
    },
    {
      key: "4",
      icon: <CreditCardOutlined />,
      label: "Bonds",
      href: "/clinic/bonds",
    },
    {
      key: "5",
      icon: <CreditCardOutlined />,
      label: "Billing",
      href: "/clinic/billing",
      children: [
        {
          key: "5-1",
          label: "Create Invoice",
          href: "/clinic/billing",
        },
        {
          key: "5-2",
          label: "Receipt History",
          href: "/clinic/receipt-history",
        },
      ],
    },
    {
      key: "6",
      icon: <MessageOutlined />,
      label: "Communications",
      href: "/clinic/communications",
    },
    {
      key: "7",
      icon: <GiftOutlined />,
      label: "Voucher",
      href: "/clinic/voucher",
    },
    {
      key: "8",
      icon: <BarChartOutlined />,
      label: "Report",
      href: "/clinic/report",
    },
    {
      key: "9",
      icon: <SettingOutlined />,
      label: "Settings",
      href: "/clinic/setting",
      children: [
        {
          key: "9-1",
          label: "General",
          href: "/clinic/billing",
        },
        {
          key: "9-2",
          label: "User/Our Staff",
          href: "/clinic/all-staff",
        },
        {
          key: "9-3",
          label: "Subscription",
          href: "/clinic/subscription",
        },
      ],
    },
  ];
  
  return <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>;
};

export default ClinicLayout;