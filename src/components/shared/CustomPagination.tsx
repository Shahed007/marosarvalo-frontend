"use client";

import { Button } from "antd";

interface CustomPaginationProps {
  currentPage: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

const CustomPagination = ({
  currentPage,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange = () => {},
}: CustomPaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    onPageSizeChange(newSize);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap", 
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "12px 0",
        fontSize: "14px",
        color: "#64748B",
        gap: "12px", 
      }}
    >
      {/* Left: Rows per page */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 1,
        }}
      >
        <span>Rows per page:</span>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          style={{
            border: "1px solid #CBD5E1",
            borderRadius: "6px",
            padding: "4px 8px",
            fontSize: "14px",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>

      {/* Center: Record Info */}
      <div style={{ flexShrink: 1, minWidth: "120px", textAlign: "center" }}>
        Showing <strong>{total === 0 ? 0 : start}</strong> to{" "}
        <strong>{end}</strong> of <strong>{total}</strong> entries
      </div>

      {/* Right: Pagination Controls */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Button
          type="default"
          icon={<span>‹</span>}
          onClick={handlePrev}
          disabled={currentPage === 1}
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        />
        <Button
          type="primary"
          style={{
            minWidth: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
          }}
        >
          {currentPage}
        </Button>
        <Button
          type="default"
          icon={<span>›</span>}
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        />
      </div>
    </div>
  );
};

export default CustomPagination;
