"use client";
import { FC } from "react";
import PrevPage from "../svgs/PrevPage";
import NextPage from "../svgs/NextPage";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
};

const PaginationComponentAPI: FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
}) => {
  const disabledPrev = currentPage === 1;
  const disabledNext = currentPage === totalPages;
  const maxPageNumberLimit = 5;
  const minPageNumberLimit = 1;

  let startPage, endPage;
  if (totalPages <= maxPageNumberLimit) {
    startPage = 1;
    endPage = totalPages;
  } else {
    startPage = Math.max(
      currentPage - Math.floor(maxPageNumberLimit / 2),
      minPageNumberLimit
    );
    endPage = Math.min(startPage + maxPageNumberLimit - 1, totalPages);
    if (endPage - startPage + 1 < maxPageNumberLimit) {
      startPage = Math.max(
        endPage - maxPageNumberLimit + 1,
        minPageNumberLimit
      );
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const pageButtons = pageNumbers.map((page) => (
    <button
      key={page}
      className={`w-9 h-9 p-1.5 dark:bg-[#262935] text-base rounded-md  ${
        currentPage === page
          ? "text-[#438EF3] font-medium border-[#438EF3] border-[1px] border-solid bg-[#438ff36c]"
          : "text-[#858EAD] dark:text-white border-[#858EAD] border-[1px] border-solid dark:border-0"
      }`}
      onClick={() => setCurrentPage(page)}
    >
      {page}
    </button>
  ));

  return (
    <div className="flex items-center justify-center gap-2 py-10">
      <button
        className={`text-[#393E4F] border-[#858EAD] dark:border-0 border-[1px] border-solid flex items-center justify-center w-9 h-9 p-1.5 dark:bg-[#262935] rounded-md ${
          disabledPrev &&
          "dark:text-[#393E4F] border-[#D4D4D8] dark:border-[1px] dark:border-[#393E4F] border-[1px] border-solid"
        }`}
        onClick={handlePreviousPage}
        disabled={disabledPrev}
      >
        <PrevPage disabled={disabledPrev} />
      </button>
      {pageButtons}
      <button
        className={`text-[#393E4F] dark:border-0 border-[#858EAD] border-[1px] border-solid flex items-center justify-center w-9 h-9 p-1.5 dark:bg-[#262935] rounded-md ${
          disabledNext &&
          "text-[#393E4F] border-[#D4D4D8] dark:border-[1px] dark:border-[#393E4F] border-[1px] border-solid"
        }`}
        onClick={handleNextPage}
        disabled={disabledNext}
      >
        <NextPage disabled={disabledNext} />
      </button>
    </div>
  );
};

export default PaginationComponentAPI;
