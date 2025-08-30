"use client";
import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Dropdown,
  Avatar,
  Space,
  Grid,
  ConfigProvider,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import type { MenuProps, ThemeConfig } from "antd";
import { theme as defultTheme } from "@/theme/theme";
import logo from "@/assets/logo.svg";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

export interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
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
  themeConfig = defultTheme, // Use default theme if none provided
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint(); 

  // Responsive collapse based on screen size
  React.useEffect(() => {
    if (!screens.lg) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens.lg]);

  // Dropdown menu items for user profile
  const userMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Settings",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  // Custom menu item renderer with connecting lines
  const renderMenuItem = (item: MenuItem) => {
    if (item.children) {
      return (
        <Menu.SubMenu
          key={item.key}
          icon={item.icon}
          title={
            <span style={{ display: "flex", alignItems: "center" }}>
              {item.label}
              {item.checked && (
                <CheckOutlined
                  style={{
                    marginLeft: "auto",
                    fontSize: "12px",
                    color: themeConfig.token?.colorPrimary || "#1890ff",
                  }}
                />
              )}
            </span>
          }
          popupClassName="submenu-with-lines"
        >
          {item.children.map((child, index) => (
            <Menu.Item key={child.key}>
              <div className="submenu-item-container">
                {/* Vertical line for all items except last */}
                {index < item.children!.length - 1 && (
                  <div className="submenu-connector-line" />
                )}
                {/* Dot indicator */}
                <div className="submenu-dot" />
                {child.label}
              </div>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item key={item.key} icon={item.icon}>
        <span style={{ display: "flex", alignItems: "center" }}>
          {item.label}
          {item.checked && (
            <CheckOutlined
              style={{
                marginLeft: "auto",
                fontSize: "12px",
                color: themeConfig.token?.colorPrimary || "#1890ff",
              }}
            />
          )}
        </span>
      </Menu.Item>
    );
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={screens.xs ? 0 : 80}
          width={250}
          style={{
            // background: "#fff",
            overflow: "auto",
            height: "100vh",
            position: screens.xs ? "absolute" : "relative",
            zIndex: 10,
            left: screens.xs && collapsed ? -250 : 0,
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
            <h3
              style={{
                margin: 0,
                color: themeConfig.token?.colorPrimary || "#1890ff",
                display: collapsed ? "none" : "block",
              }}
            >
              DoctorQ
            </h3>
            <h3
              style={{
                margin: 0,
                color: themeConfig.token?.colorPrimary || "#1890ff",
                display: collapsed ? "block" : "none",
              }}
            >
              DQ
            </h3>
          </div>

          {/* Navigation Menu */}
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["2"]}
            style={{ borderRight: 0, marginTop: "16px" }}
          >
            {menuItems.map((item) => renderMenuItem(item))}
          </Menu>

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
            >
              {!collapsed && "Logout Now"}
            </Button>
          </div>
        </Sider>

        {/* Main Content Area */}
        <Layout>
          {/* Header */}
          <Header
            style={{
              padding: "0 16px",
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 1px 4px rgba(0,21,41,0.08)",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            {/* User Profile Dropdown */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} />
                <Text>Dr. John Smith</Text>
                <DownOutlined />
              </Space>
            </Dropdown>
          </Header>

          {/* Page Content */}
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280,
              overflow: "initial",
            }}
          >
            {children}
          </Content>
        </Layout>

        {/* Mobile overlay when sidebar is open */}
        {screens.xs && !collapsed && (
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 250,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9,
            }}
            onClick={() => setCollapsed(true)}
          />
        )}

        <style jsx global>{`
          /* Styles for the submenu with connecting lines */
          .submenu-with-lines .ant-menu-item {
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

          /* Adjust the submenu to show the lines properly */
          .submenu-with-lines {
            padding-left: 0 !important;
          }

          .submenu-with-lines .ant-menu-item-group-list {
            margin-left: 0 !important;
            padding-left: 0 !important;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .submenu-with-lines .ant-menu-item {
              padding-left: 20px !important;
            }
          }
        `}</style>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
