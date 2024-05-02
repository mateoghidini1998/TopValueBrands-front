"use client"
import Link from "next/link"
import Menu from "../menu/Menu"
import Users from "../svgs/Users"
import Shop from "../svgs/Shop"
import Search from "../svgs/Search"
import Package from "../svgs/Package"

const LINKS = [
    { title: "Inventory Management", href: '/', icon: <Search/> },
    { title: "PO Generator", href: '/pogenerator', icon: <Package/> },
    { title: "Warehouse", href: '/warehouse', icon: <Shop/> },
    { title: "Users ", href: '/users', icon: <Users/> },
]

const Navbar = () => {
    return (
        <nav className="flex flex-col min-w-[275px] border-r-[1px] border-r-[#262935] text-white box-border">
            <h1 className="text-lg font-bold px-12 pb-[70px] pt-9 text-center">Top Value Brands</h1>
            {/* Logo */}

            {/* Nav Items */} 
            <div className="flex flex-col items-center w-full">
                <Menu links={LINKS} />
            </div>

        </nav>
    )
}

export default Navbar;