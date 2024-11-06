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
  pallets: PalletType[];
  setPallets: (pallets: PalletType[]) => void;
  getPallets: AsyncFunction<PalletType[]> | undefined;
};

export const StorageContext = createContext<StorageState>({
  pallets: [],
  setPallets: (): any => {},
  getPallets: (): any => {},
});

export const StorageProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [pallets, setPallets] = useState<PalletType[]>([]);

  useEffect(() => {
    getPallets();
  }, []);

  // console.log(pallets);

  // Corrige la función getPallets para que retorne un arreglo de pallets
  const getPallets = async (): Promise<PalletType[]> => {
    try {
      const response = await StorageService.getPallets();
      setPallets(response.pallets);

      // console.log(response);

      return response.pallets; // Retorna el arreglo de pallets
    } catch (error) {
      console.error(error);
      return []; // En caso de error, retorna un arreglo vacío para mantener el tipo
    }
  };

  return (
    <StorageContext.Provider
      value={{
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
