import { getAuthTokenCookies } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";
import { UserType } from "@/types/user.types";
export class UsersService {
  static async getUsers() {
    try {
      const token = await getAuthTokenCookies();
      if (token) {
        const response = await HttpAPI.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }

  static async addUser(data: UserType) {
    try {
      const token = await getAuthTokenCookies();
      if (token) {
        const response = await HttpAPI.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
          data,
          token
        );
        return response;
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  static async deleteUser(email: string) {
    try {
      const token = await getAuthTokenCookies();
      const users = await this.getUsers();
      const user = users.find((user: UserType) => user.email === email);
      if (!user) throw new Error("User not found");

      const response = await HttpAPI.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.id}`,
        token
      );

      return response;
    } catch (error) {
      throw new Error("Error deleting user");
    }
  }

  static async updateUser(data: UserType) {
    try {
      const token = await getAuthTokenCookies();
      if (token) {
        const response = await HttpAPI.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/update/${data.id}`,
          data,
          token
        );
        return response;
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      throw new Error("Error updating user");
    }
  }
}
