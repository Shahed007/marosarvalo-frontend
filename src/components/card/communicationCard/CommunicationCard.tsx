import { Button, Card, Select, Typography, Space } from "antd";
import Title from "antd/es/typography/Title";
import { FC, useState } from "react";
import { FaSquareWhatsapp, FaCommentSms } from "react-icons/fa6";
import UpdateReminderForm from "@/components/drawer/UpdatedReminder";

export interface CommunicationCardType {
  title: string;
  description: string;
  whatsApp: string;
  sms: string;
  status: "active" | "inactive";
}

const statusOptions = [
  { label: "Active", value: "active", bgColor: "#D0E9FF", textColor: "#0B121B" },
  { label: "Inactive", value: "inactive", bgColor: "#FFD6DC", textColor: "#D93025" },
];

const CommunicationCard: FC<CommunicationCardType> = ({
  title,
  description,
  whatsApp,
  sms,
  status: initialStatus,
}) => {
  const [status, setStatus] = useState(initialStatus);
  const current = statusOptions.find((opt) => opt.value === status);

  return (
    <Card
      title={<Title level={5}>{title}</Title>}
      extra={
        <Space size="middle" align="center">
          <UpdateReminderForm />
          <Select
            value={status}
            onChange={setStatus}
            bordered={false}
            style={{
              minWidth: 100,
              fontWeight: 500,
              color: current?.textColor,
              backgroundColor: current?.bgColor,
              borderRadius: 4,
              padding: "18px 8px",
            }}
            dropdownStyle={{
              borderRadius: 6,
              padding: "4px 0",
              background: "#fff",
            }}
            options={statusOptions.map(({ label, value, bgColor, textColor }) => ({
              value,
              label: (
                <div
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {label}
                </div>
              ),
            }))}
            optionLabelProp="label"
          />
        </Space>
      }
    >
      <Typography.Paragraph>{description}</Typography.Paragraph>

      <div style={{ marginTop: 16 }}>
        <Title level={5}>Reminder sending preference (order):</Title>
        <Space size="middle">
          <Button
            href={whatsApp}
            type="primary"
            icon={<FaSquareWhatsapp />}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            WhatsApp
          </Button>
          <Button
            href={sms}
            type="default"
            icon={<FaCommentSms />}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            SMS
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default CommunicationCard;
