/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {  Button, Avatar, Typography, Space, Dropdown } from "antd"
import { BellOutlined } from "@ant-design/icons"

import { RevenueChartCard } from "./ReveniewCard"
import { ClinicTableCard } from "./ClinicTable"
import { MetricCardsRow } from "./MetricCard"


const { Text } = Typography

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