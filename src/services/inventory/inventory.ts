import { NewProductType } from "@/components/inventory/NewTableRow";
import { IProductType } from "@/types/product.types";
import { HttpAPI } from "../common/http.service";
import { getAuthTokenCookies } from "@/utils/getAuthToken";

export class InventoryService {
  static async getProducts(
    page: number,
    limit: number,
    keyword: string = "",
    supplier: any = "",
    orderBy: string = "",
    orderWay: string = ""
  ) {
    try {
      const token = await getAuthTokenCookies();
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?page=${page}&limit=${limit}&keyword=${keyword}&supplier=${supplier}&orderBy=${orderBy}&orderWay=${orderWay}`,
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

  // get product by seller_sku
  static async getProductBySku(seller_sku: string) {
    try {
      const token = await getAuthTokenCookies();
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${seller_sku}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      // throw new Error("Error fetching data");
    }
  }

  static async createProduct(data: NewProductType) {
    try {
      const token = await getAuthTokenCookies();
      if (token) {
        const response = await HttpAPI.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/add`,
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
      const token = await getAuthTokenCookies();
      if (token) {
        const response = await HttpAPI.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/disable`,
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

  static async updateProduct(data: IProductType) {
    // console.log(data)
    try {
      const token = await getAuthTokenCookies();
      if (token) {
        if (!data.id) {
          throw new Error("id is required");
        }
        const response = await HttpAPI.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/addExtraInfoToProduct`,
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
