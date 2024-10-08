"use client";
import DotsSVG from "@/components/svgs/DotsSVG";
import { useOrdersContext } from "@/contexts/orders.context";
import useThemeContext from "@/contexts/theme.context";
import { useState } from "react";
import IndexPageContainer from "../../page.container";
import EditOrderModal from "../../pogenerator/components/EditModalOrder";
import { TableComponent } from "../../pogenerator/components/TableComponent";
import { Column } from "../../pogenerator/interfaces/ITableComponent";

const columns: Column[] = [
  { key: "supplier_name", name: "Supplier Name", width: "150px" },
  { key: "order_number", name: "Order Number", width: "100px" },
  { key: "createdAt", name: "Date", width: "150px" },
  { key: "total_price", name: "Total", width: "120px" },
  { key: "notes", name: "Notes", width: "150px" },
  { key: "status", name: "Status", width: "110px" },
  { key: "average_roi", name: "AVG ROI", width: "150px" },
];

export default function IncomingOrdersPage() {
  const {
    shippedOrders,
    loading,
    error,
    rejectOrder,
    acceptOrder,
    downloadOrder,
    restartOrder,
    editOrder,
    openEditModal,
    setEditOrderAction,
    editOrderAction,
    // getOrderById,
  } = useOrdersContext();

  const { theme } = useThemeContext();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Estado para controlar el ID del elemento seleccionado

  const actionHandlers = {
    add: (data: any) => {
      return new Promise<void>((resolve) => {
        console.log(data);
        acceptOrder(data.id);
        resolve();
      });
    },
    remove: (data: any) => {
      return new Promise<void>((resolve) => {
        rejectOrder(data.id);
        resolve();
      });
    },
    edit: (data: any) => {
      return new Promise<void>((resolve) => {
        openEditModal(data);
        resolve();
      });
    },
    download: (data: any) => {
      return new Promise<void>((resolve) => {
        downloadOrder(data.id);
        resolve();
      });
    },
    restart: (data: any) => {
      return new Promise<void>((resolve) => {
        restartOrder(data.id);
        resolve();
      });
    },
    none: (data: any) => {
      if (selectedOrderId === data) {
        // Si se hace clic en el mismo botón, cerrar
        setSelectedOrderId(null);
        setEditOrderAction(null);
      } else {
        // Si es un botón diferente, abrir y establecer como seleccionado
        setSelectedOrderId(data);
        setEditOrderAction(data);
      }
    },
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <IndexPageContainer>
      <TableComponent
        totalPages={Math.ceil(shippedOrders?.length / 50)}
        columns={columns}
        data={shippedOrders || []}
        tableHeigth="600px"
        actionsWidth="300px"
        actions={[
          <p key="edit">Edit</p>,
          <p key="remove">Delete</p>,
          <p key="download">Download</p>,
          <p key="restart">Reset</p>,
          <p key="none">None</p>,
        ]}
        actionHandlers={{
          edit: actionHandlers.edit,
          add: actionHandlers.add,
          restart: actionHandlers.restart,
          download: actionHandlers.download,
          remove: actionHandlers.remove,
          none: actionHandlers.none,
        }}
        actionElements={{
          edit: <></>,
          none: (
            <div className="relative">
              <button>
                <DotsSVG stroke={theme === "light" ? "#000" : "#FFF"} />
              </button>
            </div>
          ),

          add: <></>,
          remove: <></>,
          restart: <></>,
          download: <></>,
        }}
      />
      <EditOrderModal isDarkMode={theme === "light" ? false : true} />
    </IndexPageContainer>
  );
}
