"use client";
import { PurchaseOrdersService } from "@/services/orders/orders.service";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

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
  updateOrderStatus: (orderId: number, status: string) => Promise<void>;
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
export const PURCHASE_ORDER_STATUSES = {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  //! No lo uso, pero lo dejo por si acaso
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
          order.status === "GOOD_TO_GO" ||
          order.status === "WAITING_FOR_SUPPLIER_APPROVAL"
        ) {
          if (!ordersToCreateList.some((o) => o.id === order.id)) {
            ordersToCreateList.push(order);
          }
        } else if (
          order.status === "CANCELLED" ||
          order.status === "IN_TRANSIT" ||
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

  const getOrderStatusId = async (status: string) => {
    let statusId;
    switch (status) {
      case "PENDING":
        statusId = 2;
        break;
      case "REJECTED":
        statusId = 1;
        break;
      case "WAITING_FOR_SUPPLIER_APPROVAL":
        statusId = 8;
        break;
      case "GOOD_TO_GO":
        statusId = 3;
        break;
      case "IN_TRANSIT":
        statusId = 5;
        break;
      case "ARRIVED":
        statusId = 6;
        break;
      case "CLOSED":
        statusId = 7;
        break;
      case "CANCELLED":
        statusId = 4;
        break;
      default:
        throw new Error("Invalid status");
    }
    return statusId;
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const statusId = await getOrderStatusId(status);

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

  const downloadOrder = async (orderId: number) => {
    try {
      await PurchaseOrdersService.downloadOrder(orderId);
      console.log("Order downloaded:", orderId);
    } catch (error: any) {
      setError(error);
    }
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

  //! No lo uso, pero lo dejo por si acaso
  const openEditModal = (order: OrderType) => {
    setOrderToEdit(order);
    setIsEditModalOpen(true);
  };

  //! No lo uso, pero lo dejo por si acaso
  const closeEditModal = () => {
    setOrderToEdit(null);
    setIsEditModalOpen(false);
  };

  return (
    <OrdersContext.Provider
      value={{
        updateOrderStatus,
        editOrder,
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
