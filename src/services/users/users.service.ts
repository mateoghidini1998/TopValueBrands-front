import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";
import { UserType } from "@/types/user.types";

export class UsersService {
  static async getUsers() {
    try {
      const token = getAuthToken();
      const response = await HttpAPI.get(`http://localhost:5000/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }

  static async addUser(data: UserType) {
    const token = getAuthToken();

    if (!token) throw new Error("Token not found");

    const response = await HttpAPI.post(
      `http://localhost:5000/api/v1/auth/register`,
      data,
      token
    );
    return response;
  }

  static async deleteUser(id: number) {
    const token = getAuthToken();

    if (!token) throw new Error("Token not found");

    const response = await HttpAPI.delete(
      `http://localhost:5000/api/v1/users/${id}`,
      token
    );
    return response;
  }

  static async updateUser(data: UserType) {
    const token = getAuthToken();

    if (!token) throw new Error("Token not found");

    const response = await HttpAPI.patch(
      `http://localhost:5000/api/v1/users/${data.id}`,
      data,
      token
    );
    return response;
  }

}
