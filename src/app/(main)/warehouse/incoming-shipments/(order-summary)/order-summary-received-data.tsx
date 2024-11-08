"use client";
import { DataTable } from "@/components/ui/data-table";
import { DialogDescription } from "@/components/ui/dialog";
import { useOrdersContext } from "@/contexts/orders.context";
import { useEffect, useState } from "react";
import { getColumns, IncomingShipmentsOrderSummaryProps } from "./columns";

type OrderSummaryReceivedDataProps = {
  orderId: number;
};

export const OrderSummaryReceivedData = ({
  orderId,
}: OrderSummaryReceivedDataProps) => {
  const transformDataForDateTable = (
    data: any
  ): IncomingShipmentsOrderSummaryProps[] => {
    const { purchaseOrder, trackedProductsOfTheOrder } = data;

    return purchaseOrder.purchaseOrderProducts.map((product: any) => {
      const trackedProduct = trackedProductsOfTheOrder.find(
        (tp: any) => tp.product_id === product.product_id
      );

      return {
        purchase_order_product_id: product.id,
        product_name: trackedProduct
          ? trackedProduct.product_name
          : "Unknown Product",
        product_image: trackedProduct ? trackedProduct.product_image : "",
        ASIN: trackedProduct ? trackedProduct.ASIN : "N/A",
        seller_sku: trackedProduct ? trackedProduct.seller_sku : "N/A",
        order_id: purchaseOrder.id.toString(),
        order_number: purchaseOrder.order_number,
        supplier_name: trackedProduct
          ? trackedProduct.supplier_name
          : "Unknown Supplier",
        reason_id: product.reason_id,
        quantity_purchased: product.quantity_purchased,
        quantity_missing: product.quantity_missing,
        quantity_received: product.quantity_received,
        expire_date: product.expire_date,
      };
    });
  };

  const { getPurchaseOrderSummary } = useOrdersContext();

  const [data, setData] = useState<IncomingShipmentsOrderSummaryProps[]>([]);

  useEffect(() => {
    getPurchaseOrderSummary(orderId).then((res: any) => {
      // console.log(res.data);

      const transformedData = transformDataForDateTable(res.data);
      setData(transformedData);
    });
  }, [orderId, getPurchaseOrderSummary]);

  // console.log(data);

  return (
    <DialogDescription className="w-full">
      <DataTable
        columns={getColumns(setData)}
        data={data} // Usa los datos transformados
        dataLength={10}
      />
    </DialogDescription>
  );
};
