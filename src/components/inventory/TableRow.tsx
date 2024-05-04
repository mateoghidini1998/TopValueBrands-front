"use client"
import { InventoryService } from "@/services/inventory/inventory";
import { ProductType } from "@/types/product.types";
import { useEffect, useState } from "react";
import DotsSVG from "../svgs/DotsSVG";
import Image from "next/image";

type TableRowProps = {
  currentPage: number,
  limit: number
}

const TableRow = ({ currentPage, limit }: TableRowProps) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    

    useEffect(() => {
        getProducts(currentPage, limit);
    }, [currentPage, limit]);


    const getProducts = async (page: number, limit: number) => {
      try {
          const response = await InventoryService.getProducts(page, limit);
          setProducts(response.data);
      } catch (error) {
          console.error(error);
      }
    };

    return (
        <>
            {
          Array.isArray(products) && products.map((product, index)    => (
          <tr key={index} className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[65px] w-full text-white bg-transparent border-b border-b-[#393E4F]">
            <td className="w-[25%] text-xs font-medium text-center">
              <div className="flex flex-col w-full h-full items-center text-center">
                <div className="w-8 h-8">
                  <Image 
                  className="cover rounded-xl w-full h-full" 
                  src={product.product_image} 
                  width={32}
                  height={32}
                  alt="product_image" 
                  placeholder="blur"
                  blurDataURL="data:image/jpeg"
                  />
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
        </>
    );
};

export default TableRow;
