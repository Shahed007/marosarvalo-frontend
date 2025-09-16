import { Dropdown, MenuProps, Tag } from "antd";
import Table, { ColumnGroupType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { FC, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import CustomPagination from "../shared/CustomPagination";
import CalanderDetailsDrawer from "../drawer/CalanderDetailsDrawer";

export interface AppointmentTableTypes {
  id: string;
  time: string;
  name: string;
  contact: string;
  specialist: string;
  status: "Confirm" | "Canceled" | "Pending";
}

const AppointmentTable: FC<{ data: AppointmentTableTypes[] }> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentTableTypes | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const showDrawer = (apt: AppointmentTableTypes) => {
    setSelectedAppointment(apt);
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedAppointment(null);
  };

  const handleDeleteFromDrawer = (id?: string) => {
    if (!id) return;
    // implement your cancel logic here
    console.log("Cancel appointment:", id);
    onCloseDrawer();
  };

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
      dataIndex: "name",
      key: "name",
      render: (name: string, record: AppointmentTableTypes) => (
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
      render: (status: "Confirm" | "Canceled") => {
        let backgroundColor = "#ccc"; 
        let color = "#000"; 

        if (status === "Confirm") {
          backgroundColor = "#E6F7FE";
          color = "#007A9C"; 
        }
        if (status === "Canceled") {
          backgroundColor = "#FEF7F7";
          color = "#F45B69"; 
        }

        return (
          <Tag
            style={{
              backgroundColor,
              color,
              padding: "4px 12px",
              fontWeight: 500,
              borderRadius: "8px",
            }}
            className="capitalize"
          >
            {status}
          </Tag>
        );
      },
      width: 120,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const menuItems: MenuProps["items"] = [
          {
            key: "view",
            label: <span onClick={() => showDrawer(record)}>View Details</span>,
          },
        ];
        return (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <CiMenuKebab style={{ cursor: "pointer" }} />
          </Dropdown>
        );
      },
    },
  ];

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
          },
        }}
        dataSource={paginatedData}
        columns={columns}
        pagination={false}
        rowKey="id"
      />

      <CustomPagination
        currentPage={currentPage}
        total={data.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      <CalanderDetailsDrawer
        open={drawerVisible}
        onClose={onCloseDrawer}
        appointment={selectedAppointment}
        onDelete={handleDeleteFromDrawer}
      />
    </div>
  );
};

export default AppointmentTable;
