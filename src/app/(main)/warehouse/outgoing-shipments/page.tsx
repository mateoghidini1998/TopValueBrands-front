"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ShipmentsService } from "@/services/shipments/shipments.service";
import IndexPageContainer from "../../page.container";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { getShipmentsCols } from "./new-shipment/shipment-columns";
import { getStorageCols } from "./new-shipment/columns";
import { toast } from "sonner";

export default function OutgoingShipments() {
  const [shipments, setShipments] = useState([]);
  const [isCreatingShipment, setIsCreatingShipment] = useState(false);
  const [storageProducts, setStorageProducts] = useState([]);
  const [shipmentProducts, setShipmentProducts] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      const response = await ShipmentsService.getShipments();
      setShipments(response.shipments);
    };
    fetchShipments();
  }, []);

  useEffect(() => {
    if (isCreatingShipment) {
      const fetchStorageProducts = async () => {
        try {
          const response = await ShipmentsService.getStorageProducts();
          setStorageProducts(response);
        } catch (error) {
          console.error(error);
        }
      };
      fetchStorageProducts();
    }
  }, [isCreatingShipment]);

  const addProductToShipment = (product, quantity) => {
    if (quantity > product.available_quantity) {
      return toast.error(`Available quantity: ${product.available_quantity}`);
    }
    setShipmentProducts((prev) => [...prev, { ...product, quantity }]);
    setStorageProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? { ...p, available_quantity: p.available_quantity - quantity }
          : p
      )
    );
  };

  const removeProductFromShipment = (product, quantity) => {
    setShipmentProducts((prev) =>
      prev
        .map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity - quantity }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
    setStorageProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? { ...p, available_quantity: p.available_quantity + quantity }
          : p
      )
    );
  };

  const handleSaveShipment = async () => {
    const shipmentNumber = `SHIPMENT_${Math.floor(Math.random() * 100000)}`;
    const shipment = {
      shipment_number: shipmentNumber,
      palletproducts: shipmentProducts.map((p) => ({
        pallet_product_id: p.id,
        quantity: p.quantity,
      })),
    };

    try {
      await ShipmentsService.createShipment(shipment);
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
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleSaveShipment}>
            Save Shipment
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
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
