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

const ReceptionLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const menuItems: MenuItem[] = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      href: "/reception",
    },
    {
      key: "2",
      icon: <CalendarOutlined />,
      label: "Appointments",
      checked: true,
      href: "/reception/appointment/appointment-list",
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
          href: "/reception/appointment/appointment-list",
        },
        {
          key: "2-3",
          icon: null,
          label: "Add Appointment",
          href: "/reception/appointment/add-appointment",
        },
      ],
    },
    {
      key: "3",
      icon: <TeamOutlined />,
      label: "Patients",
      checked: true,
      href: "/reception/patients",
    },
    {
      key: "4",
      icon: <CreditCardOutlined />,
      label: "Bonds",
      checked: false,
      href: "/reception/bonds",
    },
    {
      key: "5",
      icon: <CreditCardOutlined />,
      label: "Billing",
      checked: false,
      href: "/reception/billings/create-invoice",
      children: [
        
        {
          key: "5-1",
          icon: null,
          label: "Create Invoice",
          href: "/reception/billings/create-invoice",
        },
        {
          key: "5-2",
          icon: null,
          label: "Receipt History",
          href: "/reception/billings/receipt-history",
        },
      ]
     
    },
    {
      key: "6",
      icon: <MessageOutlined />,
      label: "Communications",
      checked: false,
      href: "/reception/communications",
    },
    {
      key: "7",
      icon: <GiftOutlined />,
      label: "Voucher",
      checked: false,
      href: "/reception/voucher",
      children: [
        {
          key: "7-1",
          icon: null,
          label: "Voucher List",
          href: "/reception/voucher/voucher-list",
        },
        {
          key: "7-2",
          icon: null,
          label: "Add Voucher",
          href: "/reception/voucher/add-voucher",
        },
      ],
    },

    {
      key: "9",
      icon: <SettingOutlined />,
      label: "Settings",
      checked: false,
      children: [
        {
          key: "9-1",
          icon: null,
          label: "General",
          href: "/reception/settings/general",
          children: [
            {
              key: "9-1-1",
              icon: null,
              label: "General Settings",
              href: "/reception/settings/general/basic-info",
            },
            {
              key: "9-1-2",
              icon: null,
              label: "Notification Settings",
              href: "/reception/settings/general/services",
            },
          ]
        },
        {
          key: "9-2",
          icon: null,
          label: "User/Our Staff",
          href: "/reception/users",
          children: [
            {
              key: "9-2-1",
              icon: null,
              label: "User List",
              href: "/reception/users/user-list",
            },
            {
              key: "9-2-2",
              icon: null,
              label: "Add User",
              href: "/reception/users/add-user",
            },
          ]
        },
      ]
    },
  ];
  return <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>;
};

export default ReceptionLayout;
