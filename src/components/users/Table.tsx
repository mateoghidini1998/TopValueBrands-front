"use client"
import { useUsersContext } from "@/contexts/users.context";
import AddUserBtn from "./AddUserBtn";
import TableRow from "./TableRow";
import { useState } from "react";
import RegisterForm from "../auth/RegisterForm";

export default function Table() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { users } = useUsersContext();

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <table className="w-full mb-5 rounded-[20px] border-[#393E4F] border-[1px] border-solid">
        <thead>
          <tr className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[60px] w-full text-white bg-[#262935]">
            <th className="w-[15%] text-xs font-medium text-center">Name</th>
            <th className="w-[15%] text-xs font-medium text-center">Email</th>
            <th className="w-[60%] text-xs font-medium text-center"></th>
            <th className="w-[10%] text-xs font-medium text-center">
              <AddUserBtn onClick={() => handleModalOpen()} />
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow users={users} />
        </tbody>
      </table>
      <RegisterForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}


