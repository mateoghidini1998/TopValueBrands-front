"use client"
import { UsersService } from "@/services/users/users.service"
import { UserType } from "@/types/user.types"
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

export type UserState = {
    users: UserType[]
    addUser: (user: UserType) => void;
}

export const UsersContext = createContext<UserState>({
    users: [],
    addUser: () => {},
})

export const UsersProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
    const [ users, setUsers ] = useState<UserType[]>([])

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
            throw new Error('Hubo un error')
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UsersContext.Provider value={{ users, addUser }}>
            {children}
        </UsersContext.Provider>
    );
}

export const useUsersContext = () => useContext(UsersContext);
