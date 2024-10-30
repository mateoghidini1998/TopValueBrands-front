"use client";
import { PurchaseOrdersService } from "@/services/orders/orders.service";
import { IPurchaseOrder, IPurchaseOrderSummary } from "@/types/product.types";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type OrdersContextType = {
  orders: IPurchaseOrder[];
  shippedOrders: IPurchaseOrder[];
  setShippedOrders: React.Dispatch<React.SetStateAction<IPurchaseOrder[]>>;
  loading: boolean;
  error: Error | null;
  updateOrderStatus: (orderId: number, status: string) => Promise<void>;
  editOrderNotes: (id: number, orderData: any) => Promise<void>;
  openEditModal: (order: IPurchaseOrder) => void;
  closeEditModal: () => void;
  downloadOrder: (id: number) => Promise<void>;
  fetchOrders: () => Promise<void>;
  isEditModalOpen: boolean;
  orderToEdit: IPurchaseOrder | null;
  editOrderAction: any;
  setEditOrderAction: (data: any) => void;
  getPurchaseOrderSummary: (orderId: number) => Promise<IPurchaseOrderSummary>;
  deleteOrder: (id: number) => Promise<boolean>;
  addQuantityReceived: (
    purchaseOrderProductId: number,
    quantityReceived: number
  ) => Promise<void>;
  updatePOProducts: (
    orderId: number,
    purchaseOrderProductsUpdates: PurchaseOrderProductUpdates[]
  ) => Promise<void>;
  addNotesToPOProduct: (
    purchaseOrderProductId: number,
    notes: string
  ) => Promise<void>;
  addReasonToPOProduct: (
    purchaseOrderProductId: number,
    reason_id: number
  ) => Promise<void>;
  addExpireDateToPOProduct: (
    purchaseOrderProductId: number,
    expire_date: string
  ) => Promise<void>;
  productsAvaliableToCreatePallet: any[];
  setProductsAvaliableToCreatePallet: React.Dispatch<
    React.SetStateAction<any[]>
  >;
  productsAddedToCreatePallet: any[];
  setProductsAddedToCreatePallet: React.Dispatch<React.SetStateAction<any[]>>;
  createPallet: (data: any) => Promise<any>;
};

