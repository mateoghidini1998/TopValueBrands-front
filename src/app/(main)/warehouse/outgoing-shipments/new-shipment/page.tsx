"use client";

import IndexPageContainer from "@/app/(main)/page.container";
import { DataTable } from "@/components/ui/data-table";
import { ShipmentsService } from "@/services/shipments/shipments.service";
import { useEffect, useState } from "react";
import { StorageProduct } from "./interfaces";
import { getShipmentsCols } from "./shipment-columns";
import { getStorageCols } from "./columns";
export default function NewShipment() {
  const [storageProducts, setStorageProducts] = useState<StorageProduct[]>([]);
  const [shipmentProducts, setShipmentProducts] = useState<StorageProduct[]>(
    []
  );

  console.log(shipmentProducts);

  useEffect(() => {
    const fetchStorageProducts = async () => {
      try {
        const response = await ShipmentsService.getStorageProducts();
        console.log(response);

        setStorageProducts(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStorageProducts();
  }, []);

  const addProductToShipment = async (product: StorageProduct) => {
    // add product to the shipmentProducts state.
    setShipmentProducts((prev: any) => [...prev, product]);

    // remove product from the storageProducts state.
    setStorageProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const removeProductFromShipment = async (product: StorageProduct) => {
    // remove product from the shipmentProducts state.
    setShipmentProducts((prev) => prev.filter((p) => p.id !== product.id));

    // add product to the storageProducts state.
    setStorageProducts((prev: any) => [...prev, product]);
  };

  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-0 flex items-start justify-between gap-8">
        <DataTable
          columns={getStorageCols(addProductToShipment)}
          data={storageProducts}
        />
        <DataTable
          columns={getShipmentsCols(removeProductFromShipment)}
          data={shipmentProducts}
        />
      </div>
    </IndexPageContainer>
  );
}
