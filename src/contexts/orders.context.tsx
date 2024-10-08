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
  shippedOrders: OrderType[];
  loading: boolean;
  error: Error | null;
  acceptOrder: (id: number) => Promise<void>;
  rejectOrder: (id: number) => Promise<void>;
  restartOrder: (id: number) => Promise<void>;
  cancelOrder: (id: number) => Promise<void>;
  inTransitOrder: (id: number) => Promise<void>;
  arrivedOrder: (id: number) => Promise<void>;
  closeOrder: (id: number) => Promise<void>;
  waitingForSupplierApprovalOrder: (id: number) => Promise<void>;
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

// Enumeración de estados de la orden de compra
const PURCHASE_ORDER_STATUSES = {
  REJECTED: 1,
  PENDING: 2,
  GOOD_TO_GO: 3,
  CANCELLED: 4,
  IN_TRANSIT: 5,
  ARRIVED: 6,
  CLOSED: 7,
  WAITING_FOR_SUPPLIER_APPROVAL: 8,
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
  const [ordersToCreate, setOrdersToCreate] = useState<OrderType[]>([]);
  const [shippedOrders, setShippedOrders] = useState<OrderType[]>([]);
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

      // Procesa las órdenes en lote, sin duplicados
      const ordersToCreateList: OrderType[] = [];
      const shippedOrdersList: OrderType[] = [];

      data.data.forEach((order: any) => {
        if (
          order.status === "REJECTED" ||
          order.status === "PENDING" ||
          order.status === "GOOD TO GO" ||
          order.status === "WAITING FOR SUPPLIER APPROVAL"
        ) {
          if (!ordersToCreateList.some((o) => o.id === order.id)) {
            ordersToCreateList.push(order);
          }
        } else if (
          order.status === "CANCELLED" ||
          order.status === "IN TRANSIT" ||
          order.status === "ARRIVED" ||
          order.status === "CLOSED"
        ) {
          if (!shippedOrdersList.some((o) => o.id === order.id)) {
            shippedOrdersList.push(order);
          }
        }
      });

      setOrdersToCreate(ordersToCreateList);
      setShippedOrders(shippedOrdersList);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (
    orderId: number,
    status: string,
    statusId: number
  ) => {
    try {
      await PurchaseOrdersService.updateOrderStatus(orderId, statusId);

      if ([1, 2, 3, 8].includes(statusId)) {
        // Si el estado es 1, 2, 3 o 6, mantenlo en ordersToCreate
        setOrdersToCreate((prevOrders) => {
          const updatedOrders = prevOrders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          );
          return updatedOrders;
        });

        // Eliminarlo de shippedOrders si existe ahí
        setShippedOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      } else {
        // Si el estado no es 1, 2, 3 o 6, moverlo a shippedOrders
        setShippedOrders((prevOrders) => {
          const updatedShippedOrders = prevOrders.filter(
            (order) => order.id !== orderId
          );
          const newOrder = ordersToCreate.find((order) => order.id === orderId);
          if (newOrder) {
            return [...updatedShippedOrders, { ...newOrder, status }];
          }
          return updatedShippedOrders;
        });

        // Eliminarlo de ordersToCreate
        setOrdersToCreate((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      }

      console.log(`Order ${status}:`, orderId);
    } catch (error: any) {
      console.error(error);
      setError(error);
    }
  };

  const acceptOrder = async (orderId: number) => {
    await updateOrderStatus(
      orderId,
      "GOOD TO GO",
      PURCHASE_ORDER_STATUSES.GOOD_TO_GO
    );
  };

  const cancelOrder = async (orderId: number) => {
    await updateOrderStatus(
      orderId,
      "CANCELLED",
      PURCHASE_ORDER_STATUSES.CANCELLED
    );
  };

  const inTransitOrder = async (orderId: number) => {
    await updateOrderStatus(
      orderId,
      "IN TRANSIT",
      PURCHASE_ORDER_STATUSES.IN_TRANSIT
    );
  };

  const arrivedOrder = async (orderId: number) => {
    await updateOrderStatus(
      orderId,
      "ARRIVED",
      PURCHASE_ORDER_STATUSES.ARRIVED
    );
  };

  const closeOrder = async (orderId: number) => {
    await updateOrderStatus(orderId, "CLOSED", PURCHASE_ORDER_STATUSES.CLOSED);
  };

  const waitingForSupplierApprovalOrder = async (orderId: number) => {
    await updateOrderStatus(
      orderId,
      "WAITING FOR SUPPLIER APPROVAL",
      PURCHASE_ORDER_STATUSES.WAITING_FOR_SUPPLIER_APPROVAL
    );
  };

  const rejectOrder = async (orderId: number) => {
    const order = ordersToCreate.find((order) => order.id === orderId);
    const orderStatus = order?.status;

    if (orderStatus === "REJECTED") {
      try {
        const res = await PurchaseOrdersService.deleteOrder(orderId);
        console.log("Order deleted:", orderId);
        setOrdersToCreate((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
        return res;
      } catch (error: any) {
        console.error(error);
        setError(error);
      }
    } else {
      await updateOrderStatus(
        orderId,
        "REJECTED",
        PURCHASE_ORDER_STATUSES.REJECTED
      );
    }
  };

  const restartOrder = async (orderId: number) => {
    await updateOrderStatus(
      orderId,
      "PENDING",
      PURCHASE_ORDER_STATUSES.PENDING
    );
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
        cancelOrder,
        inTransitOrder,
        arrivedOrder,
        closeOrder,
        waitingForSupplierApprovalOrder,
        openEditModal,
        closeEditModal,
        downloadOrder,
        shippedOrders,
        orders: ordersToCreate,
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
