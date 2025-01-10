"use client";
import { DataTable } from "@/components/ui/data-table";
import { useOrdersContext } from "@/contexts/orders.context";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { useEffect } from "react";
import { Loader2, Loader2Icon } from "lucide-react";

export default function OrderPage() {
  const { orders, fetchOrders, loading } = useOrdersContext();
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-20rem)] w-full flex items-center justify-center">
        <Loader2Icon className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-0">
        <DataTable columns={columns} data={orders} />
      </div>
    </IndexPageContainer>
  );
}
