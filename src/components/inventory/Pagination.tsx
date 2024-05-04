"use client"
import { FC } from "react";
import PrevPage from "../svgs/PrevPage";
import NextPage from "../svgs/NextPage";

type PaginationProps = {
    currentPage: number,
    setCurrentPage: (page: number) => void,
    handleNextPage: () => void,
    handlePreviousPage: () => void,
};


const Pagination: FC<PaginationProps> = ({ currentPage, setCurrentPage, handleNextPage, handlePreviousPage }) => {

    const disabled = currentPage === 1;

    return (
        <div className="flex items-center justify-center gap-2">
            <button className={`w-9 h-9 p-1.5 bg-[#262935] rounded-md ${disabled ? "text-[#393E4F] border-[#393E4F] border-[1px] border-solid" : ""}`} onClick={handlePreviousPage} disabled={disabled}><PrevPage/></button>
            <button className="flex items-center justify-center w-9 h-9 p-1.5 bg-[#262935] text-base rounded-md text-[#438EF3] font-medium border-[#438EF3] border-[1px] border-solid" onClick={handleNextPage}>{currentPage}</button>
            <button className="w-9 h-9 p-1.5 bg-[#262935] rounded-md" onClick={handleNextPage}><NextPage/></button>
        </div>
    );
};

export default Pagination;
