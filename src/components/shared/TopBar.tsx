"use client";

import React from "react";
import Image from "next/image";
import user from "@/assets/user.png";
import { IoCheckmarkCircle } from "react-icons/io5";

interface TopBarProps {
  userName: string;
  userRole: string;
  notificationCount?: number;
}

const TopBar: React.FC<TopBarProps> = ({
  userName,
  userRole,
  notificationCount = 0,
}) => {
  return (
    <div className="flex items-center justify-end gap-4 mb-4 p-2  bg-white  top-0 z-20">
      {/* Notification Icon */}
      <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {notificationCount > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* User Info */}
      <div className="flex items-center gap-2">
        <Image src={user} width={32} height={32} alt="user" className="rounded-full" />
        <div className="hidden sm:flex flex-col text-start">
          <span className="text-sm font-medium flex items-center gap-1">
            {userName} <IoCheckmarkCircle className="text-[#225A7F]" />
          </span>
          <span className="text-xs text-gray-500">{userRole}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
