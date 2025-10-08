/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Typography,
  Dropdown,
  Modal,
  Row,
  Col,
} from "antd";
import { PlusOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import EditClinicModal from "./EditCliclModal";
import CustomPagination from "@/components/shared/CustomPagination";

// ✅ Import your EditClinicModal

const { Title, Text } = Typography;

export const ClickingListTable = () => {
  // ✅ Enhanced mock data with user fields for editing
  const clinicData = [
    {
      key: "1",
      clinicName: "The Mayo Clinic in Rochester",
      contact: "+91 9876543210",
      email: "clinic.rochester@mayo.com",
      countdown: "162 Day, 17 Hours, 24 min",
      status: "Active",
      userName: "Dr. Henry Evans",
      userEmail: "henry.evans@mayo.com",
      userPhone: "+91 9876501234",
      userAddress: "123 Medical Lane, Rochester, MN",
      clinicAddress: "1 Mayo Blvd, Rochester, MN 55905",
    },
    {
      key: "2",
      clinicName: "Cleveland Clinic Main Campus",
      contact: "+91 9876543211",
      email: "info@clevelandclinic.org",
      countdown: "120 Day, 5 Hours, 10 min",
      status: "Active",
      userName: "Dr. Sarah Lin",
      userEmail: "sarah.lin@cleveland.org",
      userPhone: "+91 9876501235",
      userAddress: "45 Health Ave, Cleveland, OH",
      clinicAddress: "9500 Euclid Ave, Cleveland, OH 44195",
    },
    {
      key: "3",
      clinicName: "Johns Hopkins Hospital",
      contact: "+91 9876543212",
      email: "admissions@jh.edu",
      countdown: "90 Day, 2 Hours, 30 min",
      status: "Inactive",
      userName: "Dr. Michael Rao",
      userEmail: "michael.rao@jh.edu",
      userPhone: "+91 9876501236",
      userAddress: "78 Care Blvd, Baltimore, MD",
      clinicAddress: "1800 Orleans St, Baltimore, MD 21287",
    },
    {
      key: "4",
      clinicName: "Massachusetts General Hospital",
      contact: "+91 9876543213",
      email: "info@mgh.harvard.edu",
      countdown: "200 Day, 10 Hours, 15 min",
      status: "Active",
      userName: "Dr. Lisa Wong",
      userEmail: "lisa.wong@mgh.org",
      userPhone: "+91 9876501237",
      userAddress: "32 Healing St, Boston, MA",
      clinicAddress: "55 Fruit St, Boston, MA 02114",
    },
    {
      key: "5",
      clinicName: "Stanford Health Care",
      contact: "+91 9876543214",
      email: "contact@stanfordhealth.org",
      countdown: "85 Day, 22 Hours, 55 min",
      status: "Active",
      userName: "Dr. Robert Chen",
      userEmail: "robert.chen@stanford.edu",
      userPhone: "+91 9876501238",
      userAddress: "66 Wellness Rd, Palo Alto, CA",
      clinicAddress: "300 Pasteur Dr, Palo Alto, CA 94304",
    },
    {
      key: "6",
      clinicName: "UCLA Medical Center",
      contact: "+91 9876543215",
      email: "info@uclahealth.org",
      countdown: "130 Day, 8 Hours, 40 min",
      status: "Active",
      userName: "Dr. Amanda Ruiz",
      userEmail: "amanda.ruiz@med.ucla.edu",
      userPhone: "+91 9876501239",
      userAddress: "99 Care Circle, Los Angeles, CA",
      clinicAddress: "757 Westwood Plaza, Los Angeles, CA 90095",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // ✅ New state for Edit Modal
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredData = clinicData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Status badge renderer
  const renderStatus = (status: string) => {
    let bgColor, textColor;
    switch (status) {
      case "Active":
        bgColor = "#E0F7E0";
        textColor = "#0D9488";
        break;
      case "Inactive":
        bgColor = "#FEE2E2";
        textColor = "#DC2626";
        break;
      default:
        bgColor = "#F1F4F6";
        textColor = "#64748B";
    }
    return (
      <span
        className="px-4 py-2 rounded text-xs font-medium"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          display: "inline-block",
        }}
      >
        {status}
      </span>
    );
  };

  // Handle Details Click
  const handleDetailsClick = (record: any) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  // ✅ Handle Edit Click → Open Edit Modal
  const handleEditClick = (record: any) => {
    setSelectedRecord(record);
    setIsEditModalVisible(true);
  };

  // Handle Reminder / Remove
  const handleActionClick = (action: string, record: any) => {
    console.log(`${action} clicked for:`, record);
    if (action === "Remove") {
      alert(`Removed: ${record.clinicName}`);
    } else if (action === "Reminder") {
      alert(`Reminder sent to: ${record.email}`);
    }
  };

  const columns = [
    {
      title: "Clinic Name",
      dataIndex: "clinicName",
      key: "clinicName",
      render: (text: string) => <Text strong>{text}</Text>,
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => renderStatus(status),
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: any) => (
        <Space>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "Details",
                  onClick: () => handleDetailsClick(record),
                },
                {
                  key: "2",
                  label: "Edit",
                  onClick: () => handleEditClick(record),
                },
                {
                  key: "3",
                  label: "Reminder",
                  onClick: () => handleActionClick("Reminder", record),
                },
                {
                  key: "4",
                  label: "Remove",
                  danger: true,
                  onClick: () => handleActionClick("Remove", record),
                },
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

  // Modal Content (Details View)
  // const modalContent = (
  //   <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
  //     <Title level={4} style={{ margin: "0 0 16px 0", color: "#1E293B" }}>
  //       Details
  //     </Title>
  //     <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  //       <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="20"
  //           height="20"
  //           viewBox="0 0 20 20"
  //           fill="none"
  //         >
  //           <g clip-path="url(#clip0_1259_3312)">
  //             <path
  //               d="M3.22714 16.3346C3.22714 16.6586 2.96446 16.9213 2.64037 16.9213C2.31628 16.9213 2.0536 16.6587 2.0536 16.3346C2.0536 15.5431 2.07511 14.7849 2.11824 14.069C1.84666 14.1462 1.56971 14.2133 1.28856 14.2695C0.970796 14.3331 0.661694 14.127 0.598118 13.8093C0.534582 13.4915 0.740651 13.1824 1.05841 13.1188C1.45782 13.0389 1.8471 12.9345 2.22124 12.8091C2.3476 11.6083 2.54556 10.5655 2.81588 9.73531C3.46215 7.75034 4.61743 6.83897 6.12992 7.5952C7.64095 8.35071 7.68354 9.9273 6.50762 11.3854C5.77757 12.2907 4.65364 13.089 3.32361 13.6471C3.2596 14.4774 3.22714 15.3798 3.22714 16.3346ZM5.59416 10.6487C6.35351 9.70715 6.33465 9.00952 5.60515 8.64479C4.90277 8.29362 4.38693 8.70054 3.93177 10.0986C3.73618 10.6993 3.58033 11.4394 3.46543 12.2894C4.35577 11.8365 5.09678 11.2655 5.59416 10.6487ZM11.7854 8.11863L17.0662 2.83785C17.5245 2.37957 18.2676 2.37957 18.7258 2.83785L19.6563 3.76831C20.1146 4.22659 20.1146 4.96961 19.6563 5.42793L14.3755 10.7087C14.1554 10.9288 13.8569 11.0524 13.5457 11.0524H12.0284C11.7044 11.0524 11.4417 10.7897 11.4417 10.4656V8.9484C11.4417 8.6372 11.5654 8.33869 11.7854 8.11863ZM13.5457 9.87891L17.0662 6.3584L16.1357 5.42793L12.6152 8.94844V9.87891H13.5457ZM18.8265 4.59812L17.896 3.66765L16.9656 4.59812L17.896 5.52859L18.8265 4.59812ZM6.60251 14.3739C6.38913 14.6178 6.01843 14.6425 5.77456 14.4291C5.5307 14.2157 5.50595 13.845 5.71937 13.6012L7.34225 11.7464C7.66234 11.3806 8.21836 11.3436 8.58419 11.6637C8.74661 11.8058 8.85119 12.0027 8.87795 12.2169L8.93615 12.6825L9.30195 12.2964C9.63628 11.9435 10.1933 11.9285 10.5462 12.2628C10.589 12.3034 10.6276 12.3481 10.6614 12.3964L11.0957 13.0156L13.0414 12.4618C13.353 12.373 13.6776 12.5538 13.7663 12.8654C13.8551 13.1771 13.6743 13.5017 13.3626 13.5904L11.2163 14.2014C10.8559 14.304 10.47 14.1671 10.2548 13.8603L9.90683 13.3642L9.36094 13.9404C9.22074 14.0883 9.03349 14.1831 8.83118 14.2083C8.34887 14.2686 7.90898 13.9265 7.84868 13.4442L7.7946 13.0115L6.60251 14.3739ZM17.0159 10.4656C17.0159 10.1416 17.2786 9.87886 17.6027 9.87886C17.9268 9.87886 18.1894 10.1416 18.1894 10.4656V15.7464C18.1894 16.7186 17.4013 17.5067 16.4292 17.5067H4.98742C4.66337 17.5067 4.40065 17.244 4.40065 16.9199C4.40065 16.5959 4.66337 16.3332 4.98742 16.3332H16.4291C16.7532 16.3332 17.0159 16.0705 17.0159 15.7464V10.4656ZM12.6152 4.01135C12.9393 4.01135 13.202 4.27404 13.202 4.59812C13.202 4.92221 12.9393 5.18489 12.6152 5.18489H1.76027C1.43623 5.18489 1.1735 5.44758 1.1735 5.77166V10.4657C1.1735 10.7898 0.910819 11.0525 0.586733 11.0525C0.262647 11.0525 0 10.7897 0 10.4656V5.77162C0 4.79944 0.788093 4.01135 1.76027 4.01135H12.6152Z"
  //               fill="black"
  //             />
  //           </g>
  //           <defs>
  //             <clipPath id="clip0_1259_3312">
  //               <rect width="20" height="20" fill="white" />
  //             </clipPath>
  //           </defs>
  //         </svg>
  //         <span style={{ fontWeight: 500 }}>User Name</span>
  //       </div>
  //       <Text style={{ fontSize: "14px", color: "#1E293B" }}>
  //         {selectedRecord?.userName || "N/A"}
  //       </Text>

  //       <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="20"
  //           height="20"
  //           viewBox="0 0 20 20"
  //           fill="none"
  //         >
  //           <path
  //             fill-rule="evenodd"
  //             clip-rule="evenodd"
  //             d="M8.28372 2.70703H11.7111C13.2425 2.70702 14.4556 2.70701 15.4049 2.83464C16.3819 2.966 17.1727 3.24276 17.7964 3.8664C18.42 4.49004 18.6968 5.28083 18.8281 6.25785C18.9558 7.20719 18.9557 8.42022 18.9557 9.95169V10.0457C18.9557 11.5772 18.9558 12.7902 18.8281 13.7396C18.6968 14.7166 18.42 15.5074 17.7964 16.131C17.1727 16.7546 16.3819 17.0314 15.4049 17.1628C14.4556 17.2904 13.2425 17.2904 11.7111 17.2904H8.28372C6.75225 17.2904 5.53922 17.2904 4.58988 17.1628C3.61286 17.0314 2.82207 16.7546 2.19843 16.131C1.5748 15.5074 1.29803 14.7166 1.16668 13.7396C1.03904 12.7902 1.03905 11.5772 1.03906 10.0457V9.95168C1.03905 8.42022 1.03904 7.20719 1.16668 6.25785C1.29803 5.28083 1.5748 4.49004 2.19843 3.8664C2.82207 3.24276 3.61286 2.966 4.58988 2.83464C5.53922 2.70701 6.75225 2.70702 8.28372 2.70703ZM4.75644 4.0735C3.91803 4.18622 3.43499 4.39761 3.08232 4.75028C2.72964 5.10296 2.51825 5.586 2.40553 6.42441C2.29039 7.28079 2.28906 8.40968 2.28906 9.9987C2.28906 11.5877 2.29039 12.7166 2.40553 13.573C2.51825 14.4114 2.72964 14.8944 3.08232 15.2471C3.43499 15.5998 3.91803 15.8112 4.75644 15.9239C5.61282 16.039 6.74171 16.0404 8.33073 16.0404H11.6641C13.2531 16.0404 14.382 16.039 15.2384 15.9239C16.0768 15.8112 16.5598 15.5998 16.9125 15.2471C17.2652 14.8944 17.4765 14.4114 17.5893 13.573C17.7044 12.7166 17.7057 11.5877 17.7057 9.9987C17.7057 8.40968 17.7044 7.28079 17.5893 6.42441C17.4765 5.586 17.2652 5.10296 16.9125 4.75028C16.5598 4.39761 16.0768 4.18622 15.2384 4.0735C14.382 3.95836 13.2531 3.95703 11.6641 3.95703H8.33073C6.74171 3.95703 5.61282 3.95836 4.75644 4.0735ZM4.51726 6.26525C4.73824 6.00008 5.13234 5.96425 5.39751 6.18523L7.19659 7.68446C7.97406 8.33235 8.51384 8.78071 8.96955 9.07381C9.41068 9.35752 9.70984 9.45276 9.9974 9.45276C10.285 9.45276 10.5841 9.35752 11.0252 9.07381C11.481 8.78071 12.0207 8.33235 12.7982 7.68446L14.5973 6.18523C14.8625 5.96425 15.2566 6.00008 15.4775 6.26525C15.6985 6.53042 15.6627 6.92453 15.3975 7.1455L13.5671 8.67084C12.8285 9.28639 12.2298 9.7853 11.7014 10.1251C11.151 10.4791 10.615 10.7028 9.9974 10.7028C9.37983 10.7028 8.84379 10.4791 8.29338 10.1251C7.76499 9.7853 7.16633 9.28639 6.4277 8.67085L4.59728 7.1455C4.33211 6.92453 4.29628 6.53042 4.51726 6.26525Z"
  //             fill="#11111B"
  //           />
  //         </svg>
  //         <span style={{ fontWeight: 500 }}>Email</span>
  //       </div>
  //       <Text style={{ fontSize: "14px", color: "#1E293B" }}>
  //         {selectedRecord?.email}
  //       </Text>

  //       <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="20"
  //           height="20"
  //           viewBox="0 0 20 20"
  //           fill="none"
  //         >
  //           <path
  //             d="M16.7855 1.34766H3.19106C1.76971 1.34766 0.613281 2.50385 0.613281 3.92544V12.2449C0.613281 13.6633 1.76467 14.8177 3.18191 14.8227V18.598L8.60744 14.8227H16.7855C18.2069 14.8227 19.3633 13.6663 19.3633 12.2449V3.92544C19.3633 2.50385 18.2069 1.34766 16.7855 1.34766ZM18.2646 12.2449C18.2646 13.0605 17.6011 13.7241 16.7855 13.7241H8.26274L4.28054 16.4952V13.7241H3.19106C2.37544 13.7241 1.71191 13.0605 1.71191 12.2449V3.92544C1.71191 3.1097 2.37544 2.44629 3.19106 2.44629H16.7855C17.6011 2.44629 18.2646 3.1097 18.2646 3.92544V12.2449Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M5.63281 5.23047H14.3461V6.3291H5.63281V5.23047Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M5.63281 7.57422H14.3461V8.67285H5.63281V7.57422Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M5.63281 9.91797H14.3461V11.0166H5.63281V9.91797Z"
  //             fill="black"
  //           />
  //         </svg>
  //         <span style={{ fontWeight: 500 }}>Message</span>
  //       </div>
  //       <Text style={{ fontSize: "14px", color: "#1E293B" }}>
  //         {selectedRecord?.countdown}
  //       </Text>

  //       <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="20"
  //           height="20"
  //           viewBox="0 0 20 20"
  //           fill="none"
  //         >
  //           <path
  //             d="M17.2977 6.00042V19.0726H2.69974V0.928258H12.4111V0.103516H1.875V19.8973H18.1224V6.00042H17.2977Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M7.29688 8.18555H15.4618V9.01029H7.29688V8.18555Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M4.55469 8.18555H5.68871V9.01029H4.55469V8.18555Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M7.29688 10.8867H15.4618V11.7115H7.29688V10.8867Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M4.55469 10.8867H5.68871V11.7115H4.55469V10.8867Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M7.29688 13.5879H15.4618V14.4126H7.29688V13.5879Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M4.55469 13.5879H5.68871V14.4126H4.55469V13.5879Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M7.29688 16.2891H15.4618V17.1138H7.29688V16.2891Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M4.55469 16.2891H5.68871V17.1138H4.55469V16.2891Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M4.55469 2.92773H7.72995V6.06175H4.55469V2.92773Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M9.31641 4.08203H12.0793V4.90677H9.31641V4.08203Z"
  //             fill="black"
  //           />
  //           <path
  //             d="M13.7734 0.515625V4.45377H17.7116L13.7734 0.515625Z"
  //             fill="black"
  //           />
  //         </svg>
  //         <span style={{ fontWeight: 500 }}>Subject</span>
  //       </div>
  //       <Text style={{ fontSize: "14px", color: "#1E293B" }}>
  //         {selectedRecord?.status}
  //       </Text>
  //     </div>
  //   </div>
  // );

  return (
    <Card
    bordered={false}
      style={{

        border: "none",
        boxShadow: "none",
 
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        {/* Search Input */}
        <div className="w-full sm:w-[400px] lg:w-[625px]">
          <Input
            allowClear
            placeholder="Search by name/email/number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="large"
            addonAfter={<SearchOutlined />}
          />
        </div>

        <div>
          {/* Add Button */}
          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            className="w-full sm:w-auto !bg-[#225A7F] !border-[#225A7F] !rounded-md font-medium"
          >
            <Link href="/admin/add-clinic" className="text-white no-underline">
              Add Clinic
            </Link>
          </Button>
        </div>
      </div>

      <Title
        level={4}
        style={{
          margin: 0,
          color: "#1E293B",
          fontWeight: 600,
          marginTop: "50px",
          marginBottom: "24px",
        }}
      >
        All Clinics
      </Title>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        rowKey="key"
        scroll={{ x: "max-content" }}
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
      {/* Custom Pagination */}
      <div className="mt-4">
        <CustomPagination
          currentPage={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
      {/* Details Modal */}
      <Modal
        title={
          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontWeight: 600,
              fontSize: "18px",
              color: "#1E293B",
            }}
          >
            Details
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width="90%"
        style={{
          maxWidth: "400px",
          borderRadius: "12px",
          padding: 0,
        }}
        className="!justify-center !items-center"
        bodyStyle={{
          padding: "20px",
          background: "#fff",
          borderRadius: "12px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* User Name */}
          <Row
            align="middle"
            gutter={[8, 0]}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
              whiteSpace: "nowrap",
            }}
          >
            <Col
              flex="0 1 auto"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
              >
                <path
                  d="M3.22714 14.3346C3.22714 14.6586 2.96446 14.9213 2.64037 14.9213C2.31628 14.9213 2.0536 14.6587 2.0536 14.3346C2.0536 13.5431 2.07511 12.7849 2.11824 12.069C1.84666 12.1462 1.56971 12.2133 1.28856 12.2695C0.970796 12.3331 0.661694 12.127 0.598118 11.8093C0.534582 11.4915 0.740651 11.1824 1.05841 11.1188C1.45782 11.0389 1.8471 10.9345 2.22124 10.8091C2.3476 9.60826 2.54556 8.56551 2.81588 7.73531C3.46215 5.75034 4.61743 4.83897 6.12992 5.5952C7.64095 6.35071 7.68354 7.9273 6.50762 9.38543C5.77757 10.2907 4.65364 11.089 3.32361 11.6471C3.2596 12.4774 3.22714 13.3798 3.22714 14.3346ZM5.59416 8.64873C6.35351 7.70715 6.33465 7.00952 5.60515 6.64479C4.90277 6.29362 4.38693 6.70054 3.93177 8.09857C3.73618 8.69926 3.58033 9.43944 3.46543 10.2894C4.35577 9.83651 5.09678 9.26551 5.59416 8.64873ZM11.7854 6.11863L17.0662 0.837847C17.5245 0.379572 18.2676 0.379572 18.7258 0.837847L19.6563 1.76831C20.1146 2.22659 20.1146 2.96961 19.6563 3.42793L14.3755 8.70871C14.1554 8.92877 13.8569 9.05241 13.5457 9.05241H12.0284C11.7044 9.05241 11.4417 8.78972 11.4417 8.46564V6.9484C11.4417 6.6372 11.5654 6.33869 11.7854 6.11863ZM13.5457 7.87891L17.0662 4.3584L16.1357 3.42793L12.6152 6.94844V7.87891H13.5457ZM18.8265 2.59812L17.896 1.66765L16.9656 2.59812L17.896 3.52859L18.8265 2.59812ZM6.60251 12.3739C6.38913 12.6178 6.01843 12.6425 5.77456 12.4291C5.5307 12.2157 5.50595 11.845 5.71937 11.6012L7.34225 9.74644C7.66234 9.38065 8.21836 9.34356 8.58419 9.66365C8.74661 9.80579 8.85119 10.0027 8.87795 10.2169L8.93615 10.6825L9.30195 10.2964C9.63628 9.94354 10.1933 9.92851 10.5462 10.2628C10.589 10.3034 10.6276 10.3481 10.6614 10.3964L11.0957 11.0156L13.0414 10.4618C13.353 10.373 13.6776 10.5538 13.7663 10.8654C13.8551 11.1771 13.6743 11.5017 13.3626 11.5904L11.2163 12.2014C10.8559 12.304 10.47 12.1671 10.2548 11.8603L9.90683 11.3642L9.36094 11.9404C9.22074 12.0883 9.03349 12.1831 8.83118 12.2083C8.34887 12.2686 7.90898 11.9265 7.84868 11.4442L7.7946 11.0115L6.60251 12.3739ZM17.0159 8.46564C17.0159 8.14159 17.2786 7.87886 17.6027 7.87886C17.9268 7.87886 18.1894 8.14155 18.1894 8.46564V13.7464C18.1894 14.7186 17.4013 15.5067 16.4292 15.5067H4.98742C4.66337 15.5067 4.40065 15.244 4.40065 14.9199C4.40065 14.5959 4.66337 14.3332 4.98742 14.3332H16.4291C16.7532 14.3332 17.0159 14.0705 17.0159 13.7464V8.46564ZM12.6152 2.01135C12.9393 2.01135 13.202 2.27404 13.202 2.59812C13.202 2.92221 12.9393 3.18489 12.6152 3.18489H1.76027C1.43623 3.18489 1.1735 3.44758 1.1735 3.77166V8.46572C1.1735 8.78976 0.910819 9.05249 0.586733 9.05249C0.262647 9.05249 0 8.78972 0 8.46564V3.77162C0 2.79944 0.788093 2.01135 1.76027 2.01135H12.6152Z"
                  fill="black"
                />
              </svg>
              <Text strong style={{ fontSize: "14px", color: "#333" }}>
                Clinic Name
              </Text>
            </Col>
            <Col
              flex="1"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <Text style={{ fontSize: "14px", color: "#666" }}>
                {selectedRecord?.userName || "N/A"}
              </Text>
            </Col>
          </Row>

          <Row
            align="middle"
            gutter={[8, 0]}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
              whiteSpace: "nowrap",
            }}
          >
            <Col
              flex="0 1 auto"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10.4665 17.35C10.3305 17.4477 10.1673 17.5003 9.99983 17.5003C9.83239 17.5003 9.66917 17.4477 9.53317 17.35C5.50899 14.4817 1.23814 8.58168 5.55566 4.31834C6.74094 3.15238 8.33719 2.49927 9.99983 2.5C11.6665 2.5 13.2657 3.15417 14.444 4.31751C18.7615 8.58085 14.4907 14.48 10.4665 17.35Z"
                  stroke="#11111B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.9987 10.0013C10.4407 10.0013 10.8647 9.82572 11.1772 9.51315C11.4898 9.20059 11.6654 8.77667 11.6654 8.33464C11.6654 7.89261 11.4898 7.46869 11.1772 7.15613C10.8647 6.84356 10.4407 6.66797 9.9987 6.66797C9.55667 6.66797 9.13275 6.84356 8.82019 7.15613C8.50763 7.46869 8.33203 7.89261 8.33203 8.33464C8.33203 8.77667 8.50763 9.20059 8.82019 9.51315C9.13275 9.82572 9.55667 10.0013 9.9987 10.0013Z"
                  stroke="#11111B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Text strong style={{ fontSize: "14px", color: "#333" }}>
                Clinic Address
              </Text>
            </Col>
            <Col
              flex="1"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <Text style={{ fontSize: "14px", color: "#666" }}>
                {selectedRecord?.userName || "N/A"}
              </Text>
            </Col>
          </Row>

          {/* Email */}
          <Row
            align="middle"
            gutter={[8, 0]}
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <Col
              flex="0 1 auto"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.28372 2.70703H11.7111C13.2425 2.70702 14.4556 2.70701 15.4049 2.83464C16.3819 2.966 17.1727 3.24276 17.7964 3.8664C18.42 4.49004 18.6968 5.28083 18.8281 6.25785C18.9558 7.20719 18.9557 8.42022 18.9557 9.95169V10.0457C18.9557 11.5772 18.9558 12.7902 18.8281 13.7396C18.6968 14.7166 18.42 15.5074 17.7964 16.131C17.1727 16.7546 16.3819 17.0314 15.4049 17.1628C14.4556 17.2904 13.2425 17.2904 11.7111 17.2904H8.28372C6.75225 17.2904 5.53922 17.2904 4.58988 17.1628C3.61286 17.0314 2.82207 16.7546 2.19843 16.131C1.5748 15.5074 1.29803 14.7166 1.16668 13.7396C1.03904 12.7902 1.03905 11.5772 1.03906 10.0457V9.95168C1.03905 8.42022 1.03904 7.20719 1.16668 6.25785C1.29803 5.28083 1.5748 4.49004 2.19843 3.8664C2.82207 3.24276 3.61286 2.966 4.58988 2.83464C5.53922 2.70701 6.75225 2.70702 8.28372 2.70703ZM4.75644 4.0735C3.91803 4.18622 3.43499 4.39761 3.08232 4.75028C2.72964 5.10296 2.51825 5.586 2.40553 6.42441C2.29039 7.28079 2.28906 8.40968 2.28906 9.9987C2.28906 11.5877 2.29039 12.7166 2.40553 13.573C2.51825 14.4114 2.72964 14.8944 3.08232 15.2471C3.43499 15.5998 3.91803 15.8112 4.75644 15.9239C5.61282 16.039 6.74171 16.0404 8.33073 16.0404H11.6641C13.2531 16.0404 14.382 16.039 15.2384 15.9239C16.0768 15.8112 16.5598 15.5998 16.9125 15.2471C17.2652 14.8944 17.4765 14.4114 17.5893 13.573C17.7044 12.7166 17.7057 11.5877 17.7057 9.9987C17.7057 8.40968 17.7044 7.28079 17.5893 6.42441C17.4765 5.586 17.2652 5.10296 16.9125 4.75028C16.5598 4.39761 16.0768 4.18622 15.2384 4.0735C14.382 3.95836 13.2531 3.95703 11.6641 3.95703H8.33073C6.74171 3.95703 5.61282 3.95836 4.75644 4.0735ZM4.51726 6.26525C4.73824 6.00008 5.13234 5.96425 5.39751 6.18523L7.19659 7.68446C7.97406 8.33235 8.51384 8.78071 8.96955 9.07381C9.41068 9.35752 9.70984 9.45276 9.9974 9.45276C10.285 9.45276 10.5841 9.35752 11.0252 9.07381C11.481 8.78071 12.0207 8.33235 12.7982 7.68446L14.5973 6.18523C14.8625 5.96425 15.2566 6.00008 15.4775 6.26525C15.6985 6.53042 15.6627 6.92453 15.3975 7.1455L13.5671 8.67084C12.8285 9.28639 12.2298 9.7853 11.7014 10.1251C11.151 10.4791 10.615 10.7028 9.9974 10.7028C9.37983 10.7028 8.84379 10.4791 8.29338 10.1251C7.76499 9.7853 7.16633 9.28639 6.4277 8.67085L4.59728 7.1455C4.33211 6.92453 4.29628 6.53042 4.51726 6.26525Z"
                  fill="#11111B"
                />
              </svg>
              <Text strong style={{ fontSize: "14px", color: "#333" }}>
                Clinic Email
              </Text>
            </Col>
            <Col flex="1">
              <Text style={{ fontSize: "14px", color: "#666" }}>
                {selectedRecord?.email || "N/A"}
              </Text>
            </Col>
          </Row>

          {/* Contact */}
          <Row align="middle" gutter={[8, 0]} style={{ flexWrap: "nowrap" }}>
            <Col
              flex="0 1 auto"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.78586 2.34512C4.82624 1.30919 6.53926 1.49359 7.4104 2.65888L8.48809 4.10046C9.19692 5.04863 9.13438 6.37382 8.29298 7.21161L8.08892 7.4148C8.08 7.44073 8.05839 7.52221 8.08238 7.67708C8.13641 8.02583 8.42723 8.76562 9.6481 9.98126C10.8685 11.1965 11.6125 11.4874 11.9657 11.5417C12.1258 11.5662 12.2095 11.5433 12.2354 11.5343L12.5841 11.1871C13.3321 10.4423 14.4815 10.3031 15.4076 10.8072L17.0404 11.6961C18.4385 12.4572 18.7918 14.3603 17.6463 15.5009L16.4322 16.7098C16.0497 17.0906 15.5353 17.4083 14.9075 17.4669C13.3614 17.6112 9.75639 17.427 5.96853 13.6554C2.43211 10.1341 1.75347 7.06336 1.66761 5.55038L2.30755 5.51396L1.66761 5.55038C1.62419 4.78533 1.9852 4.13806 2.44442 3.68082L3.78586 2.34512ZM6.38416 3.42823C5.95118 2.84905 5.14416 2.803 4.68976 3.25545L3.34832 4.59115C3.06635 4.87191 2.93069 5.18132 2.9475 5.47754C3.01572 6.67965 3.5638 9.45058 6.87243 12.745C10.3435 16.2013 13.5494 16.3043 14.7885 16.1886C15.0417 16.165 15.2935 16.0333 15.5283 15.7994L16.7424 14.5906C17.2359 14.0992 17.127 13.2044 16.4281 12.8239L14.7953 11.9351C14.3445 11.6897 13.8162 11.7706 13.488 12.0974L13.0988 12.485L12.6468 12.0298C13.0988 12.485 13.0982 12.4856 13.0976 12.4862L13.0963 12.4874L13.0937 12.49L13.0882 12.4953L13.0756 12.507C13.0666 12.5152 13.0564 12.5242 13.0448 12.5338C13.0215 12.5531 12.993 12.5749 12.9589 12.5978C12.8904 12.6437 12.8001 12.6936 12.6866 12.736C12.4551 12.8223 12.1498 12.8687 11.7714 12.8106C11.0306 12.6968 10.0492 12.191 8.7442 10.8916C7.43961 9.59259 6.9303 8.61443 6.81558 7.87389C6.75691 7.49522 6.8037 7.18942 6.89098 6.95744C6.93376 6.84375 6.98417 6.75336 7.03043 6.68498C7.0535 6.65088 7.07546 6.62237 7.09484 6.59922C7.10453 6.58764 7.11358 6.57738 7.12182 6.56842L7.13356 6.55594L7.13893 6.55041L7.14149 6.54782L7.14273 6.54657C7.14335 6.54596 7.14396 6.54535 7.59591 7.00052L7.14396 6.54535L7.38908 6.30128C7.75538 5.93655 7.80669 5.33108 7.46185 4.86981L6.38416 3.42823Z"
                  fill="#11111B"
                />
              </svg>
              <Text strong style={{ fontSize: "14px", color: "#333" }}>
                Contact
              </Text>
            </Col>
            <Col flex="1">
              <Text style={{ fontSize: "14px", color: "#666" }}>
                +84 0373467950
              </Text>
            </Col>
          </Row>
          <Row align="middle" gutter={[8, 0]} style={{ flexWrap: "nowrap" }}>
            <Col
              flex="0 1 auto"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10.4665 17.35C10.3305 17.4477 10.1673 17.5003 9.99983 17.5003C9.83239 17.5003 9.66917 17.4477 9.53317 17.35C5.50899 14.4817 1.23814 8.58168 5.55566 4.31834C6.74094 3.15238 8.33719 2.49927 9.99983 2.5C11.6665 2.5 13.2657 3.15417 14.444 4.31751C18.7615 8.58085 14.4907 14.48 10.4665 17.35Z"
                  stroke="#11111B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.9987 10.0013C10.4407 10.0013 10.8647 9.82572 11.1772 9.51315C11.4898 9.20059 11.6654 8.77667 11.6654 8.33464C11.6654 7.89261 11.4898 7.46869 11.1772 7.15613C10.8647 6.84356 10.4407 6.66797 9.9987 6.66797C9.55667 6.66797 9.13275 6.84356 8.82019 7.15613C8.50763 7.46869 8.33203 7.89261 8.33203 8.33464C8.33203 8.77667 8.50763 9.20059 8.82019 9.51315C9.13275 9.82572 9.55667 10.0013 9.9987 10.0013Z"
                  stroke="#11111B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Text strong style={{ fontSize: "14px", color: "#333" }}>
                Address
              </Text>
            </Col>
            <Col flex="1">
              <Text style={{ fontSize: "14px", color: "#666" }}>
                Dhaka Bangladesh
              </Text>
            </Col>
          </Row>
        </div>
      </Modal>

      {/* ✅ Edit Modal */}
      <EditClinicModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        data={selectedRecord}
      />
    </Card>
  );
};
