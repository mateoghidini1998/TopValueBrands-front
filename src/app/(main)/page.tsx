"use client"
import SearchInput from "@/components/inventory/SearchInput";
import UserMenu from "@/components/layout/UserMenu";
import DotsSVG from "@/components/svgs/DotsSVG";
import { InventoryService } from "@/services/inventory/inventory";
import { ProductType } from "@/types/product.types";
import { useEffect, useState } from "react";

export default function Home() {

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
      getProducts();
  }, []);

 const getProducts = async () => {
    try {
      const response = await InventoryService.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
 };

  

  return (
    <main className="flex w-full min-h-screen flex-col items-center">
      <div className="py-10 px-[46px] w-full">
        <div className="w-full flex justify-between items-center">
            <h4 className="text-white text-base font-bold leading-6">Inventory Management</h4>
            <div className="flex items-center">
              <SearchInput/>
              <UserMenu/>
            </div>
        </div>
      </div>
      <table className="w-full ">
        <tr className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[60px] w-full text-white bg-[#262935]">
          <th className="w-[25%] text-xs font-medium text-center">Product</th>
          <th className="w-[10%] text-xs font-medium text-center">ASIN</th>
          <th className="w-[10%] text-xs font-medium text-center">Amazon SKU</th>
          <th className="w-[5%] text-xs font-medium text-center">Cost</th>
          <th className="w-[10%] text-xs font-medium text-center">Supplier name</th>
          <th className="w-[10%] text-xs font-medium text-center">Supplier item No</th>
          <th className="w-[5%] text-xs font-medium text-center">Pack type</th>
          <th className="w-[10%] text-xs font-medium text-center">FBA Stock</th>
          <th className="w-[5%] text-xs font-medium text-center">Reserved quantity</th>
          <th className="w-[5%] text-xs font-medium text-center">Inbound to FBA</th>
        </tr>
        {
          Array.isArray(products) && products.slice(0, 10).map((product, index)    => (
          <tr key={index} className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[65px] w-full text-white bg-transparent border-b border-b-[#393E4F]">
            <td className="w-[25%] text-xs font-medium text-center">
              <div className="flex flex-col w-full h-full items-center text-center">
                <div className="w-8 h-8">
                  <img className="cover rounded-xl w-full h-full" src={product.product_image} alt="product_image" />
                </div>
                <span className="text-xs" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '250px' }}>
                  {product.product_name}
                </span>
              </div>
              
            </td>
            <td className="w-[10%] text-xs font-medium text-center">{product.ASIN}</td>
            <td className="w-[10%] text-xs font-medium text-center">{product.seller_sku}</td>
            <td className="w-[5%] text-xs font-medium text-center">{product.product_cost}</td>
            <td className="w-[10%] text-xs font-medium text-center">{product.supplier_name}</td>
            <td className="w-[10%] text-xs font-medium text-center">{product.supplier_item_number}</td>
            <td className="w-[5%] text-xs font-medium text-center">{product.pack_type}</td>
            <td className="w-[10%] text-xs font-medium text-center">{product.FBA_available_inventory}</td>
            <td className="w-[5%] text-xs font-medium text-center">{product.reserved_quantity}</td>
            <td className="w-[5%] text-xs font-medium text-center">{product.Inbound_to_FBA}</td>
            <td className="w-[5%] text-xs font-medium text-center">
              <button>
                <DotsSVG/>
              </button>
            </td>
          </tr>

          ))
        }
      </table>
    </main>
  );
}
