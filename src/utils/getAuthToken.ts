import { getAuthTokenCookiesFromClient } from "./client-auth";
import { getAuthTokenCookiesFromServer } from "./server-auth";

// export const getAuthTokenCookies = () => {
//   const token = localStorage.getItem("access-token");
//   return token || undefined;
// };

// export const getAuthTokenCookies = async () => {
//   if (typeof window !== "undefined") {
//     // Cliente
//     return getAuthTokenCookiesFromClient();
//   }
//   // Servidor
//   return getAuthTokenCookiesFromServer();
// };

export const getAuthTokenCookies = (): string | null => {
  const cookies = document.cookie.split("; ");
  const accessToken = cookies.find((cookie) =>
    cookie.startsWith("access-token=")
  );
  return accessToken ? accessToken.split("=")[1] : null;
};
