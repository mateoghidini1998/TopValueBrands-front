"use client";
import { TrackedProductsService } from "@/services/trackedProducts/trackedProducts.service";
import { TrackedProductType } from "@/types/trackedProducts.types";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useOrdersContext } from "./orders.context";
import { toast } from "sonner";

export type ProductInOrder = {
  id: string;
  product_id: string;
  supplier_id: string;
  product_name: string;
  product_image: string;
  ASIN: string;
  supplier_name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  units_sold: number;
  fees: number;
  lowest_fba_price: number;
};

export type TrackedProductsState = {
  trackedProducts: TrackedProductType[];
  currentPage: number;
  totalPages: number;
  supplierId: string;
  trackedProductsAddedToOrder: any;
  keyword: string;
  orderBy: string;
  trackedProductsToAnalyze: any;
  handleSetOrderBy: (order: string, orderWay: any) => void;
  setCurrentPage: (page: number) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  setSupplierId: (supplier_id: string) => void;
  setTrackedProductsAddedToOrder: (data: any) => void;
  addTrackedProductToOrder: (data: any) => any;
  removeTrackedProductFromOrder: (data: any) => void;
  updateTrackedProductInOrder: (data: any) => void;
  handleCreateOrder: (data: any, notes: string) => any;
  getTotalPrice: (data: any) => void;
  handleSetKeyword: (keyword: string) => void;
  getTrackedProductsFromAnOrder: (order_id: number) => any;
  setTrackedProductsToAnalyze: (data: any) => void;
  getFilteredTrackedProducts: (...args: any) => void;
  setOrderBy: (order: string) => void;
  setOrderWay: (orderWay: string) => void;
};

export const TrackedProductContext = createContext<TrackedProductsState>({
  trackedProducts: [],
  currentPage: 1,
  totalPages: 0,
  supplierId: "",
  keyword: "",
  orderBy: "",
  trackedProductsToAnalyze: [],
  handleSetOrderBy: () => {},
  setCurrentPage: () => {},
  setSupplierId: () => {},
  handleNextPage: () => {},
  handlePreviousPage: () => {},
  setTrackedProductsAddedToOrder: () => {},
  trackedProductsAddedToOrder: [],
  addTrackedProductToOrder: () => {},
  removeTrackedProductFromOrder: () => {},
  updateTrackedProductInOrder: () => {},
  handleCreateOrder: (data: ProductInOrder[], notes: string) => {},
  getTotalPrice: (data: ProductInOrder[]) => {},
  handleSetKeyword: () => {},
  getTrackedProductsFromAnOrder: () => {},
  setTrackedProductsToAnalyze: () => {},
  getFilteredTrackedProducts: () => {},
  setOrderBy: () => {},
  setOrderWay: () => {},
});

