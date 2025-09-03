import {} from "react-icons/io";
import { Drawer } from "antd";
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
    <div className="sm:hidden block">
      <button
        className="!flex cursor-pointer text-2xl text-primary !items-center !justify-center sm:hidden"
        onClick={showDrawer}
      >
        <MenuOutlined />
      </button>
      <Drawer
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        placement="left"
      >
        <ul className="flex flex-col gap-4  text-xl font-normal ">
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
      </Drawer>
    </div>
  );
};

export default MobileNavbar;
