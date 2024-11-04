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

export const getColumns = (
  setTrackedProductsData: Dispatch<SetStateAction<TrackedProductType[]>>,
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
    accessorKey: "supplier_item_number",
    header: "Item N",
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
    accessorKey: "unit_price",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Unit Price" />;
    },
    cell: ({ row }) => {
      return <span>{`$ ${row.getValue("unit_price") || "N/A"}`}</span>;
    },
  },

  {
    accessorKey: "quantity_purchased",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Quantity" />;
    },
    cell: ({ row }) => {
      return <span>{`${row.getValue("quantity_purchased") || "N/A"}`}</span>;
    },
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total Amount" />;
    },
    cell: ({ row }) => {
      return <span>{`$ ${row.getValue("total_amount") || "N/A"}`}</span>;
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
    accessorKey: "seller_sku",
    header: "Seller SKU",
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
  } = useOrdersContext();
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<IPurchaseOrder | null>(null);
  const [trackedProductsData, setTrackedProductsData] = useState<
    TrackedProductType[]
  >([]);

  const [poProductUpdates, setPoProductUpdates] = useState<
    PurchaseOrderProductUpdates[]
  >([]);

  const handleUpdatePurchaseOrder = () => {
    updatePOProducts(orderId, poProductUpdates).then(() => {
      editOrderNotes(orderId, editingOrder!);
      updatePONumber(orderId, editingOrder!.order_number);
    });

    setOrdersToCreate((prev) =>
      prev.map((order) => (order.id === orderId ? editingOrder! : order))
    );

    // setEditingOrder(null);
    setPoProductUpdates([]);
  };

  useEffect(() => {
    const order = orders.find((order) => order.id === orderId);
    if (order) {
      setEditingOrder(order);
      getPurchaseOrderSummary(order.id).then((res) => {
        // @ts-ignore
        const data = res.data;
        console.log(data);

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
          };
        })
      );
    }
  }, [editingOrder]);

  return (
    <>
      {/* Dialog para controlar la apertura/cierre */}
      <>
        {isAnalyticsModalOpen ? (
          <Dialog
            open={isAnalyticsModalOpen}
            onOpenChange={setIsAnalyticsModalOpen}
          >
            <DialogContent
              className="pt-8 flex flex-col gap-4 item-center justify-between dark:bg-dark fixed left-[50%] top-[50%]
          w-full max-w-[90vw] min-h-[60dvh] translate-x-[-50%] translate-y-[-50%]"
            >
              <DialogHeader className="flex flex-col items-center gap-4">
                {/* <ScrollArea className="w-full whitespace-nowrap rounded-md border"> */}
                <div className="w-full overflow-x-auto custom_scroll">
                  <IndexPageContainer>
                    <DialogTitle className="text-center">
                      {editingOrder?.supplier_name}
                    </DialogTitle>
                    <div className="flex w-max space-x-4 p-4">
                      <DataTable
                        columns={getColumns(
                          setTrackedProductsData,
                          deletePOProductFromAnOrder
                        )}
                        data={trackedProductsData}
                        dataLength={100}
                      />
                    </div>
                  </IndexPageContainer>
                </div>
                {/* <ScrollBar orientation="horizontal" /> */}
                {/* </ScrollArea> */}
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <>
            <DialogContent
              className="flex flex-col gap-4 item-center justify-between dark:bg-dark fixed left-[50%] top-[50%]
w-full max-w-lg translate-x-[-50%] translate-y-[-50%]"
            >
              <DialogHeader className="flex flex-col items-center gap-4">
                <DialogTitle className="text-center">Order Summary</DialogTitle>

                {/* Products List */}
                <DialogDescription className="w-full flex flex-col gap-4">
                  <ScrollArea className="h-[400px] w-full rounded-md border p-4 dark:text-white">
                    {editingOrder?.trackedProducts?.map(
                      (product: any, index: number) => {
                        // Encuentra el producto correspondiente en purchaseOrderProducts
                        const purchaseOrderProduct =
                          editingOrder?.purchaseOrderProducts.find(
                            (p: any) => p.product_id === product.product_id
                          );
                        return (
                          <ul
                            key={index}
                            className="flex flex-col gap-2 dark:text-white pr-1"
                          >
                            <li className="flex justify-between items-center">
                              Product Name: <span>{product.product_name}</span>
                            </li>
                            <li className="flex justify-between items-center">
                              ASIN : <span>{product.ASIN}</span>
                            </li>
                            <li className="flex justify-between items-center">
                              Seller SKU: <span>{product.seller_sku}</span>
                            </li>
                            <li className="flex justify-between items-center">
                              Current Rank: <span>{product.current_rank}</span>
                            </li>
                            <li className="flex justify-between items-center">
                              30 Days Rank:{" "}
                              <span>{product.thirty_days_rank}</span>
                            </li>
                            <li className="flex justify-between items-center">
                              90 Days Rank:{" "}
                              <span>{product.ninety_days_rank}</span>
                            </li>
                            <li className="flex justify-between items-center">
                              Units Sold: <span>{product.units_sold}</span>
                            </li>
                            <li className="flex justify-between items-center">
                              Velocity: <span>{product.product_velocity}</span>
                            </li>

                            <li className="flex justify-between items-center">
                              Product Cost: <span>{product.product_cost}</span>
                            </li>
                            <li className="flex justify-between items-center">
                              Unit Price:{" "}
                              <Input
                                className="w-24 text-center"
                                type="number"
                                step="0.01" // Permite ingresar decimales
                                value={purchaseOrderProduct?.unit_price}
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value);
                                  purchaseOrderProduct!.unit_price = value;
                                  purchaseOrderProduct!.total_amount =
                                    value *
                                    purchaseOrderProduct!.quantity_purchased;
                                  setEditingOrder({
                                    ...editingOrder,
                                    purchaseOrderProducts: [
                                      ...editingOrder?.purchaseOrderProducts,
                                    ],
                                  });
                                }}
                              />
                            </li>

                            <li className="flex justify-between items-center">
                              Quantity Purchased:{" "}
                              <Input
                                className="w-24 text-center"
                                type="number"
                                value={purchaseOrderProduct?.quantity_purchased}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10);
                                  purchaseOrderProduct!.quantity_purchased =
                                    value;
                                  purchaseOrderProduct!.total_amount =
                                    value * purchaseOrderProduct!.unit_price;

                                  setEditingOrder({
                                    ...editingOrder,
                                    purchaseOrderProducts: [
                                      ...editingOrder?.purchaseOrderProducts,
                                    ],
                                  });
                                }}
                              />
                            </li>
                            <li className="flex justify-between items-center">
                              Total Amount:{" "}
                              <Input
                                className="w-24 text-center"
                                type="text"
                                disabled
                                value={`$ ${purchaseOrderProduct?.total_amount}`}
                              />
                            </li>

                            <Separator className="my-4" />
                          </ul>
                        );
                      }
                    )}
                  </ScrollArea>

                  <Button
                    className="w-full"
                    onClick={() => setIsAnalyticsModalOpen(true)}
                    variant="tvb"
                  >
                    Analyze Products
                  </Button>
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

                <Separator className="my-4" />

                {/* Status */}
                {/* <DialogDescription className="flex flex-col gap-2 w-full dark:text-white">
                  <h2>Status</h2>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="good_to_go">Good To Go</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </DialogDescription> */}
              </DialogHeader>

              <DialogFooter className="w-full flex flex-1 gap-2 item-center justify-between dark:text-white">
                <DialogPrimitive.Close className="w-full">
                  <Button
                    className="w-full"
                    type="submit"
                    variant={"tvb_invert"}
                  >
                    Discard
                  </Button>
                </DialogPrimitive.Close>
                <DialogPrimitive.Close className="w-full">
                  <Button
                    className="w-full"
                    type="submit"
                    variant={"tvb"}
                    onClick={handleUpdatePurchaseOrder}

                    // updatePOProducts(editingOrder?.id!!, poProductUpdates!!)
                  >
                    Confirm
                  </Button>
                </DialogPrimitive.Close>
              </DialogFooter>
            </DialogContent>
          </>
        )}
      </>
    </>
  );
}
