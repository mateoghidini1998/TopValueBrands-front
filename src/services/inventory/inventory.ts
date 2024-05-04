import { HttpAPI } from "../common/http.service";
import { getAuthToken } from "@/utils/getAuthToken";

export class InventoryService {
    static async getProducts(page: number, limit: number) {
        try {
            const token = getAuthToken();
            const response = await HttpAPI.get(`http://localhost:3000/api/v1/products?page=${page}&limit=${limit}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }
}
