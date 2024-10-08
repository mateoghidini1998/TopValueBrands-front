import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";

export class PurchaseOrdersService {
  static async getTrackedProducts(supplier_id?: string) {
    try {
      const token = getAuthToken();
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/trackedproducts?supplier_id=${supplier_id}`,
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

  // Change the status of the order
  static async rejectOrderStatus(orderId: number) {
    try {
      // const token = getAuthToken();
      const response = await HttpAPI.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/reject/${orderId}`
        // { status }
        // { headers: { Authorization: `Bearer ${token}` }}
      );
      return response;
    } catch (error) {
      throw new Error("Error updating order status");
    }
  }

  static async approveOrderStatus(orderId: number) {
    try {
      // const token = getAuthToken();
      const response = await HttpAPI.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/approve/${orderId}`
        // { status }
        // { headers: { Authorization: `Bearer ${token}` }}
      );
      return response;
    } catch (error) {
      throw new Error("Error updating order status");
    }
  }

  static async restartOrderStatus(orderId: number) {
    try {
      // const token = getAuthToken();
      const response = await HttpAPI.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/restart/${orderId}`
        // { status }
        // { headers: { Authorization: `Bearer ${token}` }}
      );
      return response;
    } catch (error) {
      throw new Error("Error updating order status");
    }
  }

  static async downloadOrder(orderId: number) {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/download/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `purchase-order-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }

  static async editOrder(orderId: number, orderData: any) {
    const token = getAuthToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      throw new Error("Error updating order");
    }

    return await response.json();
  }

  static async deleteOrder(orderId: number) {
    const response = await HttpAPI.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/delete/${orderId}`
    );

    console.log(response);

    if (!response.success) {
      throw new Error("Error deleting order");
    }
  }
}
