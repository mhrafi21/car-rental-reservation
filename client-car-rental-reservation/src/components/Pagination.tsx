import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const maxVisiblePages = 10;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages, currentPage + halfVisiblePages);

    if (currentPage <= halfVisiblePages) {
      endPage = Math.min(totalPages, maxVisiblePages);
    } else if (currentPage + halfVisiblePages >= totalPages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center my-4">
      <button
        className="px-3 py-2 mx-1 border border-gray-300 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {visiblePages.map((page, index) => (
        <button
          key={index}
          className={`px-3 py-2 mx-1 border border-gray-300 rounded-md hover:bg-gray-200 ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-2 mx-1 border border-gray-300 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
