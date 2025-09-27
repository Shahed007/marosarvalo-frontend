"use client";
import GuardianInformation from "@/components/patient/patientsDetails/guardianInformation/GuardianInformation";
import PatientNote from "@/components/patient/patientsDetails/patientNote/PatientNote";
import Profile from "@/components/patient/patientsDetails/profile/Profile";
import TabsInfo from "@/components/patient/patientsDetails/tabsInfo/TabsInfo";
import UserInfoCard from "@/components/patient/patientsDetails/userInfoCard/UserInfoCard";
import Title from "antd/es/typography/Title";

import React from "react";

export default function page() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 mb-8">
      <Title level={2}>Patient Info</Title>

      {/* Responsive grid: stack on mobile, 2 columns on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 mt-4">
        <div className="w-full md:w-auto">
          <Profile />
        </div>
        <div className="flex-1">
          <UserInfoCard />
        </div>
      </div>

      {/* Guardian Information and Notes */}
      <div className="mt-6 space-y-6">
        <GuardianInformation />
        <PatientNote />
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <TabsInfo />
      </div>
    </div>
  );
}
