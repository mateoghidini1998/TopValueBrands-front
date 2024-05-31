"use client";
import { useState } from "react";

type TooltipProps = {
  product_name: string;
};

export const Tooltip = ({ product_name }: TooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute z-50 h-[20px] p-0 hover:p-6 rounded-sm bg-transparent top-[50px] left-5 w-11/12 hover:h-auto hover:bg-white hover:text-[#61656E] dark:hover:bg-[#262935] dark:hover:text-white">
        {isHovered && (
          <>
            <div className="absolute h-0 w-0 border-[10px] border-transparent dark:border-t-[#262935] left-1/2 transform -translate-x-1/2 bg-transparent top-[-16px] rotate-180 border-t-[#61656E]"></div>
            <p>{product_name}</p>
          </>
        )}
      </div>
    </div>
  );
};
