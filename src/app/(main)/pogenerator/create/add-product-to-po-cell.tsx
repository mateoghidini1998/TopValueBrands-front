"use client";
import AddButton from "@/components/svgs/AddButton";
import { useOrdersContext } from "@/contexts/orders.context";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
type AddToOrderCellProps = {
  row: any;
  purchaseOrderId: number;
  setTrackedProductsData: any;
};

export default function AddProductToPOCell({
  row,
  purchaseOrderId,
  setTrackedProductsData,
}: AddToOrderCellProps) {
  const { addProductToPO, getPurchaseOrderSummary } = useOrdersContext();
  return (
    <span
      className="flex items-right justify-end cursor-pointer"
      onClick={() => {
        addProductToPO(purchaseOrderId, [
          {
            product_id: row.original.product_id,
            quantity: 1,
            product_cost: row.original.product_cost,
            fees: row.original.fees,
            lowest_fba_price: row.original.lowest_fba_price,
          },
        ]);
        getPurchaseOrderSummary(purchaseOrderId).then((res: any) => {
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
                    matchingPurchaseOrderProduct.product_cost) *
                  100,
                purchase_order_product_profit: matchingPurchaseOrderProduct
                  ? parseFloat(matchingPurchaseOrderProduct.profit)
                  : null,
                purchase_order_product_id: matchingPurchaseOrderProduct
                  ? matchingPurchaseOrderProduct.id
                  : null,
                product_cost: matchingPurchaseOrderProduct
                  ? matchingPurchaseOrderProduct.product_cost
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
      }}
    >
      <AddButton />
    </span>
  );
}
