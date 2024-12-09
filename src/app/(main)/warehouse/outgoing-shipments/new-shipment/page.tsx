"use client";

import IndexPageContainer from "@/app/(main)/page.container";
import { DataTable } from "@/components/ui/data-table";
import { ShipmentsService } from "@/services/shipments/shipments.service";
import { useEffect, useState } from "react";
import { StorageProduct } from "./interfaces";
import { getShipmentsCols } from "./shipment-columns";
import { getStorageCols } from "./columns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function NewShipment() {
  const [storageProducts, setStorageProducts] = useState<StorageProduct[]>([]);
  const [shipmentProducts, setShipmentProducts] = useState<StorageProduct[]>(
    []
  );

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

  const addProductToShipment = async (
    product: StorageProduct,
    quantity: number
  ) => {
    if (product.available_quantity <= 0) {
      return toast.error("Product out of stock");
    }

    if (quantity > product.available_quantity) {
      return toast.error(`Available quantity: ${product.available_quantity}`);
    }
    setShipmentProducts((prev: any) => [...prev, { ...product, quantity }]);

    if (quantity === product.available_quantity) {
      setStorageProducts((prev: any) =>
        prev.filter((p: StorageProduct) => p.id !== product.id)
      );
    } else {
      setStorageProducts((prev: any) =>
        prev.map((p: StorageProduct) => {
          if (p.id === product.id) {
            return {
              ...p,
              available_quantity: p.available_quantity - quantity,
            };
          }
          return p;
        })
      );
    }

    return toast.success(
      `Successfully added ${quantity} ${product.product.product_name} to the shipment`
    );
  };

  const removeProductFromShipment = async (
    product: StorageProduct,
    quantity: number
  ) => {
    setShipmentProducts(
      (prev: any) =>
        prev
          .map((p: StorageProduct) => {
            if (p.id === product.id) {
              const newQuantity = p.quantity - quantity;
              return newQuantity > 0 ? { ...p, quantity: newQuantity } : null;
            }
            return p;
          })
          .filter((p: StorageProduct | null) => p !== null)
    );

    setStorageProducts((prev: any) => {
      const productExists = prev.some(
        (p: StorageProduct) => p.id === product.id
      );

      if (productExists) {
        return prev.map((p: StorageProduct) => {
          if (p.id === product.id) {
            return {
              ...p,
              available_quantity: p.available_quantity + quantity,
            };
          }
          return p;
        });
      } else {
        return [...prev, { ...product, available_quantity: quantity }];
      }
    });
  };

  const handleSaveShipment = async () => {
    try {
      // 1. Crear un número de envío aleatorio
      const shipmentNumber = `SHIPMENT_${Math.floor(Math.random() * 100000)}`;

      // 2. Preparar el arreglo de productos para el envío
      const palletProducts = shipmentProducts.map((product) => ({
        pallet_product_id: product.id,
        quantity: product.quantity,
      }));

      // 3. Construir el objeto del envío
      const shipment = {
        shipment_number: shipmentNumber,
        palletproducts: palletProducts,
      };
      console.log(shipment);

      if (shipment.palletproducts.length <= 0) {
        return toast.error(
          "You should add a product before saving a new shipment."
        );
      }

      // 4. Llamar a la API para crear el envío
      const response = await ShipmentsService.createShipment(shipment);

      // Mostrar el resultado en consola o manejar la respuesta de forma adecuada
      console.log("Shipment created successfully:", response);

      // Opcional: Reiniciar los estados
      setShipmentProducts([]);
      // Podrías también volver a cargar los productos del almacenamiento si es necesario.
      toast.success("Shipement created successfully");
    } catch (error) {
      toast.error("Error creating shipment");
      console.error("Error saving shipment:", error);
      // Mostrar un mensaje al usuario o manejar el error de forma adecuada
    }
  };

  return (
    <IndexPageContainer>
      <Button
        type="submit"
        variant={"outline"}
        className="self-start ml-6"
        onClick={handleSaveShipment}
      >
        Save Shipment
      </Button>
      <div className="w-full px-[1.3rem] py-0 flex items-start justify-between gap-8">
        <DataTable
          searchInput={"pallet_number"}
          columns={getStorageCols(addProductToShipment)}
          data={storageProducts}
        />
        <DataTable
          searchInput={"pallet_number"}
          columns={getShipmentsCols(removeProductFromShipment)}
          data={shipmentProducts}
        />
      </div>
    </IndexPageContainer>
  );
}
