'use client';
import { TrackedProductsService } from "@/services/trackedProducts/trackedProducts.service";
import { TrackedProductType } from "@/types/trackedProducts.types";
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export type TrackedProductsState = {
  trackedProducts: TrackedProductType[]
  getTrackedProducts: () => void
};

export const TrackedProductContext = createContext<TrackedProductsState>({
  trackedProducts: [],
  getTrackedProducts: () => {},
});

export const TrackedProductsProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {

  const [trackedProducts, setTrackedProducts] = useState([]);

  useEffect(() => {
    getTrackedProducts();
  }, []);

  const getTrackedProducts = async () => {
    try {
      const response = await TrackedProductsService.getTrackedProducts();
      setTrackedProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TrackedProductContext.Provider value={{ trackedProducts, getTrackedProducts }}>{children}</TrackedProductContext.Provider>
  );
};
export const useTrackedProductContext = () => useContext(TrackedProductContext);
