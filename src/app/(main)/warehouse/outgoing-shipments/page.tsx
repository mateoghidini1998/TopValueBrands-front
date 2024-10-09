"use client";
import { useOrdersContext } from "@/contexts/orders.context";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function OutgoingShipments() {
  const { shippedOrders } = useOrdersContext();

  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-10">
        <DataTable columns={columns} data={shippedOrders} />
      </div>
    </IndexPageContainer>
  );
}
