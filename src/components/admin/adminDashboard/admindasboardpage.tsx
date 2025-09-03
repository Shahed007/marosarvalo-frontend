 
"use client"



import { RevenueChartCard } from "./ReveniewCard"
import { ClinicTableCard } from "./ClinicTable"
import { MetricCardsRow } from "./MetricCard"



// Shared mini chart data


export default function AdminDashboard() {


  return (
    <div >
      {/* Header */}
     

      {/* Metric Cards */}
      <MetricCardsRow/>

      {/* Revenue Chart */}
      <RevenueChartCard />

      {/* Clinic List */}
      <ClinicTableCard />
    </div>
  )
}