"use client"

import type React from "react"
import { useState } from "react"

export default function ClinicRegistrationForm() {
  const [formData, setFormData] = useState({
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
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission logic here
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Add Clinic</h1>
          </div>
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Clinic Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Clinic Information</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 mb-1">
                      Clinic Name*
                    </label>
                    <input
                      id="clinicName"
                      name="clinicName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.clinicName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="clinicEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <input
                      id="clinicEmail"
                      name="clinicEmail"
                      type="email"
                      placeholder="Enter your name"
                      value={formData.clinicEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="clinicPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone number*
                    </label>
                    <input
                      id="clinicPhone"
                      name="clinicPhone"
                      type="tel"
                      placeholder="+1"
                      value={formData.clinicPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="clinicAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Clinic Address*
                    </label>
                    <input
                      id="clinicAddress"
                      name="clinicAddress"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.clinicAddress}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* User Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">User Information</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                      User Name*
                    </label>
                    <input
                      id="userName"
                      name="userName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.userName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      User Email*
                    </label>
                    <input
                      id="userEmail"
                      name="userEmail"
                      type="email"
                      placeholder="Enter your name"
                      value={formData.userEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      User Phone number
                    </label>
                    <input
                      id="userPhone"
                      name="userPhone"
                      type="tel"
                      placeholder="+1"
                      value={formData.userPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      User Address*
                    </label>
                    <input
                      id="userAddress"
                      name="userAddress"
                      type="text"
                      placeholder="Enter your address"
                      value={formData.userAddress}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password*
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password*
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Enter your Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
