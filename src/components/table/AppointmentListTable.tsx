import { Table } from "antd";
import type { ColumnProps } from "antd/es/table";
import React, { FC, useState } from "react";
import CustomPagination from "../shared/CustomPagination";

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
  const columns: ColumnProps<AppointmentListProps>[] = [
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
      render: () => (
        <div className="bg-[#F2F2F2] flex justify-center items-center px-2 py-2 rounded-md">
          Available
        </div>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };

  // Slice the data based on currentPage and pageSize
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="mt-10">
      <Table
        loading={loading}
        scroll={{ x: true }}
        dataSource={paginatedData}
        rowKey="id"
        pagination={false}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          fontFamily: "'Inter', sans-serif",
        }}
        rowClassName={() => "hover:bg-gray-50 transition-colors"}
        columns={columns}
      />

      {/* Custom Pagination */}
      <CustomPagination
        currentPage={currentPage}
        total={data.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AppointmentListTable;
