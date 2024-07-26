import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";

export class TrackedProductsService {
  static async getTrackedProducts(
    page: number = 1,
    limit: number = 50,
    supplier_id?: string,
    keyword?: string,
    orderBy: string = "updatedAt",
    orderWay: "ASC" | "DESC" = "ASC"
  ) {
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();

      params.append("page", page.toString());
      params.append("limit", limit.toString());

      if (supplier_id) {
        params.append("supplier_id", supplier_id);
      }
      if (keyword) {
        params.append("keyword", keyword);
      }
      params.append("orderBy", orderBy);
      params.append("orderWay", orderWay);

      const response = await HttpAPI.get(
        `http://localhost:5000/api/v1/trackedproducts?${params.toString()}`,
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
