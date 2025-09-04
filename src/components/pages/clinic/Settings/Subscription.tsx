"use client";
import { Card, Button, Typography, List, Space } from "antd";

const { Title, Text } = Typography;

export default function SubscriptionSettings() {
  const features = [
    "30 Days Visibility",
    "Highlighted in Search Results",
    "4 Revisions",
    "5 days Delivery Time",
    "Premium Support",
  ];

  return (
    <div>
      <div style={{ maxWidth: "350px" }}>
        <Title
          level={4}
          style={{ color: "#0B121B", marginBottom: "24px", fontSize: "32px" }}
        >
          Settings-Subscription
        </Title>

        <Card
          style={{
            backgroundColor: "#ffffff",
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            borderRadius: "8px",
          }}
          bodyStyle={{ padding: "24px" }}
        >
          <div
            style={{ paddingBottom: "16px", borderBottom: "1px solid #f3f4f6" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <Title
                level={1}
                style={{
                  margin: 0,
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                $49
              </Title>
              <Text type="secondary" style={{ fontSize: "14px" }}>
                Expires 31 JAN 2016
              </Text>
            </div>
            <Text
              type="secondary"
              style={{ fontSize: "14px", marginTop: "8px", display: "block" }}
            >
              One time fee for live listing or task highlighted in search
              results.
            </Text>
          </div>

          <div style={{ marginTop: "24px", marginBottom: "24px" }}>
            <List
              size="small"
              dataSource={features}
              renderItem={(item) => (
                <List.Item style={{ padding: "4px 0", border: "none" }}>
                  <Text style={{ fontSize: "14px", color: "#4b5563" }}>
                    {item}
                  </Text>
                </List.Item>
              )}
            />
          </div>

          <Space
            size="middle"
            style={{ width: "100%" }}
            className="!flex justify-center items-center"
          >
            {/* Activated Button */}
            <Button
              style={{
                flex: 1,
                backgroundColor: "#007A9C",
                color: "#fff",
                borderColor: "#007A9C",
                height: "40px",
                borderRadius: "12px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#005f7a";
                e.currentTarget.style.borderColor = "#005f7a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#007A9C";
                e.currentTarget.style.borderColor = "#007A9C";
              }}
            >
              Activated
            </Button>

            {/* Go to the plan Button */}
            <Button
              style={{
                flex: 1,
                backgroundColor: "#fff",
                color: "#0B121B",
                borderColor: "#0B121B",
                height: "40px",
                borderRadius: "12px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f0f0";
                e.currentTarget.style.borderColor = "#0B121B";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.borderColor = "#0B121B";
              }}
            >
              Go to the plan
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
}
