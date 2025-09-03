"use client";

import { useState } from "react";
import { Card, Switch, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Link from "next/link";

const MembershipPlans = () => {
  const [isYearlyBilling, setIsYearlyBilling] = useState(true);
  const plans = [
    {
      id: 1,
      title: "",
      price: isYearlyBilling ? "$49 / yearly" : "$5 / monthly",
      originalPrice: isYearlyBilling ? "$60" : undefined,
      description:
        "One time fee for one listing or task highlighted in search results.",
      features: [
        "1 Listing",
        "30 Days Visibility",
        "Highlighted in Search Results",
        "4 Revisions",
        "9 days Delivery Time",
        "Products Support",
      ],
      isPopular: true,
    },
    {
      id: 2,
      title: "",
      price: isYearlyBilling ? "$129 / yearly" : "$13 / monthly",
      originalPrice: isYearlyBilling ? "$155" : undefined,
      description:
        "One time fee for one listing or task highlighted in search results.",
      features: [
        "5 Listings",
        "60 Days Visibility",
        "Top Placement in Search Results",
        "Unlimited Revisions",
        "5 days Delivery Time",
        "Priority Products Support",
      ],
      isPopular: false,
    },
  ];
  return (
    <section className=" custom-container mt-[116px]  ">
      <div className="">
        <div className="text-center mb-12">
          <Title className="!text-[44px] font-bold  mb-4">
            Membership Plans
          </Title>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Give your visitor a smooth online experience with a solid UX design
          </p>
        </div>

        <div className="flex items-center justify-center gap-[59px] mb-10">
          <div className="flex justify-center items-center ">
            <span className={`mr-4 font-medium `}>Monthly</span>
            <Switch
              checked={isYearlyBilling}
              onChange={setIsYearlyBilling}
              className="bg-gray-300"
              style={{ backgroundColor: "#000" }}
            />
          </div>
          <div className="flex gap-2">
            <span className="text-base !text-[#222]">Billed Yearly</span>
            <span
              style={{ padding: "2.25px 9.945px 2.75px 10.305px" }}
              className="inline-block text-white rounded-full bg-[#0B121B] font-dmsans font-medium"
            >
              Save 20%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 max-w-3xl mx-auto  md:grid-cols-2  gap-[120px]">
          {plans?.map((plan, index) => (
            <Card
              key={index}
              className={`relative border  rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
                plan.isPopular ? "!border-primary" : ""
              } `}
            >
              <div className="p-6">
                {/* <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.title}
                </h3> */}

                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {plan.price.split(" ")[0]}
                  </span>
                  <span className="ml-1 text-lg font-medium text-gray-500">
                    /{plan.price.split(" ")[1]}
                  </span>

                  {plan.originalPrice && (
                    <span className="ml-2 text-sm text-gray-400 line-through">
                      ${plan.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-6">{plan.description}</p>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckOutlined className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/order-description/${plan.id}`} prefetch>
                  <Button
                    className="!border-0 !rounded-full !bg-primary"
                    type="primary"
                    size="large"
                    block
                  >
                    Buy Now
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
