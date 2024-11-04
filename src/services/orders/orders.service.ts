import { getAuthToken } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";
import { PurchaseOrderProductUpdates } from "@/contexts/orders.context";
import { headers } from "next/headers";

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

  static async getPurchaseOrderSummary(orderId: number) {
    try {
      const token = getAuthToken();
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/summary/${orderId}`,
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

  static async updatePOProducts(
    orderId: number,
    purchaseOrderProductsUpdates: PurchaseOrderProductUpdates[]
  ) {
    try {
      const response = await HttpAPI.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/${orderId}/products`,
        { purchaseOrderProductsUpdates } // Enviar el estado en el cuerpo de la solicitud
        // { headers: { Authorization: `Bearer ${token}` }} // Descomentar si es necesario el token
      );
      return response;
    } catch (error) {
      throw new Error("Error updating order products");
    }
  }

  // delete purchase order products
  static async deletePOProductsFromAnOrder(purchaseOrderProductId: number) {
    try {
      const response = await HttpAPI.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/purchaseorderproduct/${purchaseOrderProductId}`
      );
      return response;
    } catch (error) {
      throw new Error("Error deleting order products");
    }
  }

  // Change the status of the order
  static async updateOrderStatus(orderId: number, status: number) {
    try {
      const response = await HttpAPI.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/${orderId}/status`,
        { status } // Enviar el estado en el cuerpo de la solicitud
        // { headers: { Authorization: `Bearer ${token}` }} // Descomentar si es necesario el token
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
    try {
      const response = await HttpAPI.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/delete/${orderId}`
      );
      return response.success;
    } catch (error) {
      throw new Error("Error deleting order");
    }
  }

  static async addQuantityReceived(
    purchaseOrderProductId: number,
    quantityReceived: number
  ) {
    try {
      const response = await HttpAPI.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/received/${purchaseOrderProductId}`,
        { quantityReceived }
      );
      return response;
    } catch (error) {
      throw new Error("Error adding quantity received");
    }
  }

  static async addReasonToPOProduct(
    purchaseOrderProductId: number,
    reason_id: number
  ) {
    try {
      const response = await HttpAPI.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/reason/${purchaseOrderProductId}`,
        { reason_id }
      );
      return response;
    } catch (error) {
      throw new Error("Error adding reason to PO product");
    }
  }

  static async addExpirteDateToPOProduct(
    purchaseOrderProductId: number,
    expire_date: string
  ) {
    try {
      const response = await HttpAPI.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/expiredate/${purchaseOrderProductId}`,
        { expire_date }
      );
      return response;
    } catch (error) {
      throw new Error("Error adding expire date to PO product");
    }
  }

  static async createPallet(pallet: any): Promise<any> {
    // const token = getAuthToken();
    try {
      const response = await HttpAPI.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pallets`,
        { ...pallet }
      );
      return response;
    } catch (error) {
      throw new Error("Error creating pallet");
    }
  }

  static async addNotesToPOProduct(
    purchaseOrderProductId: number,
    notes: string
  ) {
    try {
      const response = await HttpAPI.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders/notes/${purchaseOrderProductId}`,
        { notes }
      );
      return response;
    } catch (error) {
      throw new Error("Error adding notes to PO product");
    }
  }
}
