/* eslint-disable @typescript-eslint/no-explicit-any */
// Updated BillingPayments component
"use client";

import { useState, useEffect } from "react";
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
  Form,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import visaCardIcon from "@/assets/icons/visacard.png";
import masterCardIcon from "@/assets/icons/mastercard.png";
import Image from "next/image";

// Import components

// Import types
import {
  Patient,
  Product,
  Voucher,
  Bond,
  Service,
  InvoiceItem,
  PaymentMethod,
} from "@/types/global";
import AddBondDrawer from "./AddBondDrawer";
import AddServiceDrawer from "./AddServiceDrawer";
import AddVoucherDrawer from "./AddVoucherDrawer";
import InvoiceDrawer from "./InvoiceDrawer";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function BillingPayments() {
  // State for UI controls
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [drawerVisibleVoucher, setDrawerVisibleVoucher] =
    useState<boolean>(false);
  const [drawerVisibleService, setDrawerVisibleService] =
    useState<boolean>(false);
  const [drawerVisibleInvoice, setDrawerVisibleInvoice] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);

  // State for data
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [bonds, setBonds] = useState<Bond[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [cartItems, setCartItems] = useState<InvoiceItem[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  // Form instances
  const [bondForm] = Form.useForm();
  const [serviceForm] = Form.useForm();
  const [voucherForm] = Form.useForm();

  // Tax and discount rates
  const [taxRate, setTaxRate] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(0);

  // Mock data initialization
  useEffect(() => {
    // Initialize mock data
    const mockPatients: Patient[] = [
      {
        id: "1",
        name: "Emily Carter",
        email: "emily@example.com",
        phone: "555-1234",
      },
      {
        id: "2",
        name: "John Smith",
        email: "john@example.com",
        phone: "555-5678",
      },
      {
        id: "3",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "555-9012",
      },
    ];

    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Email Consultation",
        type: "Service",
        price: 120,
        quantity: 1,
      },
      {
        id: "2",
        name: "Physical Therapy Session",
        type: "Service",
        price: 85,
        quantity: 1,
      },
    ];

    const mockVouchers: Voucher[] = [
      {
        id: "1",
        name: "Summer Discount",
        amount: 20,
        expireDate: "2023-12-31",
      },
      {
        id: "2",
        name: "New Patient Offer",
        amount: 15,
        expireDate: "2023-10-15",
      },
    ];

    const mockBonds: Bond[] = [
      {
        id: "1",
        name: "W2",
        discipline: "Physiotherapy",
        service: "Therapy",
        sessions: 5,
        price: 450,
      },
      {
        id: "2",
        name: "X5",
        discipline: "Cardiology",
        service: "Consultation",
        sessions: 3,
        price: 300,
      },
    ];

    const mockServices: Service[] = [
      { id: "1", name: "Surgery", discipline: "Operation", price: 1200 },
      { id: "2", name: "Therapy", discipline: "Physiotherapy", price: 85 },
    ];

    setPatients(mockPatients);
    setFilteredPatients(mockPatients);
    setProducts(mockProducts);
    setVouchers(mockVouchers);
    setBonds(mockBonds);
    setServices(mockServices);

    // Initialize cart with one product
    setCartItems([
      {
        id: "1",
        name: "Email Consultation",
        type: "Service",
        quantity: 1,
        price: 120,
        total: 120,
      },
    ]);
  }, []);

  // Calculate invoice totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.total ?? 0),
    0
  );
  const discountAmount = (subtotal * discountRate) / 100;
  const taxAmount = ((subtotal - discountAmount) * taxRate) / 100;
  const voucherDiscount = appliedVoucher ? appliedVoucher.amount : 0;
  const total = subtotal - discountAmount + taxAmount - voucherDiscount;
  const balanceDue = total - amountPaid;

  // Patient search handler
  const handlePatientSearch = (value: string) => {
    if (!value) {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(value.toLowerCase()) ||
          patient.email.toLowerCase().includes(value.toLowerCase()) ||
          patient.phone.includes(value)
      );
      setFilteredPatients(filtered);
    }
  };

  // Add to cart function
  const addToCart = (item: Product | Service | Bond, type: string) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // Update quantity if item already in cart
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: Number(cartItem?.quantity) + 1,
                total:
                  Number(cartItem?.price) * (Number(cartItem?.quantity) + 1),
              }
            : cartItem
        )
      );
    } else {
      // Add new item to cart
      setCartItems([
        ...cartItems,
        {
          id: item.id,
          name: item.name,
          type,
          quantity: 1,
          price: item.price,
          total: item.price,
        },
      ]);
    }

    message.success(`${item.name} added to cart`);
  };

  // Remove from cart function
  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    message.info("Item removed from cart");
  };

  // Update item quantity in cart
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              total: Number(item.price) * newQuantity,
            }
          : item
      )
    );
  };

  // Handle bond form submission
  const handleBondSubmit = (values: any) => {
    const newBond: Bond = {
      id: `bond-${Date.now()}`,
      name: values.bondName,
      discipline: values.discipline,
      service: values.service,
      sessions: values.session,
      price: values.price,
    };

    setBonds([...bonds, newBond]);
    addToCart(newBond, "Bond");

    bondForm.resetFields();
    setDrawerVisible(false);
    message.success("Bond added successfully!");
  };

  // Handle service form submission
  const handleServiceSubmit = (values: any) => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      name: values.service,
      discipline: values.discipline,
      price: values.serviceAmount,
    };

    setServices([...services, newService]);
    addToCart(newService, "Service");

    serviceForm.resetFields();
    setDrawerVisibleService(false);
    message.success("Service added successfully!");
  };

  // Handle voucher form submission
  const handleVoucherSubmit = (values: any) => {
    const newVoucher: Voucher = {
      id: `voucher-${Date.now()}`,
      name: values.voucherName,
      amount: values.voucherAmount,
      expireDate: values.expireDate.format("YYYY-MM-DD"),
    };

    setVouchers([...vouchers, newVoucher]);
    voucherForm.resetFields();
    setDrawerVisibleVoucher(false);
    message.success("Voucher created successfully!");
  };

  // Apply voucher to invoice
  const applyVoucher = (voucherId: string) => {
    const voucher = vouchers.find((v) => v.id === voucherId);
    if (voucher) {
      setAppliedVoucher(voucher);
      message.success(`Voucher "${voucher.name}" applied`);
    }
  };

  // Handle payment
  const handlePayment = () => {
    if (balanceDue > 0 && amountPaid < total) {
      message.warning(
        `Please pay the remaining balance of $${balanceDue.toFixed(2)}`
      );
      return;
    }

    if (!selectedPaymentMethod) {
      message.warning("Please select a payment method");
      return;
    }

    setConfirmPayment(true);
    message.success("Payment processed successfully!");

    // Reset form after successful payment
    setTimeout(() => {
      setCartItems([]);
      setSelectedPatient(null);
      setAppliedVoucher(null);
      setAmountPaid(0);
      setNote("");
      setTaxRate(0);
      setDiscountRate(0);
      setSelectedPaymentMethod(null);
      setConfirmPayment(false);
      setDrawerVisibleInvoice(false);
    }, 2000);
  };

  // Table columns for cart items
  const cartColumns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
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
      render: (quantity: number, record: InvoiceItem) => (
        <Space>
          <Button
            size="small"
            icon={<MinusOutlined />}
            onClick={() => updateQuantity(String(record.id), quantity - 1)}
          />
          <span style={{ width: 30, textAlign: "center" }}>{quantity}</span>
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={() => updateQuantity(String(record.id), quantity + 1)}
          />
        </Space>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `$${total.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: InvoiceItem) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => removeFromCart(String(record.id))}
        />
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
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
                  onChange={(e) => handlePatientSearch(e.target.value)}
                />
              </div>

              <Space wrap>
                {filteredPatients.map((patient) => (
                  <Button
                    key={patient.id}
                    size="middle"
                    type={
                      selectedPatient?.id === patient.id ? "primary" : "default"
                    }
                    onClick={() => setSelectedPatient(patient)}
                  >
                    {patient.name}
                  </Button>
                ))}
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
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  Product
                </Title>
                <Space wrap>
                  <Button
                    size="middle"
                    onClick={() => setDrawerVisibleVoucher(true)}
                  >
                    Add Voucher
                  </Button>
                  <Button size="middle" onClick={() => setDrawerVisible(true)}>
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
              className="overflow-x-auto"
              columns={cartColumns}
              dataSource={cartItems}
              pagination={false}
              size="middle"
              locale={{
                emptyText: "No items in cart. Add products or services.",
              }}
            />

            <div className="flex gap-4 mt-4 flex-wrap">
              {products.slice(0, 3).map((product) => (
                <Text
                  key={product.id}
                  onClick={() => addToCart(product, product.type)}
                  style={{
                    display: "block",
                    border: "1px solid #CCCCCC",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  {product.name} (${product.price})
                </Text>
              ))}
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
                value={taxRate.toString()}
                onChange={(value) => setTaxRate(Number(value))}
                style={{ width: "100%" }}
                size="middle"
              >
                <Option value="0">0%</Option>
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
                value={discountRate.toString()}
                onChange={(value) => setDiscountRate(Number(value))}
                style={{ width: "100%" }}
                size="middle"
              >
                <Option value="0">0%</Option>
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
                    border:
                      selectedPaymentMethod?.name === "MasterCard"
                        ? "2px solid #1890ff"
                        : "1px solid #CCCCCC",
                  }}
                  onClick={() =>
                    setSelectedPaymentMethod({
                      id: "1",
                      name: "MasterCard",
                      type: "card",
                      icon: masterCardIcon,
                    })
                  }
                >
                  <Image
                    src={masterCardIcon}
                    width={50}
                    height={50}
                    alt="mastercard"
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
                    border:
                      selectedPaymentMethod?.name === "Visa"
                        ? "2px solid #1890ff"
                        : "1px solid #CCCCCC",
                  }}
                  onClick={() =>
                    setSelectedPaymentMethod({
                      id: "2",
                      name: "Visa",
                      type: "card",
                      icon: visaCardIcon,
                    })
                  }
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
                onClick={() =>
                  setSelectedPaymentMethod({
                    id: "3",
                    name: "Cash",
                    type: "cash",
                  })
                }
                size="middle"
                style={{
                  width: 153,
                  height: 100,
                  border:
                    selectedPaymentMethod?.name === "Cash"
                      ? "2px solid #1890ff"
                      : "1px solid #d9d9d9",
                }}
                className="!font-bold"
              >
                Cash
              </Button>

              <Button
                onClick={() =>
                  setSelectedPaymentMethod({
                    id: "4",
                    name: "Voucher",
                    type: "voucher",
                  })
                }
                size="middle"
                style={{
                  width: 153,
                  height: 100,
                  border:
                    selectedPaymentMethod?.name === "Voucher"
                      ? "2px solid #1890ff"
                      : "1px solid #d9d9d9",
                }}
                className="!font-bold"
              >
                Voucher
              </Button>

              <Button
                onClick={() =>
                  setSelectedPaymentMethod({
                    id: "5",
                    name: "Bond",
                    type: "bond",
                  })
                }
                size="middle"
                style={{
                  width: 153,
                  height: 100,
                  border:
                    selectedPaymentMethod?.name === "Bond"
                      ? "2px solid #1890ff"
                      : "1px solid #d9d9d9",
                }}
                className="!font-bold"
              >
                Bond
              </Button>
            </Space>
          </Card>

          {/* Voucher Pay Section */}
          {selectedPaymentMethod?.type === "voucher" && (
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
                  onChange={applyVoucher}
                >
                  {vouchers.map((voucher) => (
                    <Option key={voucher.id} value={voucher.id}>
                      {voucher.name} (${voucher.amount})
                    </Option>
                  ))}
                </Select>

                {appliedVoucher && (
                  <Text>
                    Applied: {appliedVoucher.name} (${appliedVoucher.amount})
                  </Text>
                )}
              </Space>
            </Card>
          )}

          {/* Amount Paid Section */}
          <Card
            style={{ marginBottom: 24, borderRadius: 8, width: "100%" }}
            title={
              <Title level={4} style={{ margin: 0 }}>
                Amount Paid
              </Title>
            }
          >
            <Row gutter={[12, 12]} align="middle">
              <Col xs={24} sm={16}>
                <Input
                  placeholder="Amount"
                  size="middle"
                  type="number"
                  value={amountPaid || undefined}
                  onChange={(e) => setAmountPaid(Number(e.target.value))}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={() => setAmountPaid(total)}
                >
                  Add All Amount
                </Button>
              </Col>
            </Row>

            {amountPaid > 0 && (
              <Text style={{ display: "block", marginTop: 8 }}>
                Paid: ${amountPaid.toFixed(2)} | Due: $
                {(total - amountPaid).toFixed(2)}
              </Text>
            )}
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
            <TextArea
              placeholder="Write Note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Card>

          {/* Action Buttons */}
          <Space>
            <Button
              onClick={() => {
                if (cartItems.length === 0) {
                  message.warning("Please add at least one item to the cart");
                  return;
                }
                setDrawerVisibleInvoice(true);
              }}
              type="primary"
              size="large"
              icon={<PlusOutlined />}
            >
              Create Invoice
            </Button>
            <Button
              size="large"
              onClick={() => {
                setCartItems([]);
                setSelectedPatient(null);
                setAppliedVoucher(null);
                setAmountPaid(0);
                setNote("");
                setTaxRate(0);
                setDiscountRate(0);
                setSelectedPaymentMethod(null);
              }}
            >
              Cancel
            </Button>
          </Space>
        </Col>

        {/* Right Column - Invoice Summary */}
        <Col xs={24} lg={8}>
          <Card
            style={{ borderRadius: 8, position: "sticky", top: 24, marginTop: "12px", marginBottom: "20px" }}
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
                <Col>${subtotal.toFixed(2)}</Col>
              </Row>

              {discountRate > 0 && (
                <Row justify="space-between">
                  <Col>Discount ({discountRate}%)</Col>
                  <Col>:</Col>
                  <Col>-${discountAmount.toFixed(2)}</Col>
                </Row>
              )}

              {taxRate > 0 && (
                <Row justify="space-between">
                  <Col>Tax ({taxRate}%)</Col>
                  <Col>:</Col>
                  <Col>${taxAmount.toFixed(2)}</Col>
                </Row>
              )}

              {appliedVoucher && (
                <Row justify="space-between">
                  <Col>Voucher ({appliedVoucher.name})</Col>
                  <Col>:</Col>
                  <Col>-${voucherDiscount.toFixed(2)}</Col>
                </Row>
              )}

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

              {amountPaid > 0 && (
                <>
                  <Row justify="space-between">
                    <Col>Amount Paid</Col>
                    <Col>:</Col>
                    <Col>${amountPaid.toFixed(2)}</Col>
                  </Row>

                  <Divider style={{ margin: "8px 0" }} />

                  <Row justify="space-between">
                    <Col>
                      <Text
                        strong
                        style={{
                          fontSize: 16,
                          color: balanceDue > 0 ? "#F45B69" : "#0BABB7",
                        }}
                      >
                        {balanceDue > 0 ? "Balance Due" : "Change Due"}
                      </Text>
                    </Col>
                    <Col>:</Col>
                    <Col>
                      <Text
                        strong
                        style={{
                          fontSize: 16,
                          color: balanceDue > 0 ? "#F45B69" : "#0BABB7",
                        }}
                      >
                        ${Math.abs(balanceDue).toFixed(2)}
                      </Text>
                    </Col>
                  </Row>
                </>
              )}
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Drawer Components */}
      <AddBondDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSubmit={handleBondSubmit}
        form={bondForm}
      />

      <AddServiceDrawer
        visible={drawerVisibleService}
        onClose={() => setDrawerVisibleService(false)}
        onSubmit={handleServiceSubmit}
        form={serviceForm}
      />

      <AddVoucherDrawer
        visible={drawerVisibleVoucher}
        onClose={() => setDrawerVisibleVoucher(false)}
        onSubmit={handleVoucherSubmit}
        form={voucherForm}
      />

      <InvoiceDrawer
        visible={drawerVisibleInvoice}
        onClose={() => setDrawerVisibleInvoice(false)}
        cartItems={cartItems}
        selectedPatient={selectedPatient}
        subtotal={subtotal}
        discountRate={discountRate}
        discountAmount={discountAmount}
        taxRate={taxRate}
        taxAmount={taxAmount}
        appliedVoucher={appliedVoucher}
        voucherDiscount={voucherDiscount}
        total={total}
        amountPaid={amountPaid}
        balanceDue={balanceDue}
        note={note}
        onPayment={handlePayment}
        confirmPayment={confirmPayment}
      />
    </div>
  );
}
