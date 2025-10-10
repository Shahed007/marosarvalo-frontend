"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Modal } from "antd";
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
        <button
          onClick={handleAssignClick}
          className="min-w-[150px]  
             cursor-pointer  gap-2 bg-[#225A7F] flex items-center px-6 py-2 border border-[#225A7F] rounded-[4px] text-white disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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
        </button>
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
              <button
                onClick={() => handleDetailsClick(admin)}
                className="min-w-[150px]   
             cursor-pointer  px-6 py-2 border border-[#225A7F] rounded-[4px] text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Details
              </button>
              <button
                onClick={() => handleRemoveClick(admin)}
                className="min-w-[150px]  
             cursor-pointer  px-6 py-2 border border-[#225A7F] rounded-[4px] text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Assign Administrator Modal */}
      <Modal
        title={
          <div className="text-center md:text-[30px] text-2xl text-[#000000] font-semibold  ">
            Assign Administrator
          </div>
        }
        open={isAssignModalOpen}
        onCancel={handleCancelAssign}
        footer={null}
        width={1200}
        centered
        destroyOnClose
        className="rounded border border-[#225A7F]"
        bodyStyle={{ padding: 0 }}
        closeIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <rect width="28" height="28" rx="4" fill="#EB3C13" />
            <path
              d="M19.6875 8.3125L8.3125 19.6875M8.3125 8.3125L19.6875 19.6875"
              stroke="white"
              strokeWidth="2.625"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="px-6 py-8 space-y-6">
            <div className="overflow-hidden rounded bg-white shadow-sm">
              <div className="px-6 py-8">
                <h2 className="text-lg font-medium text-gray-900">
                  Administrator Information
                </h2>
              </div>

              <div className="px-6  space-y-4">
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
                    <p className="text-xs text-red-500">
                      {errors.name.message}
                    </p>
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
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
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
                    {...register("address", {
                      required: "Address is required",
                    })}
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

                       <div className="flex justify-center pt-4 pb-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[150px]   
             cursor-pointer  px-6 py-2 border border-[#225A7F] rounded-[4px] bg-[#225A7F] text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {isSubmitting ? "Assigning..." : "Assign"}
              </button>
            </div>
            </div>

            {/* Action Buttons */}
   
          </div>
        </form>
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
        closeIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <rect width="28" height="28" rx="4" fill="#EB3C13" />
            <path
              d="M19.6875 8.3125L8.3125 19.6875M8.3125 8.3125L19.6875 19.6875"
              stroke="white"
              strokeWidth="2.625"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        {selectedAdmin && (
          <div className="bg-white  p-6 md:p-8  flex flex-col md:flex-row items-start md:items-center justify-between">
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
                  <span className="text-sm font-medium text-gray-800">
                    Email
                  </span>
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
        closable={true} // 🔥 Fixed: Was false → now true to show close icon
        className="rounded-lg"
        closeIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <rect width="28" height="28" rx="4" fill="#EB3C13" />
            <path
              d="M19.6875 8.3125L8.3125 19.6875M8.3125 8.3125L19.6875 19.6875"
              stroke="white"
              strokeWidth="2.625"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        <div className="flex flex-col items-center text-center space-y-6 py-6">
          <p className="text-lg font-semibold text-gray-800">
            Do you want to remove?
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={cancelRemove}
              className=" text-[#333333] hover:bg-gray-50 text-base px-6   rounded-[8px] border-[1.321px] border-[var(--Cool-Gray,#DADADA)]"
            >
              No
            </button>
            <button
              onClick={confirmRemove}
              className=" text-white  text-base px-6 bg-[#225A7F]  rounded-[8px] border-[1.321px] border-[var(--Cool-Gray,#DADADA)]"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
