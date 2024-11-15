"use client";
import { DataTable } from "@/components/ui/data-table";
import { useOrdersContext } from "@/contexts/orders.context";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { useEffect } from "react";

export default function OrderPage() {
  const { orders, fetchOrders } = useOrdersContext();
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-0">
        <DataTable columns={columns} data={orders} />
      </div>
    </IndexPageContainer>
  );
}
