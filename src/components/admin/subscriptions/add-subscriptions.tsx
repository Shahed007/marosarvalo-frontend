/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Radio, Select, Button, Checkbox, Input } from "antd"
import type { RadioChangeEvent } from "antd"

const { Option } = Select

export default function SubscriptionPage() {
  const [packageType, setPackageType] = useState<"basic" | "pro">("basic")
  const [userType, setUserType] = useState<"individual" | "agency" | "developer">("individual")
  const [duration, setDuration] = useState<"quarterly" | "semi-annual" | "annual">("quarterly")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [basicPrice, setBasicPrice] = useState<string>("")

  const handlePackageChange = (e: RadioChangeEvent) => {
    setPackageType(e.target.value)
  }

  const handleFeatureChange = (checkedValues: any) => {
    setSelectedFeatures(checkedValues)
  }

  const handleSavePlan = () => {
    console.log({
      packageType,
      userType,
      duration,
      selectedFeatures,
      basicPrice,
    })
  }

  const features = [
    { label: "Unlimited Rating", value: "unlimited-rating" },
    { label: "All modules + API + 24/7 support", value: "all-modules" },
    { label: "Unlimited doctors + cloud sync", value: "unlimited-doctors" },
    { label: "Multi-location support, patient portal", value: "multi-location" },
    { label: "All Basic + multi-doctor + analytics", value: "all-basic" },
    { label: "Multi-branch + data encryption", value: "multi-branch" },
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl ">
        <h1 className="text-3xl font-semibold mb-2">Subscription</h1>
        <p className="text-gray-600 mb-8">Subscription Management</p>

        <div className="bg-white p-8">
          <div className="flex justify-center mb-8">
            <Radio.Group onChange={handlePackageChange} value={packageType}>
              <Radio value="basic">Basic</Radio>
              <Radio value="pro">Pro</Radio>
            </Radio.Group>
          </div>

          <h2 className="text-lg font-medium mb-6">Create Subscription Plan</h2>

          <div className="mb-6">
            <div className="flex gap-3">
              <Button
                type={userType === "individual" ? "primary" : "default"}
                size="large"
                onClick={() => setUserType("individual")}
                className={userType === "individual" ? "bg-[#2c5f7f]" : ""}
              >
                Individual
              </Button>
              <Button
                type={userType === "agency" ? "primary" : "default"}
                size="large"
                onClick={() => setUserType("agency")}
                className={userType === "agency" ? "bg-[#2c5f7f]" : ""}
              >
                Agency
              </Button>
              <Button
                type={userType === "developer" ? "primary" : "default"}
                size="large"
                onClick={() => setUserType("developer")}
                className={userType === "developer" ? "bg-[#2c5f7f]" : ""}
              >
                Developer
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
            <Select defaultValue="basic" className="w-full" size="large" placeholder="Basic">
              <Option value="basic">Basic</Option>
              <Option value="premium">Premium</Option>
              <Option value="enterprise">Enterprise</Option>
            </Select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <div className="flex gap-3">
              <Button
                type={duration === "quarterly" ? "primary" : "default"}
                size="large"
                onClick={() => setDuration("quarterly")}
                className={duration === "quarterly" ? "bg-[#2c5f7f]" : ""}
              >
                Quarterly
              </Button>
              <Button
                type={duration === "semi-annual" ? "primary" : "default"}
                size="large"
                onClick={() => setDuration("semi-annual")}
                className={duration === "semi-annual" ? "bg-[#2c5f7f]" : ""}
              >
                Semi-Annual
              </Button>
              <Button
                type={duration === "annual" ? "primary" : "default"}
                size="large"
                onClick={() => setDuration("annual")}
                className={duration === "annual" ? "bg-[#2c5f7f]" : ""}
              >
                Annual
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Features</label>
            <Checkbox.Group
              options={features}
              value={selectedFeatures}
              onChange={handleFeatureChange}
              className="flex flex-col gap-3"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pricing</label>
            <label className="block text-sm text-gray-500 mb-2">Basic Plan Price</label>
            <Input
              size="large"
              placeholder="Basic Price"
              value={basicPrice}
              onChange={(e) => setBasicPrice(e.target.value)}
              className="w-full"
            />
          </div>

          <Button type="primary" size="large" onClick={handleSavePlan} className="bg-[#2c5f7f] hover:bg-[#234d66]">
            Save Plan
          </Button>
        </div>
      </div>
    </div>
  )
}
