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

export const MAIN_ROUTES = [
  { title: "Inventory Management", href: "/", icon: <Search /> },
  {
    title: "PO Generator - Create",
    href: "/pogenerator/create",
    icon: <Package />,
  },
  {
    title: "PO Generator - Orders",
    href: "/pogenerator/orders",
    icon: <Package />,
  },
  {
    title: "Warehouse - Incoming Shipments",
    href: "/warehouse/incoming-shipments",
    icon: <Shop />,
  },
  {
    title: "Warehouse - Outgoing Shipments",
    href: "/warehouse/outgoing-shipments",
    icon: <Shop />,
  },
  {
    title: "Warehouse - New Shipmnennt",
    href: "/warehouse/outgoing-shipments/new-shipment",
    icon: <Shop />,
  },
  { title: "Warehouse - Storage", href: "/warehouse/storage", icon: <Shop /> },
  { title: "Users", href: "/users", icon: <Users /> },
  { title: "Suppliers", href: "/suppliers", icon: <Users /> },
];