export const TrackedProductsProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("");
  const [orderWay, setOrderWay] = useState<any>("");

  const LIMIT = 50;

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [trackedProductsAddedToOrder, setTrackedProductsAddedToOrder] =
    useState<ProductInOrder[]>([]);

  const [trackedProductsToAnalyze, setTrackedProductsToAnalyze] = useState<
    ProductInOrder[]
  >([]);

  const { fetchOrders } = useOrdersContext();

  useEffect(() => {
    getFilteredTrackedProducts(
      supplierId,
      keyword,
      currentPage,
      LIMIT,
      orderBy,
      orderWay
    );
  }, [supplierId, keyword, currentPage, LIMIT, orderBy, orderWay]);

  const handleSetKeyword = (keyword: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        setKeyword(keyword);
        setCurrentPage(1); //  to use with pagination
        getFilteredTrackedProducts(supplierId, keyword);
      }, 500)
    );
  };

  //! No lo quiero, pero lo dejo por si acaso
  const getTrackedProductsFromAnOrder = useCallback(
    async (order_id: number) => {
      try {
        const response =
          await TrackedProductsService.getTrackedProductsFromAnOrder(order_id);

        if (response.success) {
          setTrackedProductsToAnalyze(response.data);
          return response.data;
        }
      } catch (error) {
        alert(error);
        console.error(error);
      }
    },
    []
  );

  const getFilteredTrackedProducts = async (
    supplier_id: string = "",
    keyword: string = "",
    page: number = 1,
    limit: number = 50,
    orderBy: string = "profit",
    orderWay?: any
  ) => {
    try {
      const response = await TrackedProductsService.getTrackedProducts(
        page,
        limit,
        supplier_id,
        keyword,
        orderBy,
        orderWay
      );

      // console.log(response);
      setTrackedProducts(response.data);
      setTotalPages(response.pages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSetOrderBy = (order: string, orderWay: string) => {
    setOrderBy(order);
    setOrderWay(orderWay);
    setCurrentPage(1);
    getFilteredTrackedProducts(
      supplierId,
      keyword,
      currentPage,
      LIMIT,
      order,
      orderWay
    );
  };

  const updateTrackedProductInOrder = (updatedProduct: ProductInOrder) => {
    updatedProduct.total_amount =
      updatedProduct.quantity * updatedProduct.unit_price;
    setTrackedProductsAddedToOrder((prevState) =>
      prevState.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const getTotalPrice = (orderProducts: any) => {
    let totalPrice = 0;
    orderProducts.map((item: any, i: number) => {
      totalPrice += item.quantity * item.unit_price;
    });
    return totalPrice;
  };

  const handleCreateOrder = async (orderProducts: any, notes: string) => {
    const transformedProducts = orderProducts.map((product: any) => ({
      product_id: product.product_id,
      unit_price: product.unit_price,
      quantity: product.quantity,
      fees: product.fees,
      lowest_fba_price: product.lowest_fba_price,
    }));
    // Generar un ID de pedido unico con el timestamp de 6 dígitos
    const PO_ID = new Date().getTime().toString().slice(-6);

    const supplier_name = orderProducts[0].supplier_name;
    // Obtener las iniciales del suppliername
    const supplierInitials = supplier_name
      .split(" ")
      .map((word: string) => word.charAt(0))
      .join("")
      .toUpperCase();

    const orderPayload = {
      notes: notes,
      order_number: `${supplierInitials}#${PO_ID}`, // Puede ser dinámico o generado automáticamente
      // order_number: `PO#1-1-1719429064277`, // Para testear con un order_number que ya existe
      supplier_id: orderProducts[0].supplier_id, // Asumiendo que todos los productos tienen el mismo supplier_id
      products: transformedProducts,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/purchaseorders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        fetchOrders();
      }

      const responseData = await response.json();
      // console.log("Order created successfully:", responseData);
      return responseData;

      // Aquí puedes manejar la respuesta, mostrar un mensaje de éxito, etc.
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
    }

    setTrackedProductsAddedToOrder([]);
  };

  const addTrackedProductToOrder = (data: any) => {
    // console.log(data);

    if (data.supplier_id) {
      setSupplierId(data.supplier_id);
    } else {
      setSupplierId("");
    }

    const hasTheSameSupplierId = trackedProductsAddedToOrder.some(
      (item: any) => item.supplier_id === data.supplier_id
    );

    // Check that the products are from the same supplier
    if (trackedProductsAddedToOrder.length > 0) {
      const supplier_id = trackedProductsAddedToOrder[0]?.supplier_id;
      if (!hasTheSameSupplierId || supplier_id !== data.supplier_id) {
        // alert("Products must be from the same supplier");
        toast.error("Products must be from the same supplier");
        return "Products must be from the same supplier";
      }
    }

    // Check that the product is not already in the order
    if (trackedProductsAddedToOrder.some((item: any) => item.id === data.id)) {
      // alert("Product already added to order");
      toast.error("Product already added to order");
      return "Product already added to order";
    }

    // Check that the product has a supplier
    if (!data.supplier_id) {
      // alert("Please assign a supplier to the product before");
      toast.error("Please assign a supplier to the product before");
      return "Please assign a supplier to the product before";
    }

    // Transform data to the new object structure
    const newProductInOrder: ProductInOrder = {
      id: data.id,
      product_id: data.product_id,
      supplier_id: data.supplier_id,
      product_name: data.product_name,
      product_image: data.product_image,
      ASIN: data.ASIN,
      supplier_name: data.supplier_name,
      quantity: 0,
      unit_price: data.product_cost,
      total_amount: 0,
      units_sold: data.units_sold,
      fees: data.fees,
      lowest_fba_price: data.lowest_fba_price,
    };

    setTrackedProductsAddedToOrder((prevState) => [
      ...prevState,
      newProductInOrder,
    ]);

    toast.success("Product added to order!");

    return newProductInOrder;
  };

  const removeTrackedProductFromOrder = (data: any) => {
    setTrackedProductsAddedToOrder((prevState) =>
      prevState.filter((item: any) => item.id !== data.id)
    );
    toast.success("Product removed from order!");
  };

  return (
    <TrackedProductContext.Provider
      value={{
        orderBy,
        trackedProducts,
        supplierId,
        trackedProductsAddedToOrder,
        keyword,
        currentPage,
        totalPages,
        trackedProductsToAnalyze,
        handleSetOrderBy,
        setCurrentPage,
        handleNextPage,
        handlePreviousPage,
        setSupplierId,
        setTrackedProductsAddedToOrder,
        addTrackedProductToOrder,
        removeTrackedProductFromOrder,
        updateTrackedProductInOrder,
        handleCreateOrder,
        getTotalPrice,
        handleSetKeyword,
        getTrackedProductsFromAnOrder,
        setTrackedProductsToAnalyze,
        getFilteredTrackedProducts,
        setOrderBy,
        setOrderWay,
      }}
    >
      {children}
    </TrackedProductContext.Provider>
  );
};
export const useTrackedProductContext = () => useContext(TrackedProductContext);
