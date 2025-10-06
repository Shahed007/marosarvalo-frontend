"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "antd";

type FormData = {
  clinicName: string;
  clinicEmail: string;
  clinicPhone: string;
  clinicAddress: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  password: string;
  confirmPassword: string;
};

interface EditClinicModalProps {
  visible: boolean;
  onCancel: () => void;
  data?: Partial<FormData>;
}

export default function EditClinicModal({
  visible,
  onCancel,
  data,
}: EditClinicModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      clinicName: "",
      clinicEmail: "",
      clinicPhone: "",
      clinicAddress: "",
      userName: "",
      userEmail: "",
      userPhone: "",
      userAddress: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [reminderSent, setReminderSent] = useState(false);
  const password = watch("password");

  // ✅ Pre-fill or clear form when data changes
  useEffect(() => {
    if (data) reset(data);
    else reset();
  }, [data, reset]);

  const onSubmit = async (formData: FormData) => {
    console.log("Form Data Submitted:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Clinic and user updated successfully!");
    onCancel();
  };

  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000);
  };

  const handleCancel = () => {
    reset();
    setReminderSent(false);
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="text-center font-semibold text-[18px] text-slate-800">
          Edit Clinic
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={720}
      centered
      destroyOnClose
      className="rounded border border-[var(--Primary-Primary-1,#225A7F)]"
      bodyStyle={{ padding: 0 }}
    >
      {/* ✅ Scrollable Wrapper */}
      <div
        className="max-h-[75vh] overflow-y-auto scroll-smooth px-4 py-6 space-y-6"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#225A7F #E5E7EB",
        }}
      >
        {/* Clinic Information */}
        <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
          <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">
              Clinic Information
            </h2>
          </div>

          <div className="px-6 py-4 space-y-4">
            {/* Clinic Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Clinic Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("clinicName", {
                  required: "Clinic Name is required",
                })}
                placeholder="Enter clinic name"
                className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                  errors.clinicName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#225A7F]"
                }`}
              />
              {errors.clinicName && (
                <p className="text-xs text-red-500">
                  {errors.clinicName.message}
                </p>
              )}
            </div>

            {/* Clinic Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Clinic Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("clinicEmail", {
                  required: "Clinic Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="Enter email"
                className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                  errors.clinicEmail
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#225A7F]"
                }`}
              />
              {errors.clinicEmail && (
                <p className="text-xs text-red-500">
                  {errors.clinicEmail.message}
                </p>
              )}
            </div>

            {/* Clinic Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Clinic Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register("clinicPhone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[\d\s\-\(\)]{10,}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                placeholder="Enter phone number"
                className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                  errors.clinicPhone
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#225A7F]"
                }`}
              />
              {errors.clinicPhone && (
                <p className="text-xs text-red-500">
                  {errors.clinicPhone.message}
                </p>
              )}
            </div>

            {/* Clinic Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Clinic Address <span className="text-red-500">*</span>
              </label>
              <input
                {...register("clinicAddress", {
                  required: "Clinic Address is required",
                })}
                placeholder="Enter clinic address"
                className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                  errors.clinicAddress
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#225A7F]"
                }`}
              />
              {errors.clinicAddress && (
                <p className="text-xs text-red-500">
                  {errors.clinicAddress.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
          <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">
              User Information
            </h2>
          </div>

          <div className="px-6 py-4 space-y-4">
            {/* User Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                User Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("userName", {
                  required: "User Name is required",
                })}
                placeholder="Enter user name"
                className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                  errors.userName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#225A7F]"
                }`}
              />
              {errors.userName && (
                <p className="text-xs text-red-500">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* User Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                User Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("userEmail", {
                  required: "User Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="Enter user email"
                className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                  errors.userEmail
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#225A7F]"
                }`}
              />
              {errors.userEmail && (
                <p className="text-xs text-red-500">
                  {errors.userEmail.message}
                </p>
              )}
            </div>

            {/* User Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                User Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register("userPhone", {
                  required: "User Phone is required",
                  pattern: {
                    value: /^[+]?[\d\s\-\(\)]{10,}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                placeholder="Enter user phone"
                className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                  errors.userPhone
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#225A7F]"
                }`}
              />
              {errors.userPhone && (
                <p className="text-xs text-red-500">
                  {errors.userPhone.message}
                </p>
              )}
            </div>

            {/* User Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                User Address <span className="text-red-500">*</span>
              </label>
              <input
                {...register("userAddress", {
                  required: "User Address is required",
                })}
                placeholder="Enter user address"
                className={`w-full rounded border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[#225A7F] ${
                  errors.userAddress
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#225A7F]"
                }`}
              />
              {errors.userAddress && (
                <p className="text-xs text-red-500">
                  {errors.userAddress.message}
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
                placeholder="Re-enter password"
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

        {/* ✅ Fixed Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4 pb-2">
          <Button
            type="default"
            size="large"
            onClick={handleSendReminder}
            disabled={reminderSent}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {reminderSent ? "Reminder Sent!" : "Send Reminder"}
          </Button>
          <Button
            size="large"
            onClick={handleCancel}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="bg-[#225A7F] text-white hover:bg-[#1d4e6f]"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
