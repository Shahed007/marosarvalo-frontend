"use client";

import { Button, Drawer } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { navItems } from "@/data/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="block md:hidden">
      {/* Hamburger Button */}
      <button
        className="flex cursor-pointer text-2xl text-primary items-center justify-center"
        onClick={showDrawer}
      >
        <MenuOutlined />
      </button>

      {/* Drawer */}
      <Drawer onClose={onClose} open={open} placement="left">
        <ul className="flex flex-col gap-4 text-xl font-normal">
          {navItems.map((item, index) => (
            <li key={index} className="mx-4">
              <Link
                className={`${
                  pathName === item.href
                    ? "!text-primary"
                    : "hover:!text-primary duration-300 !text-accent transition-colors"
                }`}
                href={item.href}
                onClick={onClose} // ✅ close drawer when clicking
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ✅ Mobile Login Button */}
        <div className="block md:hidden mx-4 mt-6">
          <Link href="/login" onClick={onClose}>
            <Button
              type="primary"
              size="middle"
              className="!bg-[#225A7F] hover:!bg-[#1B4B6A] !border-[#225A7F] hover:!border-[#1B4B6A] w-full"
            >
              Login
            </Button>
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileNavbar;
