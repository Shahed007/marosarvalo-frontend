"use client";

import React from "react";
import { Button, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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

  // Generate pages with ellipsis
  const getPages = () => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = [1];
    if (currentPage > 4) pages.push(-1);

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
      <div className="flex items-center gap-2">
        <span className="text-gray-600 text-sm">Rows per page:</span>
        <Select
          value={pageSize}
          onChange={(value) => onPageChange(1, value)}
          options={pageSizeOptions.map((size) => ({
            value: size,
            label: `${size} / page`,
          }))}
          style={{ width: 120 }}
        />
      </div>

      {/* Center: Total Text */}
      <div className="text-gray-500 text-sm text-center">
        Showing {(currentPage - 1) * pageSize + 1} to{" "}
        {Math.min(currentPage * pageSize, total)} out of {total} records
      </div>

      {/* Right: Pagination Controls */}
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {/* Prev Button */}
        <Button
          icon={<LeftOutlined />}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {/* Page Numbers */}
        {pages.map((page, idx) =>
          page === -1 ? (
            <span key={idx} className="px-2 py-1 text-gray-400">
              ...
            </span>
          ) : (
            <Button
              key={page}
              type={page === currentPage ? "primary" : "default"}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          )
        )}

        {/* Next Button */}
        <Button
          icon={<RightOutlined />}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export default CustomPagination;
