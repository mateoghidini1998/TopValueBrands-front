"use client"
import useAuthContext from "@/contexts/auth.context";
import { UserType } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import Globe from "../svgs/Globe";
import Profile from "../svgs/Profile"
import Logout from "../svgs/Logout"

type UserMenuProps = {
    user: UserType
}

export default function UserMenu() {
    const { user, logout } = useAuthContext();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            // I comment this out, because now we handle redirects in the logout function
            // router.push('/login');
        } catch (error) {
            console.error(error);
        }
    };

    if (user) {
        return (
            <div className="relative">
                <div className="flex items-center gap-6 text-white">
                    <p className="text-xs ml-[23px]">
                        {user.firstName} {user.lastName}
                    </p>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <MdExpandMore className="h-6 w-6 cursor-pointer"/>
                    </button>
                </div>
                <div className={`absolute right-[5px] top-[30px] bg-[#262935] border-[1px] border-solid border-[#393E4F]  mt-2 w-[182px] text-white rounded-md box-border shadow-[0_3px_80px_0px_rgba(0,0,0,0.3)] transition-max-h duration-1000 ease-in-out overflow-hidden ${isOpen ? 'p-5 max-h-[300px] ' : 'border-none p-0 max-h-0'}`}>
                    <div className="gap-3.5">
                        <div className="flex items-center gap-1">
                            <Profile/>
                            <a href="#" className="block px-4 py-2 text-sm" role="menuitem">Profile</a>
                        </div>
                        <div className="flex items-center gap-1">
                            <Globe/>
                            <a href="#" className="block px-4 py-2 text-sm" role="menuitem">Language</a>
                        </div>
                        <div className="flex items-center gap-1">
                            <Logout/>
                            <button onClick={handleLogout} className="block px-4 py-2 text-sm" role="menuitem">Logout</button>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
    
    return null;
}
