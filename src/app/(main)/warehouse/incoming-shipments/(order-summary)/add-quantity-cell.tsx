import { Input } from "@/components/ui/input";

export default function AddQuantityCell() {
  // const { addItemsToPallet } = usePalletContext();

  return (
    <Input
      className="w-24 text-xs"
      type="number"
      // defaultValue={quantity}
      // onChange={(event) => handleInputChange(event, row, "quantity")}
    />
  );
}
