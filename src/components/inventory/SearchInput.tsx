"use client";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useProductContext } from "@/contexts/products.context";
import { usePathname } from "next/navigation";

const SearchInput = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const { keyword, handleSetKeyword } = useProductContext();
  const route = usePathname();
  const isHome = route === "/";
  const hidePlaceholder = () => setShowPlaceholder(!showPlaceholder);


  return (
    isHome &&
    <div
      className="flex justify-center h-[35px]"
      style={{ position: "relative" }}
    >
      {showPlaceholder && !keyword && (
        <div
          className="p-2 h-full w-full flex items-center text-[#55597D]"
          style={{ position: "absolute", top: 0, pointerEvents: "none" }}
        >
          <span className="flex items-center justify-center w-3 h-3 mr-[5px]">
            <CiSearch />
          </span>
          <span className="text-xs font-medium">Search...</span>
        </div>
      )}
      <input
        onFocus={hidePlaceholder}
        onBlur={() => setShowPlaceholder(true)}
        onChange={(e) => handleSetKeyword(e.target.value)}
        className="p-2.5 flex w-[235px] justify-between items-center rounded bg-[#262935] border border-solid border-[#393E4F]"
        type="text"
        id="search_product"
        placeholder=""
      />
    </div>
  );
};

export default SearchInput;
