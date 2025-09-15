export default function page() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 mb-8">
      <div className=" mx-auto bg-white rounded-lg ">
        {/* Header */}
        <div className=" px-6 py-4">
          <h1 className="text-4xl font-semibold text-gray-900">
            Settings-Personal Info
          </h1>
        </div>

        <div className="p-6 space-y-8">
          {/* Personal Info Section */}
          <div>
            <h2 className="text-lg font-medium text-[#225A7F] mb-6">
              Personal Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue="Dr. John Carter"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#225A7F] focus:border-transparent"
                />
              </div>

              {/* User Id Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Id
                </label>
                <input
                  type="text"
                  defaultValue="001234"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#225A7F] focus:border-transparent"
                />
              </div>

              {/* Profession Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  defaultValue="Physician"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#225A7F] focus:border-transparent"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="drjohn@abc.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#225A7F] focus:border-transparent"
                />
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  defaultValue="City, State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#225A7F] focus:border-transparent"
                />
              </div>

              {/* Contact Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact
                </label>
                <input
                  type="tel"
                  defaultValue="000 111 222 333"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#225A7F] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Password Change Section */}
          <div>
            <h2 className="text-lg font-medium text-[#225A7F] mb-6">
              Password change
            </h2>

            <div className="space-y-4 w-full">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  defaultValue="password123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#225A7F] focus:border-transparent"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#225A7F] focus:border-transparent"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#225A7F] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Update Button */}
          <div className="pt-4">
            <button className="bg-[#225A7F] hover:bg-[#225A7F] cursor-pointer text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#225A7F] focus:ring-offset-2">
              Update Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
