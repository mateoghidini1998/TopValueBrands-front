import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";

export class StorageService {
  static async getPallets() {
    try {
      const token = getAuthToken();
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pallets`,
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
