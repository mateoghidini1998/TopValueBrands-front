import { getAuthTokenCookies } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";
import { EditSupplierType } from "@/types/supplier.types";

export class SuppliersService {
  static async getSuppliers() {
    try {
      const token = await getAuthTokenCookies();
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/suppliers`,
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

  static async addSupplier(data: String) {
    try {
      const token = await getAuthTokenCookies();
      if (token) {
        const response = await HttpAPI.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/suppliers`,
          { supplier_name: data },
          token
        );
        return response;
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      throw new Error("Error adding supplier");
    }
  }

  static async updateSupplier(data: EditSupplierType) {
    try {
      const token = await getAuthTokenCookies();
      if (token) {
        if (!data.id) {
          throw new Error("seller_sku is required");
        }
        const id = data.id;
        const response = await HttpAPI.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/suppliers/${id}`,
          data,
          token
        );
        return response;
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      throw new Error("Error updating supplier");
    }
  }

  static async deleteSupplier(id: number) {
    try {
      const token = await getAuthTokenCookies();
      if (token) {
        const response = await HttpAPI.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/suppliers/${id}`,
          token
        );
        return response;
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      throw new Error("Error deleting supplier");
    }
  }
}
