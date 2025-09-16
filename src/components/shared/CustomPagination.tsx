"use client";

import React from "react";
import { Select } from "antd";

interface CustomPaginationProps {
  currentPage: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number, pageSize?: number) => void;
  pageSizeOptions?: number[];
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  total,
  pageSize,
  onPageChange,
  pageSizeOptions = [5, 10, 20, 50],
}) => {
  const totalPages = Math.ceil(total / pageSize);

  // Generate pages with ellipsis if too many pages
  const getPages = () => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = [1];
    if (currentPage > 4) pages.push(-1); // -1 as ellipsis

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 3) pages.push(-1);

    pages.push(totalPages);
    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 p-4 bg-white rounded-lg">
      {/* Left: Page Size Selector */}
      <div className="flex items-center gap-2 order-1 sm:order-1">
        <span className="text-gray-600 text-sm">Rows per page:</span>
        <Select
          value={pageSize}
          onChange={(value) => onPageChange(1, value)}
          options={pageSizeOptions.map((size) => ({
            value: size,
            label: `${size} / page`,
          }))}
        />
      </div>

      {/* Center: Total Text */}
      <div className="text-gray-500 text-sm text-center order-2 sm:order-2">
        Showing {(currentPage - 1) * pageSize + 1} to{" "}
        {Math.min(currentPage * pageSize, total)} out of {total} records
      </div>

      {/* Right: Page Numbers with Prev/Next icons */}
      <div className="flex items-center gap-1 order-3 sm:order-3 flex-wrap justify-center">
        {/* Prev Button */}
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 disabled:text-gray-400"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        {pages.map((page, idx) =>
          page === -1 ? (
            <span key={idx} className="px-2 py-1 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-[#225a7f] text-white"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 disabled:text-gray-400"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
