/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Radio, Select, Button } from "antd";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import Link from "next/link";

const { Option } = Select;

export default function SubscriptionPage() {
  const [packageType, setPackageType] = useState<"basic" | "pro">("basic");
  const [selectedPlan, setSelectedPlan] = useState<"quarterly" | "semi-annual" | "annual">("semi-annual");

  const handlePackageChange = (e: RadioChangeEvent) => {
    setPackageType(e.target.value);
  };

  const plans = [
    {
      id: "quarterly",
      name: "Quarterly",
      price: "120 AUD",
      features: [
        "Unlimited Rating",
        "10 searches/month",
        "Unlimited free listings for 4 months then $20/month (per sub-validity)",
        "Lease contract: 50 MAD each",
        "Inventory: 50 MAD each",
        "No access to verified tenant contacts",
      ],
    },
    {
      id: "semi-annual",
      name: "Semi-Annual",
      price: "200 AUD",
      features: [
        "Unlimited Rating",
        "Multi-location support, patient portal",
        "Multi-branch + data encryption",
        "All modules + API + 24/7 support",
        "Unlimited doctors + cloud sync",
        "Multi-location support, patient portal",
      ],
    },
    {
      id: "annual",
      name: "Annual",
      price: "360 AUD",
      features: [
        "Unlimited Rating",
        "Secure data encryption, patient fee...",
        "Advanced reports (revenue, appoint...",
        "Full inventory control, expense ma...",
        "Multi-branch clinic access, patient...",
        "Full inventory control, expense ma...",
      ],
    },
  ];

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl  px-8 py-8">
        {/* Header Row: Title, Button, Description */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-900">Subscription</h1>
            <p className="text-gray-600 mt-1">Subscription Management</p>
          </div>

          {/* Add Subscribe Button */}
       <Link href="/admin/subcription/add-subscription">

          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => console.log("Add new subscription")}
            style={{
              backgroundColor: "#225A7F",
              borderColor: "#225A7F",
              color: "#D3DEE5",
              fontWeight: 500,
              borderRadius: "6px",
              fontSize: "14px",
            }}
            className="whitespace-nowrap"
          >
            Add Subscribe
          </Button>
       </Link>
        </div>

        {/* Card Container */}
        <div className="bg-white  p-8">
          {/* Package Selector */}
          <div className="mb-8">
            <Select
              defaultValue="select"
              size="large"
              placeholder="Select Package"
              style={{ width: "100%", textAlign: "center" }}
              className="text-center"
            >
              <Option value="select" style={{ textAlign: "center" }}>
                Select Package
              </Option>
              <Option value="package1" style={{ textAlign: "center" }}>
                Package 1
              </Option>
              <Option value="package2" style={{ textAlign: "center" }}>
                Package 2
              </Option>
            </Select>
          </div>

          {/* Basic / Pro Toggle */}
          <div className="flex justify-center mb-8">
            <Radio.Group onChange={handlePackageChange} value={packageType}>
              <Radio value="basic" className="mr-6">
                Basic
              </Radio>
              <Radio value="pro">Pro</Radio>
            </Radio.Group>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg p-6 transition-all cursor-pointer ${
                  plan.id === selectedPlan
                    ? "bg-[#2c5f7f] text-white shadow-lg"
                    : "bg-white border border-gray-200 text-gray-900 hover:border-[#2c5f7f] hover:shadow-md"
                }`}
                onClick={() => setSelectedPlan(plan.id as any)}
              >
                {/* Header */}
                <h3
                  className={`text-lg font-medium mb-2 ${
                    plan.id === selectedPlan ? "text-white" : "text-[#2c5f7f]"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-3xl font-bold mb-6 ${
                    plan.id === selectedPlan ? "text-white" : "text-[#2c5f7f]"
                  }`}
                >
                  {plan.price}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 py-2 ${
                        index !== plan.features.length - 1
                          ? plan.id === selectedPlan
                            ? "border-b border-white/20"
                            : "border-b border-gray-200"
                          : ""
                      }`}
                    >
                      <CheckOutlined
                        className={`mt-1 flex-shrink-0 ${
                          plan.id === selectedPlan ? "text-white" : "text-[#2c5f7f]"
                        }`}
                      />
                      <span
                        className={`text-sm ${plan.id === selectedPlan ? "text-white" : "text-gray-600"}`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Edit Plan Button */}
                <Link href="/admin/subcription/1">
                <Button
                  type={plan.id === selectedPlan ? "default" : "primary"}
                  size="large"
                  block
                  className={`font-medium rounded-md ${
                    plan.id === selectedPlan
                      ? "bg-white text-[#2c5f7f] hover:bg-gray-100 border border-white"
                      : "bg-[#2c5f7f] text-white hover:bg-[#234d66] border-none"
                  }`}
                
                >
                  Edit Plan
                </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}