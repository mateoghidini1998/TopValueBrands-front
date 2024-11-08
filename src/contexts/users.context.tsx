"use client";
import { UsersService } from "@/services/users/users.service";
import { UserRole, UserType } from "@/types/user.types";
import { usePathname } from "next/navigation";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Error = {
  message: string;
};

export type UserState = {
  users: UserType[];
  addUser: (user: UserType) => Promise<any>;
  registerError: string | null;
  setRegisterError: React.Dispatch<React.SetStateAction<string | null>>;
  updateUserError: string | null;
  setUpdateUserError: React.Dispatch<React.SetStateAction<string | null>>;
  deleteUser: (email: string) => Promise<any>;
  updateUser: (user: UserType) => Promise<any>;
  //test
  isUpdateFormOpen: boolean;
  setUpdateFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingUser: UserType | null;
  setEditingUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const UsersContext = createContext<UserState>({
  users: [],
  addUser: () => Promise.resolve({}),
  registerError: null,
  setRegisterError: () => {},
  updateUserError: null,
  deleteUser: () => Promise.resolve({}),
  updateUser: () => Promise.resolve({}),
  setUpdateUserError: () => {},
  //test
  isUpdateFormOpen: false,
  setUpdateFormIsOpen: () => {},
  editingUser: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: UserRole.USER,
    password: "",
    confirmPassword: "",
  },
  setEditingUser: () => {},
});

export const UsersProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [updateUserError, setUpdateUserError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const path = usePathname();

  // test
  const [isUpdateFormOpen, setUpdateFormIsOpen] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      const response = await UsersService.getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const addUser = async (user: UserType) => {
    try {
      const response = await UsersService.addUser(user);
      setUsers([...users, response.user]);
      return response;
    } catch (error) {
      console.error(error);
      setRegisterError((error as Error).message);
      return error;
    }
  };

  const deleteUser = async (email: string) => {
    try {
      const response = await UsersService.deleteUser(email);
      setUsers(users.filter((user) => user.email !== email));
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const updateUser = async (user: UserType) => {
    try {
      const response = await UsersService.updateUser(user);
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      return response;
    } catch (error) {
      console.error(error);
      setRegisterError((error as Error).message);
      return error;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        addUser,
        registerError,
        setRegisterError,
        deleteUser,
        updateUser,
        updateUserError,
        setUpdateUserError,
        isUpdateFormOpen,
        setUpdateFormIsOpen,
        editingUser,
        setEditingUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);
