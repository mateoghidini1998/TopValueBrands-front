import { OrderProductType } from "@/contexts/orders.context";

export type OutgoingOrderType = {
  id: number;
  notes: string;
  order_number: string;
  supplier_id: number;
  supplier_name?: string;
  status: string | null;
  total_price: number;
  createdAt: string;
  updatedAt: string;
  purchaseOrderProducts: OrderProductType[];
};
