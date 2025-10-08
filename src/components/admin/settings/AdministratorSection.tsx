"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Modal, Button } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
};

export default function AdministratorSection() {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
   const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const administrators = [
    {
      id: 1,
      name: "Henry Jr.",
      email: "zen.ahmed@gmail.com",
      phone: "+84 0373467950",
      address: "Dhaka, Bangladesh",
      avatar: "/images/avatar.png",
      intro:
        "Lorem Ipsum is placeholder text commonly used in design mockups and templates.",
    },
    {
      id: 2,
      name: "Emily Carter",
      email: "emily.carter@example.com",
      phone: "+1 202-555-0193",
      address: "London, UK",
      avatar: "/images/avatar.png",
      intro:
        "Passionate about healthcare UI/UX innovation and patient-centered design.",
    },
  ];

  const handleAssignClick = () => setIsAssignModalOpen(true);
  const handleCancelAssign = () => {
    setIsAssignModalOpen(false);
    reset();
  };

  const onSubmit = async (formData: FormData) => {
    console.log("Assigned:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Administrator assigned successfully!");
    handleCancelAssign();
  };

  const handleDetailsClick = (admin: any) => {
    setSelectedAdmin(admin);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedAdmin(null);
  };



   // ✅ Custom remove modal logic
  const handleRemoveClick = (admin: any) => {
    setSelectedAdmin(admin);
    setIsRemoveModalOpen(true);
  };

  const confirmRemove = () => {
    alert(`Removed: ${selectedAdmin?.name}`);
    setIsRemoveModalOpen(false);
    setSelectedAdmin(null);
  };

  const cancelRemove = () => {
    setIsRemoveModalOpen(false);
    setSelectedAdmin(null);
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
        <h3 className="text-lg font-semibold text-gray-900">Administrators</h3>
        <Button
          type="primary"
          size="large"
          onClick={handleAssignClick}
          className="bg-[#225A7F] text-white px-4 cursor-pointer py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors w-full md:w-auto justify-center md:justify-start"
        >
          Assign Administrator
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </Button>
      </div>

      {/* Admin Cards */}
      <div className="flex flex-col gap-4">
        {administrators.map((admin) => (
          <div
            key={admin.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg gap-4"
          >
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
                <p className="text-sm text-gray-500 break-all">{admin.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              <Button
                type="default"
                size="middle"
                onClick={() => handleDetailsClick(admin)}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Details
              </Button>
              <Button
                type="default"
                size="middle"
                onClick={() => handleRemoveClick(admin)}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Assign Administrator Modal */}
      <Modal
        title={
          <div className="text-center font-semibold text-[18px] text-slate-800">
            Assign Administrator
          </div>
        }
        open={isAssignModalOpen}
        onCancel={handleCancelAssign}
        footer={null}
        width={720}
        centered
        destroyOnClose
        className="rounded border border-[#225A7F]"
        bodyStyle={{ padding: 0 }}
      >
        <div
          className="max-h-[75vh] overflow-y-auto scroll-smooth px-6 py-8 space-y-6"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#225A7F #E5E7EB",
          }}
        >
          <div className="overflow-hidden rounded   bg-white shadow-sm">
            <div className="border-b border-gray-200  px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">
                Administrator Information
              </h2>
            </div>

            <div className="px-6 py-6 space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your first name"
                  className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#225A7F]"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  placeholder="Enter your email"
                  className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#225A7F]"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="+0"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#225A7F]"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("address", { required: "Address is required" })}
                  placeholder="Enter your address"
                  className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                    errors.address
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#225A7F]"
                  }`}
                />
                {errors.address && (
                  <p className="text-xs text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter password"
                  className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#225A7F]"
                  }`}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Enter your password again"
                  className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#225A7F]"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center pt-4 pb-2">
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-[#225A7F] text-white hover:bg-[#1d4e6f]"
            >
              {isSubmitting ? "Saving..." : "Assign"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* ✅ Profile Modal */}
      <Modal
        open={isProfileModalOpen}
        onCancel={closeProfileModal}
        footer={null}
        centered
        width={1200}
        title={null}
        className="rounded-xl"
      >
        {selectedAdmin && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between">
            {/* Left Section */}
            <div className="flex items-start gap-4 md:gap-6 w-full md:w-auto">
              <div className="flex-shrink-0">
                <Image
                  src={selectedAdmin.avatar}
                  alt={selectedAdmin.name}
                  width={70}
                  height={70}
                  className="rounded-full object-cover border border-gray-200"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedAdmin.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold text-gray-700">
                    Introduction:
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-sm">
                  {selectedAdmin.intro}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="mt-6 md:mt-0 flex flex-col gap-3 md:gap-4 w-full md:w-72">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-gray-800" />
                  <span className="text-sm font-medium text-gray-800">
                    Contact
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {selectedAdmin.phone}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4 text-gray-800" />
                  <span className="text-sm font-medium text-gray-800">Email</span>
                </div>
                <span className="text-sm text-gray-600 truncate">
                  {selectedAdmin.email}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-gray-800" />
                  <span className="text-sm font-medium text-gray-800">
                    Address
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {selectedAdmin.address}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>


         {/* ✅ Remove Confirmation Modal */}
      <Modal
        open={isRemoveModalOpen}
        onCancel={cancelRemove}
        footer={null}
        centered
        width={360}
        closable={false}
        className="rounded-lg"
      >
        <div className="flex flex-col items-center text-center space-y-6 py-6">
          <p className="text-lg font-semibold text-gray-800">
            Do you want to remove?
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={cancelRemove}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6"
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={confirmRemove}
              className="bg-[#225A7F] text-white hover:bg-[#1d4e6f] px-6"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
