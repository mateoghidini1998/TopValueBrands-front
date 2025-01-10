import { Product } from "../../../outgoing-shipments/new-shipment/interfaces";
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
  purchaseOrderProduct: {
    id: number;
    Product: {
      product_name: string;
      product_image: string;
      seller_sku: string;
      in_seller_account: boolean;
    };
  };
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
