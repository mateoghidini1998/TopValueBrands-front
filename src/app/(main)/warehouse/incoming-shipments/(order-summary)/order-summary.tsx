import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IPurchaseOrderSummary } from "@/types/product.types";
import { DataTable } from "../data-table";
import { columns } from "./columns";

type OrderSummaryProps = {
  order: IPurchaseOrderSummary;
};

export default function OrderSummary({ order }: OrderSummaryProps) {
  // Función para transformar los datos
  const transformOrderData = (order: any) => {
    return order.purchaseOrderProducts.map((product: any, index: number) => ({
      product_name:
        order.trackedProducts[index]?.product_name || product.product_name,
      product_image: order.trackedProducts[index]?.product_image || "N/A",
      ASIN: order.trackedProducts[index]?.ASIN || "N/A",
      seller_sku: order.trackedProducts[index]?.seller_sku || "N/A",
      quantity_purchased: product.quantity_purchased,
      quantity_received: product.quantity_received,
      reason_id: product.reason_id,
      notes: order.notes,
    }));
  };

  return (
    <>
      <DialogContent className="flex flex-col gap-4 item-center justify-between dark:bg-dark fixed left-[50%] top-[50%] max-w-[70%] w-fit translate-x-[-50%] translate-y-[-50%]">
        <DialogHeader className="flex flex-col items-center gap-4">
          <DialogTitle className="text-center">Order Summary</DialogTitle>

          <DialogDescription>
            <DataTable columns={columns} data={transformOrderData(order)} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </>
  );
}
