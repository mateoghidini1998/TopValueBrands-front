import { FilterSupplier } from "./FilterSupplier";
import { POGeneratorActiveLink } from "./POGeneratorActiveLink";

const navLinks = [
  {
    name: "Products",
    href: "/pogenerator",
  },
  {
    name: "Generator",
    href: "/pogenerator/create",
  },
  {
    name: "Orders",
    href: "/pogenerator/orders",
  },
];

export const POGeneratorNavbar = () => {
  return (
    <nav className="inventory_table_header h-[60px] flex justify-start items-center px-6 gap-6 bg-dark">
      <ul className="flex flex-row justify-start gap-6 items-center">
        {navLinks.map((link, index) => (
          <li key={index}>
            <POGeneratorActiveLink path={link.href} title={link.name} />
          </li>
        ))}
      </ul>
      <FilterSupplier/>
    </nav>
  )
}