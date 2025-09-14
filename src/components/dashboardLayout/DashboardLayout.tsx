"use client";

import React, { useState, useEffect } from "react";
import { Button, Grid, ConfigProvider } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import type { ThemeConfig } from "antd";
import { theme as defaultTheme } from "@/theme/theme";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const { useBreakpoint } = Grid;
import user from "@/assets/user.png";
import logo from "@/assets/logo.png";
import { IoCheckmarkCircle } from "react-icons/io5";
import TopBar from "../shared/TopBar";

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
  href?: string;
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const pathname = usePathname();
  const screens = useBreakpoint();
  const router = useRouter();

  // Always expanded on mobile
  useEffect(() => {
    if (!screens.xl) setCollapsed(false);
  }, [screens.xl]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (sidebarOpen) setSidebarOpen(false);
  }, [pathname]);

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  const isActiveParent = (item: MenuItem) => {
    if (item.children) {
      return item.children.some(
        (child) => child.href && pathname === child.href
      );
    }
    return item.href && pathname === item.href;
  };

  const isActiveChild = (href?: string) => href && pathname === href;

  const handleOverlayClick = () => setSidebarOpen(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) setSidebarOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [sidebarOpen]);
  const pathNames = usePathname();
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="flex h-screen bg-white relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
            onClick={handleOverlayClick}
          />
        )}

        {/* Sidebar */}

        <div
          className={`
            fixed inset-y-0 left-0 z-50 bg-[#F1F4F6] text-gray-700
            transform transition-all duration-300 ease-in-out
            ${collapsed ? "w-20" : "w-64"}
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:static lg:inset-0 lg:z-30
            shadow-lg lg:shadow-none
          `}
        >
          {/* Mobile close button */}
          <button
            className="lg:hidden absolute top-4 right-4 z-50 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} className="text-gray-700" />
          </button>

          {/* Logo and Collapse Button */}
          <div className="flex items-center justify-between px-3 py-4 border-b border-gray-200">
            <Link
              href={pathNames}
              className="flex justify-center flex-1"
              onClick={() => setSidebarOpen(false)}
            >
              <Image
                className={`transition-all duration-300 ${
                  collapsed ? "w-10" : "w-32"
                }`}
                src={logo}
                alt="Logo"
                priority
              />
            </Link>
          </div>

          {/* Sidebar Items */}
          <nav className="flex-1 p-2 space-y-2 mt-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            {menuItems?.map((item) => {
              const isActive = isActiveParent(item);

              const baseClasses = `
                flex items-center gap-3 px-3 py-2 rounded-md transition relative 
                ${
                  isActive
                    ? "bg-[#225A7F] text-white border-l-4 border-[#225A7F]"
                    : "text-gray-700 hover:bg-[#225A7F] hover:text-white"
                }
                ${collapsed ? "justify-center" : "justify-between"}
              `;

              return (
                <div key={item?.key} className="relative">
                  {item?.children ? (
                    <>
                      <button
                        onClick={() => {
                          toggleDropdown(item?.key);
                          if (item?.href) router.push(item?.href); // navigate parent if href exists
                        }}
                        className={baseClasses + " w-full"}
                      >
                        <div
                          className={`flex items-center ${
                            collapsed ? "justify-center w-full" : "gap-3"
                          }`}
                        >
                          <span className="flex-shrink-0">{item?.icon}</span>
                          {(!collapsed || !screens.xl) && (
                            <span className="text-sm">{item?.label}</span>
                          )}
                        </div>
                        {!collapsed && (
                          <ChevronRight
                            className={`transition-transform ${
                              openDropdowns[item?.key] ? "rotate-90" : ""
                            }`}
                            size={16}
                          />
                        )}
                      </button>

                      {openDropdowns[item?.key] && !collapsed && (
                        <div className="ml-6 mt-1 flex flex-col relative">
                          <span className="absolute left-0 top-0 bottom-[18px] w-[1px] bg-gray-300  rounded-full"></span>
                          {item?.children?.map((child) => {
                            const isChildActive = isActiveChild(child?.href);
                            return (
                              <Link
                                key={child?.key}
                                href={child?.href || "#"}
                                className={`relative pl-5 py-2 text-sm rounded-md transition hover:bg-[#225A7F] hover:text-white ${
                                  isChildActive
                                    ? "text-gray-500 font-medium hover:bg-[#225A7F] hover:text-white"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                                onClick={() => setSidebarOpen(false)}
                              >
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-gray-300"></span>
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={baseClasses}
                    >
                      <div
                        className={`flex items-center ${
                          collapsed ? "justify-center w-full" : "gap-3"
                        }`}
                      >
                        <span className="flex-shrink-0">{item.icon}</span>
                        {(!collapsed || !screens.xl) && (
                          <span className="text-sm">{item.label}</span>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <div className={baseClasses}>
                      <span className="flex-shrink-0">{item.icon}</span>
                      {(!collapsed || !screens.xl) && (
                        <span className="text-sm">{item.label}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User Info and Logout */}
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-[#F1F4F6]">
            <div className="flex items-center gap-2">
              {/* Avatar always visible */}
              <Image
                src={user}
                width={40}
                height={40}
                alt="user"
                className="rounded-full"
              />

              {/* Show name + role only when expanded */}
              {!collapsed && (
                <div>
                  <h1 className="flex items-center gap-1 text-sm font-medium">
                    Jhon Son <IoCheckmarkCircle className="text-[#225A7F]" />
                  </h1>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              )}
            </div>

            {/* Logout button only when expanded */}
            {!collapsed && (
              <Button
                icon={<LogoutOutlined />}
                block
                style={{ textAlign: "left", marginTop: "16px" }}
                onClick={handleLogout}
                className="text-sm"
              >
                Logout Now
              </Button>
            )}
          </div>

          {/* Collapse Button (desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="
              absolute top-24 -right-3 transform -translate-y-1/2
              w-6 h-6 flex items-center justify-center
              rounded-full bg-white border border-gray-200 shadow-sm
              lg:flex hidden z-10
              hover:bg-gray-50 transition-colors
            "
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight size={14} className="text-gray-700" />
            ) : (
              <ChevronLeft size={14} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Main Content */}

        <div className="flex-1 p-4 lg:p-5 overflow-y-auto bg-white relative">
          {pathNames.startsWith("/clinic") ? null : ( // or "" if you prefer
            <TopBar
              userName="Jhon Son"
              userRole="Admin"
              notificationCount={3}
            />
          )}

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700 mb-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <ChevronRight size={20} />
          </button>

          {/* Content */}
          <div className="min-h-[calc(100vh-80px)]">{children}</div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DashboardLayout;
