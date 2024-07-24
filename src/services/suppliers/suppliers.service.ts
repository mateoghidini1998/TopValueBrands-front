import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";
import { EditSupplierType } from "@/types/supplier.types";

export class SuppliersService {
  static async getSuppliers() {
    try {
      const token = getAuthToken();
      const response = await HttpAPI.get(
        `https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/suppliers`,
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

  static async addSupplier(data: EditSupplierType) {
    try {
      const token = getAuthToken();
      if (token) {
        const response = await HttpAPI.post(
          `https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/suppliers`,
          data,
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
      const token = getAuthToken();
      if (token) {
        if (!data.id) {
          throw new Error("seller_sku is required");
        }
        const id = data.id;
        const response = await HttpAPI.patch(
          `https://topvaluebrands-webapp-bjavghfxdpcgdnay.eastus-01.azurewebsites.net/api/v1/suppliers/${id}`,
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
}
