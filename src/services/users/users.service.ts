import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";
import { UserType } from "@/types/user.types";

export class UsersService {
  static async getUsers() {
    try {
      const token = getAuthToken();
      const response = await HttpAPI.get(
        `https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
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
    return response;
  }

  static async deleteUser(email: string) {
    const token = getAuthToken();

    //get the id of the user with the email from the user context
    const users = await UsersService.getUsers();
    const id = users.data.find((user: UserType) => user.email === email)?.id;

    if (!token) throw new Error("Token not found");

    const response = await HttpAPI.delete(
      `https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/users/${id}`,
      token
    );
    return response;
  }

  static async updateUser(data: UserType) {
    const token = getAuthToken();

    const users = await UsersService.getUsers();
    const id = users.data.find((user: UserType) => user.id === data.id)?.id;

    if (!token) throw new Error("Token not found");

    const response = await HttpAPI.patch(
      `https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/users/update/${id}`,
      data,
      token
    );
    return response;
  }
}
