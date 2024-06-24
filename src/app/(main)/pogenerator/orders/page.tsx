"use client";
import { OrderType, useOrdersContext } from "@/contexts/orders.context";
import IndexPageContainer from "../../page.container";
import { OrderActions } from "../components/OrderActions";
import { TableComponent } from "../components/TableComponent";
import { Column } from "../interfaces/ITableComponent";

const columns: Column[] = [
  { key: "supplier_name", name: "Supplier Name", width: '100px' },
  { key: "order_number", name: "Order Number", width: '100px' },
  { key: "createdAt", name: "Date", width: '100px' },
  { key: "total_price", name: "Total", width: '100px' },
];

const mapOrdersData = (orders: OrderType[]) => {
  return orders.map(order => ({
    ...order,
    supplier_name: order.supplier_name || "Unknown" // Ajusta según sea necesario
  }));
};

export default function OrderPage() {
  const { orders, loading, error } = useOrdersContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const mappedOrders = mapOrdersData(orders);

  return (
    <IndexPageContainer>
      <TableComponent columns={columns} data={mappedOrders} actions={<OrderActions />} />
    </IndexPageContainer>
  );
}
