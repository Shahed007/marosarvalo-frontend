"use client";
import { Card, Row, Col, Typography, Button, Space } from "antd";
const { Title, Text } = Typography;

const SummarySection = () => {
  return (
    <div>
      {/* Summary Cards */}
      <Row gutter={[16, 16]} justify="start">
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card
            bordered
            style={{
              borderRadius: "12px",
              height: "100%",
              textAlign: "left",
            }}
          >
            <Text type="secondary">Total Cancellations</Text>
            <Title
              style={{ margin: "8px 0", fontSize: "44px", fontWeight: "bold" }}
            >
              25
            </Title>
            <Text type="secondary">This Month</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card
            bordered
            style={{
              borderRadius: "12px",
              height: "100%",
              textAlign: "left",
            }}
          >
            <Text type="secondary">Cancellation Rate</Text>
            <Title
              style={{ margin: "8px 0", fontSize: "44px", fontWeight: "bold" }}
            >
              5%
            </Title>
            <Text type="secondary">This Month</Text>
          </Card>
        </Col>
      </Row>

      {/* Full Metric Export Buttons */}
      <div style={{ marginTop: "24px" }}>
        <Title
          level={5}
          style={{
            marginBottom: "12px",
          }}
        >
          Full Metric Export
        </Title>
        <Space wrap>
          <Button
            style={{
              fontWeight: "bold",
            }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
              >
                <path
                  d="M9.93429 5.29412H8.57143V0.882353C8.57143 0.397059 8.18571 0 7.71429 0H4.28571C3.81429 0 3.42857 0.397059 3.42857 0.882353V5.29412H2.06571C1.30286 5.29412 0.917143 6.24706 1.45714 6.80294L5.39143 10.8529C5.72571 11.1971 6.26571 11.1971 6.6 10.8529L10.5343 6.80294C11.0743 6.24706 10.6971 5.29412 9.93429 5.29412ZM0 14.1176C0 14.6029 0.385714 15 0.857143 15H11.1429C11.6143 15 12 14.6029 12 14.1176C12 13.6324 11.6143 13.2353 11.1429 13.2353H0.857143C0.385714 13.2353 0 13.6324 0 14.1176Z"
                  fill="#0B121B"
                />
              </svg>
            }
            type="default"
          >
            . PDF
          </Button>
          <Button
            style={{
              fontWeight: "bold",
            }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
              >
                <path
                  d="M9.93429 5.29412H8.57143V0.882353C8.57143 0.397059 8.18571 0 7.71429 0H4.28571C3.81429 0 3.42857 0.397059 3.42857 0.882353V5.29412H2.06571C1.30286 5.29412 0.917143 6.24706 1.45714 6.80294L5.39143 10.8529C5.72571 11.1971 6.26571 11.1971 6.6 10.8529L10.5343 6.80294C11.0743 6.24706 10.6971 5.29412 9.93429 5.29412ZM0 14.1176C0 14.6029 0.385714 15 0.857143 15H11.1429C11.6143 15 12 14.6029 12 14.1176C12 13.6324 11.6143 13.2353 11.1429 13.2353H0.857143C0.385714 13.2353 0 13.6324 0 14.1176Z"
                  fill="#0B121B"
                />
              </svg>
            }
            type="default"
          >
            . Excel
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default SummarySection;
