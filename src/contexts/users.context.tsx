"use client";
import { UsersService } from "@/services/users/users.service";
import { UserRole, UserType } from "@/types/user.types";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type UserState = {
  users: UserType[];
  addUser: (user: UserType) => Promise<any>;
  registerError: string | null;
  updateUserError: string | null;
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
  updateUserError: null,
  deleteUser: () => Promise.resolve({}),
  updateUser: () => Promise.resolve({}),
  //test
  isUpdateFormOpen: false,
  setUpdateFormIsOpen: () => {},
  editingUser: {
    firstName: "",
    lastName: "",
    email: "",
    role: UserRole.USER,
  },
  setEditingUser: () => {},
});

export const UsersProvider: FC<PropsWithChildren> = ({
    children,
}: PropsWithChildren) => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [updateUserError, setUpdateUserError] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState < UserType | null>(null);

  // test
  const [isUpdateFormOpen, setUpdateFormIsOpen] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      const response = await UsersService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const addUser = async (user: UserType) => {
    try {
      const response = await UsersService.addUser(user);
      setUsers([...users, user]);
      return response;
    } catch (error) {
      console.log(error);
      setRegisterError(error.message);
    }
  };

  const deleteUser = async (email: string) => {
    try {
      const response = await UsersService.deleteUser(email);
      setUsers(users.filter((user) => user.email !== email));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (user: UserType) => {
    try {
      const response = await UsersService.updateUser(user);
      setUsers(users.map((u) => (u.email === user.email ? user : u)));
      return response;
    } catch (error) {
      console.log(error);
      setUpdateUserError(error.message);
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
        deleteUser,
        updateUser,
        updateUserError,
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
