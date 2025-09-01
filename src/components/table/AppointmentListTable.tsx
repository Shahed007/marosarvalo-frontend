import { Badge } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import React, { FC } from "react";

export interface AppointmentListType {
  id: string;
  time: string;
  patientName: string;
  specialist: string;
  reason: string;
  status: string;
  action: string;
}

export interface AppointmentListProps {
  id: string;
  time: string;
  patientName: string;
  specialist: string;
  reason: string;
  status: string;
}

const AppointmentListTable: FC<{
  data: AppointmentListProps[];
  loading?: boolean;
}> = ({ data = [], loading = false }) => {
  const columns: ColumnProps<AppointmentListType>[] = [
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
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Specialist",
      dataIndex: "specialist",
      key: "specialist",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render() {
        return (
          <div>
            <Badge size="small">Available</Badge>
          </div>
        );
      },
    },
  ];
  return (
    <div className="mt-10">
      <Table
        loading={loading}
        scroll={{ x: true }}
        dataSource={data.map((item) => ({ ...item, action: "" }))}
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
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
      />
    </div>
  );
};

export default AppointmentListTable;
