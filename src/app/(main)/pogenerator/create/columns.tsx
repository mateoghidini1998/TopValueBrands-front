"use client";
import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import AddToOrderCell from "./add-to-order-cell";
import QuantityCell from "./quantity-cell";
import RemoveFromOrderCell from "./remove-from-order-cell";
import ProductCostCell from "./product-cost-cell";
import DateCell from "@/components/ui/data-table-date-cell";
import AddProductToPOCell from "./add-product-to-po-cell";

export const trackedProductsCol: ColumnDef<any>[] = [
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
    accessorKey: "supplier_item_number",
    header: "Supplier Item No.",
    cell: ({ row }) => (
      <span className="">{row.getValue("supplier_item_number") || "N/A"}</span>
    ),
  },
  {
    accessorKey: "product_velocity",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Velocity" />;
    },
    cell: ({ row }: any) => {
      return (
        <span>{row.getValue("product_velocity").toFixed(3) || "N/A"}</span>
      );
    },
  },
  {
    accessorKey: "units_sold",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Units Sold" />;
    },
    cell: ({ row }: any) => {
      return <span>{row.getValue("units_sold").toLocaleString() || 0}</span>;
    },
  },
  {
    accessorKey: "thirty_days_rank",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="30 Day Rank" />;
    },
    cell: ({ row }: any) => {
      return (
        <span>
          {row.getValue("thirty_days_rank").toLocaleString() || "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "ninety_days_rank",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="90 Day Rank" />;
    },
    cell: ({ row }: any) => {
      return (
        <span>
          {row.getValue("ninety_days_rank").toLocaleString() || "N/A"}
        </span>
      );
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
    cell: ({ row }: any) => {
      return (
        <span>
          {row.getValue("FBA_available_inventory").toLocaleString() || "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "reserved_quantity",
    header: "Reserved Quantity",
    cell: ({ row }: any) => {
      return (
        <span>
          {row.getValue("reserved_quantity").toLocaleString() || "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "Inbound_to_FBA",
    header: "Inbound to FBA",
    cell: ({ row }: any) => {
      return (
        <span>{row.getValue("Inbound_to_FBA").toLocaleString() || "N/A"}</span>
      );
    },
  },

  {
    accessorKey: "fees",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Fees" />;
    },
    cell({ row }) {
      return <span>{`$ ${row.getValue("fees") || "N/A"}`}</span>;
    },
  },

  {
    accessorKey: "profit",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Profit" />;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("profit"));

      const getBadgeVariant = (amount: number) => {
        if (amount > 2) {
          return "success";
        }

        if (amount < 2) {
          return "danger";
        }

        return "warning";
      };

      return (
        <Badge variant={getBadgeVariant(amount)}>
          {isNaN(amount) ? "N/A" : `$ ${amount.toFixed(2)}`}
        </Badge>
      );
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
        if (amount > 2) {
          return "success";
        }

        if (amount < 2) {
          return "danger";
        }

        return "warning";
      };

      return (
        <Badge variant={getBadgeVariant(amount)}>
          {isNaN(amount) ? "N/A" : `${amount.toFixed(2)}%`}
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
    accessorKey: "product_cost",
    header: "Product Cost",
    cell: ({ row }) => {
      return <ProductCostCell row={row.original} />;
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

export const getTrackedProductsColAnalyze = (
  editingOrder: any,
  setEditingOrder: any,
  setTrackedProductsData: any,
  setPoProductUpdates: any
): ColumnDef<any>[] => [
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
    cell: ({ row }: any) => {
      return (
        <span>{row.getValue("product_velocity").toFixed(3) || "N/A"}</span>
      );
    },
  },
  {
    accessorKey: "units_sold",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Units Sold" />;
    },
    cell: ({ row }: any) => {
      return <span>{row.getValue("units_sold").toLocaleString() || 0}</span>;
    },
  },
  {
    accessorKey: "thirty_days_rank",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="30 Day Rank" />;
    },
    cell: ({ row }: any) => {
      return (
        <span>
          {row.getValue("thirty_days_rank").toLocaleString() || "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "ninety_days_rank",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="90 Day Rank" />;
    },
    cell: ({ row }: any) => {
      return (
        <span>
          {row.getValue("ninety_days_rank").toLocaleString() || "N/A"}
        </span>
      );
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
    cell: ({ row }: any) => {
      return (
        <span>
          {row.getValue("FBA_available_inventory").toLocaleString() || "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "reserved_quantity",
    header: "Reserved Quantity",
    cell: ({ row }: any) => {
      return (
        <span>
          {row.getValue("reserved_quantity").toLocaleString() || "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "Inbound_to_FBA",
    header: "Inbound to FBA",
    cell: ({ row }: any) => {
      return (
        <span>{row.getValue("Inbound_to_FBA").toLocaleString() || "N/A"}</span>
      );
    },
  },

  {
    accessorKey: "fees",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Fees" />;
    },
    cell({ row }) {
      return <span>{`$ ${row.getValue("fees") || "N/A"}`}</span>;
    },
  },

  {
    accessorKey: "profit",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Profit" />;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("profit"));

      const getBadgeVariant = (amount: number) => {
        if (amount > 2) {
          return "success";
        }

        if (amount < 2) {
          return "danger";
        }

        return "warning";
      };

      return (
        <Badge variant={getBadgeVariant(amount)}>
          {isNaN(amount) ? "N/A" : `$ ${amount.toFixed(2)}`}
        </Badge>
      );
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
        if (amount > 2) {
          return "success";
        }

        if (amount < 2) {
          return "danger";
        }

        return "warning";
      };

      return (
        <Badge variant={getBadgeVariant(amount)}>
          {isNaN(amount) ? "N/A" : `${amount.toFixed(2)}%`}
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
    cell: ({ row }) => (
      <AddProductToPOCell
        row={row}
        setPoProductUpdates={setPoProductUpdates}
        editingOrder={editingOrder}
        setEditingOrder={setEditingOrder}
        setTrackedProductsData={setTrackedProductsData}
      />
    ),
  },
];
