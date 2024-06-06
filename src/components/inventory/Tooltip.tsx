"use client";
import { useState } from "react";

type TooltipProps = {
  product_name: string;
  visible: boolean;
};

export const Tooltip = ({ product_name, visible }: TooltipProps) => {
  return (
    <div className="">
      {visible && (
        <>
          <div
            className="shadow-t-md absolute top-[43px] left-1/2 transform -translate-x-1/2 w-[11px] h-[11px] bg-white border-r-white
border-b-white dark:bg-[#262935] rotate-[45deg] z-[200] border-l dark:border-l-[#393E4F] border-r dark:border-r-[#262935] border-t dark:border-t-[#393E4F] border-b dark:border-b-[#262935]"
          ></div>

          <h2 className="shadow-md text-light rounded-lg flex flex-wrap overflow-visible w-fit h-fit bg-white absolute top-12 left-0 z-[100] p-4 border-[1px] border-solid dark:border-dark-3 border-light-3 dark:bg-dark-2 dark:text-white">
            {product_name}
          </h2>
        </>
      )}
    </div>
  );
};
