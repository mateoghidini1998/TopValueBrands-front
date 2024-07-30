"use client";
import {
  FC,
  PropsWithChildren,
  useContext,
  useState,
  createContext,
  useEffect,
  useRef,
} from "react";
import { ProductType } from "@/types/product.types";
import { InventoryService } from "@/services/inventory/inventory";
import { EditProductType } from "@/components/inventory/TableRow";
import { NewProductType } from "@/components/inventory/NewTableRow";
import { usePathname, useRouter } from "next/navigation";

export type ProductState = {
  addingProduct: boolean;
  setAddingProduct: React.Dispatch<React.SetStateAction<boolean>>;
  products: ProductType[];
  currentPage: number;
  totalPages: number;
  keyword: string;
  supplier: any;
  orderBy: string;
  handleSetOrderBy: (order: string, orderWay: string) => void;
  handleSetSupplier: (supplier: any) => void;
  handleSetKeyword: (keyword: string) => void;
  updateProduct: (updatedProduct: ProductType) => void;
  handleDeleteProduct: (id: string) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  setCurrentPage: (page: number) => void;
  createProduct: (newProduct: NewProductType) => void;
};

export const ProductContext = createContext<ProductState>({
  addingProduct: false,
  setAddingProduct: () => {},
  products: [],
  currentPage: 1,
  totalPages: 0,
  keyword: "",
  supplier: null,
  orderBy: "",
  handleSetOrderBy: () => {},
  handleSetSupplier: () => {},
  handleSetKeyword: () => {},
  updateProduct: () => {},
  handleNextPage: () => {},
  handlePreviousPage: () => {},
  setCurrentPage: () => {},
  handleDeleteProduct: () => {},
  createProduct: () => {},
});

export const ProductProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [addingProduct, setAddingProduct] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [supplier, setSupplier] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [orderWay, setOrderWay] = useState("");

  const route = usePathname();

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const limit = 50;

  useEffect(() => {
    getProducts(currentPage, limit, keyword, supplier, orderBy, orderWay);
  }, [currentPage, limit, keyword, supplier, orderBy, orderWay]);

  useEffect(() => {
    if (!(route === "/")) {
      setKeyword("");
      setSupplier("");
    }
  }, [route]);

  const getProducts = async (
    page: number,
    limit: number,
    keyword?: string,
    supplier?: any,
    order?: string,
    orderWay?: string
  ) => {
    try {
      const response = await InventoryService.getProducts(
        page,
        limit,
        keyword,
        supplier,
        order,
        orderWay
      );
      setProducts(response.data);
      setTotalPages(response.pages);
    } catch (error) {
      console.error(error);
    }
  };

  const createProduct = async (data: NewProductType) => {
    console.log(data);
    try {
      const response = await InventoryService.createProduct(data);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSetKeyword = (keyword: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        setKeyword(keyword);
        setCurrentPage(1);
        getProducts(currentPage, limit, keyword, supplier, orderBy, orderWay);
      }, 500)
    );
  };

  const handleSetOrderBy = (order: string, orderWay: string) => {
    setOrderBy(order);
    setOrderWay(orderWay);
    setCurrentPage(1);
    getProducts(currentPage, limit, keyword, supplier, order, orderWay);
  };

  const handleSetSupplier = (supplier: any) => {
    setSupplier(supplier);
    setCurrentPage(1);
    getProducts(currentPage, limit, keyword, supplier, orderBy, orderWay);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const updateProduct = async (updatedProduct: ProductType) => {
    try {
      const response = await InventoryService.updateProduct(updatedProduct);
      // update the product state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        createProduct,
        addingProduct,
        setAddingProduct,
        products,
        updateProduct,
        handleDeleteProduct,
        currentPage,
        totalPages,
        handleNextPage,
        handlePreviousPage,
        setCurrentPage,
        keyword,
        handleSetKeyword,
        supplier,
        handleSetSupplier,
        orderBy,
        handleSetOrderBy,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
