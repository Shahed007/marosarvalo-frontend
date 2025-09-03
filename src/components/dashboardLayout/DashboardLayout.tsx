"use client";
import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Grid,
  ConfigProvider,
  Avatar,
  Dropdown,
  Badge,
} from "antd";
import {
  BellOutlined,
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { MenuProps, ThemeConfig } from "antd";
import { theme as defaultTheme } from "@/theme/theme";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import Image from "next/image";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
  href?: string; // Optional link
  checked?: boolean;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
  themeConfig?: ThemeConfig;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
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
    // Replace with real auth logic, e.g., router.push('/login')
    // auth.signOut();
  };

  // Mock notifications
  const notificationItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <MessageOutlined />,
      label: (
        <div>
          <div>New user registered</div>
          <small className="text-gray-500">2 min ago</small>
        </div>
      ),
    },
    {
      key: "2",
      icon: <MessageOutlined />,
      label: (
        <div>
          <div>Server reboot completed</div>
          <small className="text-gray-500">10 min ago</small>
        </div>
      ),
    },
    {
      key: "3",
      icon: <MessageOutlined />,
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
      icon: <MessageOutlined />,
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
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
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

export default DashboardLayout;