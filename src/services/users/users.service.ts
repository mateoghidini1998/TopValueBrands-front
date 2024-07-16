import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";
import { UserType } from "@/types/user.types";
import kv from '../../utils/kvClient'

export class UsersService {
  static async getUsers() {
    try {
      let users: UserType[] = [];
      
      const cachedUsers = await kv.get('users') as string;
      if (cachedUsers) {
        // Decodificamos la cadena Base64 y parseamos a un objeto JavaScript
        const decodedUsers = Buffer.from(cachedUsers, 'base64').toString('utf8');
        users = JSON.parse(decodedUsers);
      } else {
        const token = getAuthToken();
        const response = await HttpAPI.get(`https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Guardamos los usuarios en Upstash KV después de decodificar y parsear
        await kv.set('users', JSON.stringify(response.data), { ex: 3600 }); // Cache for 1 hour
        users = response.data;
      }
      
      return users;
    } catch (error) {
      throw new Error("Error fetching data");
    }
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
