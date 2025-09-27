
import DashboardLayout, { MenuItem } from "@/components/dashboardLayout/DashboardLayout";
import {
  CalendarOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { FC, ReactNode } from "react";
import { CiCirclePlus } from "react-icons/ci";

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
    label: "Booking List",
    href: "/admin/booking-list",
  },
  {
    key: "3",
    icon: <TeamOutlined />,
    label: "Clinic List",
    href: "/admin/clinic-list",
  },
  {
    key: "4",
    icon: <CiCirclePlus />,
    label: "Add Clinic",
    href: "/admin/add-clinic",
  },
  {
    key: "5",
    icon: <CreditCardOutlined />,
    label: "Payment",
    href: "/admin/payment",
  },
  {
    key: "6",
    icon: <SettingOutlined />,
    label: "Settings",
    href: "/admin/settings",
  }

];

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <DashboardLayout menuItems={menuItems}>
      {children}
    </DashboardLayout>
  );
};

export default AdminLayout;