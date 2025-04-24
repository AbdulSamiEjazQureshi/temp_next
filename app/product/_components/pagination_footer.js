"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function PaginationFooter({ currentPage, totalPages }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  function handleNext() {
    const params = new URLSearchParams(searchParams);
    params.set("page", currentPage + 1);
    replace(`${pathname}?${params.toString()}`);
  }
  function handlePrevious() {
    const params = new URLSearchParams(searchParams);
    if (currentPage === 2) {
      params.delete("page");
    } else {
      params.set("page", currentPage - 1);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const disablePrevious = Number(searchParams.get("page") || 1) === 1;
  const disableNext = Number(searchParams.get("page") || 1) === totalPages;

  return (
    <div className="flex items-center justify-center space-x-4">
      {!disablePrevious && (
        <button
          type="button"
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Previous
        </button>
      )}
      <span>
        Showing {currentPage} out of {totalPages} pages
      </span>
      {!disableNext && (
        <button
          type="button"
          onClick={handleNext}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      )}
    </div>
  );
}
