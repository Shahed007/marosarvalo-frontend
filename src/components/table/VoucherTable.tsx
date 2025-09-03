import React, { useState, useMemo } from "react";
import {
  Table,
  Input,
  Button,
  Tag,
  Dropdown,
  MenuProps,
  Card,
  Typography,
} from "antd";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import EditVoucher from "../drawer/EditVoucher";

// Define the data type based on your example
export interface Voucher {
  key: string;
  id: string;
  voucherName: string;
  associateName: string;
  expireDate: string;
  amount: number;
  status: "Active" | "Inactive";
}

interface VoucherTableProps {
  data: Voucher[];
  loading?: boolean;
  onRemoveVoucher?: (voucherId: string) => void;
}

const VoucherTable: React.FC<VoucherTableProps> = ({
  data,
  loading = false,
  onRemoveVoucher,
}) => {
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // Handle search functionality
  const filteredData = useMemo(() => {
    if (!searchText) return data;

    const lowerCaseSearch = searchText.toLowerCase();

    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value && value.toString().toLowerCase().includes(lowerCaseSearch)
      )
    );
  }, [data, searchText]);

  // Define action items for dropdown menu
  const getActionItems = (record: Voucher): MenuProps["items"] => [
    {
      key: "1",
      label: <EditVoucher />,
    },
    {
      key: "3",
      label: "Remove Voucher",
      onClick: () => onRemoveVoucher && onRemoveVoucher(record.id),
    },
  ];

  // Define table columns
  const columns: ColumnsType<Voucher> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Typography className="!font-bold">{id}</Typography>,
    },
    {
      title: "Voucher Name",
      dataIndex: "voucherName",
      key: "voucherName",
    },
    {
      title: "Associate Name",
      dataIndex: "associateName",
      key: "associateName",
    },
    {
      title: "Expire Date",
      dataIndex: "expireDate",
      key: "expireDate",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount}`,
      align: "right",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionItems(record) }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Handle table change events (pagination, sorting, etc.)
  const handleTableChange: TableProps<Voucher>["onChange"] = (
    paginationConfig
  ) => {
    setPagination({
      current: paginationConfig.current || 1,
      pageSize: paginationConfig.pageSize || 10,
    });
  };

  return (
    <Card>
      {/* Search Input */}
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search voucher"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, marginBottom: 16 }}
          allowClear
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
        dataSource={filteredData}
        loading={loading}
        onChange={handleTableChange}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: filteredData.length,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Typography>
                Showing {range[0]}-{range[1]} of {total} records
              </Typography>
              {/* <Button
                type="link"
                danger
                onClick={() => console.log("Remove voucher clicked")}
              >
                Remove Voucher
              </Button> */}
            </div>
          ),
        }}
        scroll={{ x: 800 }}
      />
    </Card>
  );
};

export default VoucherTable;
