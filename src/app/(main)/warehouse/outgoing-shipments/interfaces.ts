export interface Shipment {
  id: number;
  shipment_number: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  PalletProducts: PalletProduct[];
}

export interface PalletProduct {
  id: number;
  purchaseorderproduct_id: number;
  pallet_id: number;
  quantity: number;
  available_quantity: number;
  createdAt: Date;
  updatedAt: Date;
  OutgoingShipmentProduct: OutgoingShipmentProduct;
  product_name: string;
  product_image: string;
  seller_sku: string;
}

export interface OutgoingShipmentProduct {
  quantity: number;
}
