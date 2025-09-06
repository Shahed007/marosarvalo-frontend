/* eslint-disable @typescript-eslint/no-explicit-any */
// AdministratorSection.tsx
'use client';
import Image from "next/image";
import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";

export default function AdministratorSection() {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [form] = Form.useForm();

  const administrators = [
    {
      id: 1,
      name: "Henry Jr.",
      email: "zen.ahmed@gmail.com",
      avatar: "/images/avatar.png",
    },
    {
      id: 2,
      name: "Emily Carter",
      email: "emily.carter@example.com",
      avatar: "/images/avatar.png",
    },
  ];

  const handleAssignClick = () => {
    setIsAssignModalOpen(true);
  };

  const handleCancelAssign = () => {
    setIsAssignModalOpen(false);
    form.resetFields();
  };

  const handleAssign = () => {
    form.validateFields().then((values) => {
      console.log("Assigning administrator:", values);
      setIsAssignModalOpen(false);
      form.resetFields();
    });
  };

  // Handle Details Click
  const handleDetailsClick = (admin: any) => {
    setSelectedAdmin(admin);
    setIsProfileModalOpen(true);
  };

  // Close Profile Modal
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedAdmin(null);
  };

  // Handle Remove Click
  const handleRemoveClick = (admin: any) => {
    Modal.confirm({
      title: "Do you want to remove?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        console.log("Removed:", admin.name);
        alert(`Removed: ${admin.name}`);
        // You can also update state or call API here
      },
      onCancel: () => {
        console.log("Cancelled removal");
      },
      okButtonProps: {
        className: "bg-blue-600 hover:bg-blue-700 text-white",
      },
      cancelButtonProps: {
        className: "border-gray-300 text-gray-700 hover:bg-gray-50",
      },
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Administrator</h3>
        <button
          onClick={handleAssignClick}
          className="bg-[#225A7F] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
        >
          Assign Administrator
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {administrators.map((admin) => (
          <div key={admin.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Image
                src={admin.avatar}
                alt={`${admin.name} avatar`}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h4 className="font-medium text-gray-900">{admin.name}</h4>
                <p className="text-sm text-gray-500">{admin.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDetailsClick(admin)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Details
              </button>
              <button
                onClick={() => handleRemoveClick(admin)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Administrator Modal */}
      <Modal
        title="Assign Administrator"
        open={isAssignModalOpen}
        onCancel={handleCancelAssign}
        footer={[
          <Button
            key="assign"
            type="primary"
            onClick={handleAssign}
            className="w-full md:w-auto"
          >
            Assign
          </Button>,
        ]}
        width={600}
        centered
        closable
        destroyOnClose
      >
        <div className="p-6 space-y-5">
          <h4 className="text-base font-medium text-gray-800">Administrator Information</h4>

          <Form form={form} layout="vertical" initialValues={{}}>
            <Form.Item
              name="name"
              label="Name*"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="Enter your first name" className="border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email*"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Invalid email format' }
              ]}
            >
              <Input placeholder="Enter your email" className="border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone number"
            >
              <Input placeholder="Enter your phone number" className="border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address*"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input placeholder="Enter your address" className="border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter a password' }]}
            >
              <Input.Password placeholder="Enter your password" className="border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" className="border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg border border-gray-200 max-w-md w-full shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">User Profile</h3>
              <button
                onClick={closeProfileModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Avatar & Name */}
              <div className="flex items-center gap-4">
                <Image
                  src={selectedAdmin?.avatar || "/images/avatar.png"}
                  alt={selectedAdmin?.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedAdmin?.name}</h2>
                  <p className="text-sm text-gray-500">Administrator</p>
                </div>
              </div>

              {/* Introduction */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Introduction:</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Lorem ipsum as their for default model text, and a search for &rsquo;lorem ipsum&rsquo; will uncover many web for site.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="text-sm text-gray-700 font-medium">Contact</span>
                  </div>
                  <span className="text-sm text-gray-600">+84 0373467950</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="text-sm text-gray-700 font-medium">Email</span>
                  </div>
                  <span className="text-sm text-gray-600">{selectedAdmin?.email}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-sm text-gray-700 font-medium">Address</span>
                  </div>
                  <span className="text-sm text-gray-600">Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}