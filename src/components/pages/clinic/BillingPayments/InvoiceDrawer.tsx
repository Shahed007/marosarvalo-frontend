/* eslint-disable @typescript-eslint/no-explicit-any */
// components/InvoiceDrawer.tsx
"use client";

import { Drawer, Table, Typography, Divider, Button, Space } from "antd";
import {
  DownloadOutlined,
  PrinterOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { InvoiceItem, Patient } from "@/types/global";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const { Title, Text } = Typography;

interface InvoiceDrawerProps {
  visible: boolean;
  onClose: () => void;
  cartItems: InvoiceItem[];
  selectedPatient: Patient | null;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  appliedVoucher: any;
  voucherDiscount: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  note: string;
  onPayment: () => void;
  confirmPayment: boolean;
}

export default function InvoiceDrawer({
  visible,
  onClose,
  cartItems,
  selectedPatient,
  subtotal,
  discountRate,
  discountAmount,
  taxRate,
  taxAmount,
  appliedVoucher,
  voucherDiscount,
  total,
  amountPaid,
  balanceDue,
  note,
  onPayment,
  confirmPayment,
}: InvoiceDrawerProps) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1]; 
  console.log("Last segment:", lastSegment);

  const summaryData: any[] = [
    { key: "subtotal", label: "Sub Total", value: subtotal.toFixed(2) },
  ];

  if (discountRate > 0) {
    summaryData.push({
      key: "discount",
      label: `Discount (${discountRate}%)`,
      value: `-${discountAmount.toFixed(2)}`,
    });
  }

  if (taxRate > 0) {
    summaryData.push({
      key: "tax",
      label: `Tax (${taxRate}%)`,
      value: taxAmount.toFixed(2),
    });
  }

  if (appliedVoucher) {
    summaryData.push({
      key: "voucher",
      label: `Voucher (${appliedVoucher.name})`,
      value: `-${voucherDiscount.toFixed(2)}`,
    });
  }

  summaryData.push({
    key: "total",
    label: "Total Amount",
    value: total.toFixed(2),
    isBold: true,
  });

  if (amountPaid > 0) {
    summaryData.push({
      key: "paid",
      label: "Paid Amount",
      value: amountPaid.toFixed(2),
      color: "#0BABB7",
    });

    summaryData.push({
      key: "balance",
      label: balanceDue > 0 ? "Due Amount" : "Change Due",
      value: Math.abs(balanceDue).toFixed(2),
      isBold: true,
      color: balanceDue > 0 ? "#F45B69" : "#0BABB7",
    });
  }

  return (
    <Drawer
      title={
        <div className="flex flex-col justify-between items-center">
          <Image src={logo} width={140} height={120} alt="logo" />
          <Title
            level={5}
            style={{
              textAlign: "center",
              color: "#0B121B",
              marginTop: "24px",
              fontWeight: "700",
              lineHeight: "24px",
            }}
          >
            FisioWell Clinic
          </Title>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      closable={false}
      width={780}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            padding: "16px 24px",
            width: "100%",
          }}
        >
          {confirmPayment || lastSegment === "receipt-history" ? (
            <Button
              className="!bg-red-500 !text-white hover:!border-0"
              size="large"
              style={{ minWidth: "50%", height: 44 }}
              onClick={onClose}
            >
              Delete
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              style={{ minWidth: "50%", height: 44 }}
              onClick={onPayment}
            >
              Confirm
            </Button>
          )}
          {confirmPayment ? (
            <Button
              size="large"
              style={{ minWidth: "50%", height: 44 }}
              onClick={onClose}
              className="hover:!bg-primary hover:!text-white"
            >
              Close
            </Button>
          ) : (
            <Button
              size="large"
              style={{ minWidth: "50%", height: 44 }}
              onClick={onClose}
              className="hover:!bg-primary hover:!text-white"
            >
              Not Now
            </Button>
          )}
        </div>
      }
    >
      <div>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={1} style={{ margin: "16px 0", fontWeight: "bold" }}>
            Patient Invoice
          </Title>
        </div>

        {/* Clinic Info */}
        <div style={{ textAlign: "right", marginTop: "50px" }}>
          <div style={{ marginBottom: 16 }}>
            <Text>123 Health Steer Sydney NSW</Text>
            <br />
            <Text>2308, Australia</Text>
          </div>
          <div>
            <Text>
              <strong>Email:</strong> john.verco@health.com
            </Text>
            <br />
            <Text>
              <strong>Contact:</strong> +58 16 88 584
            </Text>
          </div>
        </div>

        <Divider />

        {/* Patient & Invoice Info */}
        <div className="flex justify-between items-center">
          <div style={{ marginBottom: 24 }}>
            <Title
              style={{ marginBottom: 2, fontSize: "14px", fontWeight: "bold" }}
            >
              Bill To:
            </Title>
            <Text strong>
              {selectedPatient ? selectedPatient.name : "No patient selected"}
            </Text>
            <br />
            {selectedPatient && (
              <>
                <Text>Phone: {selectedPatient.phone}</Text>
                <br />
                <Text>Email: {selectedPatient.email}</Text>
              </>
            )}
          </div>

          <div style={{ marginBottom: 24 }}>
            <Title
              style={{ marginBottom: 2, fontSize: "14px", fontWeight: "bold" }}
            >
              Invoice:
            </Title>
            <Text strong>#FT15212</Text>
            <br />
            <Text>
              <strong> Assigned Specialist:</strong> <br /> Dr. John Son
            </Text>
          </div>
        </div>

        <Divider />

        {/* Invoice Items Table */}
        <Table
          className="overflow-x-auto"
          dataSource={cartItems.map((item) => ({
            key: item.id,
            product: item.name,
            type: item.type,
            length: "N/A",
            qty: item.quantity,
            unitPrice: `$${Number(item.price).toFixed(2)}`,
            total: `$${Number(item.total).toFixed(2)}`,
          }))}
          columns={[
            { title: "Product", dataIndex: "product", key: "product" },
            { title: "Type", dataIndex: "type", key: "type" },
            { title: "Length", dataIndex: "length", key: "length" },
            { title: "Qty", dataIndex: "qty", key: "qty" },
            { title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice" },
            { title: "Total", dataIndex: "total", key: "total" },
          ]}
          pagination={false}
          style={{ marginBottom: 24 }}
        />

        {/* Summary Table */}
        <Table
          // className="border-[#CCC] border"
          dataSource={summaryData}
          pagination={false}
          rowKey="key"
          showHeader={false}
          style={{ width: 300, marginLeft: "auto", marginBottom: 24 }}
          columns={[
            {
              title: "Label",
              dataIndex: "label",
              key: "label",
              render: (text: string, record: any) => (
                <Text
                  strong={record.isBold}
                  style={{ color: record.color || "#000" }}
                >
                  {text}
                </Text>
              ),
            },
            {
              title: "Value",
              dataIndex: "value",
              key: "value",
              align: "right",
              render: (text: string, record: any) => (
                <Text
                  strong={record.isBold}
                  style={{ color: record.color || "#000" }}
                >
                  {text}
                </Text>
              ),
            },
          ]}
        />

        {/* Note Section */}
        {note && (
          <div style={{ marginBottom: 24 }}>
            <Title level={5}>Note:</Title>
            <Text>{note}</Text>
          </div>
        )}

        {/* Action Buttons */}
        <Space
          size={[8, 12]}
          className="flex flex-wrap justify-start gap-3 sm:gap-4 w-full"
          style={{ width: "100%" }}
        >
          <Button
            icon={<DownloadOutlined className="!font-bold" />}
            className=" hover:!bg-primary hover:!text-white !font-bold min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px]"
          >
            Download invoice
          </Button>

          <Button
            icon={<PrinterOutlined />}
            className="hover:!bg-primary hover:!text-white !font-bold min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px]"
          >
            Print invoice
          </Button>

          <Button
            icon={<MailOutlined />}
            className="hover:!bg-primary hover:!text-white !font-bold min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px]"
          >
            Send via email
          </Button>
        </Space>
      </div>

      <style jsx global>
        {`
          .ant-drawer .ant-drawer-body {
            padding: 15px !important;
          }
        `}
      </style>
    </Drawer>
  );
}
