import ServicesByType from "@/components/dashboard/servicesByType/ServicesByType";
import React from "react";

const data = [
  { name: "XYZ", value: 10 },
  { name: "XYZ", value: 5 },
  { name: "XYZ", value: 15 },
  { name: "XYZ", value: 9 },
  { name: "XYZ", value: 8 },
  { name: "XYZ", value: 7 },
  { name: "XYZ", value: 4 },
];
const ServicesByTypeClinic = () => {
  return (
    <div className="mt-10">
      <ServicesByType height={550} data={data} />
    </div>
  );
};

export default ServicesByTypeClinic;
