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

import { TrackedProductType } from "@/types/trackedProducts.types";
import { useState } from "react";
import IndexPageContainer from "../../page.container";
import { TableComponent } from "../components/TableComponent";
import { Column } from "../interfaces/ITableComponent";
import * as DialogPrimitive from "@radix-ui/react-dialog";

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
  order: any;
  trackedProductsFieldsToShow: string[];
  purchasedOrderProductsFieldsToShow: string[];
};

export default function OrderSummary({
  order,
  trackedProductsFieldsToShow,
  purchasedOrderProductsFieldsToShow,
}: OrderSummaryProps) {
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);

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
                    data={order.trackedProducts}
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
                    {order.trackedProducts?.map(
                      (product: any, index: number) => {
                        // Encuentra el producto correspondiente en purchaseOrderProducts
                        const purchaseOrderProduct =
                          order.purchaseOrderProducts.find(
                            (p: any) => p.product_id === product.product_id
                          );

                        // Función para formatear las claves como las necesitas
                        const formatKey = (key: string) => {
                          return key
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ");
                        };

                        return (
                          <ul
                            key={index}
                            className="flex flex-col gap-2 dark:text-white"
                          >
                            {Object.entries(product)
                              .filter(([key]) =>
                                trackedProductsFieldsToShow.includes(key)
                              )
                              .map(([key, value]: any) => (
                                <li
                                  key={key}
                                  className="flex justify-between items-center"
                                >
                                  <p>{formatKey(key)}:</p>
                                  <p>
                                    {typeof value === "number"
                                      ? value || 0
                                      : typeof value === "string"
                                        ? value
                                        : "N/A"}
                                  </p>
                                </li>
                              ))}

                            {/* Mostrar los datos de purchaseOrderProducts */}
                            {purchaseOrderProduct && (
                              <>
                                {Object.entries(purchaseOrderProduct)
                                  .filter(([key]) =>
                                    purchasedOrderProductsFieldsToShow.includes(
                                      key
                                    )
                                  )
                                  .map(([key, value]: any) => (
                                    <li
                                      key={key}
                                      className="flex justify-between items-center"
                                    >
                                      <p>{formatKey(key)}:</p>
                                      <p>
                                        {typeof value === "number"
                                          ? value || 0
                                          : typeof value === "string"
                                            ? value
                                            : "N/A"}
                                      </p>
                                    </li>
                                  ))}
                              </>
                            )}

                            {index !== order.trackedProducts.length - 1 && (
                              <Separator className="my-4" />
                            )}
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
                  <p>{order?.notes}</p>
                </DialogDescription>

                {/* Order Information */}
                <DialogDescription className="flex flex-col gap-2 w-full dark:text-white">
                  <div className="flex justify-between items-center">
                    <h2>Order Number</h2>
                    <p>{order?.order_number}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <h2>Supplier</h2>
                    <p>{order?.supplier_name}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <h2>Date</h2>
                    <p>{order?.createdAt}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <h2>Total</h2>
                    <p>{`$ ${order?.total_price}`}</p>
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
                  <Button className="w-full" type="submit" variant={"tvb"}>
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
