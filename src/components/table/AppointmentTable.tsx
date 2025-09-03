import { Button, Dropdown, MenuProps, Tag } from "antd";
import Table, { ColumnGroupType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { FC } from "react";
import { CiMenuKebab } from "react-icons/ci";

export interface AppointmentTableTypes {
  id: string;
  time: string;
  name: string;
  contact: string;
  specialist: string;
  status: "Confirm" | "Cancel" | "Pending";
}

const AppointmentTable: FC<{ data: AppointmentTableTypes[] }> = ({ data }) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <Button>View Details</Button>
        </div>
      ),
    },
  ];
  const columns: Array<
    | ColumnGroupType<AppointmentTableTypes>
    | import("antd/es/table").ColumnType<AppointmentTableTypes>
  > = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Patients & Contact",
      dataIndex: "name", // This only gives access to the name field
      key: "name",
      render: (
        name: string,
        record: AppointmentTableTypes // Add record as second parameter
      ) => (
        <div>
          <p>{name}</p>
          <p>{record.contact}</p>
        </div>
      ),
    },
    {
      title: "Specialist",
      dataIndex: "specialist",
      key: "specialist",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: "Confirm" | "Canceled" | "Pending") => {
        let color = "default";
        if (status === "Confirm") color = "green";
        if (status === "Canceled") color = "red";
        if (status === "Pending") color = "orange";

        return (
          <Tag color={color} className="capitalize">
            {status}
          </Tag>
        );
      },
      width: 120,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div>
          <Dropdown menu={{ items }}>
            <CiMenuKebab />
          </Dropdown>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Title level={3}>Appointments</Title>
      <Table
        scroll={{ x: true }}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          fontFamily: "'Inter', sans-serif",
        }}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: "#6B91A31A",
                  padding: "16px",
                  fontWeight: "600",
                  color: "#334155",
                  borderBottom: "2px solid #e2e8f0",
                }}
              />
            ),
          },
          body: {
            cell: (props) => (
              <td
                {...props}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #f1f5f9",
                  color: "#475569",
                }}
              />
            ),
            row: (props) => (
              <tr
                {...props}
                style={{
                  transition: "background-color 0.2s ease",
                  ":hover": {
                    backgroundColor: "#f8fafc",
                  },
                }}
              />
            ),
          },
        }}
        dataSource={data}
        columns={columns}
      ></Table>
    </div>
  );
};

export default AppointmentTable;
