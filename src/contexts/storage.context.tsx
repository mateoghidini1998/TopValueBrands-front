"use client";
import { StorageService } from "@/services/storage/storage.service";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AsyncFunction<T> {
  (): Promise<T>;
}

export type StorageState = {
  loading: boolean;
  pallets: PalletType[];
  setPallets: (pallets: PalletType[]) => void;
  getPallets: AsyncFunction<PalletType[]> | undefined;
};

export const StorageContext = createContext<StorageState>({
  loading: false,
  pallets: [],
  setPallets: (): any => {},
  getPallets: (): any => {},
});

export const StorageProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [pallets, setPallets] = useState<PalletType[]>([]);
  const [loading, setLoading] = useState(false);

  // Corrige la función getPallets para que retorne un arreglo de pallets
  const getPallets = async (): Promise<PalletType[]> => {
    try {
      setLoading(true);
      const response = await StorageService.getPallets();
      setPallets(response.pallets);

      // console.log(response);

      setLoading(false);
      return response.pallets; // Retorna el arreglo de pallets
    } catch (error) {
      console.error(error);
      return []; // En caso de error, retorna un arreglo vacío para mantener el tipo
    }
  };

  return (
    <StorageContext.Provider
      value={{
        loading,
        pallets,
        setPallets,
        getPallets,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
export const useStorageContext = () => useContext(StorageContext);
