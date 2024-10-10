import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <DialogContent className="flex flex-col gap-4 item-center justify-between">
      <DialogHeader className="flex flex-col items-center gap-4">
        <DialogTitle className="text-center">Order Summary</DialogTitle>

        {/* Products List */}
        <DialogDescription className="w-full flex flex-col gap-4">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {order.trackedProducts?.map((product: any, index: number) => {
              // Encuentra el producto correspondiente en purchaseOrderProducts
              const purchaseOrderProduct = order.purchaseOrderProducts.find(
                (p: any) => p.product_id === product.product_id
              );

              // Función para formatear las claves como las necesitas
              const formatKey = (key: string) => {
                return key
                  .split("_") // Divide las palabras por el guion bajo
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  ) // Convierte la primera letra de cada palabra a mayúscula
                  .join(" "); // Junta las palabras con un espacio
              };

              return (
                <ul key={index} className="flex flex-col gap-2">
                  {/* Mostrar los campos de trackedProductsFieldsToShow */}
                  {Object.entries(product)
                    .filter(([key]) =>
                      trackedProductsFieldsToShow.includes(key)
                    ) // Filtra los campos a mostrar
                    .map(([key, value]: any) => (
                      <li
                        key={key}
                        className="flex justify-between items-center"
                      >
                        <p>{formatKey(key)}:</p>{" "}
                        <p>
                          {" "}
                          {typeof value === "number"
                            ? value || 0
                            : typeof value === "string"
                              ? value
                              : "N/A"}{" "}
                        </p>
                      </li>
                    ))}

                  {/* Mostrar los datos de purchaseOrderProducts */}
                  {purchaseOrderProduct && (
                    <>
                      {Object.entries(purchaseOrderProduct)
                        .filter(([key]) =>
                          purchasedOrderProductsFieldsToShow.includes(key)
                        ) // Filtra los campos a mostrar
                        .map(([key, value]: any) => (
                          <li
                            key={key}
                            className="flex justify-between items-center"
                          >
                            <p>{formatKey(key)}:</p>{" "}
                            <p>
                              {" "}
                              {typeof value === "number"
                                ? value || 0
                                : typeof value === "string"
                                  ? value
                                  : "N/A"}{" "}
                            </p>
                          </li>
                        ))}
                    </>
                  )}

                  {/* Separador entre productos */}
                  {index !== order.trackedProducts.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </ul>
              );
            })}
          </ScrollArea>

          <Button className="w-full" type="submit">
            Analyze Products
          </Button>
        </DialogDescription>

        {/* Notes */}
        <DialogDescription className="flex flex-col gap-2 w-full">
          <h2>Notes</h2>
          <p>{order?.notes}</p>
        </DialogDescription>

        {/* Order Information */}
        <DialogDescription className="flex flex-col gap-2 w-full">
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
        <DialogDescription className="flex flex-col gap-2 w-full">
          <h2>Status</h2>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Fruits</SelectLabel> */}
                <SelectItem value="good_to_go">Good To Go</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </DialogDescription>
      </DialogHeader>

      {/* Dialog Footer */}
      <DialogFooter className="w-full flex flex-col gap-2 item-center justify-between">
        <Button className="w-full" type="submit">
          Confirm
        </Button>
        <Button className="w-full" type="submit">
          Discard
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
