import { Form, Input, Card, Typography, Row, Col } from "antd";

const { Title } = Typography;

const BasicInformation = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Card>
        {/* Basic Information Header */}
        <Title level={2} style={{ marginBottom: "24px" }}>
          Basic Information
        </Title>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            clinicName: "Doctor Q",
            phoneNumber: "+5544 44 44",
            email: "adf@gmail.com",
            address1: "Dhaka Bangladesh",
            address2: "Dhaka Bangladesh",
          }}
        >
          {/* Clinic Name + Phone Number */}
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="Clinic Name"
                name="clinicName"
                rules={[
                  { required: true, message: "Please input clinic name!" },
                ]}
              >
                <Input size="large" placeholder="Enter clinic name" disabled />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please input phone number!" },
                ]}
              >
                <Input size="large" placeholder="+1 234 567 8900" disabled />
              </Form.Item>
            </Col>
          </Row>

          {/* Email + Address 1 */}
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter email address"
                  disabled
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="Address 1"
                name="address1"
                rules={[{ required: true, message: "Please input address!" }]}
              >
                <Input
                  size="large"
                  placeholder="Enter address line 1"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Address 2 (full width) */}
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item label="Address 2" name="address2">
                <Input
                  size="large"
                  placeholder="Enter address line 2 (optional)"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default BasicInformation;
