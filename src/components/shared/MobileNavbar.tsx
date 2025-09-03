"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Button } from "antd";
import { useState } from "react";
import { navItems } from "@/data/navbar";

const MobileNavbar = () => {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="sm:hidden block">
      {/* Trigger Button */}
      <Button
        type="text"
        icon={<MenuOutlined className="w-7 h-7" />}
        onClick={showDrawer}
        className="flex items-center justify-center text-2xl text-primary border-none shadow-none"
      />

      {/* Drawer Content */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        open={open}
        width={256}
        className="text-primary"
      >
        <ul className="flex flex-col gap-4 mt-6 text-lg font-medium">
          {navItems?.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`block transition-colors duration-300 ${
                  pathName === item.href
                    ? "text-primary"
                    : "text-accent hover:text-primary"
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Drawer>
    </div>
  );
};

export default MobileNavbar;
