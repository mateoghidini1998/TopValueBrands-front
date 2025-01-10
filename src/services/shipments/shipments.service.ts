import { CreateShipmentProduct } from "@/app/(main)/warehouse/outgoing-shipments/new-shipment/interfaces";
import { getAuthTokenCookies } from "@/utils/getAuthToken";
import { HttpAPI } from "../common/http.service";

type Shipment = {
  order_id: string;
  pallet_id: string;
};

interface ShipmentToCreate {
  shipment_number: string;
  palletproducts: CreateShipmentProduct[];
}

export class ShipmentsService {
  static async createShipment(shipment: ShipmentToCreate) {
    try {
      const token = await getAuthTokenCookies();
      console.log(token);
      const response = await HttpAPI.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipments`,
        shipment,
        token!!
      );
      return response;
    } catch (error) {
      throw new Error("Error creating shipment");
    }
  }

  static async getShipments() {
    try {
      const token = await getAuthTokenCookies();
      console.log(token);
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipments`,
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

  static async getShipmentById(id: string) {
    try {
      const token = await getAuthTokenCookies();
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      // throw new Error("Error fetching data");
      console.log(error);
    }
  }

  static async download2DWorkflow(id: number) {
    try {
      const token = await getAuthTokenCookies();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipments/${id}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al descargar el archivo");
      }

      // Crear un blob con los datos de la respuesta
      const blob = await response.blob();

      // Crear una URL para el blob
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace temporal para la descarga
      const link = document.createElement("a");
      link.href = url;

      // Asignar el nombre del archivo (puedes personalizar este nombre si lo necesitas)
      link.download = `2DWorkflow_Shipment_${id}.xlsx`;

      // Simular un clic en el enlace para iniciar la descarga
      document.body.appendChild(link);
      link.click();

      // Limpiar el DOM
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      alert("Hubo un problema al intentar descargar el archivo.");
    }
  }

  static async deleteShipment(id: string) {
    try {
      const token = await getAuthTokenCookies();
      const response = await HttpAPI.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipments/${id}`,
        token!!
      );
      return response;
    } catch (error) {
      throw new Error("Error deleting shipment");
    }
  }

  static async getStorageProducts() {
    try {
      const token = await getAuthTokenCookies();
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pallets/products/all`,
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

  static async getPalletsByPurchaseOrder(purchaseOrderId: number) {
    try {
      // Obtener el token de autenticación desde las cookies
      const token = await getAuthTokenCookies();

      // Realizar la petición al backend
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipments/pallets/${purchaseOrderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching pallets by purchase order ID:", error);
      throw new Error("Error fetching pallets by purchase order ID");
    }
  }

  static async getPurchaseOrdersWithPallets() {
    try {
      const token = await getAuthTokenCookies();
      const response = await HttpAPI.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shipments/purchaseorders/pallets`,
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
