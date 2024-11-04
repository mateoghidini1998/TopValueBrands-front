export type TrackedProductType = {
  id: number;
  purchase_order_product_id?: number;
  product_image?: string;
  product_name: string;
  // supplier_name?: string;
  asin: string;
  amazon_sku: string;
  "30_day_rank": number;
  "90_day_rank": number;
  lowest_fba_price: number;
  fees: number;
  product_cost: number;
  profit: number;
  units_sold: number;
  velocity: number;
};
