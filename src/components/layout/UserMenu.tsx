"use client";
import useAuthContext from "@/contexts/auth.context";
import { UserType } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import Globe from "../svgs/Globe";
import Profile from "../svgs/Profile";
import Logout from "../svgs/Logout";
import { ThemeToggle } from "../ui/ThemeToggle";

type UserMenuProps = {
  user: UserType;
};

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
        <div className="flex items-center gap-6 text-black dark:text-white">
          <p className="text-xs ml-[23px]">
            {user.firstName} {user.lastName}
          </p>
          <button onClick={() => setIsOpen(!isOpen)}>
            <MdExpandMore className="h-6 w-6 cursor-pointer" />
          </button>
        </div>
        <div
          className={`text-black absolute right-[5px] top-[30px] bg-dark-2 border-[1px] border-solid border-dark-3 mt-2 w-[182px] dark:text-white  rounded-md box-border shadow-[0_3px_80px_0px_rgba(0,0,0,0.3)] transition-max-h duration-1000 ease-in-out overflow-hidden dark:bg-dark-2 ${
            isOpen ? "p-5 max-h-[300px] " : "border-none p-0 max-h-0"
          } bg-white`}
        >
          <div className="gap-3.5">
            <div className="flex items-center gap-1">
              <Profile fill="#438EF3" />
              <a
                href="#"
                className="text-black block px-4 py-2 text-sm dark:text-white"
                role="menuitem"
              >
                Profile
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Globe fill="#438EF3" />
              <a
                href="#"
                className="text-black block px-4 py-2 text-sm dark:text-white"
                role="menuitem"
              >
                Language
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Logout fill="#438EF3" />
              <button
                onClick={handleLogout}
                className="text-black block px-4 py-2 text-sm dark:text-white"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="w-[80%] h-[1px] m-auto bg-light mt-2 "></div>
          <div className="flex items-center gap-1 mt-4 justify-between">
            <a
              href="#"
              className="text-black block py-2 text-sm dark:text-white"
              role="menuitem"
            >
              Interface
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
