"use client"
import { LinkType } from "@/types/link.types"
import { useState } from "react"
import { usePathname } from "next/navigation"

type MenuProps = {
  links: LinkType[]
}

const Menu = ({links}: MenuProps) => {

    const [ activeLink, setActiveLink ] = useState()
    const pathname = usePathname()

    return (
        <ul className="flex flex-col items-start w-full">
            {links.map((link, index) => (
                <li key={`${index}`} className="mb-6 w-full flex items-center justify-start">
                    <div className={`w-full flex py-4 px-10 font-semibold ${pathname === link.href ? 'bg-[#438ef330] border-l-[6px] rounded-[2px] border-l-[#438EF3]' : ''}`}>
                        <svg className="text-[22px] h-[26px] w-[26px] text-white mr-2.5">{link.icon}</svg>
                        <a className="text-sm" href={link.href}>{link.title}</a>
                    </div>
                </li>
            ))}
        </ul>

    )
}

export default Menu;