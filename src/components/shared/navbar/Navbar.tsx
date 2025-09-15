"use client";

import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MobileNavbar from "./MobileNavbar";
import { navItems } from "@/data/navbar";
import { Button } from "antd";

const hederStyle: React.CSSProperties = {
  position: "fixed",
  zIndex: 1,
  width: "100%",
  backgroundColor: "#fff",
  padding: "8px 0px",
  height: 70,
};

const Navbar = () => {
  const pathName = usePathname();

  return (
    <Header style={hederStyle}>
      <div className="custom-container flex items-center justify-between">
        {/* Logo */}
        <Title level={3} className="!m-0 !text-primary">
          Logo
        </Title>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center text-lg font-medium">
          {navItems.map((item, index) => (
            <li key={index} className="mx-4">
              <Link
                className={`transition-colors duration-300 ${
                  pathName === item.href
                    ? "!text-primary"
                    : "hover:!text-primary !text-accent"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <Link href="/login">
            <Button
              type="primary"
              htmlType="button"
              size="middle"
              className="!bg-[#225A7F] hover:!bg-[#1B4B6A] !border-[#225A7F] hover:!border-[#1B4B6A] px-6"
            >
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Nav (only visible on small screens) */}
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
