"use client";
import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import AddToOrderCell from "./add-to-order-cell";
import QuantityCell from "./quantity-cell";
import RemoveFromOrderCell from "./remove-from-order-cell";
import UnitPriceCell from "./unit-price-cell";
import DateCell from "@/components/ui/data-table-date-cell";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "product_name",
    header: "Product",
    cell: ({ row }) => (
      <ProductNameTableData product={row.original} width={250} />
    ),
  },
  {
    accessorKey: "supplier_name",
    header: "Supplier",
    cell: ({ row }) => (
      <span className="">{row.getValue("supplier_name") || "N/A"}</span>
    ),
  },
  {
    accessorKey: "product_velocity",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Velocity" />;
    },
  },
  {
    accessorKey: "units_sold",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Units Sold" />;
    },
  },
  {
    accessorKey: "thirty_days_rank",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="30 Day Rank" />;
    },
  },
  {
    accessorKey: "ninety_days_rank",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="90 Day Rank" />;
    },
  },
  {
    accessorKey: "ASIN",
    header: "ASIN",
  },
  {
    accessorKey: "seller_sku",
    header: "Seller SKU",
  },
  {
    accessorKey: "product_cost",
    header: "Product Cost",
    cell: ({ row }) => {
      return <span>{`$ ${row.getValue("product_cost") || "N/A"}`}</span>;
    },
  },
  {
    accessorKey: "lowest_fba_price",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="FBA Price" />;
    },
    cell({ row }) {
      return <span>{`$ ${row.getValue("lowest_fba_price") || "N/A"}`}</span>;
    },
  },
  {
    accessorKey: "FBA_available_inventory",
    header: "FBA Inventory",
  },
  {
    accessorKey: "reserved_quantity",
    header: "Reserved Quantity",
  },
  {
    accessorKey: "Inbound_to_FBA",
    header: "Inbound to FBA",
  },

  {
    accessorKey: "profit",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Profit" />;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("profit"));

      const getBadgeVariant = (amount: number) => {
        if (amount >= 2) {
          return "success";
        }

        if (amount <= 0) {
          return "danger";
        }

        return "unknown";
      };

      return (
        <Badge variant={getBadgeVariant(amount)}>
          {isNaN(amount) ? "N/A" : `$ ${amount.toFixed(2)}`}
        </Badge>
      );
    },
  },
  {
    accessorKey: "fees",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Fees" />;
    },
  },
  {
    accessorKey: "roi",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ROI" />;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("roi"));

      const getBadgeVariant = (amount: number) => {
        if (amount >= 2) {
          return "success";
        }

        if (amount <= 0) {
          return "danger";
        }

        return "unknown";
      };

      return (
        <Badge variant={getBadgeVariant(amount)}>
          {isNaN(amount) ? "N/A" : amount.toFixed(2)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Last Updated" />;
    },
    cell: ({ row }) => {
      return <DateCell value={row.original.updatedAt} />;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <AddToOrderCell row={row} />,
  },
];

export const POColumns: ColumnDef<any>[] = [
  {
    accessorKey: "product_name",
    header: "Product",
    cell: ({ row }) => (
      <ProductNameTableData product={row.original} width={250} />
    ),
  },
  {
    accessorKey: "ASIN",
    header: "ASIN",
  },
  {
    accessorKey: "supplier_name",
    header: "Supplier",
    cell: ({ row }) => (
      <span className="">{row.getValue("supplier_name") || "-"}</span>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Quantity" />;
    },
    cell: ({ row }) => {
      return <QuantityCell row={row.original} />;
    },
  },
  {
    accessorKey: "unit_price",
    header: "Product Cost",
    cell: ({ row }) => {
      return <UnitPriceCell row={row.original} />;
    },
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total" />;
    },
  },
  {
    accessorKey: "units_sold",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Units Sold" />;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <RemoveFromOrderCell row={row} />,
  },
];