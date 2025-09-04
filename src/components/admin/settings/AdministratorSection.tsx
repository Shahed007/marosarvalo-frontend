import Image from "next/image"

export default function AdministratorSection() {
  const administrators = [
    {
      id: 1,
      name: "Henry Jr.",
      email: "zen.ahmed@gmail.com",
      avatar: "images/avatar.png",
    },
    {
      id: 2,
      name: "Henry Jr.",
      email: "zen.ahmed@gmail.com",
      avatar: "/images/avatar.png",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Administrator</h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
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
                src="/images/avatar.png"
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
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Remove
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
