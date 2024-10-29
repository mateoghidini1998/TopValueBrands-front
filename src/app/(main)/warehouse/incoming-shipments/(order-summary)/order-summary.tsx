import { DataTable } from "@/components/ui/data-table";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IPurchaseOrderSummary } from "@/types/product.types";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columnsAvaliablePallet } from "./columns-avaliable-pallet";
import { columnsCreatePallet } from "./columns-create-pallet";

type OrderSummaryProps = {
  order: IPurchaseOrderSummary;
};

export default function OrderSummary({ order }: OrderSummaryProps) {
  const transformOrderDataForSummary = (order: any) => {
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
      purchase_order_product_notes: product.notes,
      notes: order.notes,
      expire_date: product.expire_date,
    }));
  };

  return (
    <>
      <DialogContent
        className={`max-h-[95dvh] overflow-auto custom_scroll flex flex-col gap-4 item-center justify-between dark:bg-dark fixed left-[50%] top-[50%] min-w-[85%] max-w-[70%] translate-y-[-50%] translate-x-[-50%]`}
      >
        <DialogHeader className="flex flex-col items-center gap-4">
          <Tabs defaultValue="summary" className="w-full">
            <TabsContent value="summary">
              <DialogTitle className="text-left">
                Order Summary - {order.order_number}
              </DialogTitle>
              <DialogDescription className="w-full">
                <DataTable
                  columns={columns}
                  data={transformOrderDataForSummary(order)}
                  dataLength={6}
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
                  data={transformOrderDataForSummary(order)}
                  dataLength={6}
                />
              </DialogDescription>
              <DialogDescription className="w-full">
                <DataTable
                  columns={columnsCreatePallet}
                  data={transformOrderDataForSummary(order)}
                  dataLength={6}
                />
              </DialogDescription>
            </TabsContent>

            <TabsList className="grid w-[200px] ml-auto grid-cols-2">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="pallets">Pallets</TabsTrigger>
            </TabsList>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </>
  );
}
