import React, { FC, ReactNode } from "react";
import DashboardLayout, {
  MenuItem,
} from "@/components/dashboardLayout/DashboardLayout";
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
  const menuItems: MenuItem[] = [
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
      checked: true,
      href: "/clinic/appointment/appointment-list",
      children: [
        {
          key: "2-1",
          icon: null,
          label: "Calendar",
        },
        {
          key: "2-2",
          icon: null,
          label: "Appointment List",
          href: "/clinic/appointment/appointment-list",
        },
        {
          key: "2-3",
          icon: null,
          label: "Add Appointment",
          href: "/clinic/appointment/add-appointment",
        },
      ],
    },
    {
      key: "3",
      icon: <TeamOutlined />,
      label: "Patients",
      checked: true,
      href: "/clinic/patient",
    },
    {
      key: "4",
      icon: <CreditCardOutlined />,
      label: "Bonds",
      checked: false,
      href: "/clinic/bonds",
    },
    {
      key: "5",
      icon: <CreditCardOutlined />,
      label: "Billing",
      checked: false,
      href: "/clinic/billing",
      children: [
        {
          key: "5-1",
          icon: null,
          label: "Create Invoice",
        },
        {
          key: "5-2",
          icon: null,
          label: "Receipt History",
          href: "/clinic/appointment/appointment-list",
        },
      ],
    },
    {
      key: "6",
      icon: <MessageOutlined />,
      label: "Communications",
      checked: false,
      href: "/clinic/communications",
    },
    {
      key: "7",
      icon: <GiftOutlined />,
      label: "Voucher",
      checked: false,
      href: "/clinic/voucher",
    },
    {
      key: "8",
      icon: <BarChartOutlined />,
      label: "Report",
      checked: true,
      href: "/clinic/report",
    },
    {
      key: "9",
      icon: <SettingOutlined />,
      label: "Settings",
      checked: false,
    },
  ];
  return <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>;
};

export default ClinicLayout;
