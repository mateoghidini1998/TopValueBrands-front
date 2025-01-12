"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ShipmentsService } from "@/services/shipments/shipments.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { TabbedDataTable } from "./new-shipment/components/tabbed-data-table";
import { Product, PurchaseOrderData } from "./new-shipment/interfaces";
import { getShipmentsCols } from "./new-shipment/shipment-columns";
import { Loader2Icon } from "lucide-react";
import classNames from "classnames";

export default function OutgoingShipments() {
  const [shipments, setShipments] = useState([]);
  const [isCreatingShipment, setIsCreatingShipment] = useState(false);
  const [shipmentCreated, setShipmentCreated] = useState(false);
  const [shipmentProducts, setShipmentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [poPalletProducts, setPoPalletProducts] = useState<PurchaseOrderData[]>(
    []
  );

  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      const response = await ShipmentsService.getShipments();
      setShipments(response.shipments);
      setLoading(false);
    };
    fetchShipments();
  }, [shipmentCreated]);

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
    const shipmentNumber = `TV-USA-${Math.floor(Math.random() * 100000)}`;
    const shipment = {
      shipment_number: shipmentNumber,
      palletproducts: shipmentProducts.map((p: Product) => ({
        pallet_product_id: p.pallet_product_id,
        quantity: p.quantity,
      })),
    };

    // console.log(shipmentProducts);

    try {
      await ShipmentsService.createShipment(shipment);
      // console.log(shipment);
      toast.success("Shipment created successfully");
      setIsCreatingShipment(false);
      setShipmentProducts([]);
      setShipmentCreated(!shipmentCreated);
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
        <div className="min-h-[60vh] bg-transparent p-6 w-full">
          <Card className="w-full mx-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Manage Shipment</CardTitle>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleSaveShipment}>
                    Save Shipment
                  </Button>
                  <Button variant="destructive" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Available Products</h2>
                  <div className="rounded-lg border bg-card p-4">
                    <TabbedDataTable
                      data={poPalletProducts}
                      addProductToShipment={addProductToShipment}
                      addPalletProductToShipment={addPalletsProductsToShipment}
                      addPoPalletsProductsToShipment={
                        addPOPalletsProductsToShipment
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Selected Products</h2>
                  <div className="rounded-lg border bg-card p-4">
                    <DataTable
                      searchInput="ASIN"
                      columns={getShipmentsCols(removeProductFromShipment)}
                      data={shipmentProducts}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </IndexPageContainer>
    );
  }

  if (loading) {
    return (
      <div className="h-[calc(100vh-20rem)] w-full flex items-center justify-center">
        <Loader2Icon className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <IndexPageContainer>
      <div className="w-full px-[1.3rem] py-0 relative">
        <Button
          className="absolute top-[-50px] right-[21px] z-50 bg-[#438EF3] text-white hover:bg-[#6daaf8]"
          variant="tvb"
          onClick={() => setIsCreatingShipment(true)}
        >
          New Shipment
        </Button>
        <DataTable columns={columns} data={shipments} />
      </div>
    </IndexPageContainer>
  );
}
