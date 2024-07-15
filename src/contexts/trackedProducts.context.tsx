"use client";
import { TrackedProductsService } from "@/services/trackedProducts/trackedProducts.service";
import { TrackedProductType } from "@/types/trackedProducts.types";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useOrdersContext } from "./orders.context";

interface TrackedProductInOrder {
  id: string;
  supplier_id: string;
}

export type ProductInOrder = {
  id: string;
  product_id: string;
  supplier_id: string;
  product_name: string;
  ASIN: string;
  supplier_name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  units_sold: number;
};

export type TrackedProductsState = {
  trackedProducts: TrackedProductType[];
  supplierId: string;
  setSupplierId: (supplier_id: string) => void;
  trackedProductsAddedToOrder: any;
  setTrackedProductsAddedToOrder: (data: any) => void;
  addTrackedProductToOrder: (data: any) => any;
  removeTrackedProductFromOrder: (data: any) => void;
  updateTrackedProductInOrder: (data: any) => void;
  handleCreateOrder: (data: any, notes: string) => any;
  getTotalPrice: (data: any) => void;
};

export const TrackedProductContext = createContext<TrackedProductsState>({
  trackedProducts: [],
  supplierId: "",
  setSupplierId: () => {},
  setTrackedProductsAddedToOrder: () => {},
  trackedProductsAddedToOrder: [],
  addTrackedProductToOrder: () => {},
  removeTrackedProductFromOrder: () => {},
  updateTrackedProductInOrder: () => {},
  handleCreateOrder: (data: ProductInOrder[], notes: string) => {},
  getTotalPrice: (data: ProductInOrder[]) => {},
});

export const TrackedProductsProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [trackedProductsAddedToOrder, setTrackedProductsAddedToOrder] =
    useState<ProductInOrder[]>([]);

  const { fetchOrders } = useOrdersContext();

  console.log(trackedProductsAddedToOrder);

  useEffect(() => {
    getFilteredTrackedProducts(supplierId);
  }, [supplierId]);

  const getFilteredTrackedProducts = async (supplier_id: string = "") => {
    try {
      const response =
        await TrackedProductsService.getTrackedProducts(supplier_id);
      setTrackedProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTrackedProductInOrder = (updatedProduct: ProductInOrder) => {
    updatedProduct.total_amount =
      updatedProduct.quantity * updatedProduct.unit_price;
    setTrackedProductsAddedToOrder((prevState) =>
      prevState.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const getTotalPrice = (orderProducts: any) => {
    let totalPrice = 0;
    orderProducts.map((item: any, i: number) => {
      totalPrice += item.quantity * item.unit_price;
    });
    return totalPrice;
  };

  const handleCreateOrder = async (orderProducts: any, notes: string) => {
    const transformedProducts = orderProducts.map((product: any) => ({
      product_id: product.product_id,
      unit_price: product.unit_price,
      quantity: product.quantity,
    }));
    // Generar un ID de pedido unico con el timestamp de 6 dígitos
    const PO_ID = new Date().getTime().toString().slice(-6);

    const supplier_name = orderProducts[0].supplier_name;
    // Obtener las iniciales del suppliername
    const supplierInitials = supplier_name
      .split(" ")
      .map((word: string) => word.charAt(0))
      .join("")
      .toUpperCase();

    const orderPayload = {
      notes: notes,
      order_number: `${supplierInitials}#${PO_ID}`, // Puede ser dinámico o generado automáticamente
      // order_number: `PO#1-1-1719429064277`, // Para testear con un order_number que ya existe
      supplier_id: orderProducts[0].supplier_id, // Asumiendo que todos los productos tienen el mismo supplier_id
      products: transformedProducts,
    };

    try {
      const response = await fetch(
        "https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/purchaseorders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        fetchOrders();
      }

      const responseData = await response.json();
      // console.log("Order created successfully:", responseData);
      return responseData;

      // Aquí puedes manejar la respuesta, mostrar un mensaje de éxito, etc.
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
    }

    setTrackedProductsAddedToOrder([]);
  };

  const addTrackedProductToOrder = (data: any) => {
    if (data.supplier_id) {
      setSupplierId(data.supplier_id);
    } else {
      setSupplierId("");
    }

    const hasTheSameSupplierId = trackedProductsAddedToOrder.some(
      (item: any) => item.supplier_id === data.supplier_id
    );

    // Check that the products are from the same supplier
    if (trackedProductsAddedToOrder.length > 0) {
      const supplier_id = trackedProductsAddedToOrder[0]?.supplier_id;
      if (!hasTheSameSupplierId || supplier_id !== data.supplier_id) {
        // alert("Products must be from the same supplier");
        return "Products must be from the same supplier";
      }
    }

    // Check that the product is not already in the order
    if (trackedProductsAddedToOrder.some((item: any) => item.id === data.id)) {
      // alert("Product already added to order");
      return "Product already added to order";
    }

    // Check that the product has a supplier
    if (!data.supplier_id) {
      // alert("Please assign a supplier to the product before");
      return "Please assign a supplier to the product before";
    }

    // Transform data to the new object structure
    const newProductInOrder: ProductInOrder = {
      id: data.id,
      product_id: data.id,
      supplier_id: data.supplier_id,
      product_name: data.product_name,
      ASIN: data.ASIN,
      supplier_name: data.supplier_name,
      quantity: 0,
      unit_price: 0,
      total_amount: 0,
      units_sold: data.units_sold,
    };

    setTrackedProductsAddedToOrder((prevState) => [
      ...prevState,
      newProductInOrder,
    ]);

    return newProductInOrder;
  };

  const removeTrackedProductFromOrder = (data: any) => {
    setTrackedProductsAddedToOrder((prevState) =>
      prevState.filter((item: any) => item.id !== data.id)
    );
  };

  return (
    <TrackedProductContext.Provider
      value={{
        trackedProducts,
        supplierId,
        setSupplierId,
        trackedProductsAddedToOrder,
        setTrackedProductsAddedToOrder,
        addTrackedProductToOrder,
        removeTrackedProductFromOrder,
        updateTrackedProductInOrder,
        handleCreateOrder,
        getTotalPrice,
      }}
    >
      {children}
    </TrackedProductContext.Provider>
  );
};
export const useTrackedProductContext = () => useContext(TrackedProductContext);
