"use client"

import { usePathname } from "next/navigation";
import { LINKS } from "@/constants/links";


export default function PageTitle() {
    
    const pathname = usePathname()
    
    const currentLink = LINKS.find(link => link.href === pathname)

    return <h4 className="text-white text-base font-bold leading-6">{currentLink?.title}</h4>
}
