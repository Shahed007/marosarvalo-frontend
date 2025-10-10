"use client";

import Image from "next/image";
import {
  FiPhone as PhoneIcon,
  FiMail as MailIcon,
  FiMapPin as MapPinIcon,
} from "react-icons/fi";

export default function UserProfile() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between relative">
      {/* Left Section */}
      <div className="flex items-start gap-4 md:gap-6 w-full md:w-auto">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <Image
            src="/images/avatar.png"
            alt="Joohn Emily Carter"
            width={70}
            height={70}
            className="rounded-full object-cover border border-gray-200"
          />
        </div>

        {/* Name and Introduction */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Joohn Emily Carter
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-semibold text-gray-700">Introduction:</span>
          </p>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-sm">
            Lorem Ipsum as their for default model text, and a search for &lsquo;lorem
            ipsum&lsquo; will uncover many web for site.
          </p>
        </div>
      </div>

      {/* Right Section - Contact Info */}
      <div className="mt-6 md:mt-0 flex flex-col gap-3 md:gap-4 w-full md:w-72">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-gray-800" />
            <span className="text-sm font-medium text-gray-800">Contact</span>
          </div>
          <span className="text-sm text-gray-600">+84 0373467950</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MailIcon className="w-4 h-4 text-gray-800" />
            <span className="text-sm font-medium text-gray-800">Email</span>
          </div>
          <span className="text-sm text-gray-600 truncate">
            giangbanganh@gmail.com
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-gray-800" />
            <span className="text-sm font-medium text-gray-800">Address</span>
          </div>
          <span className="text-sm text-gray-600">Dhaka, Bangladesh</span>
        </div>
      </div>

      {/* Edit Icon */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
        aria-label="Edit profile"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="20"
          viewBox="0 0 17 20"
          fill="none"
        >
          <path
            d="M9.31548 3.1074L13.2369 7.44086M1.32422 19.2283H15.9249M1.639 14.7796L2.07737 11.4048C2.10096 11.1844 2.19308 10.9799 2.33791 10.8264L10.9321 1.30426C11.0425 1.17944 11.1802 1.08836 11.3318 1.03985C11.4834 0.991337 11.6437 0.987043 11.7972 1.02738C12.5902 1.26063 13.3111 1.72784 13.8833 2.37925C14.4751 3.01189 14.9005 3.81091 15.114 4.69082C15.1469 4.86114 15.1412 5.03785 15.0975 5.20515C15.0537 5.37245 14.9732 5.52513 14.8632 5.64954L6.26996 15.1717C6.1218 15.3234 5.93706 15.424 5.73822 15.4614L2.68203 15.9462C2.53967 15.9675 2.39479 15.9519 2.25879 15.9006C2.1228 15.8494 1.99939 15.7638 1.89829 15.6508C1.79718 15.5377 1.72115 15.4001 1.67615 15.249C1.63116 15.0978 1.61844 14.9371 1.639 14.7796Z"
            stroke="#11111B"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
