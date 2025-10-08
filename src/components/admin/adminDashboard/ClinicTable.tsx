import { Card, Table, Button, Input, Space, Typography, Dropdown } from "antd";
import { PlusOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import CustomPagination from "@/components/shared/CustomPagination";

const { Title, Text } = Typography;

export const ClinicTableCard = () => {
  const clinicData = [
    {
      key: "1",
      clinicName: "The Mayo Clinic in Rochester",
      orderId: "DL12653",
      contact: "+91*******",
      email: "name@email.com",
      countdown: "162 Day, 17 Hours, 24 min",
      action: "Delete",
    },
    {
      key: "2",
      clinicName: "Cleveland Clinic",
      orderId: "DL12654",
      contact: "+919876543210",
      email: "clinic2@email.com",
      countdown: "90 Day, 5 Hours, 10 min",
      action: "Reminder",
    },
    {
      key: "3",
      clinicName: "Johns Hopkins Hospital",
      orderId: "DL12655",
      contact: "+919988776655",
      email: "hopkins@med.org",
      countdown: "45 Day, 12 Hours, 0 min",
      action: "Remove",
    },
    {
      key: "4",
      clinicName: "Massachusetts General Hospital",
      orderId: "DL12656",
      contact: "+919123456789",
      email: "mgh@hms.harvard.edu",
      countdown: "200 Day, 3 Hours, 45 min",
      action: "",
    },
    {
      key: "5",
      clinicName: "Stanford Health Care",
      orderId: "DL12657",
      contact: "+918765432109",
      email: "stanford@stanford.edu",
      countdown: "75 Day, 8 Hours, 30 min",
      action: "",
    },
    {
      key: "6",
      clinicName: "UCLA Medical Center",
      orderId: "DL12658",
      contact: "+918887776665",
      email: "ucla@mednet.ucla.edu",
      countdown: "30 Day, 15 Hours, 20 min",
      action: "",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  // Filter by search
  const filteredData = clinicData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Slice for pagination
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Table Columns
  const columns = [
    {
      title: "Clinic Name",
      dataIndex: "clinicName",
      key: "clinicName",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Countdown",
      dataIndex: "countdown",
      key: "countdown",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space>
          <Dropdown
            menu={{
              items: [
                { key: "1", label: "Details" },
                { key: "2", label: "Reminder" },
                { key: "3", label: "Remove", danger: true },
              ],
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pt-5">
      <Card
        bordered={false} // ← removes the default border
        style={{
          border: "none", // ensures no border
          boxShadow: "none", // removes default shadow
          borderRadius: "12px", // optional — keeps rounded corners

          backgroundColor: "#fff",
        }}
      >
        <div className="!mb-[19px] !mt-[10px]">
          <Title
            level={3}
            className="!text-[#9DA0A4] !font-normal !text-xl  !mb-0"
          >
            Clinic List
          </Title>
        </div>
        {/* Header */}
        <div className="flex justify-between items-center mb-9">
          {/* Search */}

          <div className="w-full sm:w-[400px] lg:w-[625px]">
            <Input
              allowClear
              placeholder="Search by name/email/number"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to first page when searching
              }}
              size="large"
              addonAfter={<SearchOutlined />}
            />
          </div>
          <Link href={"/admin/add-clinic"}>
            <Button
              size="large"
              type="primary"
              icon={<PlusOutlined />}
              style={{
                backgroundColor: "#225A7F",
                borderColor: "#225A7F",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add Clinic
            </Button>
          </Link>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={paginatedData}
          rowKey="key"
          scroll={{ x: "max-content" }}
          pagination={false}
          components={{
            header: {
              cell: ({ children }) => (
                <th
                  style={{
                    backgroundColor: "#F1F4F6",
                    color: "#4180AB",
                    fontWeight: 700,
                    fontSize: "14px",
                    padding: "12px 16px",
                    borderBottom: "1px solid #CBD5E1",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {children}
                </th>
              ),
            },
            body: {
              cell: ({ children }) => (
                <td
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #E2E8F0",
                    color: "#1E293B",
                    fontSize: "14px",
                  }}
                >
                  {children}
                </td>
              ),
            },
          }}
          style={{
            borderRadius: "8px",
            overflow: "hidden",
          }}
        />
      </Card>

      {/* Custom Pagination */}
      <div className="mt-4">
        <CustomPagination
          currentPage={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
