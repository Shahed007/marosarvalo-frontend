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
  // const [loading, setLoading] = useState(false);

  // Sample data - this would typically come from an API
  const appointmentData: AppointmentTableTypes[] = [
    {
      id: "#12345",
      time: "10:15 AM",
      name: "Redwan",
      contact: "565",
      specialist: "Shakil ur Rahman",
      status: "Confirm",
    },
    {
      id: "#12346",
      time: "11:00 AM",
      name: "Shahed",
      contact: "123",
      specialist: "Shakil ur Rahman",
      status: "Canceled",
    },
    {
      id: "#12347",
      time: "12:30 PM",
      name: "Karim",
      contact: "789",
      specialist: "Shakil ur Rahman",
      status: "Canceled",
    },
  ];

  // const handleViewDetails = (record: AppointmentTableTypes) => {
  //   console.log("View details for:", record);
  //   // You can implement navigation or a modal here
  // };

  const bondsData: BondDataType[] = [
    {
      key: "1",
      id: "1254",
      name: "Premium Package",
      discipline: "Operation",
      services: "Surgery",
      sessions: 5,
      price: "$250",
      status: "Active",
    },
    {
      key: "2",
      id: "1255",
      name: "Standard Package",
      discipline: "Operation",
      services: "Surgery",
      sessions: 5,
      price: "$250",
      status: "Active",
    },
    {
      key: "3",
      id: "1256",
      name: "Trial Package",
      discipline: "Operation",
      services: "Surgery",
      sessions: 5,
      price: "$250",
      status: "Inactive",
    },
  ];

  const [activeTab, setActiveTab] = useState("bonds-&-appointments");

  const tabItems = [
    {
      key: "bonds-&-appointments",
      label: "Bonds & Appointments",
      children: (
        <div>
          <AppointmentTable
            data={appointmentData}
            // onViewDetails={handleViewDetails}
          />

          <div className="mt-6">
            <Title level={5}>Bonds:</Title>
            <BondsTable data={bondsData} />
          </div>
        </div>
      ),
    },
    {
      key: "attachments",
      label: "Attachments",
      children: (
        <Card>
          <div className="mb-5">
            <h2 className="text-gray-400 font-medium mb-3">
              Mandatory Document:
            </h2>
            <div className="flex items-center gap-6">
              <Button icon={<IoMdDownload />}>Download Document</Button>
              <Button icon={<IoMdDownload />}>Download Document</Button>
            </div>
          </div>
          <div>
            <h2 className="text-gray-400 font-medium mb-3">Other Document:</h2>
            <div>
              <Button icon={<IoMdDownload />}>Download Document</Button>
            </div>
          </div>
        </Card>
      ),
    },
    {
      key: "medical-history",
      label: "Medical History",
      children: (
        <div>
          <Card>
            <div className="mb-5">
              <h2 className="text-gray-400 pb-3">Medical Condition:</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    "Hypertension (10 yrs), type 2 diabetes (5 yrs). Medications: metformin 500mg BD, losartan 50mg OD. Allergies: penicillin (rash). No smoking/alcohol. Family history: father (HTN), mother (T2DM). Last dental visit: 6/2023 for cleaning. Reports occasional gum bleeding.",
                }}
              ></p>
            </div>
            <div className="mb-5">
              <h2 className="text-gray-400 pb-3">Allergies:</h2>
              <p>
                {" "}
                45M, HTN/DM2. Penicillin allergy. UL6 sensitivity + gum
                bleeding. Last cleaning Jun/23.
              </p>
            </div>
            <div className="mb-5">
              <h2 className="text-gray-400 pb-3">Medications:</h2>
              <p>
                45M, HTN & DM2 (controlled), no smoking. Allergies: Penicillin
                (rash). Meds: Metformin, Lisinopril. Last dental visit: Jun/23
                (cleaning). Complaints: UL6 sensitivity, occasional gum
                bleeding. Poor flossing. FH: HTN (father), DM2 (mother).
                (Condensed version focusing on key points - ideal for quick
                reference.)
              </p>
            </div>
          </Card>
        </div>
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
      />
    </div>
  );
};

export default TabsInfo;
