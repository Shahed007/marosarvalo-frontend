import { BookingTable } from "@/components/admin/booking-list/bookingListTable";
import React from "react";

export default function BookingPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 mb-8">
      <BookingTable />
    </div>
  );
}
