"use client"
import { UsersService } from "@/services/users/users.service"
import { UserType } from "@/types/user.types"
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

export type UserState = {
    users: UserType[];
    addUser: (user: UserType) => Promise<any>;
    registerError: string | null;
    deleteUser: (id: number) => Promise<any>
}

export const UsersContext = createContext<UserState>({

    users: [],
    addUser: () => Promise.resolve({}),
    registerError: null,
    deleteUser: () => Promise.resolve({})
})

export const UsersProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
    const [ users, setUsers ] = useState<UserType[]>([])
    const [registerError, setRegisterError] = useState<string | null>(null)

    const fetchUsers = async () => {
        try {
            const response = await UsersService.getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const addUser = async ( user: UserType ) => {
        try {
            const response = await UsersService.addUser(user)
            setUsers([...users, user]);
            return response;
        } catch (error) {
            console.log(error);
            setRegisterError(error.message);
        }
    }

    const deleteUser = async (id: number) => {
        try {
            const response = await UsersService.deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (user: UserType) => {
        try {
            const response = await UsersService.updateUser(user);
            setUsers(users.map((u) => (u.id === user.id ? user : u)));
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UsersContext.Provider value={{ users, addUser, registerError, deleteUser }}>
            {children}
        </UsersContext.Provider>
    );
}

export const useUsersContext = () => useContext(UsersContext);
