"use client";
import React, { useState } from "react";
import { Layout, Menu, Button, Grid, ConfigProvider } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import type { MenuProps, ThemeConfig } from "antd";
import { theme as defultTheme } from "@/theme/theme";
import Link from "next/link"; // Import Next.js Link
import logo from "@/assets/logo.svg";
import Image from "next/image";
const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
  checked?: boolean;
  href?: string; // Add href property for links
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
  themeConfig?: ThemeConfig;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  menuItems,
  themeConfig = defultTheme,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  // Responsive collapse based on screen size
  React.useEffect(() => {
    if (!screens.xl) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens.xl]);

  // Transform custom menuItems into AntD v5 `items` with Next.js Links
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
        children: item.children.map((child, index) => {
          const childProps = child.href
            ? {
                label: (
                  <Link href={child.href} passHref legacyBehavior>
                    <a
                      style={{ textDecoration: "none", color: "inherit" }}
                      className="submenu-item-container"
                    >
                      {/* connector line except last item */}
                      {index < item.children!.length - 1 && (
                        <div className="submenu-connector-line" />
                      )}
                      <div className="submenu-dot" />
                      {child.label}
                    </a>
                  </Link>
                ),
              }
            : {
                label: (
                  <div className="submenu-item-container">
                    {index < item.children!.length - 1 && (
                      <div className="submenu-connector-line" />
                    )}
                    <div className="submenu-dot" />
                    {child.label}
                  </div>
                ),
              };

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
          }}
        >
          {/* Logo with Link */}
          <div
            style={{
              padding: "16px",
              textAlign: "center",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <Link href="/" passHref legacyBehavior>
              <Image src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Navigation Menu with Links */}
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["2"]}
            style={{ borderRight: 0, marginTop: "16px" }}
            items={formattedMenuItems}
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
            >
              {!collapsed && "Logout Now"}
            </Button>
          </div>
        </Sider>

        {/* Main Content Area */}
        <Layout>
          {/* Page Content */}
          <Content
            className="lg:pt-[54px] pt-[40px] pr-[20px] lg:pr-[40px] pb-[40px] pl-[20px] lg:pl-[40px]"
            style={{
              background: "#fff",
              overflowY: "auto",
              height: "100%",
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
