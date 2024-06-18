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

export type TrackedProductsState = {
  trackedProducts: TrackedProductType[];
  setSupplierId: (supplier_id: string) => void;
  trackedProductsAddedToOrder: any;
  addTrackedProductToOrder: (data: any) => void;
  removeTrackedProductFromOrder: (data: any) => void;
};

export const TrackedProductContext = createContext<TrackedProductsState>({
  trackedProducts: [],
  setSupplierId: () => {},
  trackedProductsAddedToOrder: [],
  addTrackedProductToOrder: () => {},
  removeTrackedProductFromOrder: () => {},
});

export const TrackedProductsProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [trackedProductsAddedToOrder, setTrackedProductsAddedToOrder] =
    useState([]);

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

  const addTrackedProductToOrder = (data: any) => {
    const hasTheSameSupplierId = trackedProductsAddedToOrder.some(
      (item: any) => item.supplier_id === data.supplier_id
    )

    // Check that the products are from the same supplier
    if (trackedProductsAddedToOrder.length > 0) {    
      const supplier_id = trackedProductsAddedToOrder[0]?.supplier_id;
      if (!hasTheSameSupplierId || supplier_id !== data.supplier_id) {
        alert("Products must be from the same supplier");
        return;
      }
      
    }

    // Check that the product is not already in the order
    if (trackedProductsAddedToOrder.some((item: any) => item.id === data.id)) {
      alert("Product already added to order");
      return;
    }
    // Check that the product has a supplier
    if (!data.supplier_id) {
      alert("Please assign a supplier to the product before");
      return;
    }
    

    setTrackedProductsAddedToOrder((prevState) => [...prevState, data]);
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
        setSupplierId,
        trackedProductsAddedToOrder,
        addTrackedProductToOrder,
        removeTrackedProductFromOrder,
      }}
    >
      {children}
    </TrackedProductContext.Provider>
  );
};
export const useTrackedProductContext = () => useContext(TrackedProductContext);
