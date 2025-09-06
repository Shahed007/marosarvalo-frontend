"use client";

import React, { FC, ReactNode, useState } from "react";
import { Layout, Menu, Button, Grid, ConfigProvider, Avatar, Dropdown, Badge } from "antd";
import {
  BellOutlined,
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps, ThemeConfig } from "antd";
import { theme as defaultTheme } from "@/theme/theme";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import Image from "next/image";

import {
  CalendarOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GiftOutlined,
  MessageOutlined as MessageIcon,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

// Define MenuItem interface
export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
  href?: string;
}

// DashboardLayout Component
interface DashboardLayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
  themeConfig?: ThemeConfig;
}

const ReceptionDashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  menuItems,
  themeConfig = defaultTheme,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const screens = useBreakpoint();

  // Responsive collapse
  React.useEffect(() => {
    if (!screens.xl) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens.xl]);

  // Handle logout
  const handleLogout = () => {
    console.log("User logged out");
    // Add real logout logic here (e.g., auth, redirect)
  };

  // Mock notifications
  const notificationItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <MessageIcon />,
      label: (
        <div>
          <div>New user registered</div>
          <small className="text-gray-500">2 min ago</small>
        </div>
      ),
    },
    {
      key: "2",
      icon: <MessageIcon />,
      label: (
        <div>
          <div>Server reboot completed</div>
          <small className="text-gray-500">10 min ago</small>
        </div>
      ),
    },
    {
      key: "3",
      icon: <MessageIcon />,
      label: (
        <div>
          <div>Payment received</div>
          <small className="text-gray-500">1 hour ago</small>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "all",
      label: <Link href="/notifications">View all notifications</Link>,
    },
  ];

  // Profile dropdown items
  const profileItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: "settings",
      icon: <MessageIcon />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  // Transform menuItems for Ant Design with Links
  const formattedMenuItems: MenuProps["items"] = menuItems.map((item) => {
    const menuItemProps = item.href
      ? {
          label: (
            <Link href={item.href} passHref legacyBehavior>
              <a style={{ textDecoration: "none", color: "inherit" }}>
                {item.label}
              </a>
            </Link>
          ),
        }
      : { label: item.label };

    if (item.children) {
      return {
        key: item.key,
        icon: item.icon,
        ...menuItemProps,
        children: item.children.map((child) => {
          const childProps = child.href
            ? {
                label: (
                  <Link href={child.href} passHref legacyBehavior>
                    <a
                      style={{ textDecoration: "none", color: "inherit" }}
                      className="submenu-item-container"
                    >
                      {child.label}
                    </a>
                  </Link>
                ),
              }
            : { label: child.label };

          return {
            key: child.key,
            ...childProps,
          };
        }),
      };
    }

    return {
      key: item.key,
      icon: item.icon,
      ...menuItemProps,
    };
  });

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        {/* Sidebar */}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={screens.xs ? 0 : 80}
          width={250}
          style={{
            overflowY: "auto",
            height: "100%",
            position: screens.xs ? "absolute" : "relative",
            zIndex: 10,
            left: screens.xs && collapsed ? -250 : 0,
            transition: "left 0.2s ease",
          }}
        >
          {/* Logo */}
          <div
            style={{
              padding: "16px",
              textAlign: "center",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Link href="/" passHref legacyBehavior>
              <a style={{ display: "inline-block" }}>
                <Image src={logo} alt="Logo" width={120} />
              </a>
            </Link>
          </div>

          {/* Navigation Menu */}
          <Menu
            mode="inline"
            selectedKeys={[]} // You can dynamically set this based on route
            style={{ borderRight: 0, marginTop: "16px" }}
            items={formattedMenuItems}
            className="submenu-with-lines"
          />

          {/* Logout Button */}
          <div
            style={{
              padding: "16px",
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              block
              style={{ textAlign: "left" }}
              onClick={handleLogout}
            >
              {!collapsed && "Logout"}
            </Button>
          </div>
        </Sider>

        {/* Main Layout: Header + Content */}
        <Layout>
          {/* Sticky Header */}
          <header className="sticky top-0 z-50 bg-white shadow px-4 lg:px-8 h-16 flex items-center justify-between">
            {/* Page Title */}
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>

            {/* Right Side: Notifications & Profile */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Dropdown
                menu={{ items: notificationItems }}
                open={notificationOpen}
                onOpenChange={setNotificationOpen}
                trigger={["click"]}
                placement="bottomRight"
                arrow
              >
                <button className="p-2 rounded hover:bg-gray-100 transition relative">
                  <Badge dot offset={[8, 4]} color="red">
                    <BellOutlined className="text-gray-700 text-lg" />
                  </Badge>
                </button>
              </Dropdown>

              {/* Profile */}
              <Dropdown
                menu={{ items: profileItems }}
                open={profileOpen}
                onOpenChange={setProfileOpen}
                trigger={["click"]}
                placement="bottomRight"
                arrow
              >
                <div className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-gray-100 transition">
                  <Avatar icon={<UserOutlined />} size="small" />
                  <span className="text-gray-700 text-sm font-medium">Admin</span>
                  <DownOutlined className="text-gray-500 text-xs" />
                </div>
              </Dropdown>
            </div>
          </header>

          {/* Main Content Area */}
          <Content
            className="lg:pt-5 pt-4 pr-5 lg:pr-10 pb-10 pl-5 lg:pl-10 bg-white"
            style={{
              minHeight: "calc(100vh - 64px)",
              overflowY: "auto",
            }}
          >
            {children}
          </Content>
        </Layout>

        {/* Mobile Overlay */}
        {screens.xs && !collapsed && (
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9,
            }}
            onClick={() => setCollapsed(true)}
          />
        )}
      </Layout>

      {/* Global Styles */}
      <style jsx global>{`
        .ant-menu-item-selected {
          background-color: #225a7f !important;
          color: #fff !important;
        }

        .submenu-with-lines .ant-menu-item,
        .submenu-with-lines .ant-menu-submenu-title {
          position: relative;
          padding-left: 24px !important;
        }

        .submenu-item-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .submenu-connector-line {
          position: absolute;
          left: 6px;
          top: 16px;
          bottom: -8px;
          width: 2px;
          background-color: #d9d9d9;
          z-index: 1;
        }

        .submenu-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${themeConfig.token?.colorPrimary || "#1890ff"};
          margin-right: 12px;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .submenu-with-lines .ant-menu-item {
            padding-left: 20px !important;
          }
        }
      `}</style>
    </ConfigProvider>
  );
};

// ✅ Flattened Menu Items (No 3-Level Nesting)
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
      children: [
        {
          key: "2-1",
          label: (
            <Link href="/reception/appointment/calendar">Calendar</Link>
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
    <ReceptionDashboardLayout menuItems={menuItems}>
      {children}
    </ReceptionDashboardLayout>
  );
};

export default ReceptionLayout;