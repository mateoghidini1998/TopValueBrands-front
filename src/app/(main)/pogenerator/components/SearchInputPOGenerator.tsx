"use client";
import { useTrackedProductContext } from "@/contexts/trackedProducts.context";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchInputPOGenerator = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const { keyword, handleSetKeyword } = useTrackedProductContext();
  const route = usePathname();
  const isHome = route === "/pogenerator";
  const hidePlaceholder = () => setShowPlaceholder(!showPlaceholder);

  return (
    isHome && (
      <div
        className="flex justify-center h-[35px]"
        style={{ position: "relative" }}
      >
        {showPlaceholder && !keyword && (
          <div
            className="transition-colors duration-[0.6s] ease-in-out p-2 h-full w-full flex items-center text-black bg-[#F8FAFC] border-[#EFF1F3] dark:border-[#393E4F] border-solid border-[1px] rounded dark:bg-dark dark:text-light"
            style={{ position: "absolute", top: 0, pointerEvents: "none" }}
          >
            <span className="flex items-center justify-center w-3 h-3 mr-[5px]">
              <CiSearch />
            </span>
            <span className="text-xs font-medium text-[#55597D]">
              Search...
            </span>
          </div>
        )}
        <input
          onFocus={hidePlaceholder}
          onBlur={() => setShowPlaceholder(true)}
          onChange={(e) => handleSetKeyword(e.target.value)}
          className="transition-colors duration-[0.6s] ease-in-out p-2.5 flex w-[235px] justify-between items-center rounded bg-white dark:bg-dark-2 border border-solid border-[#393E4F] text-[#55597D]"
          type="text"
          id="search_product"
          placeholder=""
        />
      </div>
    )
  );
};

export default SearchInputPOGenerator;
