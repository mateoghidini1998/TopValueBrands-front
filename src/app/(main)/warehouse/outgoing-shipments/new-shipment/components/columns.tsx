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
          className="pl-0 text-xs"
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
      return <div className="text-left">{palletCount}</div>;
    },
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const products = row.original.pallets
        .flatMap((pallet) => pallet.products)
        .filter((product) => product.available_quantity > 0); // Filtra productos con cantidad > 0

      return (
        <div className="text-right">
          <AddPOProductsToShipment
            products={products}
            addProducts={addPoPalletsProductsToShipment}
          />
        </div>
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
      return <p>{row.original.pallet_number}</p>;
    },
  },
  {
    accessorKey: "productCount",
    header: "Product Count",
    cell: ({ row }) => {
      const productCount = row.original.products.length;
      return <div className="text-left">{productCount}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const products = row.original.products.flatMap((product) => product);
      return (
        <div className="text-right">
          <AddPOProductsToShipment
            products={products}
            addProducts={addPalletProductToShipment}
          />
        </div>
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
    header: "Actions",

    cell: ({ row }) => {
      return (
        <div className="text-right">
          <StorageActionsCell
            row={row}
            addProductToShipment={addProductToShipment}
          />
        </div>
      );
    },
  },
];
