"use client";

import { FC } from "react";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import { useProductContext } from "@/contexts/products.context";

const Table: FC = () => {
  const {
    products,
    handlePreviousPage,
    handleNextPage,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useProductContext();

  return (
    <>
      <table className="w-full bg-white dark:bg-dark">
        <thead className="inventory_table_header bg-white text-light fixed dark:bg-dark-3 dark:text-white">
          <tr className="py-6 stroke-1 stroke-dark-3 flex items-center h-[60px] bg-[#F8FAFC] w-full text-black dark:text-white dark:bg-dark-2">
            <th className="w-[25%] text-xs font-medium text-center">Product</th>
            <th className="w-[10%] text-xs font-medium text-center">ASIN</th>
            <th className="w-[10%] text-xs font-medium text-center">
              Amazon SKU
            </th>
            <th className="w-[5%] text-xs font-medium text-center">Cost</th>
            <th className="w-[10%] text-xs font-medium text-center">
              Supplier name
            </th>
            <th className="w-[15%] text-xs font-medium text-center">
              Supplier item No
            </th>
            <th className="w-[5%] text-xs font-medium text-center">
              Pack type
            </th>
            <th className="w-[5%] text-xs font-medium text-center">
              FBA Stock
            </th>
            <th className="w-[5%] text-xs font-medium text-center">
              Reserved quantity
            </th>
            <th className="w-[5%] text-xs font-medium text-center">
              Inbound to FBA
            </th>
          </tr>
        </thead>
        {/* Table Body */}
        <TableRow products={products} />
      </table>
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          setCurrentPage={setCurrentPage}
          handlePreviousPage={handlePreviousPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default Table;
