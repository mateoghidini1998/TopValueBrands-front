// src/utils/client-auth.ts (Solo para uso en Cliente)
export const getAuthTokenFromClient = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) =>
    cookie.startsWith("access-token=")
  );
  return tokenCookie?.split("=")[1];
};
