import React, { useState, useMemo } from "react";
import { Table, Input, Tag, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import CustomPagination from "../shared/CustomPagination";

// Define the data type based on your example
export interface ReminderRecord {
  key: string;
  patientName: string;
  reminderType: string;
  communicationType: string;
  subject: string;
  sentDateTime: string;
  status: string;
}

interface ReminderTableProps {
  data: ReminderRecord[];
  loading?: boolean;
}

const ReminderTable: React.FC<ReminderTableProps> = ({
  data,
  loading = false,
}) => {
  const [searchText, setSearchText] = useState("");
  const [, setPagination] = useState({ current: 1, pageSize: 10 });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // Handle search functionality
  const filteredData = useMemo(() => {
    if (!searchText) return data;

    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [data, searchText]);

  // Define table columns
  const columns: ColumnsType<ReminderRecord> = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      sorter: (a, b) => a.patientName.localeCompare(b.patientName),
    },
    {
      title: "Reminder Type",
      dataIndex: "reminderType",
      key: "reminderType",
      sorter: (a, b) => a.reminderType.localeCompare(b.reminderType),
    },
    {
      title: "Communication Type",
      dataIndex: "communicationType",
      key: "communicationType",
      render: (types: string) => (
        <Space>
          {types.split(" , ").map((type, index, arr) => (
            <span key={type}>
              {type}
              {index < arr.length - 1 && ", "}
            </span>
          ))}
        </Space>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Sent Date/Time",
      dataIndex: "sentDateTime",
      key: "sentDateTime",
      sorter: (a, b) =>
        new Date(a.sentDateTime).getTime() - new Date(b.sentDateTime).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={status === "Delivered" ? "#F2F2F2" : "blue"}
          className="!text-[#0B121B] !px-2 !py-2  !rounded"
        >
          {status}
        </Tag>
      ),
    },
  ];

  // Handle table change events (pagination, sorting, etc.)
  const handleTableChange: TableProps<ReminderRecord>["onChange"] = (
    paginationConfig
  ) => {
    setPagination({
      current: paginationConfig.current || 1,
      pageSize: paginationConfig.pageSize || 10,
    });
  };

  return (
    <div>
      {/* Search Input */}

      <div className="mb-[24px] w-full sm:w-[400px] md:w-[500px] lg:w-[625px]">
        <Input
          size="large"
          placeholder="Search by name or any field"
          suffix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          className="w-full"
        />
      </div>

      {/* Data Table */}
      <Table
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
                  color: "#4180AB",
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
        dataSource={filteredData}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      />
      {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        total={10}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ReminderTable;
