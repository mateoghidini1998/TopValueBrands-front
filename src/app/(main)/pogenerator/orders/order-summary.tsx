"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import {
  PurchaseOrderProductUpdates,
  useOrdersContext,
} from "@/contexts/orders.context";
import { IPurchaseOrder } from "@/types/product.types";
import { TrackedProductType } from "@/types/trackedProducts.types";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DataTable } from "../../../../components/ui/data-table";
import IndexPageContainer from "../../page.container";
import { NoteCell } from "./text-area-cell";
// import { columns } from "../create/columns";
import { ProductNameTableData } from "@/components/inventory/ProductNameTableData";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import DateCell from "@/components/ui/data-table-date-cell";
import { ColumnDef } from "@tanstack/react-table";
import AnalyzeActionsCell from "./analyze-actions-cell";
import InputUnitPrice from "./input-unit-price";
import InputQuantity from "./input-quantity";

export const getColumns = (
  setTrackedProductsData: Dispatch<SetStateAction<TrackedProductType[]>>,
  setEditingOrder: Dispatch<SetStateAction<any>>,
  deletePOProductsFromAnOrder: (productId: number) => void
): ColumnDef<any>[] => [
  {
    accessorKey: "product_name",
    header: "Product",
    cell: ({ row }) => (
      <ProductNameTableData product={row.original} width={250} />
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
    accessorKey: "supplier_item_number",
    header: "Item Number",
  },
  {
    accessorKey: "product_cost",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Product Cost" />;
    },
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
    accessorKey: "fees",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Fees" />;
    },
    cell({ row }) {
      return <span>{`$ ${row.getValue("fees") || "N/A"}`}</span>;
    },
  },
  {
    accessorKey: "purchase_order_product_profit",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Profit" />;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("purchase_order_product_profit"));

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
    accessorKey: "seller_sku",
    header: "Seller SKU",
  },

  {
    accessorKey: "unit_price",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Unit Price" />;
    },
    cell: ({ row }) => {
      // return <span>{`$ ${row.getValue("unit_price") || "N/A"}`}</span>;
      return (
        <InputUnitPrice
          row={row}
          setTrackedProductsData={setTrackedProductsData}
          setEditingOrder={setEditingOrder}
        />
      );
    },
  },

  {
    accessorKey: "quantity_purchased",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Quantity" />;
    },
    cell: ({ row }) => {
      // return <span>{`${row.getValue("quantity_purchased") || "N/A"}`}</span>;
      return (
        <InputQuantity
          row={row}
          setTrackedProductsData={setTrackedProductsData}
          setEditingOrder={setEditingOrder}
        />
      );
    },
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total Amount" />;
    },
    cell: ({ row }) => {
      const unitPrice = parseFloat(row.getValue("unit_price"));
      const quantity = parseFloat(row.getValue("quantity_purchased"));
      const total = unitPrice * quantity;

      return (
        <span>{`$ ${
          total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || "N/A"
        }`}</span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <AnalyzeActionsCell
        row={row.original}
        setTrackedProductsData={setTrackedProductsData}
        deleteProductFromOrder={deletePOProductsFromAnOrder}
      />
    ),
  },
];

type OrderSummaryProps = {
  orderId: number;
};

