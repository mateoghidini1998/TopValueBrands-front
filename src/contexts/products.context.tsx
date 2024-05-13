"use client"
import { FC, PropsWithChildren, useContext, useState, createContext, useEffect } from "react";
import { ProductType } from "@/types/product.types";
import { InventoryService } from "@/services/inventory/inventory";

export type ProductState = {
    products: ProductType[];
    currentPage: number;
    totalPages: number;
    keyword: string;
    handleSetKeyword: (keyword: string) => void;
    updateProduct: (updatedProduct: ProductType) => void;
    handleDeleteProduct: (seller_sku: string) => void;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    setCurrentPage: (page: number) => void;
}

export const ProductContext = createContext<ProductState>({
    products: [],
    currentPage: 1,
    totalPages: 0,
    keyword: '',
    handleSetKeyword: () =>{},
    updateProduct: () => {},
    handleNextPage: () => {},
    handlePreviousPage: () => {},
    setCurrentPage: () => {},
    handleDeleteProduct: () => {}
});

export const ProductProvider: FC<PropsWithChildren> = ({children}: PropsWithChildren) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const limit = 10;
    

    useEffect(() => {
        getProducts(currentPage, limit, keyword);
    }, [currentPage, limit, keyword]);


    const getProducts = async (page: number, limit: number, keyword?: string) => {
      try {
          const response = await InventoryService.getProducts(page, limit, keyword);
          setProducts(response.data);
          setTotalPages(response.pages)
      } catch (error) {
          console.error(error);
      }
    };


    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleSetKeyword = (keyword: string) => {
        setKeyword(keyword);
    }

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const updateProduct = (updatedProduct: ProductType) => {
        setProducts(products.map(product => 
            product.seller_sku === updatedProduct.seller_sku? updatedProduct : product
        ));
    }


    const handleDeleteProduct = (seller_sku: string) => {
        setProducts(prevProducts => prevProducts.filter(product => product.seller_sku !== seller_sku));
    };

    return (
        <ProductContext.Provider value={{ products, updateProduct, handleDeleteProduct, currentPage, totalPages, handleNextPage, handlePreviousPage, setCurrentPage, keyword, handleSetKeyword }}>
          {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = () => useContext(ProductContext);
