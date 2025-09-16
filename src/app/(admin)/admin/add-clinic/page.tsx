"use client";

import { Button } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Define form data type
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

export default function AddClinicPage() {
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

  // Watch password to validate confirm password
  const password = watch("password");

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    console.log("Form Data Submitted:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Clinic and user created successfully!");
  };

  // Handle reminder
  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000); // Hide after 3s
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      {/* Clinic Information Section */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">
            Clinic Information
          </h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          {/* Clinic Name */}
          <div className="space-y-2">
            <label
              htmlFor="clinicName"
              className="block text-sm font-medium text-gray-700"
            >
              Clinic Name <span className="text-red-500">*</span>
            </label>
            <input
              id="clinicName"
              type="text"
              placeholder="Enter clinic name"
              {...register("clinicName", {
                required: "Clinic Name is required",
              })}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.clinicName
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.clinicName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.clinicName.message}
              </p>
            )}
          </div>

          {/* Clinic Email */}
          <div className="space-y-2">
            <label
              htmlFor="clinicEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="clinicEmail"
              type="email"
              placeholder="Enter email"
              {...register("clinicEmail", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.clinicEmail
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.clinicEmail && (
              <p className="mt-1 text-xs text-red-500">
                {errors.clinicEmail.message}
              </p>
            )}
          </div>

          {/* Clinic Phone */}
          <div className="space-y-2">
            <label
              htmlFor="clinicPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="clinicPhone"
              type="tel"
              placeholder="Enter phone number"
              {...register("clinicPhone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[+]?[\d\s\-\(\)]{10,}$/,
                  message: "Enter a valid phone number",
                },
              })}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.clinicPhone
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.clinicPhone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.clinicPhone.message}
              </p>
            )}
          </div>

          {/* Clinic Address */}
          <div className="space-y-2">
            <label
              htmlFor="clinicAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Clinic Address <span className="text-red-500">*</span>
            </label>
            <input
              id="clinicAddress"
              type="text"
              placeholder="Enter clinic address"
              {...register("clinicAddress", {
                required: "Clinic Address is required",
              })}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.clinicAddress
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.clinicAddress && (
              <p className="mt-1 text-xs text-red-500">
                {errors.clinicAddress.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* User Information Section */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">
            User Information
          </h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          {/* User Name */}
          <div className="space-y-2">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              User Name <span className="text-red-500">*</span>
            </label>
            <input
              id="userName"
              type="text"
              placeholder="Enter user name"
              {...register("userName", { required: "User Name is required" })}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.userName
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.userName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* User Email */}
          <div className="space-y-2">
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium text-gray-700"
            >
              User Email <span className="text-red-500">*</span>
            </label>
            <input
              id="userEmail"
              type="email"
              placeholder="Enter user email"
              {...register("userEmail", {
                required: "User Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.userEmail
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.userEmail && (
              <p className="mt-1 text-xs text-red-500">
                {errors.userEmail.message}
              </p>
            )}
          </div>

          {/* User Phone */}
          <div className="space-y-2">
            <label
              htmlFor="userPhone"
              className="block text-sm font-medium text-gray-700"
            >
              User Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="userPhone"
              type="tel"
              placeholder="Enter user phone number"
              {...register("userPhone", {
                required: "User Phone is required",
                pattern: {
                  value: /^[+]?[\d\s\-\(\)]{10,}$/,
                  message: "Enter a valid phone number",
                },
              })}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.userPhone
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.userPhone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.userPhone.message}
              </p>
            )}
          </div>

          {/* User Address */}
          <div className="space-y-2">
            <label
              htmlFor="userAddress"
              className="block text-sm font-medium text-gray-700"
            >
              User Address <span className="text-red-500">*</span>
            </label>
            <input
              id="userAddress"
              type="text"
              placeholder="Enter user address"
              {...register("userAddress", {
                required: "User Address is required",
              })}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.userAddress
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.userAddress && (
              <p className="mt-1 text-xs text-red-500">
                {errors.userAddress.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Button
          size="large"
          type="primary"
          onClick={handleSendReminder}
          disabled={reminderSent}
          className="px-6 py-2 border cursor-pointer border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {reminderSent ? "Reminder Sent!" : "Send Reminder"}
        </Button>
        <Button
          size="large"
          type="primary"
          onClick={() => reset()}
          className="px-6 py-2 border border-gray-300 cursor-pointer rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Cancel
        </Button>
        <Button
          size="large"
          type="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="px-6 py-2 bg-[#225A7F] cursor-pointer text-white rounded-md hover:bg-[#225A7F] disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 inline-block animate-spin rounded-full border-2 border-t-transparent mr-2"></span>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}
