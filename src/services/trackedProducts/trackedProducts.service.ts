import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";

export class TrackedProductsService {
  static async getTrackedProducts(supplier_id?: string, keyword?: string) {
    try {
      const token = getAuthToken();
      const response = await HttpAPI.get(
        `http://localhost:5000/api/v1/trackedproducts?supplier_id=${supplier_id}&keyword=${keyword}`,
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
}
