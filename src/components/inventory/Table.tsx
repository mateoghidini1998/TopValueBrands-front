"use client"

import { FC, useState } from "react";
import UserMenu from "../layout/UserMenu";
import SearchInput from "./SearchInput";
import TableRow from "./TableRow";
import Pagination from "./Pagination";

const Table:FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };
    
    return(
        <>
        <table className="w-full mb-5">
          <tr className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[60px] w-full text-white bg-[#262935]">
            <th className="w-[25%] text-xs font-medium text-center">Product</th>
            <th className="w-[10%] text-xs font-medium text-center">ASIN</th>
            <th className="w-[10%] text-xs font-medium text-center">Amazon SKU</th>
            <th className="w-[5%] text-xs font-medium text-center">Cost</th>
            <th className="w-[10%] text-xs font-medium text-center">Supplier name</th>
            <th className="w-[10%] text-xs font-medium text-center">Supplier item No</th>
            <th className="w-[5%] text-xs font-medium text-center">Pack type</th>
            <th className="w-[10%] text-xs font-medium text-center">FBA Stock</th>
            <th className="w-[5%] text-xs font-medium text-center">Reserved quantity</th>
            <th className="w-[5%] text-xs font-medium text-center">Inbound to FBA</th>
          </tr>
          <TableRow currentPage={currentPage} limit={limit} />
        </table>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
    </>
    )
}

export default Table;