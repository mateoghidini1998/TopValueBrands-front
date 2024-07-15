import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";

export class TrackedProductsService {
  static async getTrackedProducts(supplier_id?: string) {
    try {
      const token = getAuthToken();
      const response = await HttpAPI.get(
        `https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/trackedproducts?supplier_id=${supplier_id}`,
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
