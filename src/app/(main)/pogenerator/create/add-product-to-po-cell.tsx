"use client";
import AddButton from "@/components/svgs/AddButton";
import { useOrdersContext } from "@/contexts/orders.context";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
type AddToOrderCellProps = {
  row: any;
  editingOrder: any;
  setEditingOrder: any;
  setTrackedProductsData: any;
  setPoProductUpdates: any;
};

export default function AddProductToPOCell({
  row,
  editingOrder,
  setEditingOrder,
  setTrackedProductsData,
  setPoProductUpdates,
}: AddToOrderCellProps) {
  const { addProductToPO, getPurchaseOrderSummary } = useOrdersContext();

  // console.log(row.original);
  return (
    <span
      className="flex items-right justify-end cursor-pointer"
      onClick={async () => {
        const response = await addProductToPO(editingOrder.id, [
          {
            product_id: row.original.product_id,
            quantity: 1,
            product_cost: row.original.product_cost,
            fees: row.original.fees,
            lowest_fba_price: row.original.lowest_fba_price,
          },
        ]);
        await getPurchaseOrderSummary(editingOrder.id).then((res: any) => {
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

        console.log(response);

        await setEditingOrder((prev: any) => {
          // Create a copy of the purchaseOrderProducts array
          const updatedProducts = [...prev.purchaseOrderProducts];

          // Push the new product object into the copied array
          updatedProducts.push({
            purchase_order_id: prev.id,
            // @ts-ignore
            id: response.data.purchaseOrderProducts.find((product: any) => {
              return product.product_id === row.original.product_id;
            }).id,
            quantity_purchased: 1,
            product_cost: row.original.product_cost,
            profit:
              row.original.lowest_fba_price -
              row.original.fees -
              row.original.product_cost,
          });

          // Return the updated state with the modified purchaseOrderProducts array
          return {
            ...prev,
            purchaseOrderProducts: updatedProducts,
          };
        });

        // if (editingOrder) {
        //   await setPoProductUpdates(
        //     editingOrder.purchaseOrderProducts.map((product: any) => {
        //       return {
        //         purchaseOrderProductId: product.id,
        //         quantityPurchased: product.quantity_purchased,
        //         product_cost: product.product_cost,
        //         profit: product.profit,
        //       };
        //     })
        //   );
        // }
        // await setPoProductUpdates((prev: any) => {
        //   return [
        //     ...prev,
        //     {
        //       purchaseOrderProductId: row.original.product_id,
        //       quantityPurchased: 1,
        //       product_cost: row.original.product_cost,
        //       profit:
        //         row.original.lowest_fba_price -
        //         row.original.fees -
        //         row.original.product_cost,
        //     },
        //   ];
        // });
      }}
    >
      <AddButton />
    </span>
  );
}
