import { FilterSupplier } from "./FilterSupplier";
import { POGeneratorActiveLink } from "./POGeneratorActiveLink";
import SearchInputPOGenerator from "./SearchInputPOGenerator";

interface NavLink {
  name: string;
  href: string;
}

export const POGeneratorNavbar = ({ navLinks }: any) => {
  return (
    <nav className="inventory_table_header h-[60px] flex justify-start items-center px-6 gap-6 bg-white dark:bg-dark">
      <ul className="flex flex-row justify-start gap-6 items-center">
        {navLinks?.map((link: NavLink, index: number) => (
          <li key={index}>
            <POGeneratorActiveLink path={link.href} title={link.name} />
          </li>
        ))}
      </ul>
      <SearchInputPOGenerator />
      <FilterSupplier />
    </nav>
  );
};
