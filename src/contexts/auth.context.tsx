"use client"
import { AuthService } from "@/services/auth/auth.service";
import { UserType } from "@/types/user.types";
import { getAuthToken } from "@/utils/getAuthToken";
import { useEffect, useState, createContext, FC, PropsWithChildren, useContext } from "react";

export type AuthState = {
    authToken: string | null;
    user: UserType | null;
    authError: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children}: PropsWithChildren) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [ authError, setAuthError ] = useState<string | null>(null)
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (token) {
            setAuthToken(token);
            AuthService.getUserProfile(token).then(userData => {
                setUser(userData);
            }).catch(error => {
                console.error('Error al obtener el perfil del usuario:', error);
            });
        } else {
            // logout()
            setAuthToken(null);
            setUser(null);
        }
    
        const handleStorageChange = () => {
            const token = localStorage.getItem('access-token');
            if (token) {
                setAuthToken(token);
                
                AuthService.getUserProfile(token).then(userData => {
                    setUser(userData);
                }).catch(error => {
                    console.error('Error al obtener el perfil del usuario:', error);
                });
            } else {
                setAuthToken(null);
                setUser(null);
            }
        };
    
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    
    }, []);
    


    const login = async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password, async (userData) => {
                setUser(userData)
                const token = await getAuthToken();
                setAuthToken(token?? null);
            });
            setAuthError(null);
            return response;
        } catch (err) {
            if(err instanceof Error) {
                setAuthError(err.message)
            }
        }
    };
    

    const logout = () => {
        setAuthToken(null);
        setUser(null);
        AuthService.logout()
    };

    return (
        <AuthContext.Provider value={{ authToken, user, login, logout, authError }}>
           {children}
        </AuthContext.Provider>
       );

    }
    
const useAuthContext = ():AuthState => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
    }
   
export default useAuthContext;
           
