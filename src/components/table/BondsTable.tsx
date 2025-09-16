import React, { useState } from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import CustomPagination from "../shared/CustomPagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // set default page size

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Define table columns
  const columns: ColumnsType<BondDataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <span className="text-black font-medium">#{id}</span>,
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
      render: (status: "Active" | "Inactive") => {
        let backgroundColor = "#ccc";
        let color = "#000";

        if (status === "Active") {
          backgroundColor = "#E6F7FE";
          color = "#007A9C";
        }
        if (status === "Inactive") {
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
  ];

  // Slice data for pagination
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
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
        columns={columns}
        dataSource={paginatedData}
        loading={loading}
        className="custom-table"
        pagination={false} // disable default pagination
      />

      {/* Custom pagination */}
      <CustomPagination
        currentPage={currentPage}
        total={data.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BondsTable;
