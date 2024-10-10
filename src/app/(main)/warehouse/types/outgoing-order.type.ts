import { IPurchaseOrder } from "@/types/product.types";

export type IcomingOrderType = {
  id: number;
  notes: string;
  order_number: string;
  supplier_id: number;
  supplier_name?: string;
  status: string | null;
  total_price: number;
  createdAt: string;
  updatedAt: string;
  purchaseOrderProducts: IPurchaseOrder[];
};
