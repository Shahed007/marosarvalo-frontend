"use client";
import CommunicationCard, {
  CommunicationCardType,
} from "@/components/card/communicationCard/CommunicationCard";
import AddNewReminder from "@/components/drawer/AddNewReminder";
import ReminderTable, {
  ReminderRecord,
} from "@/components/table/ReminderTable";
import { Tabs } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";

const Communications = () => {
  const [activeTab, setActiveTab] = useState("reminders");
  const [loading] = useState(false);

  const mockData: ReminderRecord[] = [
    {
      key: "1",
      patientName: "Emily Carter",
      reminderType: "Appointment",
      communicationType: "Email, SMS",
      subject: "Appointment Reminder",
      sentDateTime: "2024-07-26 10:00 AM",
      status: "Delivered",
    },
  ];
  const communicationCards: CommunicationCardType[] = [
    {
      title: "72 hours prior to the appointment",
      description: "Reminder sent 3 days before the appointment.",
      whatsApp: "Your appointment is in 72 hours.",
      sms: "Appointment reminder: 72 hours left.",
      status: "active",
    },
    {
      title: "48 hours prior to the appointment",
      description: "Reminder sent 2 days before the appointment.",
      whatsApp: "Don’t forget, appointment in 48 hours.",
      sms: "Reminder: appointment in 48 hours.",
      status: "inactive",
    },
    {
      title: "24 hours prior to the appointment",
      description: "Critical reminder, sent 1 day before.",
      whatsApp: "Your appointment is tomorrow.",
      sms: "Appointment reminder: tomorrow at scheduled time.",
      status: "active",
    },
    {
      title: "12 hours prior to the appointment",
      description: "Friendly reminder, sent half a day before.",
      whatsApp: "Appointment in 12 hours. Be prepared.",
      sms: "Reminder: appointment in 12 hours.",
      status: "active",
    },
    {
      title: "6 hours prior to the appointment",
      description: "Reminder sent 6 hours before appointment.",
      whatsApp: "You have an appointment in 6 hours.",
      sms: "Appointment is in 6 hours.",
      status: "inactive",
    },
    {
      title: "3 hours prior to the appointment",
      description: "Gentle nudge 3 hours before.",
      whatsApp: "Reminder: appointment in 3 hours.",
      sms: "Your appointment will start in 3 hours.",
      status: "active",
    },
    {
      title: "1 hour prior to the appointment",
      description: "Final reminder, sent 1 hour before.",
      whatsApp: "Your appointment is in 1 hour.",
      sms: "Appointment reminder: 1 hour left.",
      status: "active",
    },
    {
      title: "30 minutes prior to the appointment",
      description: "Quick reminder before the session.",
      whatsApp: "Appointment starts in 30 minutes.",
      sms: "Reminder: appointment in 30 minutes.",
      status: "inactive",
    },
    {
      title: "Post-appointment thank you",
      description: "Thanking the customer after the appointment.",
      whatsApp: "Thank you for attending your appointment.",
      sms: "Thanks for visiting us today.",
      status: "active",
    },
    {
      title: "Missed appointment follow-up",
      description: "Follow-up if the appointment was missed.",
      whatsApp:
        "We noticed you missed your appointment. Would you like to reschedule?",
      sms: "You missed your appointment. Reply to reschedule.",
      status: "inactive",
    },
  ];

  const tabItems = [
    {
      key: "reminders",
      label: "Reminders",
      children: (
        <div className="grid grid-cols-1 gap-6">
          <div className="flex justify-end">
            <AddNewReminder />
          </div>
          {communicationCards.map((item, idx) => (
            <CommunicationCard key={idx} {...item} />
          ))}
        </div>
      ),
    },
    {
      key: "history",
      label: "History",
      children: (
        <div>
          <ReminderTable loading={loading} data={mockData} />
        </div>
      ),
    },
  ];
  return (
    <div className="mb-12 p-4 md:p-6 lg:p-8 mb-8">
      <Title level={2}>Communication</Title>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="mb-6"
      />
    </div>
  );
};

export default Communications;
