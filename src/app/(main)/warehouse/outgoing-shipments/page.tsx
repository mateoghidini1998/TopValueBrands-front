"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ShipmentsService } from "@/services/shipments/shipments.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { NestedDataTable } from "./new-shipment/components/nested-data-table";
import { Product, PurchaseOrderData } from "./new-shipment/interfaces";
import { getShipmentsCols } from "./new-shipment/shipment-columns";

export default function OutgoingShipments() {
  const [shipments, setShipments] = useState([]);
  const [isCreatingShipment, setIsCreatingShipment] = useState(false);
  const [shipmentProducts, setShipmentProducts] = useState<Product[]>([]);

  const [poPalletProducts, setPoPalletProducts] = useState<PurchaseOrderData[]>(
    []
  );

  useEffect(() => {
    const fetchShipments = async () => {
      const response = await ShipmentsService.getShipments();
      setShipments(response.shipments);
    };
    fetchShipments();
  }, []);

  useEffect(() => {
    if (isCreatingShipment) {
      const fetchPoPalletProducts = async () => {
        try {
          // Obtener los purchase orders con pallets
          const purchaseOrdersWithPallets =
            await ShipmentsService.getPurchaseOrdersWithPallets();

          if (
            !purchaseOrdersWithPallets ||
            purchaseOrdersWithPallets.length === 0
          ) {
            console.warn("No purchase orders with pallets found.");
            return;
          }

          // Crear un array para almacenar las respuestas
          const allPoPalletProducts: PurchaseOrderData[] = [];

          // Iterar sobre los purchase orders y obtener los pallets
          for (const element of purchaseOrdersWithPallets) {
            try {
              const response = await ShipmentsService.getPalletsByPurchaseOrder(
                element.id
              );
              allPoPalletProducts.push(response);
            } catch (error) {
              console.error(
                `Error fetching pallets for purchase order ID: ${element.id}`,
                error
              );
            }
          }

          console.log(allPoPalletProducts);

          // Actualizar el estado con los datos obtenidos
          setPoPalletProducts(allPoPalletProducts);
        } catch (error) {
          console.error("Error fetching purchase orders with pallets:", error);
        }
      };

      // Llamar a la función
      fetchPoPalletProducts();
    }
  }, [isCreatingShipment]);

  const addPOPalletsProductsToShipment = (products: Product[]) => {
    setShipmentProducts((prev) => {
      // Crear un mapa de los productos existentes en el envío
      const shipmentMap = new Map(
        prev.map((product) => [product.pallet_product_id, product])
      );

      // Iterar sobre los nuevos productos para agregar o actualizar cantidades
      products.forEach((newProduct) => {
        // Ignorar productos sin cantidad disponible
        if (newProduct.available_quantity === 0) return;

        if (shipmentMap.has(newProduct.pallet_product_id)) {
          console.log("El producto ya existe");
          // Si ya existe, actualizar la cantidad restante de `available_quantity`
          const existingProduct = shipmentMap.get(newProduct.pallet_product_id);
          if (existingProduct) {
            const remainingQuantity =
              newProduct.available_quantity +
              existingProduct.quantity -
              existingProduct.quantity;

            if (remainingQuantity > 0) {
              // existingProduct.quantity = remainingQuantity;
              existingProduct.quantity = existingProduct.available_quantity;
            }

            shipmentMap.set(newProduct.pallet_product_id, existingProduct);
          }
        } else {
          console.log("El producto no existe");
          // Si no existe, agregar el producto con toda la `available_quantity`
          shipmentMap.set(newProduct.pallet_product_id, {
            ...newProduct,
            quantity: newProduct.available_quantity,
          });
        }
      });

      // Convertir el mapa nuevamente a un array
      return Array.from(shipmentMap.values());
    });

    // Actualizar `poPalletProducts` para establecer `available_quantity` a 0
    setPoPalletProducts((prev) =>
      prev.map((po) => ({
        ...po,
        pallets: po.pallets.map((pallet) => ({
          ...pallet,
          products: pallet.products.map((p) =>
            products.some(
              (prod) => prod.pallet_product_id === p.pallet_product_id
            )
              ? { ...p, available_quantity: 0 }
              : p
          ),
        })),
      }))
    );

    toast.success("All PO products added to shipment successfully!");
  };

  const addPalletsProductsToShipment = (products: Product[]) => {
    setShipmentProducts((prev) => {
      // Crear un mapa de los productos existentes en el envío
      const shipmentMap = new Map(
        prev.map((product) => [product.pallet_product_id, product])
      );

      // Iterar sobre los nuevos productos para agregar o actualizar cantidades
      products.forEach((newProduct) => {
        // Ignorar productos sin cantidad disponible
        if (newProduct.available_quantity === 0) return;

        if (shipmentMap.has(newProduct.pallet_product_id)) {
          console.log("El producto ya existe");
          // Si ya existe, actualizar la cantidad restante de `available_quantity`
          const existingProduct = shipmentMap.get(newProduct.pallet_product_id);
          if (existingProduct) {
            const remainingQuantity =
              newProduct.available_quantity +
              existingProduct.quantity -
              existingProduct.quantity;

            if (remainingQuantity > 0) {
              // existingProduct.quantity = remainingQuantity;
              existingProduct.quantity = existingProduct.available_quantity;
            }

            shipmentMap.set(newProduct.pallet_product_id, existingProduct);
          }
        } else {
          console.log("El producto no existe");
          // Si no existe, agregar el producto con toda la `available_quantity`
          shipmentMap.set(newProduct.pallet_product_id, {
            ...newProduct,
            quantity: newProduct.available_quantity,
          });
        }
      });

      // Convertir el mapa nuevamente a un array
      return Array.from(shipmentMap.values());
    });

    // Actualizar `poPalletProducts` para establecer `available_quantity` a 0
    setPoPalletProducts((prev) =>
      prev.map((po) => ({
        ...po,
        pallets: po.pallets.map((pallet) => ({
          ...pallet,
          products: pallet.products.map((p) =>
            products.some(
              (prod) => prod.pallet_product_id === p.pallet_product_id
            )
              ? { ...p, available_quantity: 0 }
              : p
          ),
        })),
      }))
    );

    toast.success("All PO products added to shipment successfully!");
  };

  const addProductToShipment = (product: Product, quantity: number) => {
    if (
      quantity > product.available_quantity ||
      product.available_quantity === 0
    ) {
      return toast.error(
        `Error, quantity exceeds available quantity: ${product.available_quantity}`
      );
    }

    // Agregar producto al envío
    setShipmentProducts((prev) => [...prev, { ...product, quantity }]);

    // Actualizar `poPalletProducts` adecuadamente
    setPoPalletProducts((prev) =>
      prev.map((po) => ({
        ...po,
        pallets: po.pallets.map((pallet) => ({
          ...pallet,
          products: pallet.products.map((p) =>
            p.pallet_product_id === product.pallet_product_id
              ? { ...p, available_quantity: p.available_quantity - quantity }
              : p
          ),
        })),
      }))
    );

    toast.success("Product added to shipment successfully!");
  };

  const removeProductFromShipment = (product: Product, quantity: number) => {
    // Eliminar o actualizar cantidad del producto en el envío
    setShipmentProducts((prev) =>
      prev
        .map((p) =>
          p.pallet_product_id === product.pallet_product_id
            ? { ...p, quantity: p.quantity - quantity }
            : p
        )
        .filter((p) => p.quantity > 0)
    );

    // Restaurar la cantidad en `poPalletProducts`
    setPoPalletProducts((prev) =>
      prev.map((po) => ({
        ...po,
        pallets: po.pallets.map((pallet) => ({
          ...pallet,
          products: pallet.products.map((p) =>
            p.pallet_product_id === product.pallet_product_id
              ? { ...p, available_quantity: p.available_quantity + quantity }
              : p
          ),
        })),
      }))
    );
  };

  const handleSaveShipment = async () => {
    const shipmentNumber = `SHIPMENT_${Math.floor(Math.random() * 100000)}`;
    const shipment = {
      shipment_number: shipmentNumber,
      palletproducts: shipmentProducts.map((p: Product) => ({
        pallet_product_id: p.pallet_product_id,
        quantity: p.quantity,
      })),
    };

    console.log(shipmentProducts);

    try {
      await ShipmentsService.createShipment(shipment);
      console.log(shipment);
      toast.success("Shipment created successfully");
      setIsCreatingShipment(false);
      setShipmentProducts([]);
    } catch (error) {
      toast.error("Error creating shipment");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsCreatingShipment(false); // Volver a la vista inicial
    setShipmentProducts([]);
  };

  if (isCreatingShipment) {
    return (
      <IndexPageContainer>
        <div className="flex justify-start gap-4 w-full px-4 m-4">
          <Button variant="outline" onClick={handleSaveShipment}>
            Save Shipment
          </Button>
          <Button variant="destructive" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
        <div className="w-full px-[1.3rem] py-0 flex items-start justify-between gap-8">
          {/* <DataTable
            searchInput={"pallet_number"}
            columns={getStorageCols(addProductToShipment)}
            data={storageProducts}
          /> */}
          <NestedDataTable
            data={poPalletProducts}
            addProductToShipment={addProductToShipment}
            addPalletProductToShipment={addPalletsProductsToShipment}
            addPoPalletsProductsToShipment={addPOPalletsProductsToShipment}
          />
          <DataTable
            // searchInput={"pallet_number"}
            columns={getShipmentsCols(removeProductFromShipment)}
            data={shipmentProducts}
          />
        </div>
      </IndexPageContainer>
    );
  }

  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-0">
        <Button variant="outline" onClick={() => setIsCreatingShipment(true)}>
          New Shipment
        </Button>
        <DataTable columns={columns} data={shipments} />
      </div>
    </IndexPageContainer>
  );
}
