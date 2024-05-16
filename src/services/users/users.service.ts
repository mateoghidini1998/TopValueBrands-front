import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";
import { UserType } from "@/types/user.types";

export class UsersService {
    static async getUsers() {
        try {
            const token = getAuthToken();
            const response = await HttpAPI.get(
                `http://localhost:5000/api/v1/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            return response;
        } catch (error) {
            throw new Error("Error fetching data")
        }
    }

    static async addUser(data: UserType) {
        try {
            const token = getAuthToken();

            if(!token) throw new Error("Token not found")

            const response = await HttpAPI.post(
                `http://localhost:5000/api/v1/auth/register`,
                data,
                token
            )
            return response;

        } catch (error) {
            throw new Error("Error creating user");
        }
    }
}