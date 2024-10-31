interface PalletPOProduct {
  id: number;
  PalletProduct: {
    quantity: number;
    avaliable_quantity: number;
  };
}

interface PalletType {
  id: number;
  pallet_number: string;
  warehouse_location_id: number;
  purchase_order_id: number;
  createdAt: string;
  updatedAt: string;

  purchaseOrderProducts: PalletPOProduct[];
}
