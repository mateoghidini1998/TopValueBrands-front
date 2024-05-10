import { headers } from "next/headers";
import { HttpAPI } from "../common/http.service";
import { getAuthToken } from "@/utils/getAuthToken";

export class InventoryService {
    static async getProducts(page: number, limit: number) {
        try {
            const token = getAuthToken();
            const response = await HttpAPI.get(`http://localhost:5000/api/v1/products?page=${page}&limit=${limit}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }

    static async deactivateProduct(seller_sku: string) {
        try {
            const token = getAuthToken();
            if (token) {
                const response = await HttpAPI.patch(`http://localhost:5000/api/v1/products/disable`, {seller_sku: seller_sku}, token);
                return response;
            } else {
                throw new Error('Token not found');
            }
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }

    

}
