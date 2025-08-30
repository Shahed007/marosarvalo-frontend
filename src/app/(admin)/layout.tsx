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
import React, { FC, ReactNode } from "react";

const menuItems: MenuItem[] = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    checked: false,
  },
  {
    key: "2",
    icon: <CalendarOutlined />,
    label: "Appointments",
    checked: true,
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
      },
      {
        key: "2-3",
        icon: null,
        label: "Add Appointment",
      },
    ],
  },
  {
    key: "3",
    icon: <TeamOutlined />,
    label: "Patients",
    checked: true,
  },
  {
    key: "4",
    icon: <CreditCardOutlined />,
    label: "Bonds",
    checked: false,
  },
  {
    key: "5",
    icon: <CreditCardOutlined />,
    label: "Billing",
    checked: false,
  },
  {
    key: "6",
    icon: <MessageOutlined />,
    label: "Communications",
    checked: false,
  },
  {
    key: "7",
    icon: <GiftOutlined />,
    label: "Voucher",
    checked: false,
  },
  {
    key: "8",
    icon: <BarChartOutlined />,
    label: "Report",
    checked: true,
  },
  {
    key: "9",
    icon: <SettingOutlined />,
    label: "Settings",
    checked: false,
  },
];

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>
    </div>
  );
};

export default AdminLayout;
