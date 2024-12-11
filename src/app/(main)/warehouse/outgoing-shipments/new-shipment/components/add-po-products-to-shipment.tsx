import AddButton from "@/components/svgs/AddButton";
import { Button } from "@/components/ui/button";
import { Product } from "../interfaces";

interface AddPOProductsToShipmentProps {
  products: Product[];
  addProducts: (products: Product[]) => void;
}

export default function AddPOProductsToShipment({
  products,
  addProducts,
}: AddPOProductsToShipmentProps) {
  const handleAddProduct = (products: Product[]) => {
    addProducts(products);
  };

  return (
    <Button variant="ghost" onClick={() => handleAddProduct(products)}>
      <AddButton />
    </Button>
  );
}
