"use client";

import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MobileNavbar from "./MobileNavbar";
import { navItems } from "@/data/navbar";

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
        <Title className="!text-primary">Logo</Title>
        <ul className="sm:flex hidden items-center-safe  text-xl font-normal ">
          {navItems.map((item, index) => (
            <li key={index} className="mx-4">
              <Link
                className={` ${
                  pathName === item.href
                    ? "!text-primary"
                    : "hover:!text-primary duration-300 !text-accent transition-colors"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="sm:block hidden"></div>
        <MobileNavbar />
      </div>
    </Header>
  );
};

export default Navbar;