import Search from "@/components/svgs/Search";
import Package from "@/components/svgs/Package";
import Shop from "@/components/svgs/Shop";
import Users from "@/components/svgs/Users";

export const LINKS = [
  {
    title: "Inventory Management",
    href: "/",
    icon: <Search />,
    subLinks: [
      { title: "Suppliers", href: "/suppliers", icon: <Users /> },
      // Puedes agregar más submenús aquí si es necesario
    ],
  },
  { title: "PO Generator", href: "/pogenerator/create", icon: <Package /> },
  { title: "Warehouse", href: "/warehouse/incoming-shipments", icon: <Shop /> },
  { title: "Users", href: "/users", icon: <Users /> },
];
