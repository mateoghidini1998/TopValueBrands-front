"use client";
import CancelButton from "@/components/svgs/CancelButton";
import ConfirmButton from "@/components/svgs/ConfirmButton";
import DownloadIcon from "@/components/svgs/DownloadIcon";
import { OrderType, useOrdersContext } from "@/contexts/orders.context";
import { useEffect, useState } from "react";
import IndexPageContainer from "../../page.container";
import { TableComponent } from "../components/TableComponent";
import { Column } from "../interfaces/ITableComponent";
import EditOrderModal from "../components/EditModalOrder";
import { EditButton } from "@/components/svgs/EditButton";

const columns: Column[] = [
  { key: "supplier_name", name: "Supplier Name", width: "100px" },
  { key: "order_number", name: "Order Number", width: "100px" },
  { key: "createdAt", name: "Date", width: "100px" },
  { key: "total_price", name: "Total", width: "100px" },
  { key: "notes", name: "Notes", width: "150px" },
  { key: "status", name: "Status", width: "150px" },
];

const mapOrdersData = (orders: OrderType[]) => {
  return orders?.map((order) => ({
    ...order,
    supplier_name: order.supplier_name || "Unknown", // Ajusta según sea necesario
  }));
};

export default function OrderPage() {
  const {
    orders,
    loading,
    error,
    rejectOrder,
    acceptOrder,
    downloadOrder,
    editOrder,
    openEditModal,
  } = useOrdersContext();

  const actionHandlers = {
    add: (data: any) => {
      // console.log(data);
      acceptOrder(data.id);
    },
    remove: (data: any) => {
      rejectOrder(data.id);
    },
    edit: (data: any) => {
      openEditModal(data);
    },
    download: (data: any) => {
      downloadOrder(data.id);
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <IndexPageContainer>
      <TableComponent
        columns={columns}
        data={orders || []}
        actions={[
          <div key={"actions"}>
            <EditButton key={"actions"} color="#fff" />
          </div>,
          <ConfirmButton key={"actions"} />,
          <div
            key={"actions"}
            className="flex items-center gap-2 justify-between bg-[#393E4F] py-1 px-2 rounded-lg"
          >
            Download PDF
            <DownloadIcon />
          </div>,
          <CancelButton key={"actions"} />,
        ]}
        actionHandlers={{
          edit: actionHandlers.edit,
          add: actionHandlers.add,
          download: actionHandlers.download,
          remove: actionHandlers.remove,
        }}
      />
      <EditOrderModal />
    </IndexPageContainer>
  );
}
