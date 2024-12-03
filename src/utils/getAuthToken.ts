import { getAuthTokenCookiesFromClient } from "./client-auth";
import { getAuthTokenCookiesFromServer } from "./server-auth";

// export const getAuthTokenCookies = () => {
//   const token = localStorage.getItem("access-token");
//   return token || undefined;
// };

export const getAuthTokenCookies = async () => {
  if (typeof window !== "undefined") {
    // Cliente
    return getAuthTokenCookiesFromClient();
  }
  // Servidor
  return getAuthTokenCookiesFromServer();
};
