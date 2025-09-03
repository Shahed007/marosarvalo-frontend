"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Radio,
  Checkbox,
  Button,
  message,
  Tabs,
  // Row,
  // Col,
  // Space,
  Typography,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
// import type { FormProps } from "antd";
// import dayjs from "dayjs";
import Title from "antd/es/typography/Title";

import { Upload } from "antd";
import type { UploadProps } from "antd";
import { LiaUserPlusSolid } from "react-icons/lia";
import DocumentUploader from "@/components/documentUploader/DocumentUploader";
const { Dragger } = Upload;

const { TextArea } = Input;

// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// TypeScript interfaces
// interface PatientFormData {
//   firstName: string;
//   lastName: string;
//   address: string;
//   patientId: string;
//   dateOfBirth: dayjs.Dayjs;
//   gender: "male" | "female" | "others";
//   guardianName?: string;
//   relation?: string;
//   contactNumber: string;
//   emailAddress: string;
//   contactPreferences: string[];
//   patientNote?: string;
//   legalDocuments?: UploadFile[];
//   // Medical History fields
//   allergies?: string;
//   medications?: string;
//   // Attachments fields
//   mandatoryDocuments?: UploadFile[];
//   otherDocuments?: UploadFile[];
// }

// interface FormErrors {
//   [key: string]: string;
// }

