import { headers } from "next/headers";
import { HttpAPI } from "../common/http.service";
import { getAuthToken } from "@/utils/getAuthToken";
import { ProductType } from "@/types/product.types";
import { EditProductType } from "@/components/inventory/TableRow";
import { NewProductType } from "@/components/inventory/NewTableRow";

export class InventoryService {
  static async getProducts(
    page: number,
    limit: number,
    keyword: string = "",
    supplier: any = ""
  ) {
    try {
      const token = getAuthToken();
      const response = await HttpAPI.get(
        `http://localhost:5000/api/v1/products?page=${page}&limit=${limit}&keyword=${keyword}&supplier=${supplier}`,
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

  static async createProduct(data: NewProductType) {
    try {
      const token = getAuthToken();
      if (token) {
        const response = await HttpAPI.post(
          `http://localhost:5000/api/v1/products/add`,
          data,
          token
        );
        return response;
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      throw new Error("Error creating product");
    }
  }

  static async deactivateProduct(id: string) {
    try {
      const token = getAuthToken();
      if (token) {
        const response = await HttpAPI.patch(
          `http://localhost:5000/api/v1/products/disable`,
          { id: id },
          token
        );
        return response;
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }

  static async updateProduct(data: ProductType) {
    // console.log(data)
    try {
      const token = getAuthToken();
      if (token) {
        if (!data.id) {
          throw new Error("id is required");
        }
        const response = await HttpAPI.patch(
          `http://localhost:5000/api/v1/products/addExtraInfoToProduct`,
          data,
          token
        );
        return response;
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      throw new Error("Error updating product");
    }
  }
}
