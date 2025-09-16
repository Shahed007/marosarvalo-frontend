import AllStaff from "@/components/pages/clinic/Settings/AllStaff";
import { AllStaffs } from "@/types/global";
import Title from "antd/es/typography/Title";

export default function page() {
  const serviceData: AllStaffs[] = [
    {
      id: "1",
      name: "Premium Package",
      discipline: "Operation",
      email: "emily.carter@example.com",
      role: "Specialist",
      status: "Active",
    },
    {
      id: "2",
      name: "Premium Package",
      discipline: "Operation",
      email: "emily.carter@example.com",
      role: "Specialist",
      status: "Active",
    },
    {
      id: "3",
      name: "Premium Package",
      discipline: "Operation",
      email: "emily.carter@example.com",
      role: "Specialist",
      status: "Inactive",
    },
  ];
  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
      <Title level={2}>Settings-User Management</Title>
      <AllStaff data={serviceData} />
    </div>
  );
}
