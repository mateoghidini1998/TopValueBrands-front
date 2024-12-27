"use client";

import { FC } from "react";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import { useProductContext } from "@/contexts/products.context";
import useThemeContext from "@/contexts/theme.context";
import NewTableRow from "./NewTableRow";
import { OrderByComponent } from "./OrderByStock";

const Table: FC = () => {
  const {
    products,
    handlePreviousPage,
    handleNextPage,
    currentPage,
    totalPages,
    setCurrentPage,
    addingProduct,
    orderBy,
  } = useProductContext();

  const { sidebarOpen } = useThemeContext();

  return (
    <>
      <table
        className={`${
          sidebarOpen ? "w-full" : "w-full"
        } bg-white dark:bg-dark transition-colors duration-[0.6s] ease-in-out`}
      >
        <thead className="inventory_table_header bg-white text-light fixed dark:bg-dark-3 dark:text-white">
          <tr className="m-0 w-full py-6 stroke-1 stroke-dark-3 flex items-center h-[60px] bg-[#F8FAFC] text-black dark:text-white dark:bg-dark-2 transition-colors duration-[0.6s] ease-in-out">
            <th className="w-[20%] text-xs font-medium text-center whitespace-nowrap">
              Product
            </th>
            <th className="w-[10%] text-xs font-medium text-center whitespace-nowrap">
              ASIN
            </th>
            <th className="w-[10%] text-xs font-medium text-center whitespace-nowrap">
              Amazon SKU
            </th>
            <th className="w-[3%] text-xs font-medium text-center whitespace-nowrap flex items-center gap-2">
              <OrderByComponent orderBy="product_cost" />
              Cost
            </th>
            <th className="w-[15%] text-xs font-medium text-center whitespace-nowrap">
              Supplier name
            </th>
            <th className="w-[10%] text-xs font-medium text-center whitespace-nowrap">
              Supplier item No
            </th>
            <th className="w-[10%] text-xs font-medium text-center whitespace-nowrap">
              Pack type
            </th>
            <th className="w-[12%] text-xs font-medium text-center whitespace-nowrap">
              Warehouse Stock
            </th>
            <th className="w-[8%] text-xs font-medium text-center whitespace-nowrap flex items-center gap-2">
              <OrderByComponent orderBy="FBA_available_inventory" />
              FBA Stock
            </th>
            <th className="w-[10%] text-xs font-medium text-center  flex items-center whitespace-nowrap gap-2">
              <OrderByComponent orderBy="reserved_quantity" />
              Reserved quantity
            </th>
            <th className="w-[10%] text-xs font-medium text-center whitespace-nowrap flex items-center gap-2">
              <OrderByComponent orderBy="Inbound_to_FBA" />
              Inbound to FBA
            </th>
            <th className="w-[10%] text-xs font-medium text-center whitespace-nowrap flex items-center gap-2">
              <OrderByComponent orderBy="updatedAt" />
              Last Update
            </th>
            <th className="w-[5%] text-xs font-medium text-center whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        {addingProduct && <NewTableRow />}
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
