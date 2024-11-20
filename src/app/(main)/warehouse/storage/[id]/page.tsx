import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, ShoppingCart, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  params: { id: string };
};

type PalletProduct = {
  purchaseorderproduct_id: number;
  pallet_id: number;
  quantity: number;
  available_quantity: number;
  createdAt: string;
  updatedAt: string;
};

type Pallet = {
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

type ApiResponse = {
  pallet: Pallet;
};

export default async function StoragePage({ params }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pallets/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: ApiResponse = await res.json();

  const { pallet } = data;

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-6">Pallet Details</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="dark:bg-[#111318]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Pallet Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium text-gray-500">Pallet ID</dt>
                <dd>{`#${pallet.id}`}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Pallet Number</dt>
                <dd>{`#${pallet.pallet_number}`}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">
                  Warehouse Location
                </dt>
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
              <div>
                <dt className="font-medium text-gray-500">Updated At</dt>
                <dd className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(pallet.updatedAt).toLocaleString()}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="dark:bg-[#111318]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Pallet Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Available</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pallet.PalletProducts.map((product) => (
                  <TableRow key={product.purchaseorderproduct_id}>
                    <TableCell>{product.purchaseorderproduct_id}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.available_quantity > 0
                            ? "Good to go"
                            : "Rejected"
                        }
                      >
                        {product.available_quantity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
