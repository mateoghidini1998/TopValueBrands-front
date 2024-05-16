import React from 'react'
import { IoMdAdd } from 'react-icons/io'

interface AddUserBtnProps {
    onClick?: () => void;
}

export default function AddUserBtn({ onClick }: AddUserBtnProps) {
  return (
    <button className="flex items-center gap-2" onClick={onClick}>
        <IoMdAdd className="text-[#438EF3] font-bold w-4 h-4"/>Add User
    </button>
  )
}
