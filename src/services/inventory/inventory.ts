import { HttpAPI } from "../common/http.service";
import { getAuthToken } from "@/utils/getAuthToken";

export class InventoryService {
    static async getProducts() {
        try {
            const token = getAuthToken();
            const response = await HttpAPI.get('http://localhost:3000/api/v1/products', {
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