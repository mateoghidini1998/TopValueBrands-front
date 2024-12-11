export interface StorageProduct {
  id: number;
  purchaseorderproduct_id: number;
  pallet_id: number;
  quantity: number;
  available_quantity: number;
  product: Product;
  pallet_number: string;
  warehouse_location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShipmentProduct {
  pallet_product_id: number;
  quantity: number;
}

export interface PalletsByPO {
  pallet_id: number;
  purchase_order_id: number;
  pallet_number: string;
  products: Product[];
}

export interface Product {
  pallet_product_id: number;
  product_id: number;
  ASIN: string;
  seller_sku: string;
  product_image: string;
  product_name: string;
  quantity: number;
  available_quantity: number;
  pallet_number: string;
  in_seller_account?: boolean;
}

export interface PurchaseOrderData {
  order_number: string;
  purchase_order_id: number;
  pallets: PalletsByPO[];
}
