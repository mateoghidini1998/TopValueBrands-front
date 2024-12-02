export type Props = {
  params: { id: string };
};

export type PalletProduct = {
  product_name: string;
  product_image: string;
  seller_sku: string;
  purchaseorderproduct_id: number;
  pallet_id: number;
  quantity: number;
  available_quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type Pallet = {
  id: number;
  pallet_number: string;
  warehouse_location_id: number;
  purchase_order_id: number;
  createdAt: string;
  updatedAt: string;
  PalletProducts: PalletProduct[];
  warehouseLocation: {
    id: number;
    location: string;
  };
  purchaseOrder: {
    id: number;
    order_number: string;
  };
};
