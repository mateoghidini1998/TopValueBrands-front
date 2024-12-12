"use client";

import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { PalletsByPO, Product, PurchaseOrderData } from "../interfaces";
import AddPOProductsToShipment from "./add-po-products-to-shipment";
import StorageActionsCell from "../storage-actions-cell";

// Purchase Order Columns
export const getPurchaseOrderColumns = (
  addPoPalletsProductsToShipment: any
): ColumnDef<PurchaseOrderData>[] => [
  {
    accessorKey: "order_number",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Number
          <ArrowUpDown className="text-xs ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "palletCount",
    header: "Pallet Count",
    cell: ({ row }) => {
      const palletCount = row.original.pallets.length;
      return <div className="text-center">{palletCount}</div>;
    },
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: "Add to Shipment",
    cell: ({ row }) => {
      const products = row.original.pallets
        .flatMap((pallet) => pallet.products)
        .filter((product) => product.available_quantity > 0); // Filtra productos con cantidad > 0

      return (
        <AddPOProductsToShipment
          products={products}
          addProducts={addPoPalletsProductsToShipment}
        />
      );
    },
  },
];

// Pallet Columns
export const getPalletColumns = (
  addPalletProductToShipment: any
): ColumnDef<PalletsByPO>[] => [
  {
    accessorKey: "pallet_number",
    header: "Pallet Number",
    cell: ({ row }) => {
      console.log(row.original.pallet_number);
      return <p>{row.original.pallet_number}</p>;
    },
  },
  {
    accessorKey: "productCount",
    header: "Product Count",
    cell: ({ row }) => {
      const productCount = row.original.products.length;
      return <div className="text-center">{productCount}</div>;
    },
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: "Add to Shipment",
    cell: ({ row }) => {
      const products = row.original.products.flatMap((product) => product);

      console.log(products);

      return (
        <AddPOProductsToShipment
          products={products}
          addProducts={addPalletProductToShipment}
        />
      );
    },
  },
];

// Product Columns
export const getProductColumns = (
  addProductToShipment: any
): ColumnDef<Product>[] => [
  {
    accessorKey: "product_name",
    header: "Product",
    cell: ({ row }) => {
      return <ProductNameTableData product={row.original} width={250} />;
    },
  },
  {
    accessorKey: "available_quantity",
    header: "Available Quantity",
    cell: ({ row }) => <p>{row.original.available_quantity}</p>,
  },
  {
    accessorKey: "seller_sku",
    header: "Seller SKU",
    cell: ({ row }) => <p>{row.original.seller_sku}</p>,
  },
  {
    accessorKey: "ASIN",
    header: "ASIN",
    cell: ({ row }) => <p>{row.original.ASIN}</p>,
  },
  {
    id: "actions",
    header: "Add to Shipment",

    cell: ({ row }) => {
      return (
        <StorageActionsCell
          row={row}
          addProductToShipment={addProductToShipment}
        />
      );
    },
  },
];
