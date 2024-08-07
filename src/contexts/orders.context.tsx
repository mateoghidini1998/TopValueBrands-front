"use client";
import { PurchaseOrdersService } from "@/services/orders/orders.service";
import {
  FC,
  PropsWithChildren,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";
import { useSupplierContext } from "./suppliers.context";

export type OrderProductType = {
  id: number;
  purchase_order_id: number;
  product_id: number;
  product_name: string;
  unit_price: number;
  total_amount: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderType = {
  id: number;
  notes: string;
  order_number: string;
  supplier_id: number;
  supplier_name?: string;
  status: string | null;
  total_price: number;
  createdAt: string;
  updatedAt: string;
  purchaseOrderProducts: OrderProductType[];
};

type OrdersContextType = {
  orders: OrderType[];
  loading: boolean;
  error: Error | null;
  acceptOrder: (id: number) => Promise<void>;
  rejectOrder: (id: number) => Promise<void>;
  editOrder: (id: number, orderData: any) => Promise<void>;
  openEditModal: (order: OrderType) => void;
  closeEditModal: () => void;
  downloadOrder: (id: number) => Promise<void>;
  fetchOrders: () => Promise<void>;
  isEditModalOpen: boolean;
  orderToEdit: OrderType | null;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const useOrdersContext = (): OrdersContextType => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrdersContext must be used within an OrdersProvider");
  }
  return context;
};

type OrdersProviderProps = PropsWithChildren;

export const OrdersProvider: FC<OrdersProviderProps> = ({
  children,
}: OrdersProviderProps) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const { suppliers } = useSupplierContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<OrderType | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/purchaseorders"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOrders(data.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const acceptOrder = async (orderId: number) => {
    try {
      await PurchaseOrdersService.approveOrderStatus(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Approved" } : order
        )
      );
      console.log("Order accepted:", orderId);
    } catch (error: any) {
      setError(error);
    }
  };

  const rejectOrder = async (orderId: number) => {
    const order = orders.find((order) => order.id === orderId);
    const orderStatus = order?.status;

    if (orderStatus === "Rejected") {
      try {
        const res = await PurchaseOrdersService.deleteOrder(orderId);
        console.log("Order deleted:", orderId);

        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );

        return res;
      } catch (error: any) {
        console.error(error);
        setError(error);
      }
    } else {
      try {
        const response = await PurchaseOrdersService.rejectOrderStatus(orderId);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: "Rejected" } : order
          )
        );
        console.log("Order rejected:", orderId);
        return response;
      } catch (error: any) {
        console.error(error);
        setError(error);
      }
    }
  };

  const downloadOrder = async (orderId: number) => {
    try {
      await PurchaseOrdersService.downloadOrder(orderId);
      console.log("Order downloaded:", orderId);
    } catch (error: any) {
      setError(error);
    }
  };

  const openEditModal = (order: OrderType) => {
    setOrderToEdit(order);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setOrderToEdit(null);
    setIsEditModalOpen(false);
  };

  const editOrder = async (orderId: number, orderData: any) => {
    try {
      await PurchaseOrdersService.editOrder(orderId, orderData); // Implement this method in your service
      fetchOrders();
      closeEditModal();
      console.log("Order updated:", orderId, orderData);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        editOrder,
        acceptOrder,
        rejectOrder,
        openEditModal,
        closeEditModal,
        downloadOrder,
        orders,
        loading,
        error,
        fetchOrders,
        isEditModalOpen,
        orderToEdit,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
