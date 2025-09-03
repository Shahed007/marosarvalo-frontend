/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Select,
  Table,
  Space,
  Modal,
  Drawer,
  Form,
  DatePicker,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  MinusOutlined,
  PrinterOutlined,
  DownloadOutlined,
  MailOutlined,
} from "@ant-design/icons";
import visaCardIcon from "@/assets/icons/visacard.png";
import masterCardIcon from "@/assets/icons/mastercard.png";
import Image from "next/image";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function BillingPayments() {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [drawerVisibleVoucer, setDrawerVisibleVoucer] =
    useState<boolean>(false);
  const [drawerVisibleService, setDrawerVisibleService] =
    useState<boolean>(false);
  const [drawerVisibleInvoice, setDrawerVisibleInvoice] = useState(false);
  const [, setSelectedPayment] = useState("cash");
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [taxPercent, setTaxPercent] = useState(0);
  const [form] = Form.useForm(); // Add form instance

  const productPrice = 120;
  const subTotal = productPrice * quantity;
  const discountAmount = (subTotal * discount) / 100;
  const tax = ((subTotal - discountAmount) * taxPercent) / 100;
  const total = subTotal - discountAmount + tax;
  const voucherAmount = 0;
  const finalTotal = total - voucherAmount;

  // Handle new bond form submission
  const handleFormSubmit = (values: any) => {
    console.log("New bond form values:", values);
    Modal.success({
      title: "Success",
      content: "Bond added successfully!",
    });
    setDrawerVisible(false);
    form.resetFields();
  };
  const handleServiceSubmit = (values: any) => {
    console.log("New bond form values:", values);
    Modal.success({
      title: "Success",
      content: "Bond added successfully!",
    });
    setDrawerVisibleService(false);
    form.resetFields();
  };
  const handleVoucerSubmit = (values: any) => {
    console.log("New bond form values:", values);
    Modal.success({
      title: "Success",
      content: "Bond added successfully!",
    });
    setDrawerVisibleService(false);
    form.resetFields();
  };

  // Table columns
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text: string) => <Text style={{ color: "#000" }}>{text}</Text>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: () => (
        <Space>
          <Button
            size="small"
            icon={<MinusOutlined />}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          />
          <span style={{ width: 30, textAlign: "center" }}>{quantity}</span>
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={() => setQuantity(quantity + 1)}
          />
        </Space>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: string) => `$${text}`,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text: string) => `$${text}`,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="text" icon={<DeleteOutlined />} size="small" />
      ),
    },
  ];

  // Table data
  const data = [
    {
      key: "1",
      product: "Email Consultation",
      type: "Service",
      quantity: quantity,
      price: productPrice,
      total: subTotal,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <div>
        <Title level={2} style={{ marginBottom: 24 }}>
          Billing & Payments
        </Title>

        <Row gutter={24}>
          {/* Left Column */}
          <Col xs={24} lg={16}>
            {/* Invoice Section */}
            <Card
              style={{ marginBottom: 24, borderRadius: 8 }}
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Invoice
                </Title>
              }
            >
              <Space direction="vertical" style={{ width: "100%" }} size={16}>
                <div>
                  <Text strong style={{ display: "block", marginBottom: 8 }}>
                    Patient
                  </Text>
                  <Input
                    placeholder="Search Patients"
                    suffix={
                      <SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                    }
                    size="large"
                  />
                </div>

                <Space wrap>
                  <Button size="middle">Emily carter</Button>
                  <Button size="middle">Emily carter</Button>
                  <Button size="middle">Emily carter</Button>
                  <Button size="middle">Emily carter</Button>
                  <Button size="middle">Emily carter</Button>
                </Space>
              </Space>
            </Card>

            {/* Product Section */}
            <Card
              style={{ marginBottom: 24, borderRadius: 8 }}
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Title level={4} style={{ margin: 0 }}>
                    Product
                  </Title>
                  <Space>
                    <Button
                      className="hover:!bg-primary hover:!text-white"
                      size="middle"
                      onClick={() => setDrawerVisibleVoucer(true)}
                    >
                      Add Voucher
                    </Button>
                    <Button
                      className="hover:!bg-primary hover:!text-white"
                      size="middle"
                      onClick={() => setDrawerVisible(true)}
                    >
                      Add Bonds
                    </Button>
                    <Button
                      type="primary"
                      size="middle"
                      onClick={() => setDrawerVisibleService(true)}
                    >
                      Add Services
                    </Button>
                  </Space>
                </div>
              }
            >
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                size="middle"
              />

              <div className="flex gap-4 mt-4">
                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    border: "1px solid #CCCCCC",
                    padding: "4px 8px",
                    borderRadius: "8px",
                  }}
                >
                  Suggest Top services
                </Text>
                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    border: "1px solid #CCCCCC",
                    padding: "4px 8px",
                    borderRadius: "8px",
                  }}
                >
                  Suggest Top services
                </Text>
              </div>
            </Card>

            {/* Taxes Section */}
            <Card
              style={{ marginBottom: 24, borderRadius: 8 }}
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Taxes
                </Title>
              }
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Select
                  value={taxPercent.toString()}
                  onChange={(value) => setTaxPercent(Number(value))}
                  style={{ width: "100%" }}
                  size="middle"
                >
                  <Option value="0">Percentage</Option>
                  <Option value="5">5%</Option>
                  <Option value="10">10%</Option>
                  <Option value="15">15%</Option>
                  <Option value="20">20%</Option>
                </Select>
              </div>
            </Card>

            {/* Discount Section */}
            <Card
              style={{ marginBottom: 24, borderRadius: 8 }}
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Discount
                </Title>
              }
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Select
                  value={discount.toString()}
                  onChange={(value) => setDiscount(Number(value))}
                  style={{ width: "100%" }}
                  size="middle"
                >
                  <Option value="0">Percentage</Option>
                  <Option value="5">5%</Option>
                  <Option value="10">10%</Option>
                  <Option value="15">15%</Option>
                  <Option value="20">20%</Option>
                </Select>
              </div>
            </Card>

            {/* Payment Method Section */}
            <Card
              style={{ marginBottom: 24, borderRadius: 8 }}
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Payment Method
                </Title>
              }
            >
              <Space wrap>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Button
                    style={{
                      width: 153,
                      height: 100,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 12,
                      border: "1px solid #CCCCCC",
                    }}
                  >
                    <Image
                      src={masterCardIcon}
                      width={50}
                      height={50}
                      alt="visacard"
                    />
                  </Button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Button
                    style={{
                      width: 153,
                      height: 100,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 12,
                      border: "1px solid #CCCCCC",
                    }}
                  >
                    <Image
                      src={visaCardIcon}
                      width={50}
                      height={50}
                      alt="visacard"
                    />
                  </Button>
                </div>

                <Button
                  onClick={() => setSelectedPayment("cash")}
                  size="middle"
                  style={{ width: 153, height: 100 }}
                  className="!font-bold"
                >
                  Cash
                </Button>

                <Button
                  onClick={() => setSelectedPayment("voucher")}
                  size="middle"
                  style={{ width: 153, height: 100 }}
                  className="!font-bold"
                >
                  Voucher
                </Button>

                <Button
                  onClick={() => setSelectedPayment("bond")}
                  size="middle"
                  style={{ width: 153, height: 100 }}
                  className="!font-bold"
                >
                  Bond
                </Button>
              </Space>
            </Card>

            {/* Voucher Pay Section */}
            <Card
              style={{ marginBottom: 24, borderRadius: 8 }}
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Voucher Pay
                </Title>
              }
            >
              <Space direction="vertical" style={{ width: "100%" }} size={16}>
                <Select
                  placeholder="Select Voucher"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  <Option value="voucher1">Voucher 1</Option>
                  <Option value="voucher2">Voucher 2</Option>
                </Select>

                <Space>
                  <Button size="middle">SUBJECT</Button>
                  <Button size="middle">SUBJECT</Button>
                </Space>
              </Space>
            </Card>

            {/* Amount Paid Section */}
            <Card
              style={{ marginBottom: 24, borderRadius: 8, width: "100%" }}
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Amount Paid
                </Title>
              }
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  width: "100%",
                }}
              >
                <Input
                  placeholder="Amount"
                  size="middle"
                  style={{ width: "100%" }}
                />
                <Button type="primary" style={{ width: "20%" }}>
                  Add Amount
                </Button>
              </div>
            </Card>

            {/* Note Section */}
            <Card
              style={{ marginBottom: 24, borderRadius: 8 }}
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Note
                </Title>
              }
            >
              <TextArea placeholder="Write Note" rows={3} />
            </Card>

            {/* Action Buttons */}
            <Space>
              <Button
                onClick={() => setDrawerVisibleInvoice(true)}
                type="primary"
                size="large"
                icon={<PlusOutlined />}
              >
                Create Invoice
              </Button>
              <Button size="large">Cancel</Button>
            </Space>
          </Col>

          {/* Right Column - Invoice Summary */}
          <Col xs={24} lg={8}>
            <Card
              style={{ borderRadius: 8, position: "sticky", top: 24 }}
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Invoice Summary
                </Title>
              }
            >
              <Space direction="vertical" style={{ width: "100%" }} size={12}>
                <Row justify="space-between">
                  <Col>Sub Total</Col>
                  <Col>:</Col>
                  <Col>${subTotal}</Col>
                </Row>

                <Row justify="space-between">
                  <Col>Discount</Col>
                  <Col>:</Col>
                  <Col>${discountAmount.toFixed(0)}</Col>
                </Row>

                <Row justify="space-between">
                  <Col>Tax</Col>
                  <Col>:</Col>
                  <Col>${tax.toFixed(2)}</Col>
                </Row>

                <Divider style={{ margin: "8px 0" }} />

                <Row justify="space-between">
                  <Col>
                    <Text strong>Total</Text>
                  </Col>
                  <Col>:</Col>
                  <Col>
                    <Text strong>${total.toFixed(2)}</Text>
                  </Col>
                </Row>

                <Row justify="space-between">
                  <Col>Voucher</Col>
                  <Col>:</Col>
                  <Col>${voucherAmount}</Col>
                </Row>

                <Divider style={{ margin: "8px 0" }} />

                <Row justify="space-between">
                  <Col>
                    <Text strong style={{ fontSize: 16 }}>
                      Total
                    </Text>
                  </Col>
                  <Col>:</Col>
                  <Col>
                    <Text strong style={{ fontSize: 16 }}>
                      ${finalTotal.toFixed(2)}
                    </Text>
                  </Col>
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Drawer for adding bonds */}
      <Drawer
        title="Add Bonds"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={500}
        styles={{
          body: { padding: 24 },
          header: {
            borderBottom: "1px solid #e5e7eb",
            padding: "16px 24px",
            textAlign: "center",
            fontSize: 32,
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
            }}
          >
            <Button
              type="primary"
              size="large"
              style={{ minWidth: 120, height: 44 }}
              onClick={() => form.submit()}
            >
              Add Now
            </Button>
            <Button
              size="large"
              style={{ minWidth: 120, height: 44 }}
              onClick={() => setDrawerVisible(false)}
            >
              Not Now
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          requiredMark={false}
        >
          {/* Discipline Field */}
          <Form.Item
            label="Discipline"
            name="discipline"
            rules={[{ required: true, message: "Please select discipline" }]}
          >
            <Select placeholder="Select Discipline" size="large">
              <Option value="cardiology">Cardiology</Option>
              <Option value="neurology">Neurology</Option>
              <Option value="orthopedics">Orthopedics</Option>
              <Option value="pediatrics">Pediatrics</Option>
              <Option value="surgery">Surgery</Option>
            </Select>
          </Form.Item>

          {/* Service Field */}
          <Form.Item
            label="Service"
            name="service"
            rules={[{ required: true, message: "Please select service" }]}
          >
            <Select placeholder="Select Services" size="large">
              <Option value="consultation">Consultation</Option>
              <Option value="surgery">Surgery</Option>
              <Option value="therapy">Therapy</Option>
              <Option value="diagnostics">Diagnostics</Option>
              <Option value="emergency">Emergency Care</Option>
            </Select>
          </Form.Item>

          {/* Search Bond Field */}
          <Form.Item label="Search Bond" name="searchBond">
            <Input
              placeholder="Search Bonds"
              size="large"
              suffix={<SearchOutlined />}
            />
          </Form.Item>

          {/* Session Field */}
          <Form.Item
            label="Session"
            name="session"
            rules={[{ required: true, message: "Please enter session count" }]}
          >
            <Input
              placeholder="05"
              size="large"
              type="number"
              min={1}
              max={99}
            />
          </Form.Item>

          {/* Bond Name Field */}
          <Form.Item
            label="Bond Name"
            name="bondName"
            rules={[{ required: true, message: "Please enter bond name" }]}
          >
            <Input placeholder="W2" size="large" />
          </Form.Item>

          {/* Price Field */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input
              placeholder="$1245"
              size="large"
              prefix="$"
              type="number"
              min={0}
            />
          </Form.Item>
        </Form>
      </Drawer>
      {/* Drawer for adding services */}
      <Drawer
        title="Add Services"
        placement="right"
        onClose={() => setDrawerVisibleService(false)}
        open={drawerVisibleService}
        width={500}
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
            }}
          >
            <Button
              type="primary"
              size="large"
              style={{ minWidth: 120, height: 44 }}
              onClick={() => form.submit()}
            >
              Add here
            </Button>
            <Button
              size="large"
              style={{ minWidth: 120, height: 44 }}
              onClick={() => setDrawerVisibleService(false)}
            >
              Not here
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleServiceSubmit}
          requiredMark={false}
        >
          {/* Select Discipline Field */}
          <Form.Item
            label="Select Discipline"
            name="discipline"
            rules={[{ required: true, message: "Please select discipline" }]}
          >
            <Select placeholder="Operation" size="large">
              <Option value="operation">Operation</Option>
              <Option value="consultation">Consultation</Option>
              <Option value="emergency">Emergency</Option>
              <Option value="therapy">Therapy</Option>
              <Option value="diagnostics">Diagnostics</Option>
            </Select>
          </Form.Item>

          {/* Services Field */}
          <Form.Item
            label="Services"
            name="service"
            rules={[{ required: true, message: "Please select service" }]}
          >
            <Select placeholder="Surgery" size="large">
              <Option value="surgery">Surgery</Option>
              <Option value="consultation">Consultation</Option>
              <Option value="therapy">Therapy</Option>
              <Option value="diagnostics">Diagnostics</Option>
              <Option value="emergency">Emergency Care</Option>
            </Select>
          </Form.Item>
          {/* Service Amount Field */}
          <Form.Item
            label="Amount of the service"
            name="serviceAmount"
            rules={[{ required: true, message: "Please enter service amount" }]}
          >
            <Input
              placeholder="$1245"
              size="large"
              prefix="$"
              type="number"
              min={0}
            />
          </Form.Item>
        </Form>
      </Drawer>
      {/* Drawer for adding vouchers */}
      <Drawer
        title="Sell Voucher"
        placement="right"
        onClose={() => setDrawerVisibleVoucer(false)}
        open={drawerVisibleVoucer}
        width={500}
        styles={{
          body: { padding: 24 },
          header: {
            borderBottom: "1px solid #e5e7eb",
            padding: "16px 24px",
            textAlign: "center",
            fontSize: "40px",
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
            }}
          >
            <Button
              type="primary"
              size="large"
              style={{ minWidth: 120, height: 44 }}
              onClick={() => form.submit()}
            >
              Add Now
            </Button>
            <Button
              size="large"
              style={{ minWidth: 120, height: 44 }}
              onClick={() => setDrawerVisibleVoucer(false)}
            >
              Not Now
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleVoucerSubmit}
          requiredMark={false}
        >
          {/* Voucher Name Field */}
          <Form.Item
            label="Voucher Name"
            name="voucherName"
            rules={[{ required: true, message: "Please enter voucher name" }]}
          >
            <Input placeholder="Xyz" size="large" />
          </Form.Item>

          {/* Voucher Amount Field */}
          <Form.Item
            label="Voucher Amount"
            name="voucherAmount"
            rules={[{ required: true, message: "Please enter voucher amount" }]}
          >
            <Input
              placeholder="$1245"
              size="large"
              prefix="$"
              type="number"
              min={0}
            />
          </Form.Item>

          {/* Expire Date Field */}
          <Form.Item
            label="Expire Date"
            name="expireDate"
            rules={[{ required: true, message: "Please select expire date" }]}
          >
            <DatePicker
              placeholder="12 April, 2025"
              size="large"
              style={{ width: "100%" }}
              format="DD MMMM, YYYY"
            />
          </Form.Item>
        </Form>
      </Drawer>
      {/* Drawer for crate invoice */}
      <Drawer
        title="Patient Invoice"
        placement="right"
        onClose={() => setDrawerVisibleInvoice(false)}
        open={drawerVisibleInvoice}
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
            }}
          >
            <Button
              type="primary"
              size="large"
              style={{ minWidth: 120, height: 44 }}
              onClick={() => setDrawerVisibleInvoice(false)}
            >
              Enter
            </Button>
            <Button
              size="large"
              style={{ minWidth: 120, height: 44 }}
              onClick={() => setDrawerVisibleInvoice(false)}
            >
              Clear
            </Button>
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
              Bill Tye
            </Title>
            <Text strong>Juan Pace</Text>
            <br />
            <Text>Corridor: +126 510 1102</Text>
            <br />
            <Text>juan.pacer@corrpcie.com</Text>
          </div>

          <Divider />

          {/* Invoice Table */}
          <Table
            dataSource={[
              {
                key: "1",
                product: "Physiotherapy",
                type: "Service",
                length: "2h, 30min",
                qty: 1,
                unitPrice: "$200",
                total: "$210",
              },
              {
                key: "2",
                product: "Physiotherapy",
                type: "Weather",
                length: "Null",
                qty: 1,
                unitPrice: "$200",
                total: "$210",
              },
            ]}
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
                <Text>Total Amount :</Text>
              </Col>
              <Col>
                <Text>$420</Text>
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginBottom: 8 }}>
              <Col>
                <Text>VAT/TAX$</Text>
              </Col>
              <Col>
                <Text>$00</Text>
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginBottom: 8 }}>
              <Col>
                <Text>Paid Amount :</Text>
              </Col>
              <Col>
                <Text>$220</Text>
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginBottom: 16 }}>
              <Col>
                <Text strong>Due Amount :</Text>
              </Col>
              <Col>
                <Text strong>$200</Text>
              </Col>
            </Row>
          </div>

          <Divider />

          {/* Note Section */}
          <div style={{ marginBottom: 24 }}>
            <Title level={5}>Note:</Title>
            <Text>
              Tween hours older at amit, comorbator adjuncting all. More
              voluptate illness or will interfere, or adjust club malls. Often
              spent total scoliosis at time tangent per ovarian ocular, per
              hospital themselves. Cardiac trenops are at large condensation
              blocks.
            </Text>
            <br />
            <br />
            <Text>
              Tween hours older at amit, comorbator adjuncting menus urine at.
              Months.
            </Text>
          </div>

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
            <Button block icon={<PrinterOutlined />}>
              Print invoice
            </Button>
            <Button block icon={<MailOutlined />}>
              Send via email
            </Button>
          </Space>
        </div>
      </Drawer>
    </div>
  );
}
