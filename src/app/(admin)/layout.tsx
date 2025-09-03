import DashboardLayout, { MenuItem } from "@/components/dashboardLayout/DashboardLayout";
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
import { FC, ReactNode } from "react";

// Define your menu items using the correct MenuItem interface
// Only use valid properties: key, icon, label, children, href
const menuItems: MenuItem[] = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    href: "/admin", // Main dashboard page
  },
  {
    key: "2",
    icon: <CalendarOutlined />,
    label: "Appointments",
    children: [
      {
        key: "2-1",
        label: "Calendar",
        href: "/admin/appointments/calendar",
      },
      {
        key: "2-2",
        label: "Appointment List",
        href: "/admin/appointments/list",
      },
      {
        key: "2-3",
        label: "Add Appointment",
        href: "/admin/appointments/add",
      },
    ],
  },
  {
    key: "3",
    icon: <TeamOutlined />,
    label: "Patients",
    href: "/admin/patients",
  },
  {
    key: "4",
    icon: <CreditCardOutlined />,
    label: "Bonds",
    href: "/admin/bonds",
  },
  {
    key: "5",
    icon: <CreditCardOutlined />,
    label: "Billing",
    href: "/admin/billing",
  },
  {
    key: "6",
    icon: <MessageOutlined />,
    label: "Communications",
    href: "/admin/communications",
  },
  {
    key: "7",
    icon: <GiftOutlined />,
    label: "Voucher",
    href: "/admin/voucher",
  },
  {
    key: "8",
    icon: <BarChartOutlined />,
    label: "Report",
    href: "/admin/reports",
  },
  {
    key: "9",
    icon: <SettingOutlined />,
    label: "Settings",
    href: "/admin/settings",
  },
];

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <DashboardLayout menuItems={menuItems}>
      {children}
    </DashboardLayout>
  );
};

export default AdminLayout;