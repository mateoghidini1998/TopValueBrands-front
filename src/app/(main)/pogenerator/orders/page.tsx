"use client";
import { useOrdersContext } from "@/contexts/orders.context";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function OrderPage() {
  const { orders } = useOrdersContext();
  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-0">
        <DataTable columns={columns} data={orders} />
      </div>
    </IndexPageContainer>
  );
}
