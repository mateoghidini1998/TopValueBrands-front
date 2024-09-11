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
  total_amount_by_product: number;
  unit_price: number;
  total_amount: number;
  quantity_purchased: number;
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
  restartOrder: (id: number) => Promise<void>;
  editOrder: (id: number, orderData: any) => Promise<void>;
  openEditModal: (order: OrderType) => void;
  closeEditModal: () => void;
  downloadOrder: (id: number) => Promise<void>;
  fetchOrders: () => Promise<void>;
  isEditModalOpen: boolean;
  orderToEdit: OrderType | null;
  editOrderAction: any;
  setEditOrderAction: (data: any) => void;
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

  const [editOrderAction, setEditOrderAction] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders`
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
          order.id === orderId ? { ...order, status: "GOOD TO GO" } : order
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

    if (orderStatus === "REJECTED") {
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
            order.id === orderId ? { ...order, status: "REJECTED" } : order
          )
        );
        console.log("Order REJECTED:", orderId);
        return response;
      } catch (error: any) {
        console.error(error);
        setError(error);
      }
    }
  };

  const restartOrder = async (orderId: number) => {
    try {
      await PurchaseOrdersService.restartOrderStatus(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "PENDING" } : order
        )
      );
      console.log("Order restarted:", orderId);
    } catch (error: any) {
      setError(error);
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
        restartOrder,
        openEditModal,
        closeEditModal,
        downloadOrder,
        orders,
        loading,
        error,
        fetchOrders,
        isEditModalOpen,
        orderToEdit,
        editOrderAction,
        setEditOrderAction,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
