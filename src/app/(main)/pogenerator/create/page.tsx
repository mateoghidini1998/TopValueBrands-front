"use client";

import { DataTable } from "@/components/ui/data-table";
import PaginationComponentAPI from "@/components/ui/data-table-pagination-api";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
import { SortingState } from "@tanstack/react-table";
import IndexPageContainer from "../../page.container";
import { trackedProductsCol, POColumns } from "./columns";
import { OrderSummary } from "./order-summary";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  const {
    trackedProducts,
    currentPage,
    totalPages,
    trackedProductsAddedToOrder,
    handleNextPage,
    handlePreviousPage,
    setCurrentPage,
    getFilteredTrackedProducts,
    setOrderBy,
    setOrderWay,
    supplierId,
    keyword,
    loading,
  } = useTrackedProductContext();

  const paginationMethods = {
    handleNextPage,
    handlePreviousPage,
    currentPage,
    setCurrentPage,
    totalPages,
  };
  const handleSort = async (sorting: SortingState) => {
    console.log(sorting);
    setOrderBy(sorting[0].id);
    setOrderWay(sorting[0].desc ? "desc" : "asc");
    getFilteredTrackedProducts(
      supplierId,
      keyword,
      1,
      50,
      sorting[0].id,
      sorting[0].desc ? "desc" : "asc"
    );
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-20rem)] w-full flex items-center justify-center">
        <Loader2Icon className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <IndexPageContainer>
      <div className="w-full overflow-x-auto custom_scroll">
        <div className="w-max px-[1.3rem] py-0 flex space-x-4 p-4">
          <DataTable
            columns={trackedProductsCol}
            data={trackedProducts}
            dataLength={10}
            pagination={<PaginationComponentAPI {...paginationMethods} />}
            onSort={handleSort}
          />
        </div>
      </div>
      <div
        className={`${
          trackedProductsAddedToOrder.length > 0
            ? "w-full px-[1.3rem]"
            : "hidden"
        }`}
      >
        <DataTable
          columns={POColumns}
          data={trackedProductsAddedToOrder}
          dataLength={50}
        />

        <div className="py-5 w-full">
          <OrderSummary orderProducts={trackedProductsAddedToOrder} />
        </div>
      </div>
    </IndexPageContainer>
  );
}
