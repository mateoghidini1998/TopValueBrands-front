import { getAuthTokenFromClient } from "./client-auth";
import { getAuthTokenFromServer } from "./server-auth";

export const getAuthToken = () => {
  const token = localStorage.getItem("access-token");
  return token || undefined;
};

export const getAuthTokenCookies = async () => {
  if (typeof window !== "undefined") {
    // Cliente
    return getAuthTokenFromClient();
  }
  // Servidor
  return getAuthTokenFromServer();
};
