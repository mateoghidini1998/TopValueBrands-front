import Search from "@/components/svgs/Search"
import Package from "@/components/svgs/Package"
import Shop from "@/components/svgs/Shop"
import Users from "@/components/svgs/Users"

export const LINKS = [
    { title: "Inventory Management", href: '/', icon: <Search/> },
    { title: "PO Generator", href: '/pogenerator', icon: <Package/> },
    { title: "Warehouse", href: '/warehouse', icon: <Shop/> },
    { title: "Users", href: '/users', icon: <Users/> },
]