export type PurchaseOrderProductUpdates = {
  purchaseOrderProductId: number;
  quantityPurchased: number;
  unit_price: number;
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
  const [ordersToCreate, setOrdersToCreate] = useState<IPurchaseOrder[]>([]);
  const [shippedOrders, setShippedOrders] = useState<IPurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [productsAvaliableToCreatePallet, setProductsAvaliableToCreatePallet] =
    useState<any[]>([]);

  const [productsAddedToCreatePallet, setProductsAddedToCreatePallet] =
    useState<any[]>([]);

  //! No lo uso, pero lo dejo por si acaso
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<IPurchaseOrder | null>(null);
  const [editOrderAction, setEditOrderAction] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);
  const deleteOrder = async (orderId: number): Promise<boolean> => {
    try {
      const response = await PurchaseOrdersService.deleteOrder(orderId);
      if (response) {
        // remove it from the state
        if (ordersToCreate.find((order) => order.id === orderId)) {
          setOrdersToCreate(
            ordersToCreate.filter((order) => order.id !== orderId)
          );
        } else if (shippedOrders.find((order) => order.id === orderId)) {
          setShippedOrders(
            shippedOrders.filter((order) => order.id !== orderId)
          );
        }
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const getPurchaseOrderSummary = (orderId: number) => {
    const orderSummary = PurchaseOrdersService.getPurchaseOrderSummary(orderId);
    return orderSummary;
  };

  const updatePOProducts = async (
    orderId: number,
    purchaseOrderProductsUpdates: PurchaseOrderProductUpdates[]
  ) => {
    try {
      const response = await PurchaseOrdersService.updatePOProducts(
        orderId,
        purchaseOrderProductsUpdates
      );

      if (response) {
        // fetchOrders();
      } else {
        throw new Error("Failed to update the purchase order products");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

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
      const ordersToCreateList: IPurchaseOrder[] = [];
      const shippedOrdersList: IPurchaseOrder[] = [];

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
    } catch (error: any) {
      console.error(error);
      setError(error);
    }
  };

  const downloadOrder = async (orderId: number) => {
    try {
      await PurchaseOrdersService.downloadOrder(orderId);
    } catch (error: any) {
      setError(error);
    }
  };
  const editOrderNotes = async (orderId: number, orderData: any) => {
    try {
      await PurchaseOrdersService.editOrder(orderId, orderData); // Implement this method in your service
      // fetchOrders();
      closeEditModal();
    } catch (error: any) {
      setError(error);
    }
  };

  const addQuantityReceived = async (
    purchaseOrderProductId: number,
    quantityReceived: number
  ) => {
    try {
      await PurchaseOrdersService.addQuantityReceived(
        purchaseOrderProductId,
        quantityReceived
      );

      // setShippedOrders((prevOrders) =>
      //   prevOrders.map((order) => {
      //     return {
      //       ...order,
      //       purchaseOrderProducts: order.purchaseOrderProducts.map(
      //         (poProduct) => {
      //           if (poProduct.id === purchaseOrderProductId) {
      //             const updatedQuantityMissing =
      //               poProduct.quantity_purchased - quantityReceived;
      //             return {
      //               ...poProduct,
      //               quantity_received: quantityReceived,
      //               quantity_missing: updatedQuantityMissing,
      //             };
      //           }
      //           return poProduct;
      //         }
      //       ),
      //     };
      //   })
      // );
    } catch (error: any) {
      setError(error);
    }
  };

  const addReasonToPOProduct = async (
    purchaseOrderProductId: number,
    reason_id: number
  ) => {
    try {
      await PurchaseOrdersService.addReasonToPOProduct(
        purchaseOrderProductId,
        reason_id
      );
      // fetchOrders();
    } catch (error: any) {
      setError(error);
    }
  };

  const addExpireDateToPOProduct = async (
    purchaseOrderProductId: number,
    expire_date: string
  ) => {
    try {
      await PurchaseOrdersService.addExpirteDateToPOProduct(
        purchaseOrderProductId,
        expire_date
      );

      // fetchOrders();
    } catch (error: any) {
      setError(error);
    }
  };

  const addNotesToPOProduct = async (
    purchaseOrderProductId: number,
    notes: string
  ) => {
    try {
      await PurchaseOrdersService.addNotesToPOProduct(
        purchaseOrderProductId,
        notes
      );
    } catch (error: any) {
      setError(error);
    }
  };

  // const createPallet = async (palletData: any) => {
  //   try {
  // if (!palletData.warehouse_location_id) {
  //   return toast.error("Warehouse location is required");
  // }

  //     await PurchaseOrdersService.createPallet(palletData);
  //     toast.success("Pallet created successfully");
  //     setProductsAddedToCreatePallet([]);
  //   } catch (error: any) {
  //     console.log(error);
  //     setError(error);
  //     return toast.error(error.message);
  //   }
  // };

  //! No lo uso, pero lo dejo por si acaso
  const createPallet = async (palletData: {
    pallet_number: string;
    warehouse_location_id: string;
    purchase_order_id: string;
    products: Array<{ purchaseorderproduct_id: string; quantity: number }>;
  }) => {
    try {
      if (!palletData.warehouse_location_id) {
        return toast.error("Warehouse location is required");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pallets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(palletData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.msg || "Unexpected error occurred";
        // throw new Error(errorMessage);
        return toast.error(errorMessage);
      }

      setProductsAddedToCreatePallet([]);
      const data = await response.json();

      toast.success("Pallet created successfully");
      return data;
    } catch (error: any) {
      return toast.error(error.message || "Unexpected error occurred");
      // throw new Error(error.message || "Unexpected error occurred");
    }
  };

  const openEditModal = (order: IPurchaseOrder) => {
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
        editOrderNotes,
        openEditModal,
        closeEditModal,
        downloadOrder,
        shippedOrders,
        orders: ordersToCreate,
        setShippedOrders,
        loading,
        error,
        fetchOrders,
        isEditModalOpen,
        orderToEdit,
        editOrderAction,
        setEditOrderAction,
        getPurchaseOrderSummary,
        deleteOrder,
        addQuantityReceived,
        updatePOProducts,
        addNotesToPOProduct,
        addReasonToPOProduct,
        addExpireDateToPOProduct,
        productsAvaliableToCreatePallet,
        setProductsAvaliableToCreatePallet,
        productsAddedToCreatePallet,
        setProductsAddedToCreatePallet,
        createPallet,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
