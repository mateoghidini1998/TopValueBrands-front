"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrdersContext } from "@/contexts/orders.context";
import { IPurchaseOrderSummary } from "@/types/product.types";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { columnsAvaliablePallet } from "./columns-avaliable-pallet";
import { columnsCreatePallet } from "./columns-create-pallet";

type OrderSummaryProps = {
  order: IPurchaseOrderSummary;
};

export default function OrderSummary({ order }: OrderSummaryProps) {
  const initialPalletData = {
    pallet_number: Math.floor(Math.random() * 1000000),
    warehouse_location_id: 0,
    purchase_order_id: order.id!!,
    products: [],
  };

  const transformOrderDataForSummary = (order: any) => {
    return order.purchaseOrderProducts.map((product: any, index: number) => ({
      purchase_order_product_id: product.id,
      order_id: order?.id,
      order_number: order?.order_number,
      product_name: product.product_name,
      product_image:
        order.trackedProducts.find(
          (p: any) => p.product_id === product.product_id
        )?.product_image || "N/A",
      ASIN:
        order.trackedProducts.find(
          (p: any) => p.product_id === product.product_id
        )?.ASIN || "N/A",
      seller_sku:
        order.trackedProducts.find(
          (p: any) => p.product_id === product.product_id
        )?.seller_sku || "N/A",
      quantity_purchased: product.quantity_purchased,
      quantity_received: product.quantity_received,
      quantity_missing: product.quantity_missing,
      quantity_avaliable: product.quantity_received,
      reason_id: product.reason_id,
      purchase_order_product_notes: product.notes,
      notes: order.notes,
      expire_date: product.expire_date,
    }));
  };

  const transformOrderDataProductsAvaliableToCreatePallet = (order: any) => {
    return order.purchaseOrderProducts.map((product: any, index: number) => ({
      order_id: order.id,
      purchase_order_product_id: product.id,
      product_name: product.product_name,
      product_image:
        order.trackedProducts.find(
          (p: any) => p.product_id === product.product_id
        )?.product_image || "N/A",
      ASIN:
        order.trackedProducts.find(
          (p: any) => p.product_id === product.product_id
        )?.ASIN || "N/A",
      seller_sku:
        order.trackedProducts.find(
          (p: any) => p.product_id === product.product_id
        )?.seller_sku || "N/A",
      quantity_received: product.quantity_received,
      quantity_avaliable: product.quantity_received,
    }));
  };

  const {
    productsAvaliableToCreatePallet,
    setProductsAvaliableToCreatePallet,
    productsAddedToCreatePallet,
    setProductsAddedToCreatePallet,
    createPallet,
  } = useOrdersContext();

  const [palletData, setPalletData] = useState<{
    pallet_number: number;
    warehouse_location_id: number;
    purchase_order_id: number | null;
    products: Array<{ purchaseorderproduct_id: string; quantity: number }>;
  }>(initialPalletData);

  const resetStates = () => {
    setPalletData({ ...initialPalletData });
    setProductsAvaliableToCreatePallet([]);
    setProductsAddedToCreatePallet([]);
  };

  useEffect(() => {
    if (order) {
      const transformedProducts =
        transformOrderDataProductsAvaliableToCreatePallet(order);
      setProductsAvaliableToCreatePallet(transformedProducts);
    }
  }, [order, setProductsAvaliableToCreatePallet]);

  useEffect(() => {
    if (productsAddedToCreatePallet.length > 0) {
      setPalletData((prevPalletData) => ({
        ...prevPalletData,
        products: productsAddedToCreatePallet.map((product: any) => ({
          purchaseorderproduct_id: product.purchase_order_product_id,
          quantity: product.quantity,
        })),
      }));
    }
  }, [productsAddedToCreatePallet]);

  return (
    <>
      <DialogContent
        className={`max-h-[95dvh] overflow-auto custom_scroll flex flex-col gap-4 item-center justify-between dark:bg-dark fixed left-[50%] top-[50%] min-w-[85%] max-w-[70%] translate-y-[-50%] translate-x-[-50%]`}
      >
        <DialogHeader className="flex flex-col items-center gap-4">
          <Tabs defaultValue="summary" className="w-full relative">
            <TabsContent value="summary">
              <DialogTitle className="text-left">
                Order Summary - {order.order_number}
              </DialogTitle>
              <DialogDescription className="w-full py-6">
                <DataTable
                  columns={columns}
                  data={transformOrderDataForSummary(order)}
                  dataLength={10}
                />
              </DialogDescription>
            </TabsContent>

            <TabsContent value="pallets">
              <DialogTitle className="text-left">
                Create Pallets - {order.order_number}
              </DialogTitle>
              <DialogDescription className="w-full">
                <DataTable
                  columns={columnsAvaliablePallet}
                  data={productsAvaliableToCreatePallet} // Usamos el estado aquí
                  dataLength={10}
                />
              </DialogDescription>
              <DialogDescription className="w-full">
                <DataTable
                  columns={columnsCreatePallet}
                  data={productsAddedToCreatePallet} // Usamos el estado aquí también
                  dataLength={10}
                />
              </DialogDescription>

              <DialogDescription className="w-full flex flex-col justify-end gap-2 py-6">
                <div className="flex flex-col gap-2 w-full">
                  <p className="font-bold text-lg w-full">Pallet Summary</p>
                  <Separator />
                  <ul className="flex flex-col gap-2 w-full">
                    <li className="">
                      Pallet Number: {palletData.pallet_number}
                    </li>
                    <li className=" flex gap-2 items-center justify-start">
                      Warehouse Location:
                      <Select
                        onValueChange={(value) => {
                          setPalletData({
                            ...palletData,
                            warehouse_location_id: parseInt(value),
                          });
                        }}
                      >
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Select warehouse location" />
                        </SelectTrigger>
                        <SelectContent className="w-[200px]">
                          <SelectItem value="1">A1</SelectItem>
                          <SelectItem value="2">A2</SelectItem>
                          <SelectItem value="3">B1</SelectItem>
                          <SelectItem value="4">B2</SelectItem>
                          <SelectItem value="5">C1</SelectItem>
                          <SelectItem value="6">C2</SelectItem>
                          <SelectItem value="7">D1</SelectItem>
                          <SelectItem value="8">D2</SelectItem>
                          <SelectItem value="9">E1</SelectItem>
                          <SelectItem value="10">E2</SelectItem>
                          <SelectItem value="11">Floor</SelectItem>
                        </SelectContent>
                      </Select>
                    </li>
                    <li className="">
                      Purchase Order Number: {order?.order_number}
                    </li>

                    <li>Date: {new Date().toLocaleDateString("en-US", {})}</li>

                    <li className="">
                      Total Quantity:{" "}
                      {productsAddedToCreatePallet.reduce(
                        (acc, product) => acc + product.quantity,
                        0
                      )}
                    </li>
                  </ul>
                </div>

                <div className="flex gap-2 w-[300px] absolute bottom-0 left-0">
                  <Button
                    value="default"
                    className="w-[100px]"
                    onClick={() => createPallet(palletData)}
                  >
                    Save
                  </Button>
                </div>
              </DialogDescription>
            </TabsContent>

            <TabsList className="w-[350px] grid ml-auto grid-cols-2">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="pallets">Pallets</TabsTrigger>
            </TabsList>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </>
  );
}
