"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PurchaseOrderData, PalletsByPO, Product } from "../interfaces";
import {
  NestedDataTable,
  PalletTable,
  ProductTable,
} from "./nested-data-table";

interface TabbedDataTableProps {
  data: PurchaseOrderData[];
  addProductToShipment: any;
  addPalletProductToShipment: any;
  addPoPalletsProductsToShipment: any;
}

export function TabbedDataTable({
  data,
  addProductToShipment,
  addPalletProductToShipment,
  addPoPalletsProductsToShipment,
}: TabbedDataTableProps) {
  const [activeTab, setActiveTab] = useState("purchase-orders");

  // Flatten pallets and products data
  const allPallets = data.flatMap((po) => po.pallets);
  const allProducts = allPallets.flatMap((pallet) => pallet.products);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
        <TabsTrigger value="pallets">Pallets</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
      </TabsList>
      <TabsContent value="purchase-orders">
        <NestedDataTable
          data={data}
          addProductToShipment={addProductToShipment}
          addPalletProductToShipment={addPalletProductToShipment}
          addPoPalletsProductsToShipment={addPoPalletsProductsToShipment}
        />
      </TabsContent>
      <TabsContent value="pallets">
        <PalletTable
          pallets={allPallets}
          addPalletProductToShipment={addPalletProductToShipment}
          addProductToShipment={addProductToShipment}
        />
      </TabsContent>
      <TabsContent value="products">
        <ProductTable
          products={allProducts}
          addProductToShipment={addProductToShipment}
        />
      </TabsContent>
    </Tabs>
  );
}
