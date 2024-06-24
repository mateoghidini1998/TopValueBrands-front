"use client";
import { OrderType, useOrdersContext } from "@/contexts/orders.context";
import IndexPageContainer from "../../page.container";
import { OrderActions } from "../components/OrderActions";
import { TableComponent } from "../components/TableComponent";
import { Column } from "../interfaces/ITableComponent";
import DownloadIcon from "@/components/svgs/DownloadIcon";
import ConfirmButton from "@/components/svgs/ConfirmButton";
import CancelButton from "@/components/svgs/CancelButton";

const columns: Column[] = [
  { key: "supplier_name", name: "Supplier Name", width: "100px" },
  { key: "order_number", name: "Order Number", width: "100px" },
  { key: "createdAt", name: "Date", width: "100px" },
  { key: "total_price", name: "Total", width: "100px" },
];

const mapOrdersData = (orders: OrderType[]) => {
  return orders.map((order) => ({
    ...order,
    supplier_name: order.supplier_name || "Unknown", // Ajusta según sea necesario
  }));
};

export default function OrderPage() {
  const { orders, loading, error, rejectOrder, acceptOrder, downloadOrder } =
    useOrdersContext();

  const actionHandlers = {
    add: acceptOrder,
    remove: rejectOrder,
    edit: downloadOrder,
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const mappedOrders = mapOrdersData(orders);

  return (
    <IndexPageContainer>
      <TableComponent
        columns={columns}
        data={mappedOrders}
        actions={[
          <ConfirmButton key={"actions"} />,
          <CancelButton key={"actions"} />,
          <button
            key={"actions"}
            className="flex items-center gap-2 justify-between bg-[#393E4F] py-1 px-2 rounded-lg"
          >
            Download PDF
            <DownloadIcon />
          </button>,
        ]}
        actionHandlers={{
          remove: actionHandlers.remove,
          edit: actionHandlers.edit,
          add: actionHandlers.add,
        }}
        // actions={<OrderActions />}
      />
    </IndexPageContainer>
  );
}
