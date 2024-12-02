import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Package from "@/components/svgs/Package";
import { PalletProduct } from "./types/interfaces";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

type PalletProductsProps = {
  palletProducts: PalletProduct[];
};

const PalletProducts = ({ palletProducts }: PalletProductsProps) => (
  <Card className="dark:bg-dark">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Package />
        Pallet Products
      </CardTitle>
    </CardHeader>
    <CardContent>
      <DataTable columns={columns} data={palletProducts} />
    </CardContent>
  </Card>
);

export default PalletProducts;
