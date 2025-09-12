"use client";

import { RevenueChartCard } from "./ReveniewCard";
import { ClinicTableCard } from "./ClinicTable";
import { MetricCardsRow } from "./MetricCard";

// Shared mini chart data

export default function AdminDashboard() {
  return (
    <div>
      <div>
        <h1 className="ps-5 text-3xl font-semibold">Dashboard</h1>
      </div>
      {/* Metric Cards */}
      <MetricCardsRow />
      {/* Revenue Chart */}
      <RevenueChartCard />
      {/* Clinic List */}
      <ClinicTableCard />
    </div>
  );
}
