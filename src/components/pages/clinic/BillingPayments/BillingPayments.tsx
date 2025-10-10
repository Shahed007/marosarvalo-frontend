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
        name: "#Fa15421",
        amount: 20,
        expireDate: "2023-12-31",
      },
      {
        id: "2",
        name: "#Fa15421",
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
      <Title level={2} style={{ marginBottom: 30, color: "#0B121B" }}>
        Billing & Payments
      </Title>

      <Row gutter={24}>
        {/* Left Column */}
        <Col xs={24} lg={16}>
          {/* Invoice Section */}
          <Card
            style={{ marginBottom: 0, borderRadius: 8, border: "0" }}
            title={
              <Title
                level={4}
                style={{
                  margin: "0",
                  borderBottom: "4px solid #225A7F",
                  width: "98px",
                  marginBottom: "30px",
                }}
              >
                Invoice
              </Title>
            }
          >
            <Space direction="vertical" style={{ width: "100%" }} size={16}>
              <div>
                <Text
                  strong
                  style={{
                    display: "block",
                    marginBottom: 8,
                    fontSize: "20px",
                  }}
                >
                  Patient
                </Text>
                <Input
                  placeholder="Search Patients"
                  addonAfter={
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
                    className={`!text-[#9DA0A4] !mb-[30px] hover:!bg-primary hover:!text-white  ${
                      selectedPatient?.id === patient.id
                        ? "!bg-primary !text-white"
                        : "!text-[#9DA0A4]"
                    }`}
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
            style={{
              marginBottom: 30,
              borderRadius: 8,
              border: 0,
              marginTop: "12px",
            }}
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: "30px",
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  Product
                </Title>
                <Space wrap>
                  <Button
                    style={{
                      padding: "12px 32px",
                    }}
                    size="middle"
                    onClick={() => setDrawerVisibleVoucher(true)}
                  >
                    Add Voucher
                  </Button>
                  <Button
                    style={{
                      padding: "12px 32px",
                    }}
                    size="middle"
                    onClick={() => setDrawerVisible(true)}
                  >
                    Add Bonds
                  </Button>
                  <Button
                    style={{
                      padding: "12px 32px",
                    }}
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
                    color: "#9DA0A4",
                  }}
                >
                  {product.name} (${product.price})
                </Text>
              ))}
            </div>
          </Card>

          {/* Taxes Section */}
          <Card
            style={{ marginBottom: 24, borderRadius: 8, border: 0 }}
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
            style={{ marginBottom: 24, borderRadius: 8, border: 0 }}
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
            style={{ marginBottom: 24, borderRadius: 8, border: 0 }}
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
                        ? "2px solid #4180AB"
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
                        ? "2px solid #4180AB"
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
                      ? "2px solid #4180AB"
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
                      ? "2px solid #4180AB"
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
                      ? "2px solid #4180AB"
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
              style={{ marginBottom: 24, borderRadius: 8, border: 0 }}
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
                  <Button
                    key={appliedVoucher.id}
                    size="middle"
                    className="!text-[#9DA0A4] !mb-[30px]"
                    type={
                      selectedPatient?.id === appliedVoucher.id
                        ? "primary"
                        : "default"
                    }
                  >
                    {appliedVoucher.name} (${appliedVoucher.amount})
                  </Button>
                )}
              </Space>
            </Card>
          )}

          {/* Amount Paid Section */}
          <Card
            style={{
              marginBottom: 24,
              borderRadius: 8,
              width: "100%",
              border: 0,
            }}
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
            style={{ marginBottom: 24, borderRadius: 8, border: 0 }}
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
          <Space className="flex flex-row sm:flex-row justify-start items-start gap-3 sm:gap-4 w-full">
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
              className="w-full sm:w-[206px]"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.2143 16H3.40909C2.63755 16 1.89761 15.6778 1.35205 15.1042C0.806493 14.5306 0.5 13.7526 0.5 12.9414V1.53115C0.5 0.598716 1.37771 0.00709829 2.14987 0.288488C2.26069 0.328687 2.36791 0.387528 2.47153 0.465012L2.61699 0.574247C2.97078 0.838183 3.39403 0.979599 3.82783 0.978816C4.26164 0.978033 4.68442 0.835089 5.03735 0.569878C5.53276 0.19919 6.12571 0 6.73377 0C7.34182 0 7.93477 0.19919 8.43018 0.569878C8.78311 0.835089 9.20589 0.978033 9.6397 0.978816C10.0735 0.979599 10.4968 0.838183 10.8505 0.574247L10.996 0.465012C11.8214 -0.155444 12.9675 0.465012 12.9675 1.53115V8.13507H15.8766C16.042 8.13507 16.2005 8.20412 16.3174 8.32703C16.4343 8.44995 16.5 8.61665 16.5 8.79048V13.5968C16.5 14.2342 16.2592 14.8454 15.8305 15.2961C15.4019 15.7468 14.8205 16 14.2143 16ZM13.1753 9.44589V13.5968C13.1753 13.8865 13.2848 14.1644 13.4796 14.3692C13.6745 14.5741 13.9387 14.6892 14.2143 14.6892C14.4898 14.6892 14.7541 14.5741 14.9489 14.3692C15.1438 14.1644 15.2532 13.8865 15.2532 13.5968V9.44589H13.1753ZM9.64286 5.7319C9.64286 5.55807 9.57718 5.39136 9.46027 5.26845C9.34337 5.14554 9.18481 5.07648 9.01948 5.07648H4.03247C3.86714 5.07648 3.70858 5.14554 3.59167 5.26845C3.47477 5.39136 3.40909 5.55807 3.40909 5.7319C3.40909 5.90572 3.47477 6.07243 3.59167 6.19534C3.70858 6.31825 3.86714 6.38731 4.03247 6.38731H9.01948C9.18481 6.38731 9.34337 6.31825 9.46027 6.19534C9.57718 6.07243 9.64286 5.90572 9.64286 5.7319ZM8.81169 8.35354C8.81169 8.17971 8.74601 8.01301 8.62911 7.89009C8.5122 7.76718 8.35364 7.69813 8.18831 7.69813H4.03247C3.86714 7.69813 3.70858 7.76718 3.59167 7.89009C3.47477 8.01301 3.40909 8.17971 3.40909 8.35354C3.40909 8.52736 3.47477 8.69407 3.59167 8.81698C3.70858 8.9399 3.86714 9.00895 4.03247 9.00895H8.18831C8.35364 9.00895 8.5122 8.9399 8.62911 8.81698C8.74601 8.69407 8.81169 8.52736 8.81169 8.35354ZM9.01948 10.3198C9.18481 10.3198 9.34337 10.3888 9.46027 10.5117C9.57718 10.6347 9.64286 10.8014 9.64286 10.9752C9.64286 11.149 9.57718 11.3157 9.46027 11.4386C9.34337 11.5615 9.18481 11.6306 9.01948 11.6306H4.03247C3.86714 11.6306 3.70858 11.5615 3.59167 11.4386C3.47477 11.3157 3.40909 11.149 3.40909 10.9752C3.40909 10.8014 3.47477 10.6347 3.59167 10.5117C3.70858 10.3888 3.86714 10.3198 4.03247 10.3198H9.01948Z"
                    fill="white"
                  />
                </svg>
              }
            >
              Create Invoice
            </Button>

            <Button
              size="large"
              className="w-full sm:w-[206px]"
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
            style={{
              borderRadius: 8,
              position: "sticky",
              top: 24,
              marginTop: "12px",
              marginBottom: "20px",
              padding: "10px",
            }}
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

      <style jsx global>{`
        .ant-card .ant-card-head {
          border: 0 !important;
          padding: 0 !important;
        }

        .ant-card-body {
          padding: 0 !important;
        }
      `}</style>
    </div>
  );
}