export default function OrderSummary({ orderId }: OrderSummaryProps) {
  const {
    orders,
    updatePOProducts,
    editOrderNotes,
    getPurchaseOrderSummary,
    deletePOProductFromAnOrder,
    updatePONumber,
    setOrdersToCreate,
    fetchOrders,
  } = useOrdersContext();

  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<IPurchaseOrder | null>(null);
  const [trackedProductsData, setTrackedProductsData] = useState<
    TrackedProductType[]
  >([]);

  const [poProductUpdates, setPoProductUpdates] = useState<
    PurchaseOrderProductUpdates[]
  >([]);

  const handleUpdatePurchaseOrder = async () => {
    await updatePOProducts(orderId, poProductUpdates);
    await editOrderNotes(orderId, editingOrder!);
    await updatePONumber(orderId, editingOrder!.order_number);
    await fetchOrders();

    setPoProductUpdates([]);
  };

  useEffect(() => {
    const order = orders.find((order) => order.id === orderId);
    if (order) {
      setEditingOrder(order);
      getPurchaseOrderSummary(order.id).then((res: any) => {
        // @ts-ignore
        const data = res.data;
        // console.log(data);

        // Filtra los trackedProductsOfTheOrder agregando el id de purchaseOrderProducts correspondiente
        const trackedProductsWithPOId = data.trackedProductsOfTheOrder.map(
          (trackedProduct: any) => {
            // Encuentra el objeto de purchaseOrderProducts que tenga el mismo product_id
            const matchingPurchaseOrderProduct =
              data.purchaseOrder.purchaseOrderProducts.find(
                (product: any) =>
                  product.product_id === trackedProduct.product_id
              );

            // Retorna el trackedProduct junto con el id de purchaseOrderProducts (si existe)

            return {
              ...trackedProduct,
              roi:
                (parseFloat(matchingPurchaseOrderProduct.profit) /
                  matchingPurchaseOrderProduct.unit_price) *
                100,
              purchase_order_product_profit: matchingPurchaseOrderProduct
                ? parseFloat(matchingPurchaseOrderProduct.profit)
                : null,
              purchase_order_product_id: matchingPurchaseOrderProduct
                ? matchingPurchaseOrderProduct.id
                : null,
              unit_price: matchingPurchaseOrderProduct
                ? matchingPurchaseOrderProduct.unit_price
                : null,
              total_amount: matchingPurchaseOrderProduct
                ? matchingPurchaseOrderProduct.total_amount
                : null,
              quantity_purchased: matchingPurchaseOrderProduct
                ? matchingPurchaseOrderProduct.quantity_purchased
                : null,
            };
          }
        );

        setTrackedProductsData(trackedProductsWithPOId);
      });
    }
  }, [orders, orderId, getPurchaseOrderSummary, updatePOProducts]);

  useEffect(() => {
    if (editingOrder) {
      setPoProductUpdates(
        editingOrder.purchaseOrderProducts.map((product) => {
          return {
            purchaseOrderProductId: product.id,
            quantityPurchased: product.quantity_purchased,
            unit_price: product.unit_price,
            profit: product.profit,
          };
        })
      );
    }
  }, [editingOrder]);

  // console.log(editingOrder);

  // console.log(trackedProductsData);

  return (
    <>
      {isAnalyticsModalOpen ? (
        <Dialog
          modal={true}
          open={isAnalyticsModalOpen}
          onOpenChange={setIsAnalyticsModalOpen}
        >
          <DialogContent
            className={`pt-8 flex flex-col gap-4 item-center justify-between dark:bg-dark fixed left-[50%] top-[50%]
          w-full max-w-[90vw] min-h-[60dvh] translate-x-[-50%] translate-y-[-50%]`}
          >
            <DialogHeader className="flex flex-col items-center gap-4">
              <div className="w-full overflow-x-auto custom_scroll">
                <IndexPageContainer>
                  {/* center the absolute title */}
                  <DialogTitle className="absolute left-[50%]  translate-x-[-50%] translate-y-[-50%]  ">
                    {editingOrder?.supplier_name}
                  </DialogTitle>
                  <div className="flex w-max space-x-4 p-4">
                    <DataTable
                      columns={getColumns(
                        setTrackedProductsData,
                        setPoProductUpdates,
                        deletePOProductFromAnOrder
                      )}
                      data={trackedProductsData}
                      dataLength={100}
                    />
                  </div>
                </IndexPageContainer>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <DialogContent
          className="flex flex-col gap-4 item-center justify-between dark:bg-dark fixed left-[50%] top-[50%]
          w-full max-w-lg translate-x-[-50%] translate-y-[-50%]"
        >
          <DialogHeader className="flex flex-col items-center gap-4">
            <DialogTitle className="text-center">Order Summary</DialogTitle>
            {/* Products List */}

            {/* Order Information */}
            <DialogDescription className="flex flex-col gap-2 w-full dark:text-white">
              <div className="flex justify-between items-center">
                <h2>Order Number</h2>
                <Input
                  onChange={(e) => {
                    // @ts-ignore
                    setEditingOrder({
                      ...editingOrder,
                      order_number: e.target.value,
                    });
                  }}
                  className="w-fit text-center"
                  type="text"
                  defaultValue={editingOrder?.order_number}
                />
              </div>

              <div className="flex justify-between items-center">
                <h2>Supplier</h2>
                <p>{editingOrder?.supplier_name}</p>
              </div>

              <div className="flex justify-between items-center">
                <h2>Date</h2>
                <p>{editingOrder?.createdAt}</p>
              </div>

              <div className="flex justify-between items-center">
                <h2>Total</h2>
                <p>{`$ ${editingOrder?.total_price}`}</p>
              </div>
            </DialogDescription>

            {/* Notes */}
            <DialogDescription className="flex flex-col gap-2 w-full dark:text-white">
              {/* <h2>Notes</h2>
                          <p>{editingOrder?.notes}</p> */}

              <NoteCell
                title="Notes"
                value={editingOrder?.notes || ""}
                defaultValue={editingOrder?.notes || ""}
                placeholder="Notes"
                onChange={(value: string) => {
                  // @ts-ignore
                  setEditingOrder({
                    ...editingOrder,
                    notes: value,
                  });
                }}
              />
            </DialogDescription>

            <Separator className="my-4" />
          </DialogHeader>

          <DialogDescription className="w-full flex flex-col gap-4">
            <Button
              className="w-full"
              onClick={() => setIsAnalyticsModalOpen(true)}
              variant="tvb"
            >
              Analyze Products
            </Button>
          </DialogDescription>

          <DialogFooter className="w-full flex flex-1 gap-2 item-center justify-between dark:text-white">
            <DialogPrimitive.Close className="w-full">
              <Button className="w-full" type="submit" variant={"tvb_invert"}>
                Discard
              </Button>
            </DialogPrimitive.Close>
            <DialogPrimitive.Close className="w-full">
              <Button
                className="w-full"
                type="submit"
                variant={"tvb"}
                onClick={handleUpdatePurchaseOrder}
              >
                Confirm
              </Button>
            </DialogPrimitive.Close>
          </DialogFooter>
        </DialogContent>
      )}
    </>
  );
}
