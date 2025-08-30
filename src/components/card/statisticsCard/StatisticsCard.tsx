import { Card, Select } from "antd";
import Title from "antd/es/typography/Title";
import React, { FC, ReactNode } from "react";
import lines from "@/assets/lines/group-line.svg";
import Image from "next/image";

const StatisticsCard: FC<{
  count: ReactNode;
  name: string;
  graph?: boolean;
}> = ({ count, name, graph }) => {
  return (
    <Card
      style={{
        padding: "0px",
      }}
    >
      <div className="flex justify-between">
        <div>
          <Title>{count}</Title>
          <Title level={5} className="!text-gray-400 !font-medium">
            {name}
          </Title>
        </div>
        <div>
          <Select
            defaultValue={"this month"}
            variant="borderless"
            style={{
              width: 120,
            }}
            options={[
              {
                label: "This Month",
                value: "this month",
              },
            ]}
          ></Select>
          {graph && <Image className="p-2" src={lines} alt="lines" />}
        </div>
      </div>
    </Card>
  );
};

export default StatisticsCard;
