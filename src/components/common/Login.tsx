"use client";
import { Button, Card, Input, Checkbox, Typography, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function Login() {
  const router = useRouter();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const password = (form.elements.namedItem("password") as HTMLInputElement).value;
  console.log(password)
  switch (email) {
    case "admin@gmail.com":
      router.push("/admin");
      break;
    case "clinic@gmail.com":
      router.push("/clinic");
      break;
    case "reception@gmail.com":
      router.push("/reception");
      break;
    case "specillist@gmail.com":
      router.push("/specillist");
      break;
    default:
      alert("Invalid email");
  }
};
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // ✅ centers logo & card
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "32px" }}>
          <Image src={logo} width={175} height={40} alt="logo" />
        </div>

        {/* Login Card */}
        <Card
          style={{
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            width: "100%", // ✅ card matches container width
          }}
          bodyStyle={{ padding: 0 }}
        >
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <Title level={4} style={{ marginBottom: "4px", color: "#111827" }}>
              Welcome Back!
            </Title>
            <Text type="secondary">Let&lsquo;s Login Your Account</Text>
          </div>

          <form onSubmit={handleLogin} style={{ padding: "24px" }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div>
                <Text
                  strong
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                  }}
                >
                  Email/User Id
                </Text>
                <Input
                  name="email"
                  prefix={<UserOutlined style={{ color: "#9ca3af" }} />}
                  placeholder="Enter your email or user ID"
                  style={{
                    backgroundColor: "#f3f4f6",
                    borderColor: "#e5e7eb",
                    color: "#6b7280",
                  }}
                />
              </div>

              <div>
                <Text
                  strong
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                  }}
                >
                  Password
                </Text>
                <Input.Password
                  name="password"
                  prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
                  placeholder="Enter your password"
                  style={{
                    backgroundColor: "#f3f4f6",
                    borderColor: "#e5e7eb",
                    color: "#6b7280",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "8px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    style={{ fontSize: "14px", color: "#6b7280" }}
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forget-password"
                  style={{
                    fontSize: "14px",
                    color: "#225A7F",
                    textDecoration: "underline",
                  }}
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#225A7F",
                  height: "42px",
                  fontWeight: 500,
                  marginTop: "24px",
                }}
              >
                Login Now
              </Button>
            </Space>
          </form>
        </Card>
      </div>
    </div>
  );
}
