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
import { useEffect, useState } from "react";
import IndexPageContainer from "../../page.container";
import { TableComponent } from "../components/TableComponent";
import { Column } from "../interfaces/ITableComponent";

const columns: Column[] = [
  { key: "product_name", name: "Product", width: "20%" },
  { key: "ASIN", name: "ASIN", width: "150px" },
  { key: "seller_sku", name: "Amazon SKU", width: "150px" },
  { key: "supplier_name", name: "Supplier Name", width: "150px" },
  { key: "thirty_days_rank", name: "30 Day Rank", width: "150px" },
  { key: "ninety_days_rank", name: "90 Day Rank", width: "150px" },
  { key: "units_sold", name: "Units Sold", width: "150px" },
  { key: "product_velocity", name: "Velocity", width: "150px" },
  { key: "lowest_fba_price", name: "FBA Price ", width: "150px" },
  { key: "fees", name: "Fees", width: "150px" },
  { key: "product_cost", name: "Product Cost", width: "150px" },
  { key: "profit", name: "Profit", width: "150px" },
  { key: "roi", name: "ROI", width: "100px" },
  { key: "updatedAt", name: "Last Update", width: "150px" },
];

type OrderSummaryProps = {
  orderId: number;
};

export default function OrderSummary({ orderId }: OrderSummaryProps) {
  const { orders, updatePOProducts } = useOrdersContext();
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<IPurchaseOrder | null>(null);

  console.log(editingOrder);

  const [poProductUpdates, setPoProductUpdates] = useState<
    PurchaseOrderProductUpdates[]
  >([]);

  useEffect(() => {
    const order = orders.find((order) => order.id === orderId);
    if (order) {
      setEditingOrder(order);
    }
  }, [orderId, orders]);

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
              className="flex flex-col gap-4 item-center justify-between dark:bg-dark fixed left-[50%] top-[50%]
            w-full max-w-[1200px] translate-x-[-50%] translate-y-[-50%]"
            >
              <DialogHeader className="flex flex-col items-center gap-4">
                <IndexPageContainer>
                  <TableComponent<TrackedProductType>
                    hasOrderFilds={true}
                    columns={columns}
                    data={editingOrder?.trackedProducts!!}
                    nextPage={() => {}}
                    previousPage={() => {}}
                    totalPages={1}
                    setCurrentPage={() => {}}
                    currentPage={1}
                  />
                </IndexPageContainer>
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
                  <h2>Notes</h2>
                  <p>{editingOrder?.notes}</p>
                </DialogDescription>

                {/* Order Information */}
                <DialogDescription className="flex flex-col gap-2 w-full dark:text-white">
                  <div className="flex justify-between items-center">
                    <h2>Order Number</h2>
                    <p>{editingOrder?.order_number}</p>
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
                    onClick={() =>
                      updatePOProducts(editingOrder?.id!!, poProductUpdates!!)
                    }
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
