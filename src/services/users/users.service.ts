import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";
import { UserType } from "@/types/user.types";
import kv from '../../utils/kvClient'

export class UsersService {
  static async getUsers() {
    try {
      const cachedUsers = await kv.get('users') as any;
      if (cachedUsers) {
        return JSON.parse(cachedUsers);
      }

      const token = getAuthToken();
      const response = await HttpAPI.get(`https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await kv.set('users', JSON.stringify(response.data), { ex: 3600 }); // Cache for 1 hour
      return response.data;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }

  static async addUser(data: UserType) {
    const token = getAuthToken();
    if (!token) throw new Error("Token not found");

    const response = await HttpAPI.post(
      `https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/auth/register`,
      data,
      token
    );

    await kv.del('users'); 
    return response;
  }

  static async deleteUser(email: string) {
    const token = getAuthToken();

    const users = await this.getUsers();
    const user = users.find((user: UserType) => user.email === email);
    if (!user) throw new Error("User not found");

    if (!token) throw new Error("Token not found");

    const response = await HttpAPI.delete(
      `https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/users/${user.id}`,
      token
    );

    await kv.del('users'); // Invalidate cache
    return response;
  }

  static async updateUser(data: UserType) {
    const token = getAuthToken();

    const users = await this.getUsers();
    const user = users.find((user: UserType) => user.id === data.id);
    if (!user) throw new Error("User not found");

    if (!token) throw new Error("Token not found");

    const response = await HttpAPI.patch(
      `https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/users/update/${user.id}`,
      data,
      token
    );

    await kv.del('users'); // Invalidate cache
    return response;
  }
}
