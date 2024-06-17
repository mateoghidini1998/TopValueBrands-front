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
  const [supplierId, setSupplierId] = useState('');
  const [trackedProductsAddedToOrder, setTrackedProductsAddedToOrder] =
    useState([]);

  console.log(supplierId);

  useEffect(() => {
    getFilteredTrackedProducts(supplierId);
  }, [supplierId]);

  const getFilteredTrackedProducts = async (supplier_id:string = '') => {
    try {
      const response = await TrackedProductsService.getTrackedProducts(supplier_id);
      setTrackedProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTrackedProductToOrder = (data: any) => {
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
