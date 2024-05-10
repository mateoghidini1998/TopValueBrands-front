"use client"

import { FC, useEffect, useState } from "react";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import { InventoryService } from "@/services/inventory/inventory";

const Table:FC = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        getProducts(currentPage, limit);
    }, [currentPage, limit]);


    const getProducts = async (page: number, limit: number) => {
      try {
          const response = await InventoryService.getProducts(page, limit);
          setProducts(response.data);
          setTotalPages(response.pages)
      } catch (error) {
          console.error(error);
      }
    };
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
            <th className="w-[5%] text-xs font-medium text-center">FBA Stock</th>
            <th className="w-[5%] text-xs font-medium text-center">Reserved quantity</th>
            <th className="w-[5%] text-xs font-medium text-center">Inbound to FBA</th>
          </tr>
          <TableRow products={products}/>
        </table>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          totalPages={totalPages}
        />
    </>
    )
}

export default Table;