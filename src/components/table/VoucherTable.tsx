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
import type { ColumnsType } from "antd/es/table";
import EditVoucher from "../drawer/EditVoucher";
import CustomPagination from "../shared/CustomPagination";

// Define the data type
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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // default page size
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);

  // Search filter
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

  // Pagination slice
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  // Dropdown menu actions
  const getActionItems = (record: Voucher): MenuProps["items"] => [
    {
      key: "edit",
      label: "Edit Voucher",
      onClick: () => setEditingVoucher(record),
    },
    {
      key: "remove",
      label: "Remove Voucher",
      onClick: () => onRemoveVoucher && onRemoveVoucher(record.id),
    },
  ];

  // Table columns
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={status === "Active" ? "#E6F7FE" : "#FEF7F7"}
          className={`!text-[#007A9C] !px-4 !py-1 !rounded ${
            status === "Inactive" && "!text-[#F45B69]"
          }`}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
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

  return (
    <Card>
      {/* Search Input */}
      <div className="mb-4 w-full sm:w-[400px] md:w-[500px] lg:w-[625px]">
        <Input
          size="large"
          placeholder="Search voucher"
          addonAfter={<SearchOutlined style={{ color: "#8c8c8c" }} />}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1); // reset page when searching
          }}
          allowClear
          className="w-full"
        />
      </div>

      {/* Table */}
      <Table
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          fontFamily: "'Inter', sans-serif",
        }}
        columns={columns}
        dataSource={paginatedData}
        loading={loading}
        rowKey="id"
        pagination={false}
        scroll={{ x: 800 }}
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
        }}
      />

      {/* Edit Voucher Drawer */}
      {editingVoucher && (
        <EditVoucher
          open={!!editingVoucher}
          voucher={editingVoucher}
          onClose={() => setEditingVoucher(null)}
        />
      )}

      {/* Custom Pagination */}
      <CustomPagination
        currentPage={currentPage}
        total={filteredData.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <style jsx global>{`
        .ant-card.ant-card-bordered {
          border: 0 !important;
          padding: 0 !important;
        }
        .ant-card .ant-card-body {
          padding: 0px !important;
          border-radius: 0 0 8px 8px !important;
        }
      `}</style>
    </Card>
  );
};

export default VoucherTable;
