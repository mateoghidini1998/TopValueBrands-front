//* Get Products => IProduct

export interface IProductType {
  id: string;
  ASIN: string;
  product_image: string;
  product_name: string;
  seller_sku: string;

  FBA_available_inventory: number;
  reserved_quantity: number;
  Inbound_to_FBA: number;

  supplier_id: number;
  supplier_item_number: string;
  supplier_name?: string;
  supplier?: any;

  product_cost: number;

  pack_type: string;

  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Tracked Products

//* Get Tracked Products => ITrackedProduct

export interface ITrackedProduct {
  id: number;
  product_id: number;
  current_rank: number;
  thirty_days_rank: number;
  ninety_days_rank: number;
  units_sold: number;
  product_velocity: number;
  lowest_fba_price: number;
  fees: number;
  profit: number;
  createdAt: string;
  updatedAt: string;
  product_name: string;
  ASIN: string;
  seller_sku: string;
  product_cost: number;
  product_image: string;
  supplier_id: number;
  in_seller_account: boolean;
  supplier_name: string;
}

// Purchase Orders

//* Get Purchase Order => IPurchaseOrder

export interface IPurchaseOrder {
  id: number;
  notes: string;
  order_number: string;
  supplier_id: number;
  supplier_name: string;
  status: string;
  is_active: boolean;
  total_price: number;
  average_roi: number;
  createdAt: string;
  updatedAt: string;
  purchase_order_status_id: number;
  purchaseOrderStatus: IPurchaseOrderStatus;
  purchaseOrderProducts: IPurchaseOrderProduct[];
}

interface IPurchaseOrderStatus {
  description: string;
}

interface IPurchaseOrderProduct {
  id: number;
  purchase_order_id: number;
  product_id: number;
  unit_price: number;
  total_amount: number;
  quantity_purchased: number;
  quantity_received: number;
  quantity_missing: number;
  reason_id: number;
  createdAt: string;
  updatedAt: string;
  product_name: string;
}

//* Get Purchase Order Summary => IPurchaseOrderSummary

export interface IPurchaseOrderSummary {
  purchaseOrder: IPurchaseOrder;
  trackedProductsOfTheOrder: ITrackedProduct[];
}
