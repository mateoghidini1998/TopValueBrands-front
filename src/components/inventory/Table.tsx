"use client"

import { FC, useEffect, useState } from "react";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import { InventoryService } from "@/services/inventory/inventory";
import { useProductContext } from "@/contexts/products.context";

const Table:FC = () => {
    const { products, handlePreviousPage, handleNextPage, currentPage, totalPages } = useProductContext();
        
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
            <th className="w-[5%] text-xs font-medium text-center">FBA Stock</th>
            <th className="w-[5%] text-xs font-medium text-center">Reserved quantity</th>
            <th className="w-[5%] text-xs font-medium text-center">Inbound to FBA</th>
          </tr>
          <TableRow products={products}/>
        </table>
        <Pagination
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          totalPages={totalPages}
        />
    </>
    )
}

export default Table;