import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Title from "antd/es/typography/Title";

const Profile = () => {
  return (
    <Card className="max-w-sm mx-auto p-4 sm:p-6">
      <div className="flex flex-col gap-4 items-center justify-center">
        {/* Responsive avatar size */}
        <Avatar
          className="w-24 h-24 sm:w-32 sm:h-32"
          size={120}
          icon={<UserOutlined />}
        />

        <div className="flex flex-col justify-center items-center text-center">
          <Title className="!m-0 text-lg sm:text-xl md:text-2xl" level={5}>
            Emiliy Crater
          </Title>
          <p className="text-sm sm:text-base text-gray-600">ID: 454541</p>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
