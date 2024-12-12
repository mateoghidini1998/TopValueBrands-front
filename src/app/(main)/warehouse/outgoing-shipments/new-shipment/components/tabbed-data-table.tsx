"use client";

import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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
  const [poFilter, setPoFilter] = useState("");
  const [palletFilter, setPalletFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");

  // Flatten pallets and products data
  const allPallets = useMemo(() => data.flatMap((po) => po.pallets), [data]);
  const allProducts = useMemo(
    () => allPallets.flatMap((pallet) => pallet.products),
    [allPallets]
  );

  // Filter functions
  const filteredPurchaseOrders = useMemo(() => {
    return data.filter((po) =>
      po.order_number.toLowerCase().includes(poFilter.toLowerCase())
    );
  }, [data, poFilter]);

  const filteredPallets = useMemo(() => {
    return allPallets.filter((pallet) =>
      pallet.pallet_number.toLowerCase().includes(palletFilter.toLowerCase())
    );
  }, [allPallets, palletFilter]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(
      (product) =>
        product.ASIN.toLowerCase().includes(productFilter.toLowerCase()) ||
        product.product_name
          .toLowerCase()
          .includes(productFilter.toLowerCase()) ||
        product.seller_sku.toLowerCase().includes(productFilter.toLowerCase())
    );
  }, [allProducts, productFilter]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
        <TabsTrigger value="pallets">Pallets</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
      </TabsList>

      <TabsContent value="purchase-orders">
        <Input
          placeholder="Search by order number"
          value={poFilter}
          onChange={(e) => setPoFilter(e.target.value)}
          className="mb-4 w-80"
        />
        <NestedDataTable
          data={filteredPurchaseOrders}
          addProductToShipment={addProductToShipment}
          addPalletProductToShipment={addPalletProductToShipment}
          addPoPalletsProductsToShipment={addPoPalletsProductsToShipment}
        />
      </TabsContent>

      <TabsContent value="pallets">
        <Input
          placeholder="Search by pallet number"
          value={palletFilter}
          onChange={(e) => setPalletFilter(e.target.value)}
          className="mb-4 w-80"
        />
        <PalletTable
          pallets={filteredPallets}
          addPalletProductToShipment={addPalletProductToShipment}
          addProductToShipment={addProductToShipment}
        />
      </TabsContent>

      <TabsContent value="products">
        <Input
          placeholder="Search by ASIN, product name, or seller SKU"
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="mb-4 w-80"
        />
        <ProductTable
          products={filteredProducts}
          addProductToShipment={addProductToShipment}
        />
      </TabsContent>
    </Tabs>
  );
}
