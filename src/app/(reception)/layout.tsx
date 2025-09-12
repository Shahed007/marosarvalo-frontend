"use client";

import React, { FC, ReactNode} from "react";



import Link from "next/link";
;

import {
  CalendarOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GiftOutlined,
  MessageOutlined as MessageIcon,
  SettingOutlined,
  TeamOutlined,
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
      href: "/reception/appointment/appointment-list",
      children: [
        {
          key: "2-1",
          label: (
            <Link href="/reception/appointment/calender">Calendar</Link>
          ),
        },
        {
          key: "2-2",
          label: (
            <Link href="/reception/appointment/appointment-list">
              Appointment List
            </Link>
          ),
        },
        {
          key: "2-3",
          label: (
            <Link href="/reception/appointment/add-appointment">
              Add Appointment
            </Link>
          ),
        },
      ],
    },
    {
      key: "3",
      icon: <TeamOutlined />,
      label: "Patients",
      href: "/reception/patients",
    },
    {
      key: "4",
      icon: <CreditCardOutlined />,
      label: "Bonds",
      href: "/reception/bonds",
    },
    {
      key: "5",
      icon: <CreditCardOutlined />,
      label: "Billing",
      href: "/reception/billings",
      children: [
        {
          key: "5-1",
          label: (
            <Link href="/reception/billings/create-invoice">
              Create Invoice
            </Link>
          ),
        },
        {
          key: "5-2",
          label: (
            <Link href="/reception/billings/receipt-history">
              Receipt History
            </Link>
          ),
        },
      ],
    },
    {
      key: "6",
      icon: <MessageIcon />,
      label: "Communications",
      href: "/reception/communications",
    },
    {
      key: "7",
      icon: <GiftOutlined />,
      label: "Voucher",
      href: "/reception/voucher",
    },
    {
      key: "9",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
       {
         key: "9-1",
         label: (
           <Link href="/reception/settings/personal-info">Personal Info</Link>
         ),
       },{
         key: "9-2",
         label: (
           <Link href="/reception/settings/setting-service">Setting Service</Link>
         ),
       },
       {
         key: "9-3",
         label: (
           <Link href="/reception/settings/setting-user-management">
             User Management
           </Link>
         ),
       },
       {
         key: "9-4",
         label: (
           <Link href="/reception/settings/setting-working-hour">
             Working Hour
           </Link>
         ),
       },
       {
         key: "9-5",
         label: (
           <Link href="/reception/settings/setting-unavailability">
             Unavailability
           </Link>
         ),
       }
       
        ,
      ],
    },
  ];

  return (
    <DashboardLayout menuItems={menuItems}>
      {children}
    </DashboardLayout>
  );
};

export default ReceptionLayout;