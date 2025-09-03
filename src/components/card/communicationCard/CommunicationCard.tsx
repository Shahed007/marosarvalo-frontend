import { Button, Card, Select, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { FC } from "react";
// import { FiEdit } from "react-icons/fi";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaCommentSms } from "react-icons/fa6";
import UpdateReminderForm from "@/components/drawer/UpdatedReminder";

export interface CommunicationCardType {
  title: string;
  description: string;
  whatsApp: string;
  sms: string;
  status: "active" | "inactive";
}

const CommunicationCard: FC<CommunicationCardType> = ({
  title,
  description,
  whatsApp,
  sms,
  status,
}) => {
  return (
    <Card
      title={<Title level={5}>{title}</Title>}
      extra={
        <div className="flex items-center gap-3">
          <UpdateReminderForm />
          <Select
            defaultValue={status}
            style={{
              minWidth: 100,
            }}
            options={[
              {
                label: "Active",
                value: "active",
              },
              {
                label: "Inactive",
                value: "inactive",
              },
            ]}
          />
        </div>
      }
    >
      <Typography>{description}</Typography>
      <div className="mt-4">
        <Title level={5}>Reminder sending preference (order):</Title>
        <div className="flex items-center gap-3">
          <Button href={whatsApp} type="text" icon={<FaSquareWhatsapp />}>
            WhatsApp
          </Button>
          <Button href={sms} type="text" icon={<FaCommentSms />}>
            SMS
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CommunicationCard;
