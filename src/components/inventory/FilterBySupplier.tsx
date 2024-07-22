"use client";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useProductContext } from "@/contexts/products.context";
import { usePathname } from "next/navigation";
import { useSupplierContext } from "@/contexts/suppliers.context";

const Placeholder = ({ showPlaceholder, keyword }: any) =>
  showPlaceholder &&
  !keyword && (
    <div className="transition-colors duration-[0.6s] ease-in-out p-2 h-full w-full flex items-center text-black bg-[#F8FAFC] border-[#EFF1F3] dark:border-[#393E4F] border-solid border-[1px] rounded dark:bg-dark dark:text-light absolute top-0 pointer-events-none">
      <span className="flex items-center justify-center w-3 h-3 mr-[5px]">
        <CiSearch />
      </span>
      <span className="text-xs font-medium text-[#55597D]">
        Filter by supplier
      </span>
    </div>
  );

const SupplierSelect = ({
  hidePlaceholder,
  setShowPlaceholder,
  handleSetKeyword,
}: any) => {
  const { suppliers } = useSupplierContext();
  return (
    <select
      onFocus={hidePlaceholder}
      onBlur={() => setShowPlaceholder(true)}
      onChange={(e) => handleSetKeyword(e.target.value)}
      className="py-2 transition-colors duration-[0.6s] ease-in-out p-2.5 flex w-[235px] justify-between items-center rounded bg-white dark:bg-dark-2 border border-solid border-[#393E4F] text-[#55597D] text-xs font-medium"
      id="search_product"
      aria-label="Filter products by supplier"
    >
      <option value="">All suppliers</option>
      {suppliers?.map((supplier: any) => (
        <option key={supplier.id} value={supplier.supplier_name}>
          {supplier.supplier_name}
        </option>
      ))}
    </select>
  );
};

const FilterBySupplier = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const { keyword, handleSetKeyword } = useProductContext();
  const route = usePathname();
  const isHome = route === "/";
  const hidePlaceholder = () => setShowPlaceholder(!showPlaceholder);

  return (
    isHome && (
      <div className="flex justify-center h-[35px] relative">
        <Placeholder showPlaceholder={showPlaceholder} keyword={keyword} />
        <SupplierSelect
          hidePlaceholder={hidePlaceholder}
          setShowPlaceholder={setShowPlaceholder}
          handleSetKeyword={handleSetKeyword}
        />
      </div>
    )
  );
};

export default FilterBySupplier;
