"use client";
import { FC, PropsWithChildren, useContext, useState, createContext, useEffect, ReactNode } from "react";

export type OrderProductType = {
  id: number;
  purchase_order_id: number;
  product_id: number;
  unit_price: number;
  total_amount: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderType = {
  id: number;
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
  downloadOrder: (id: number) => Promise<void>;
  fetchOrders: () => Promise<void>;
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

export const OrdersProvider: FC<OrdersProviderProps> = ({ children }: OrdersProviderProps) => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/purchaseorders");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOrders(data.data); // Assuming the orders are in the `data` property
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const acceptOrder = async (orderId: number) => {
    // try {
    //   const response = await fetch(`http://localhost:5000/api/v1/purchaseorders/${orderId}/accept`, {
    //     method: "PUT",
    //   });
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    //   const data = await response.json();
    //   setOrders(data.data); // Assuming the orders are in the `data` property
    // } catch (error: any) {
    //   setError(error);
    // } finally {
    //   setLoading(false);
    // }

    console.log("Order accepted:");

  };

  const rejectOrder = async (orderId: number) => {
    // try {
    //   const response = await fetch(`http://localhost:5000/api/v1/purchaseorders/${orderId}/decline`, {
    //     method: "PUT",
    //   });
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    //   const data = await response.json();
    //   setOrders(data.data); // Assuming the orders are in the `data` property
    // } catch (error: any) {
    //   setError(error);
    // } finally {
    //   setLoading(false);
    // }

    console.log("Order rejected:");
  };

  const downloadOrder = async (orderId: number) => {
    // try {
    //   const response = await fetch(`http://localhost:5000/api/v1/purchaseorders/${orderId}/download`, {
    //     method: "GET",
    //   });
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    //   const data = await response.blob();
    //   const url = window.URL.createObjectURL(new Blob([data]));
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", `order_${orderId}.pdf`);
    //   document.body.appendChild(link);
    //   link.click();
    // } catch (error: any) {
    //   setError(error);
    // } finally {
    //   setLoading(false);
    // }

    console.log("Order downloaded:");
  };

  return (
    <OrdersContext.Provider value={{ acceptOrder, rejectOrder, downloadOrder, orders, loading, error, fetchOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};
