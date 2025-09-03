"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Divider } from "antd";
import { navItems } from "@/data/navbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="custom-container flex items-center justify-between h-[70px]">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-primary">Logo</h1>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex items-center text-xl font-normal">
          {navItems?.map((item, index) => (
            <li key={index} className="mx-4">
              <Link
                href={item.href}
                className={`transition-colors duration-300 ${
                  pathName === item.href
                    ? "text-primary"
                    : "text-black hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side (optional space for button/profile) */}
        <div className="hidden sm:block"></div>

        {/* Mobile Nav */}
        <MobileNavbar />
      </div>

      {/* Bottom separator line */}
      <Divider className="m-0" />
    </header>
  );
};

export default Navbar;
