"use server";
import { cookies } from "next/headers";

export const getAuthTokenCookiesFromServer = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access-token")?.value;
  return token;
};
