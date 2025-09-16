"use client";

import React, { FC, ReactNode } from "react";

import Link from "next/link";
import {
  BarChartOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import DashboardLayout from "@/components/dashboardLayout/DashboardLayout";

// Define MenuItem interface
export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
  href?: string;
}

const SpecillistLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const menuItems: MenuItem[] = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      href: "/specillist",
    },
    {
      key: "2",
      icon: <CalendarOutlined />,
      label: "My Appointments",
      href: "/specillist/appointment-list",
    },
    {
      key: "3",
      icon: <CreditCardOutlined />,
      label: "Bonds",
      href: "/specillist/bonds",
    },

    // {
    //   key: "4",
    //   icon: <CreditCardOutlined />,
    //   label: "Voucher",
    //   href: "/specillist/voucher",
    //   children: [
    //     {
    //       key: "4-1",
    //       label: (
    //         <Link href="/specillist/voucher/create-voucher">
    //           Create Voucher
    //         </Link>
    //       ),
    //     },
    //     {
    //       key: "4-2",
    //       label: (
    //         <Link href="/specillist/voucher/voucher-list">Voucher List</Link>
    //       ),
    //     },
    //   ],
    // },
    {
      key: "7",
      icon: <BarChartOutlined />,
      label: "Report",
      href: "/specillist/report",
    },
    {
      key: "8",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        {
          key: "8-1",
          label: (
            <Link href="/specillist/settings/personal-info">Personal Info</Link>
          ),
        },
      ],
    },
  ];

  return <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>;
};

export default SpecillistLayout;
