import { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    colorPrimary: "#225A7F",
    colorBgContainer: "#ffffff",
    colorText: "#263446",
    colorBorder: "#d9d9d9",
    borderRadius: 6,
    fontSize: 14,
    sizeUnit: 4,
    sizeStep: 4,
    wireframe: false,
    fontFamily: "var(--font-inter)",
  },
  components: {
    Layout: {
      colorBgHeader: "#ffffff",
      colorBgBody: "#ffffff",
      colorBgTrigger: "#f0f0f0",
      siderBg: "#6B91A31A",
    },

    Menu: {
      colorItemBg: "transparent",
      // colorItemBgSelected: "#e6f7ff",
      // colorItemTextSelected: "#1890ff",
      colorItemText: "#0B121B",
      colorSubItemBg: "transparent",
      colorActiveBarWidth: 3,
      colorActiveBarBorderSize: 0,
    },
    Button: {
      colorPrimary: "#225A7F",
      colorPrimaryHover: "#1B4866",
      colorPrimaryActive: "#16394F",
    },
  },
};

// You can create multiple themes
export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#177ddc",
    colorBgContainer: "#1f1f1f",
    colorText: "#ffffff",
    colorBorder: "#434343",
    borderRadius: 6,
  },
  components: {
    Layout: {
      colorBgHeader: "#1f1f1f",
      colorBgBody: "#000000",
    },
    Menu: {
      colorItemBg: "transparent",
      colorItemBgSelected: "#111b26",
      colorItemTextSelected: "#177ddc",
    },
  },
};

// Medical-themed configuration
export const medicalTheme: ThemeConfig = {
  token: {
    colorPrimary: "#2d8cff",
    colorBgContainer: "#ffffff",
    colorText: "#2c3e50",
    colorBorder: "#e4e5e7",
    borderRadius: 8,
  },
  components: {
    Menu: {
      colorItemBgSelected: "#f0f7ff",
      colorItemTextSelected: "#2d8cff",
    },
  },
};
