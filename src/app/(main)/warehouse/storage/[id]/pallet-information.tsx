import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Package from "@/components/svgs/Package";
import { MapPin, ShoppingCart, Calendar } from "lucide-react";
import { Pallet } from "./types/interfaces";
type PalletInformationProps = {
  pallet: Pallet;
};

const PalletInformation = ({ pallet }: PalletInformationProps) => {
  console.log(pallet);

  return (
    <Card className="dark:bg-dark">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package />
          Pallet Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-4 gap-4">
          <div>
            <dt className="font-medium text-gray-500">Pallet Number</dt>
            <dd>{`#${pallet.pallet_number}`}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Warehouse Location</dt>
            <dd className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {pallet.warehouseLocation.location}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Purchase Order</dt>
            <dd className="flex items-center gap-1">
              <ShoppingCart className="h-4 w-4" />
              {pallet.purchaseOrder.order_number}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Created At</dt>
            <dd className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(pallet.createdAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export default PalletInformation;
