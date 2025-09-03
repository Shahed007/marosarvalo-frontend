import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Title from "antd/es/typography/Title";

const Profile = () => {
  return (
    <Card>
      <div className="flex flex-col gap-4 items-center justify-center">
        <Avatar size={120} icon={<UserOutlined />} />
        <div className="flex flex-col justify-center items-center">
          <Title className="!m-0" level={5}>
            Emiliy Crater
          </Title>
          <p className="">ID: 454541</p>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