const PatientRegistrationForm: React.FC = () => {
  // const [form] = Form.useForm<PatientFormData>();
  // const [, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("patient-info");
  // const [isMinor, setIsMinor] = useState(false);
  // const [, setMandatoryFileList] = useState<UploadFile[]>([]);
  // const [, setOtherFileList] = useState<UploadFile[]>([]);
  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  // Custom validation functions
  // const validateAge = (dateOfBirth: dayjs.Dayjs): boolean => {
  //   const age = dayjs().diff(dateOfBirth, "year");
  //   return age < 18;
  // };

  // const validateEmail = (email: string): boolean => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const validatePhone = (phone: string): boolean => {
  //   const phoneRegex = /^\+?[\d\s-()]+$/;
  //   return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  // };

  // Handle date of birth change to determine if patient is minor
  // const handleDateOfBirthChange = (date: dayjs.Dayjs | null) => {
  //   if (date) {
  //     const isUnder18 = validateAge(date);
  //     setIsMinor(isUnder18);

  //     // Clear guardian fields if patient becomes adult
  //     if (!isUnder18) {
  //       form.setFieldsValue({
  //         guardianName: undefined,
  //         relation: undefined,
  //       });
  //     }
  //   }
  // };

  // Handle file upload
  //   const handleUpload = {
  //     beforeUpload: (file: File) => {
  //       const isValidType =
  //         file.type === "application/pdf" ||
  //         file.type.startsWith("image/") ||
  //         file.type === "application/msword" ||
  //         file.type ===
  //           "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  //       if (!isValidType) {
  //         message.error("Please upload PDF, image, or Word documents only");
  //         return false;
  //       }

  //       const isLt10M = file.size / 1024 / 1024 < 10;
  //       if (!isLt10M) {
  //         message.error("File must be smaller than 10MB");
  //         return false;
  //       }

  //       return false; // Prevent auto upload
  //     },
  //     onChange: (info: any) => {
  //       setFileList(info.fileList);
  //     },
  //   };

  // Handle mandatory documents upload
  // const handleMandatoryUpload = {
  //   beforeUpload: (file: File) => {
  //     const isValidType =
  //       file.type === "application/pdf" ||
  //       file.type.startsWith("image/") ||
  //       file.type === "application/msword" ||
  //       file.type ===
  //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  //     if (!isValidType) {
  //       message.error("Please upload PDF, image, or Word documents only");
  //       return false;
  //     }

  //     const isLt10M = file.size / 1024 / 1024 < 10;
  //     if (!isLt10M) {
  //       message.error("File must be smaller than 10MB");
  //       return false;
  //     }

  //     return false;
  //   },
  //   onChange: (info: any) => {
  //     setMandatoryFileList(info.fileList);
  //   },
  // };

  // Handle other documents upload
  // const handleOtherUpload = {
  //   beforeUpload: (file: File) => {
  //     const isValidType =
  //       file.type === "application/pdf" ||
  //       file.type.startsWith("image/") ||
  //       file.type === "application/msword" ||
  //       file.type ===
  //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  //     if (!isValidType) {
  //       message.error("Please upload PDF, image, or Word documents only");
  //       return false;
  //     }

  //     const isLt10M = file.size / 1024 / 1024 < 10;
  //     if (!isLt10M) {
  //       message.error("File must be smaller than 10MB");
  //       return false;
  //     }

  //     return false;
  //   },
  //   onChange: (info: any) => {
  //     setOtherFileList(info.fileList);
  //   },
  // };

  // Form submission handler
  // const onFinish: FormProps<PatientFormData>["onFinish"] = async (values) => {
  //   try {
  //     setLoading(true);

  //     // Additional validation
  //     const errors: FormErrors = {};

  //     if (!validateEmail(values.emailAddress)) {
  //       errors.emailAddress = "Please enter a valid email address";
  //     }

  //     if (!validatePhone(values.contactNumber)) {
  //       errors.contactNumber =
  //         "Please enter a valid phone number (at least 10 digits)";
  //     }

  //     if (isMinor && (!values.guardianName || !values.relation)) {
  //       if (!values.guardianName)
  //         errors.guardianName =
  //           "Guardian name is required for patients under 18";
  //       if (!values.relation)
  //         errors.relation = "Relation is required for patients under 18";
  //     }

  //     if (Object.keys(errors).length > 0) {
  //       // Set form errors
  //       form.setFields(
  //         Object.entries(errors).map(([name, error]) => ({
  //           name: name as keyof PatientFormData,
  //           errors: [error],
  //         }))
  //       );
  //       setLoading(false);
  //       return;
  //     }

  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     // Success handling
  //     message.success("Patient registered successfully!");
  //     //   console.log("Form submitted:", {
  //     //     ...values,
  //     //     legalDocuments: fileList,
  //     //     isMinor,
  //     //   });

  //     // Reset form
  //     form.resetFields();
  //     //   setFileList([]);
  //     setIsMinor(false);
  //     setActiveTab("patient-info");
  //   } catch (error) {
  //     message.error("Registration failed. Please try again.");
  //     console.error("Submission error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const onFinishFailed: FormProps<PatientFormData>["onFinishFailed"] = (
  //   errorInfo
  // ) => {
  //   console.log("Failed:", errorInfo);
  //   message.error("Please check all required fields");
  // };

  const tabItems = [
    {
      key: "patient-info",
      label: "Patient Info",
      children: (
        <div>
          <Form layout="vertical" requiredMark={false} size="large">
            <div>
              <Title level={5}>Patients Name</Title>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Form.Item
                  name={"firstName"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  name={"lastName"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Form.Item
                name={"address"}
                label={
                  <Title
                    style={{
                      margin: 0,
                    }}
                    level={5}
                  >
                    Address
                  </Title>
                }
                required={true}
              >
                <Input placeholder="e.g Dhaka Bangladesh" />
              </Form.Item>
              <Form.Item
                name={"patientId"}
                label={
                  <Title
                    style={{
                      margin: 0,
                    }}
                    level={5}
                  >
                    Patient ID Document
                  </Title>
                }
                required={true}
              >
                <Input placeholder="1234556781" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Form.Item
                label={
                  <Title
                    style={{
                      margin: 0,
                    }}
                    level={5}
                  >
                    Date of Birth
                  </Title>
                }
                name={"Date of Birth"}
                required={true}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label={
                  <Title
                    style={{
                      margin: 0,
                    }}
                    level={5}
                  >
                    Gender
                  </Title>
                }
              >
                <Radio.Group
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Others", value: "others" },
                  ]}
                  defaultValue="male"
                />
              </Form.Item>
            </div>
            <div className="bg-[#F1F4F6] p-4 rounded-xl">
              <Title level={5}>If patient Under 18</Title>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid col-span-2 grid-cols-1 sm:grid-cols-2 gap-6 ">
                  <div>
                    <Form.Item name="fullName" required={false}>
                      <Input placeholder="Guardian Full Name" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="relations" required={false}>
                      <Input placeholder="Relations" />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-span-2">
                  <Form.Item>
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited
                        from uploading company data or other banned files.
                      </p>
                    </Dragger>
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Form.Item
                name={"contactNumber"}
                label={
                  <Title
                    style={{
                      margin: 0,
                    }}
                    level={5}
                  >
                    Contact Number
                  </Title>
                }
                required={true}
              >
                <Input placeholder="e.g +1154 211 5422" />
              </Form.Item>
              <Form.Item
                name={"email"}
                label={
                  <Title
                    style={{
                      margin: 0,
                    }}
                    level={5}
                  >
                    Email Address
                  </Title>
                }
                required={true}
              >
                <Input placeholder="e.g jhon32@gmial.com" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                required={true}
                name={"contactYou"}
                label={
                  <Title
                    style={{
                      margin: 0,
                    }}
                    level={5}
                  >
                    How would you like us to contact you?
                  </Title>
                }
              >
                <Checkbox.Group
                  options={[
                    { label: "Email", value: "email", className: "label-1" },
                    { label: "SMS", value: "sms", className: "label-2" },
                    {
                      label: "Whatsapp",
                      value: "whatsapp",
                      className: "label-3",
                    },
                  ]}
                  defaultValue={["email", "sms"]}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                required={false}
                name={"patientNote"}
                label={
                  <Title
                    style={{
                      margin: 0,
                    }}
                    level={5}
                  >
                    Patient Note
                  </Title>
                }
              >
                <Input placeholder="Patient Note" />
              </Form.Item>
            </div>
            <Form.Item label={null}>
              <Button
                style={{
                  minWidth: 220,
                }}
                type="primary"
                htmlType="submit"
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },

    {
      key: "medical-history",
      label: "Medical History",
      children: (
        <div className=" ">
          <Form requiredMark={false} layout="vertical">
            <Form.Item
              required={true}
              label={<Title level={5}>Medical Condition</Title>}
            >
              <TextArea
                rows={5}
                placeholder="List any exiting medical conditions"
              />
            </Form.Item>
            <Form.Item
              required={true}
              label={<Title level={5}>Allergies</Title>}
            >
              <TextArea rows={5} placeholder="List any allergies" />
            </Form.Item>
            <Form.Item
              required={true}
              label={<Title level={5}>Medications</Title>}
            >
              <TextArea rows={5} placeholder="Current Medications" />
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" icon={<LiaUserPlusSolid />}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: "attachments",
      label: "Attachments",
      children: (
        <div className="">
          <div>
            <Title level={5}>Mandatory Documents*</Title>
            <Typography>
              For a smooth clinic visit, please bring your valid photo ID (e.g.,
              passport or driver’s license), insurance card, any required
              referral letter, relevant medical records or test results, and
              payment method for any out-of-pocket costs. If applicable, bring
              prescription details and completed consent forms for specific
              procedures. Ensuring all documents are with you will help avoid
              any delays, but feel free to contact us if you have any questions.
            </Typography>
          </div>
          <div>
            <DocumentUploader />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl  bg-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">New Patients</h1>
        <div className="border-b border-gray-200">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            className="mb-6"
          />
        </div>
      </div>
      {/* {activeTab === "patient-info" && (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            contactPreferences: ["email"],
          }}
          className="space-y-4"
        >
          {tabItems[0].children}

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Space>
              <Button
                size="large"
                onClick={() => {
                  form.resetFields();
                  setFileList([]);
                  setIsMinor(false);
                }}
              >
                Reset
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-8"
              >
                Continue
              </Button>
            </Space>
          </div>
        </Form>
      )}
      */}
      {/* {activeTab !== "patient-info" &&
        tabItems.find((item) => item.key === activeTab)?.children}{" "} */}
    </div>
  );
};

export default PatientRegistrationForm;
