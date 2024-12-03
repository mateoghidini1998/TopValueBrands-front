import { getAuthTokenCookies } from "@/utils/getAuthTokenCookies";
import { HttpAPI } from "../common/http.service";
import { UserType } from "@/types/user.types";

export class UsersService {
  static async getUsers() {
    try {
      const token = getAuthTokenCookies();
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }

  static async addUser(data: UserType) {
    const token = getAuthTokenCookies();
    if (!token) throw new Error("Token not found");

    const response = await HttpAPI.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
      data,
      token
    );
    return response;
  }

  static async deleteUser(email: string) {
    const token = getAuthTokenCookies();

    const users = await this.getUsers();
    const user = users.find((user: UserType) => user.email === email);
    if (!user) throw new Error("User not found");

    if (!token) throw new Error("Token not found");

    const response = await HttpAPI.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.id}`,
      token
    );

    return response;
  }

  static async updateUser(data: UserType) {
    const token = getAuthTokenCookies();

    const users = await this.getUsers();
    const user = users.find((user: UserType) => user.id === data.id);
    if (!user) throw new Error("User not found");

    if (!token) throw new Error("Token not found");

    const response = await HttpAPI.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/update/${user.id}`,
      data,
      token
    );

    return response;
  }
}
