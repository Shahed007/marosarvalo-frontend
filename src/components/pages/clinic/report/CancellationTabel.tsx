import CustomPagination from "@/components/shared/CustomPagination";
import { Table } from "antd";
import type { ColumnProps } from "antd/es/table";
import React, { FC, useState } from "react";

export interface AppointmentListProps {
  id: string;
  time: string;
  patientName: string;
  specialist: string;
  reason: string;
  status: string;
}

const CancellationTabel: FC<{
  data: AppointmentListProps[];
  loading?: boolean;
}> = ({ data = [], loading = false }) => {
  const columns: ColumnProps<AppointmentListProps>[] = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Appointment Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Service",
      dataIndex: "reason",
      key: "reason",
      render: (reason: string) => <span>{reason || "—"}</span>,
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
    },
    {
      title: "Reason for Cancellation",
      dataIndex: "cancleReasons",
      key: "cancleReasons",
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
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  backgroundColor: "#F1F4F6",
                  padding: "16px",
                  fontWeight: 600,
                  color: "#4180AB",
                }}
              />
            ),
          },
        }}
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

export default CancellationTabel;
