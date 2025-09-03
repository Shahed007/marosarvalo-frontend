import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

// Define the data type for bonds
export interface BondDataType {
  key: React.Key;
  id: string;
  name: string;
  discipline: string;
  services: string;
  sessions: number;
  price: string;
  status: "Active" | "Inactive";
}

// Define props for the component
interface BondsTableProps {
  data: BondDataType[];
  loading?: boolean;
}

const BondsTable: React.FC<BondsTableProps> = ({ data, loading = false }) => {
  // Define table columns
  const columns: ColumnsType<BondDataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <span className="text-blue-600 font-medium">#{id}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="font-semibold">{name}</span>,
    },
    {
      title: "Discipline",
      dataIndex: "discipline",
      key: "discipline",
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
    },
    {
      title: "Sessions",
      dataIndex: "sessions",
      key: "sessions",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (price) => <span className="font-medium">{price}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag
          color={status === "Active" ? "green" : "red"}
          className="px-2 py-1 rounded-full"
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
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
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        position: ["bottomRight"],
        showSizeChanger: false,

        pageSize: 10,
        total: 60,
        showTotal: (total, range) =>
          `Showing ${range[0]}-${range[1]} of ${total} records`,
      }}
      className="custom-table"
    />
  );
};

export default BondsTable;
