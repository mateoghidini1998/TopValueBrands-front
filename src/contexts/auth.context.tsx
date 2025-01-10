"use client";
import { AuthService } from "@/services/auth/auth.service";
import { UserType } from "@/types/user.types";
import { getAuthTokenCookies } from "@/utils/getAuthToken";
import {
  useEffect,
  useState,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
} from "react";

export type AuthState = {
  loading: boolean;
  authToken: string | null;
  user: UserType | null;
  authError: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = getAuthTokenCookies();
    if (token) {
      setAuthToken(token);
      AuthService.getUserProfile(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error al obtener el perfil del usuario:", error);
        });
    } else {
      setAuthToken(null);
      setUser(null);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await AuthService.login(email, password, (userData) => {
        setUser(userData);
        const token = getAuthTokenCookies();
        setAuthToken(token ?? null);
      });
      setAuthError(null);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setAuthError(err.message);
      }
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    AuthService.logout();
  };

  return (
    <AuthContext.Provider
      value={{ loading, authToken, user, login, logout, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default useAuthContext;
