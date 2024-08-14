import Link from "next/link";
import { useRef, useState } from "react";
import EmptyImage from "../svgs/EmptyImage";
import { Tooltip } from "./Tooltip";

type ProductNameTableDataProps = {
  product: any;
  width: any;
};

export const ProductNameTableData = ({
  product,
  width,
}: ProductNameTableDataProps) => {
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

  console.log(product);

  return (
    <td
      style={{ width: width }}
      className={` text-xs font-medium text-left p-3 h-fit relative`}
    >
      <div className="relative flex w-full h-full items-center justify-between text-left">
        <div className="h-8 gap-2 flex items-center justify-between">
          {product?.product_image ? (
            <div className="">
              <Link
                target="a_blank"
                href={`https://www.amazon.com/dp/${product?.ASIN}`}
              >
                {/* <Image
                            loading="lazy"
                            className="cover rounded-xl w-8 h-8"
                            src={product?.product_image}
                            width={32}
                            height={32}
                            alt="product_image"
                            blurDataURL="data:image/jpeg"
                          /> */}
                <img
                  src={product?.product_image}
                  alt="product_image"
                  loading="lazy"
                  className="cover rounded-xl w-8 h-8"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </Link>
            </div>
          ) : (
            <div className="h-8 bg-light-2 shadow-sm dark:bg-dark-2 rounded-lg flex items-center justify-center">
              <EmptyImage />
            </div>
          )}
          {product.in_seller_account !== undefined && (
            <div
              className={`w-2 h-2 rounded-full ${
                product?.in_seller_account ? "bg-[#00952A]" : "bg-[#ef4444]"
              }`}
            ></div>
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
          onMouseEnter={() => handleMouseEnter(product?.product_name)}
          onMouseLeave={handleMouseLeave}
        >
          {product?.product_name}
        </span>
      </div>
      {tooltipVisible && tooltipText === product?.product_name && (
        <Tooltip
          product_name={product?.product_name}
          visible={tooltipVisible}
        />
      )}
    </td>
  );
};
