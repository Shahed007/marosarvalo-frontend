/* eslint-disable @typescript-eslint/no-explicit-any */
// components/InvoiceDrawer.tsx
"use client"

import { Drawer, Table, Row, Col, Typography, Divider, Button, Space } from "antd";
import { DownloadOutlined, PrinterOutlined, MailOutlined } from "@ant-design/icons";
import { InvoiceItem, Patient } from "@/types/global";

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
  confirmPayment
}: InvoiceDrawerProps) {
  return (
    <Drawer
      title="Patient Invoice"
      placement="right"
      onClose={onClose}
      open={visible}
      width={700}
      styles={{
        body: { padding: 24 },
        header: {
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 24px",
        },
      }}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            padding: "16px 24px",
            borderTop: "1px solid #e5e7eb",
            width: "100%",
          }}
        >
          {confirmPayment ? (
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
              Confirm Payment
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
      <div style={{ padding: 16 }}>
        {/* Header with Logo and Clinic Info */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0 }}>
            Fisio/Well Clinic
          </Title>
          <Title level={3} style={{ margin: "16px 0" }}>
            Patient Invoice
          </Title>

          <div style={{ marginBottom: 16 }}>
            <Text>123 Health Steer Sydney NSW</Text>
            <br />
            <Text>2308, Australia</Text>
          </div>

          <div>
            <Text>Email: john.verco@health.com</Text>
            <br />
            <Text>Contact: +58 16 88 584</Text>
          </div>
        </div>

        <Divider />

        {/* Patient Information */}
        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ marginBottom: 16 }}>
            Bill To
          </Title>
          <Text strong>{selectedPatient ? selectedPatient.name : "No patient selected"}</Text>
          <br />
          {selectedPatient && (
            <>
              <Text>Phone: {selectedPatient.phone}</Text>
              <br />
              <Text>Email: {selectedPatient.email}</Text>
            </>
          )}
        </div>

        <Divider />

        {/* Invoice Table */}
        <Table
          dataSource={cartItems.map(item => ({
            key: item.id,
            product: item.name,
            type: item.type,
            length: "N/A",
            qty: item.quantity,
            unitPrice: `$${Number(item.price).toFixed(2)}`,
            total: `$${Number(item.total).toFixed(2)}`,
          }))}
          columns={[
            {
              title: "Product",
              dataIndex: "product",
              key: "product",
            },
            {
              title: "Type",
              dataIndex: "type",
              key: "type",
            },
            {
              title: "Length",
              dataIndex: "length",
              key: "length",
            },
            {
              title: "Qty",
              dataIndex: "qty",
              key: "qty",
            },
            {
              title: "Unit Price",
              dataIndex: "unitPrice",
              key: "unitPrice",
            },
            {
              title: "Total",
              dataIndex: "total",
              key: "total",
            },
          ]}
          pagination={false}
          style={{ marginBottom: 24 }}
        />

        {/* Summary Section */}
        <div style={{ marginBottom: 24 }}>
          <Row justify="space-between" style={{ marginBottom: 8 }}>
            <Col>
              <Text strong>Sub Total :</Text>
            </Col>
            <Col>
              <Text className="!font-bold">${subtotal.toFixed(2)}</Text>
            </Col>
          </Row>
          
          {discountRate > 0 && (
            <Row justify="space-between" style={{ marginBottom: 8 }}>
              <Col>
                <Text strong>Discount ({discountRate}%)</Text>
              </Col>
              <Col>
                <Text className="!font-bold">-${discountAmount.toFixed(2)}</Text>
              </Col>
            </Row>
          )}
          
          {taxRate > 0 && (
            <Row justify="space-between" style={{ marginBottom: 8 }}>
              <Col>
                <Text strong>Tax ({taxRate}%)</Text>
              </Col>
              <Col>
                <Text className="!font-bold">${taxAmount.toFixed(2)}</Text>
              </Col>
            </Row>
          )}
          
          {appliedVoucher && (
            <Row justify="space-between" style={{ marginBottom: 8 }}>
              <Col>
                <Text strong>Voucher ({appliedVoucher.name})</Text>
              </Col>
              <Col>
                <Text className="!font-bold">-${voucherDiscount.toFixed(2)}</Text>
              </Col>
            </Row>
          )}
          
          <Row justify="space-between" style={{ marginBottom: 16 }}>
            <Col>
              <Text strong>Total Amount :</Text>
            </Col>
            <Col>
              <Text className="!font-bold">${total.toFixed(2)}</Text>
            </Col>
          </Row>
          
          {amountPaid > 0 && (
            <>
              <Row justify="space-between" style={{ marginBottom: 8 }}>
                <Col>
                  <Text strong style={{ color: "#0BABB7" }}>
                    Paid Amount :
                  </Text>
                </Col>
                <Col>
                  <Text style={{ color: "#0BABB7" }} className="!font-bold">
                    ${amountPaid.toFixed(2)}
                  </Text>
                </Col>
              </Row>
              
              <Divider style={{ margin: "8px 0" }} />

              <Row justify="space-between" style={{ marginBottom: 16 }}>
                <Col>
                  <Text strong style={{ fontSize: 16, color: balanceDue > 0 ? "#F45B69" : "#0BABB7" }}>
                    {balanceDue > 0 ? "Due Amount" : "Change Due"}:
                  </Text>
                </Col>
                <Col>:</Col>
                <Col>
                  <Text strong style={{ fontSize: 16, color: balanceDue > 0 ? "#F45B69" : "#0BABB7" }}>
                    ${Math.abs(balanceDue).toFixed(2)}
                  </Text>
                </Col>
              </Row>
            </>
          )}
        </div>

        <Divider />

        {/* Note Section */}
        {note && (
          <div style={{ marginBottom: 24 }}>
            <Title level={5}>Note:</Title>
            <Text>{note}</Text>
          </div>
        )}

        {/* Action Buttons */}
        <Space
          direction="vertical"
          style={{ width: "100%" }}
          size={12}
          className="!flex !flex-row"
        >
          <Button type="primary" block icon={<DownloadOutlined />}>
            Download invoice
          </Button>
          <Button
            className="hover:!bg-primary hover:!text-white"
            block
            icon={<PrinterOutlined />}
          >
            Print invoice
          </Button>
          <Button
            className="hover:!bg-primary hover:!text-white"
            block
            icon={<MailOutlined />}
          >
            Send via email
          </Button>
        </Space>
      </div>
    </Drawer>
  );
}