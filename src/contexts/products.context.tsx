"use client"
import { FC, PropsWithChildren, useContext, useState, createContext, useEffect } from "react";
import { ProductType } from "@/types/product.types";
import { InventoryService } from "@/services/inventory/inventory";

export type ProductState = {
    products: ProductType[];
    currentPage: number;
    totalPages: number;
    updateProduct: (updatedProduct: ProductType) => void;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    setCurrentPage: (page: number) => void;
}

export const ProductContext = createContext<ProductState>({
    products: [],
    currentPage: 1,
    totalPages: 0,
    updateProduct: () => {},
    handleNextPage: () => {},
    handlePreviousPage: () => {},
    setCurrentPage: () => {},
});

export const ProductProvider: FC<PropsWithChildren> = ({children}: PropsWithChildren) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        getProducts(currentPage, limit);
    }, [currentPage, limit]);


    const getProducts = async (page: number, limit: number) => {
      try {
          const response = await InventoryService.getProducts(page, limit);
          setProducts(response.data);
          setTotalPages(response.pages)
      } catch (error) {
          console.error(error);
      }
    };


    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const updateProduct = (updatedProduct: ProductType) => {
        setProducts(products.map(product => 
            product.seller_sku === updatedProduct.seller_sku? updatedProduct : product
        ));
    }

    return (
        <ProductContext.Provider value={{ products, updateProduct, currentPage, totalPages, handleNextPage, handlePreviousPage, setCurrentPage }}>
          {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = () => useContext(ProductContext);
