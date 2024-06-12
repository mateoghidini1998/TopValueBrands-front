export interface TrackedProducts {
  product: string;
  supplier_name: string;
  asin: string;
  amazon_sku: string;
  current_rank: number;
  "30_day_rank": number;
  "90_day_rank": number;
  units_sold: number;
  velocity: number;
}
