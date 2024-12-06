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

export interface Product {
  product_name: string;
  product_image: string;
  seller_sku: string;
  ASIN: string;
  in_seller_account: boolean;
}
