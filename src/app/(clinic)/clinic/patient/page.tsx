import PatientTable, {
  Patient as PatientType,
} from "@/components/table/PatientTable";
import Title from "antd/es/typography/Title";
import React from "react";

const patients: PatientType[] = [
  {
    id: "12345",
    name: "Sophia Clark",
    phone: "(XXX) XXX-4567",
    email: "so*****@email.com",
    lastAppointment: "2023-11-15",
    status: "Active",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  {
    id: "12346",
    name: "Liam Walker",
    phone: "(XXX) XXX-7890",
    email: "li*****@email.com",
    lastAppointment: "2019-11-20",
    status: "Inactive",
  },
  // ...more patient records
];
const Patient = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
      <Title level={2}>Patients</Title>
      <PatientTable data={patients} />
    </div>
  );
};

export default Patient;
