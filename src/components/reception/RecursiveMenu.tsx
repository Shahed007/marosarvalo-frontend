// RecursiveMenu.tsx
import React from "react";
import  Link  from "next/link";
import { MenuUnfoldOutlined } from "@ant-design/icons";

interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  href?: string;
  children?: MenuItem[];
}

interface RecursiveMenuProps {
  items: MenuItem[];
  collapsed?: boolean;
  level?: number;
}

const RecursiveMenu: React.FC<RecursiveMenuProps> = ({
  items,
  collapsed,
  level = 0,
}) => {
  return (
    <ul className="ant-menu ant-menu-inline ant-menu-root">
      {items.map((item) => (
        <RecursiveMenuItem key={item.key} item={item} level={level} collapsed={collapsed} />
      ))}
    </ul>
  );
};

interface RecursiveMenuItemProps {
  item: MenuItem;
  level: number;
  collapsed?: boolean;
}

const RecursiveMenuItem: React.FC<RecursiveMenuItemProps> = ({
  item,
  level,
  collapsed,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const [open, setOpen] = React.useState(level === 0); // Open top-level by default

  const toggleOpen = () => {
    if (hasChildren) {
      setOpen(!open);
    }
  };

  const paddingLeft = 24 + level * 16;

  return (
    <li className={`ant-menu-item ant-menu-item-only-child ${hasChildren ? "ant-menu-submenu" : ""}`}>
      <div
        onClick={toggleOpen}
        style={{
          paddingLeft: collapsed ? 24 : paddingLeft,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
          height: 40,
          fontWeight: item.href ? 400 : 600,
        }}
      >
        {item.icon && (
          <span className="ant-menu-item-icon" style={{ marginRight: 8 }}>
            {item.icon}
          </span>
        )}

        <span className="ant-menu-title-content">
          {item.href ? (
            <Link
              href={item.href}
              style={{
                color: "inherit",
                textDecoration: "none",
                display: "block",
                width: "100%",
              }}
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>

        {hasChildren && (
          <MenuUnfoldOutlined
            style={{
              fontSize: 12,
              marginLeft: "auto",
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
        )}
      </div>

      {/* Render children if open */}
      {hasChildren && open && (
        <ul
          className="ant-menu ant-menu-inline"
          style={{
            marginTop: 4,
            marginBottom: 4,
            paddingLeft: collapsed ? 24 : paddingLeft,
            borderLeft: level === 0 ? "none" : "2px solid #e8e8e8",
            marginLeft: 8,
          }}
        >
          {item.children?.map((child) => (
            <RecursiveMenuItem
              key={child.key}
              item={child}
              level={level + 1}
              collapsed={collapsed}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default RecursiveMenu;