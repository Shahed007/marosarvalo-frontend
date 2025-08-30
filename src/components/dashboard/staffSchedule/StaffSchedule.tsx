"use client";
import { Card, List, Typography } from "antd";

const { Text } = Typography;

interface Staff {
  name: string;
  role: string;
  availability: string;
  time: string;
}

interface StaffScheduleProps {
  title?: string;
  staffList: Staff[];
  onViewAll?: () => void;
}

const StaffSchedule: React.FC<StaffScheduleProps> = ({
  title = "Staff Schedule",
  staffList,
  onViewAll,
}) => {
  return (
    <Card
      title={<span className="text-primary font-semibold">{title}</span>}
      extra={
        <button
          onClick={onViewAll}
          className="text-gray-500 hover:text-blue-500 text-sm"
        >
          View all
        </button>
      }
      className="rounded-2xl shadow-sm"
    >
      <div className="max-h-[300px] overflow-y-auto pr-2">
        <List
          dataSource={staffList}
          renderItem={(staff, index) => (
            <List.Item
              key={index}
              className="flex flex-col items-start mb-2 last:mb-0  py-3 border border-gray-200 rounded-xl"
            >
              <div className="flex xl:flex-row flex-col gap-3 justify-between w-full  px-4">
                <div>
                  <Text strong>{staff.name}</Text>
                  <div className="text-gray-500 text-sm">{staff.role}</div>
                </div>
                <div>
                  <Text className="text-green-600 text-sm">
                    {staff.availability}
                  </Text>
                  <div className="text-gray-400 text-xs">{staff.time}</div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

export default StaffSchedule;
