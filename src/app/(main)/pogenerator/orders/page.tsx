"use client";
import { useOrdersContext } from "@/contexts/orders.context";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function OrderPage() {
  const { orders } = useOrdersContext();

  console.log(orders);

  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-10">
        <DataTable columns={columns} data={orders} />
      </div>
    </IndexPageContainer>
  );
}
