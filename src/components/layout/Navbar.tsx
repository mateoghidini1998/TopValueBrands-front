"use client"
import Link from "next/link"
import Menu from "../menu/Menu"
import { LuStore } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { PiPackageLight } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";

const LINKS = [
    { title: "Inventory Management", href: '/', icon: <TbReportSearch /> },
    { title: "PO Generator", href: '/pogenerator', icon: <PiPackageLight /> },
    { title: "Warehouse", href: '/warehouse', icon: <LuStore /> },
    { title: "Users ", href: '/users', icon: <FaUsers /> },
]

const Navbar = () => {
    return (
        <nav className="flex flex-col w-[275px] border-r-[1px] border-r-[#262935] text-white">
            <h1 className="text-lg font-bold px-10 py-8 text-center mb-10">Top Value Brands</h1>
            {/* Logo */}

            {/* Nav Items */} 
            <div className="flex flex-col items-center w-full">
                <Menu links={LINKS} />
            </div>

        </nav>
    )
}

export default Navbar;