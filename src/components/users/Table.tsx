"use client"
import { useUsersContext } from "@/contexts/users.context";
import AddUserBtn from "./AddUserBtn";
import TableRow from "./TableRow";
import { useState } from "react";
import RegisterForm from "../auth/RegisterForm";
import { UserRole } from "@/types/user.types";
import ConfirmAlert from "../alerts/ConfirmAlert";

type FormData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

export default function Table() {
  const [isRegisterFormOpen, setRegisterFormIsOpen] = useState<boolean>(false);
  const { users, addUser, registerError, updateUser, updateUserError, isUpdateFormOpen, setUpdateFormIsOpen, setEditingUser } = useUsersContext();
  const [showAlert, setShowAlert] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<FormData>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: UserRole.USER
  });

  console.log({userToUpdate});
  

  const handleCreateUser = (data: FormData) => {
    try {
      addUser(data).then((response) => {
        if (response.success) {
          setRegisterFormIsOpen(false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = (data: FormData) => {    
    setShowAlert(true);
    setUserToUpdate(data);
    setUpdateFormIsOpen(false);
  }
  
  const updateUserHandler = (data: FormData) => {
    try {
      updateUser(data).then((response) => {
        if (response.success) {
          setShowAlert(false);
          setEditingUser({
            firstName: "",
            lastName: "",
            email: "",
            role: UserRole.USER
          })
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleModalRegisterFormOpen = () => {
    setRegisterFormIsOpen(true);
  };

  const handleModalCloseUpdateForm = () => {
    setUpdateFormIsOpen(false);
    setEditingUser({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      role: UserRole.USER,
      password: "",
      confirmPassword: "",
    })

  }

  return (
    <>
      {showAlert &&
        
      <ConfirmAlert
        message="Are you sure you want to update this user?"
        onConfirm={() => updateUserHandler(userToUpdate)}
        onCancel={() => handleModalCloseUpdateForm()}
        onClose={() => handleModalCloseUpdateForm()}
      />

      } 
      <table className="w-full mb-5 rounded-[20px] border-[#393E4F] border-[1px] border-solid">
        <thead>
          <tr className="py-6 stroke-1 stroke-[#393E4F] flex items-center h-[60px] w-full text-white bg-[#262935]">
            <th className="w-[15%] text-xs font-medium text-center">Name</th>
            <th className="w-[15%] text-xs font-medium text-center">Email</th>
            <th className="w-[60%] text-xs font-medium text-center"></th>
            <th className="w-[10%] text-xs font-medium text-center">
              <AddUserBtn onClick={() => handleModalRegisterFormOpen()} />
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow users={users} />
        </tbody>
      </table>
      <RegisterForm title={"Create new User"} isOpen={isRegisterFormOpen} onClose={() => setRegisterFormIsOpen(false)} onSubmit={handleCreateUser} errorMessage={registerError} buttonName={'Create'} />
      <RegisterForm title={"Update User"} isOpen={isUpdateFormOpen} onClose={handleModalCloseUpdateForm} onSubmit={handleUpdateUser} errorMessage={updateUserError} buttonName={'Update'} />
    </>
  );
}


