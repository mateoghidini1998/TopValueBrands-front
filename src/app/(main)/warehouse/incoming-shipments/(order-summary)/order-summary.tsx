import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IPurchaseOrderSummary } from "@/types/product.types";
import { columns } from "./columns";
import useThemeContext from "@/contexts/theme.context";
import { DataTable } from "@/components/ui/data-table";

type OrderSummaryProps = {
  order: IPurchaseOrderSummary;
};

export default function OrderSummary({ order }: OrderSummaryProps) {
  const { sidebarOpen } = useThemeContext();

  const transformOrderData = (order: any) => {
    return order.purchaseOrderProducts.map((product: any, index: number) => ({
      purchase_order_product_id: order.purchaseOrderProducts[index]?.id,
      order_id: order?.id,
      order_number: order?.order_number,
      product_name:
        order.trackedProducts[index]?.product_name || product.product_name,
      product_image: order.trackedProducts[index]?.product_image || "N/A",
      ASIN: order.trackedProducts[index]?.ASIN || "N/A",
      seller_sku: order.trackedProducts[index]?.seller_sku || "N/A",
      quantity_purchased: product.quantity_purchased,
      quantity_received: product.quantity_received,
      quantity_missing: product.quantity_missing,
      reason_id: product.reason_id,
      notes: order.notes,
    }));
  };

  return (
    <>
      <DialogContent
        className={`flex flex-col gap-4 item-center justify-between dark:bg-dark fixed left-[50%] top-[50%] min-w-[85%] max-w-[70%] ${sidebarOpen ? "translate-x-[-42%]" : "translate-x-[-48%]"} translate-y-[-50%]`}
      >
        <DialogHeader className="flex flex-col items-center gap-4">
          <DialogTitle className="text-center">
            Order Summary - {order.order_number}
          </DialogTitle>

          <>
            <DataTable
              columns={columns}
              data={transformOrderData(order)}
              dataLength={6}
            />
          </>
        </DialogHeader>
      </DialogContent>
    </>
  );
}
