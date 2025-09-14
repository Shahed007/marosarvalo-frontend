"use client";
import VoucherTable, { Voucher } from "@/components/table/VoucherTable";
import Title from "antd/es/typography/Title";
import React from "react";

const VoucherPage = () => {
  const mockData: Voucher[] = [
    {
      key: "1",
      id: "#256526",
      voucherName: "Gangrei voucher",
      associateName: "John Son",
      expireDate: "02/08/2025",
      amount: 280,
      status: "Active",
    },
    {
      key: "2",
      id: "#256526",
      voucherName: "Gangrei voucher",
      associateName: "John Son",
      expireDate: "02/08/2025",
      amount: 280,
      status: "Active",
    },
    {
      key: "3",
      id: "#256526",
      voucherName: "Gangrei voucher",
      associateName: "John Son",
      expireDate: "02/08/2025",
      amount: 280,
      status: "Inactive",
    },
    // Add more data objects as needed
  ];

  const handleRemoveVoucher = () => {};

  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
      <Title level={2}>Settings-Voucher</Title>

      <Title level={5}>Vouchers</Title>
      <VoucherTable
        data={mockData}
        loading={false}
        onRemoveVoucher={handleRemoveVoucher}
      />
    </div>
  );
};

export default VoucherPage;
