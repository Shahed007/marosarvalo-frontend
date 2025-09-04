import Image from "next/image";
import {
  FiPhone as PhoneIcon,
  FiMail as MailIcon,
  FiMapPin as MapPinIcon,
  FiEdit as EditIcon,
} from "react-icons/fi";

export default function UserProfile() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-12 shadow-sm relative items-center">
      {/* Edit Icon - Top Right */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
        aria-label="Edit profile"
      >
        <EditIcon className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-6">
        {/* Left Side: Avatar */}
        <div className="relative">
          <Image
            src="/images/avatar.png" // Replace with actual image path
            alt="Joohn Emily Carter"
            width={64}
            height={64}
            className="rounded-full object-cover border border-gray-200"
          />
        </div>

        {/* Middle & Right Side: Content */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 items-center">
          {/* Middle: Name + Introduction */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Joohn Emily Carter</h2>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Introduction:</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Lorem ipsum as their for default model text, and a search for &rsquo;lorem ipsum&rsquo; will uncover many web for site.
            </p>
          </div>

          {/* Right Side: Contact Info */}
          <div className="flex flex-col gap-3 w-64">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">Contact</span>
              </div>
              <span className="text-sm text-gray-600">+84 0373467950</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">Email</span>
              </div>
              <span className="text-sm text-gray-600">giangbanganh@gmail.com</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">Address</span>
              </div>
              <span className="text-sm text-gray-600">Dhaka Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}