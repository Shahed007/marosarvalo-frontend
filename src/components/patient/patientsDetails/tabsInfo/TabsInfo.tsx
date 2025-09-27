"use client";
import AppointmentTable, {
  AppointmentTableTypes,
} from "@/components/table/AppointmentTable";
import BondsTable, { BondDataType } from "@/components/table/BondsTable";
import { Button, Card, Tabs } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { IoMdDownload } from "react-icons/io";

const TabsInfo = () => {
  const appointmentData: AppointmentTableTypes[] = [
    { id: "#12345", time: "10:15 AM", name: "Redwan", contact: "565", specialist: "Shakil ur Rahman", status: "Confirm" },
    { id: "#12346", time: "11:00 AM", name: "Shahed", contact: "123", specialist: "Shakil ur Rahman", status: "Canceled" },
    { id: "#12347", time: "12:30 PM", name: "Karim", contact: "789", specialist: "Shakil ur Rahman", status: "Canceled" },
  ];

  const bondsData: BondDataType[] = [
    { key: "1", id: "1254", name: "Premium Package", discipline: "Operation", services: "Surgery", sessions: 5, price: "$250", status: "Active" },
    { key: "2", id: "1255", name: "Standard Package", discipline: "Operation", services: "Surgery", sessions: 5, price: "$250", status: "Active" },
    { key: "3", id: "1256", name: "Trial Package", discipline: "Operation", services: "Surgery", sessions: 5, price: "$250", status: "Inactive" },
  ];

  const [activeTab, setActiveTab] = useState("bonds-&-appointments");

  const tabItems = [
    {
      key: "bonds-&-appointments",
      label: "Bonds & Appointments",
      children: (
        <div className="flex flex-col gap-6">
          <div className="overflow-x-auto">
            <AppointmentTable data={appointmentData} />
          </div>

          <div className="flex flex-col gap-4">
            <Title level={5}>Bonds:</Title>
            <div className="overflow-x-auto">
              <BondsTable data={bondsData} />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "attachments",
      label: "Attachments",
      children: (
        <Card className="space-y-6">
          <div>
            <h2 className="text-gray-400 font-medium mb-3">Mandatory Document:</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 flex-wrap">
              <Button icon={<IoMdDownload />} className="w-full sm:w-auto">Download Document</Button>
              <Button icon={<IoMdDownload />} className="w-full sm:w-auto">Download Document</Button>
            </div>
          </div>
          <div>
            <h2 className="text-gray-400 font-medium mb-3">Other Document:</h2>
            <Button icon={<IoMdDownload />} className="w-full sm:w-auto">Download Document</Button>
          </div>
        </Card>
      ),
    },
    {
      key: "medical-history",
      label: "Medical History",
      children: (
        <Card className="space-y-6">
          <div>
            <h2 className="text-gray-400 pb-2">Medical Condition:</h2>
            <p
              className="text-sm sm:text-base"
              dangerouslySetInnerHTML={{
                __html:
                  "Hypertension (10 yrs), type 2 diabetes (5 yrs). Medications: metformin 500mg BD, losartan 50mg OD. Allergies: penicillin (rash). No smoking/alcohol. Family history: father (HTN), mother (T2DM). Last dental visit: 6/2023 for cleaning. Reports occasional gum bleeding.",
              }}
            ></p>
          </div>
          <div>
            <h2 className="text-gray-400 pb-2">Allergies:</h2>
            <p className="text-sm sm:text-base">
              45M, HTN/DM2. Penicillin allergy. UL6 sensitivity + gum bleeding. Last cleaning Jun/23.
            </p>
          </div>
          <div>
            <h2 className="text-gray-400 pb-2">Medications:</h2>
            <p className="text-sm sm:text-base">
              45M, HTN & DM2 (controlled), no smoking. Allergies: Penicillin (rash). Meds: Metformin, Lisinopril. Last dental visit: Jun/23 (cleaning). Complaints: UL6 sensitivity, occasional gum bleeding. Poor flossing. FH: HTN (father), DM2 (mother).
            </p>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="mb-6"
        type="line"
        size="large"
      />
    </div>
  );
};

export default TabsInfo;
