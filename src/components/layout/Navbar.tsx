"use client"
import Menu from "../menu/Menu"
import useAuthContext from "@/contexts/auth.context"
import { LINKS } from '../../constants/links'

const Navbar = () => {
    const { user } = useAuthContext()

    const filteredLinks = LINKS.filter(link => {
        if (!user || (user.role !== 'admin' && (link.title === "Users" || link.title === "Inventory Management" || link.title === "PO Generator"))) {
            return false;
        }
        return true;
    });

    return (
        <nav className="flex flex-col min-w-[275px] border-r-[1px] border-r-[#262935] text-white box-border fixed">
            <h1 className="text-lg font-bold px-12 pb-[70px] pt-9 text-center">Top Value Brands</h1>
            {/* Logo */}

            {/* Nav Items */} 
            <div className="flex flex-col items-center w-full">
                <Menu links={filteredLinks} />
            </div>
        </nav>
    )
}


export default Navbar;