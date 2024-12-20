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
      return <p className="text-center"> Order Number</p>;
    },
    cell: ({ row }) => {
      // console.log(row.original);
      return <div className="text-center">{row.original.order_number}</div>;
    },
  },
  {
    accessorKey: "palletCount",
    header: ({ column }) => {
      return <p className="text-center">Pallet Count</p>;
    },
    cell: ({ row }) => {
      const palletCount = row.original.pallets.length;
      return <div className="text-center">{palletCount}</div>;
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
    header: ({ column }) => {
      return <p className="text-center">Pallet Number</p>;
    },
    cell: ({ row }) => {
      return <p className="text-center">{row.original.pallet_number}</p>;
    },
  },
  {
    accessorKey: "Order Number",
    header: ({ column }) => {
      return <p className="text-center">Order Number</p>;
    },
    cell: ({ row }) => {
      // console.log(row.original);
      return (
        <p className="text-center">
          {row.original?.purchase_order_number || ""}
        </p>
      );
    },
  },
  {
    accessorKey: "productCount",
    header: ({ column }) => {
      return <p className="text-center">Product Count</p>;
    },
    cell: ({ row }) => {
      const productCount = row.original.products.length;
      return <div className="text-center">{productCount}</div>;
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
    accessorKey: "pallet_number",
    header: ({ column }) => {
      return <p className="text-center">Pallet Number</p>;
    },
    cell: ({ row }) => (
      <p className="text-center"># {row.original.pallet_number}</p>
    ),
  },
  {
    accessorKey: "available_quantity",
    header: ({ column }) => {
      return <p className="text-center">Available Quantity</p>;
    },
    cell: ({ row }) => (
      <p className="text-center">{row.original.available_quantity}</p>
    ),
  },
  {
    accessorKey: "seller_sku",
    header: ({ column }) => {
      return <p className="text-center">Seller SKU</p>;
    },
    cell: ({ row }) => <p className="text-center">{row.original.seller_sku}</p>,
  },
  {
    accessorKey: "ASIN",
    header: ({ column }) => {
      return <p className="text-center">ASIN</p>;
    },
    cell: ({ row }) => <p className="text-center">{row.original.ASIN}</p>,
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
