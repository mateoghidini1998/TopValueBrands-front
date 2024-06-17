import Image from "next/image";
import Link from "next/link";
import EmptyImage from "../svgs/EmptyImage";
import { ProductType } from "@/types/product.types";
import { useRef, useState } from "react";
import { Tooltip } from "./Tooltip";

type ProductNameTableDataProps = {
  product: any;
  width: any;
};

export const ProductNameTableData = ({product, width}: ProductNameTableDataProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState<string>("");
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = (product_name: string) => {
    setTooltipText(product_name);
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipText("");
    setTooltipVisible(false);
  };

  // console.log(product.product.product_name);

  return (
    <td style={{width:width}} className={` text-xs font-medium text-left p-3 h-fit relative`}>
      <div className="relative flex w-full h-full items-center justify-between text-left">
        <div className="w-8 h-8">
          {product.product_image ? (
            <Link
              target="a_blank"
              href={`https://www.amazon.com/dp/${product.ASIN}`}
            >
              <Image
                className="cover rounded-xl w-full h-full"
                src={product.product_image}
                width={32}
                height={32}
                alt="product_image"
                blurDataURL="data:image/jpeg"
              />
            </Link>
          ) : (
            <div className="w-full h-full bg-light-2 shadow-sm dark:bg-dark-2 rounded-lg flex items-center justify-center">
              <EmptyImage />
            </div>
          )}
        </div>
        <span
          ref={spanRef}
          className="text-xs limited-wrap"
          style={{
            cursor: "pointer",
            position: "relative",
            width: "80%",
          }}
          onMouseEnter={() => handleMouseEnter(product.product_name)}
          onMouseLeave={handleMouseLeave}
        >
          {product.product_name}
        </span>
      </div>
      {tooltipVisible && tooltipText === product.product_name && (
        <Tooltip product_name={product.product_name} visible={tooltipVisible} />
      )}
    </td>
  );
};
