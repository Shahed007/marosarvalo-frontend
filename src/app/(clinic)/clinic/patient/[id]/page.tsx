"use client";
import GuardianInformation from "@/components/patient/patientsDetails/guardianInformation/GuardianInformation";
import PatientNote from "@/components/patient/patientsDetails/patientNote/PatientNote";
import Profile from "@/components/patient/patientsDetails/profile/Profile";
import UserInfoCard from "@/components/patient/patientsDetails/userInfoCard/UserInfoCard";
import Title from "antd/es/typography/Title";

const PatientsDetails = () => {
    
  return (
    <div>
      <Title level={2}>Patient Info</Title>
      <div className="grid grid-cols-[22%_1fr] gap-6">
        <Profile />

        <div className="flex-1">
          <UserInfoCard />
        </div>
      </div>
      <GuardianInformation />
      <PatientNote />
    </div>
  );
};

export default PatientsDetails;
