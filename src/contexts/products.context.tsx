"use client"
import { FC, PropsWithChildren, useContext, useState, createContext, useEffect, useRef } from "react";
import { ProductType } from "@/types/product.types";
import { InventoryService } from "@/services/inventory/inventory";
import { EditProductType } from "@/components/inventory/TableRow";
import { NewProductType } from "@/components/inventory/NewTableRow";

export type ProductState = {
    addingProduct: boolean;
    setAddingProduct: React.Dispatch<React.SetStateAction<boolean>>;
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
    createProduct: (newProduct: NewProductType) => void;
}

export const ProductContext = createContext<ProductState>({
    addingProduct: false,
    setAddingProduct: () => { },
    products: [],
    currentPage: 1,
    totalPages: 0,
    keyword: '',
    handleSetKeyword: () =>{},
    updateProduct: () => {},
    handleNextPage: () => {},
    handlePreviousPage: () => {},
    setCurrentPage: () => {},
    handleDeleteProduct: () => { },
    createProduct: () => {},
});

export const ProductProvider: FC<PropsWithChildren> = ({children}: PropsWithChildren) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [addingProduct, setAddingProduct] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [ searchTimeout, setSearchTimeout ] = useState<NodeJS.Timeout | null>(null)
    const limit = 50;
    

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
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleSetKeyword = (keyword: string) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        setSearchTimeout(setTimeout(() => {
            setKeyword(keyword);
            getProducts(currentPage, limit, keyword);
        }, 500));
    };


    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const updateProduct = (updatedProduct: EditProductType) => {

        // find the product and then update
        const productIndex = products.findIndex(product => product.seller_sku === updatedProduct.seller_sku);
        const newUpdatedProduct = products[productIndex];

        // update the product
        newUpdatedProduct.supplier_id = updatedProduct.supplier_id || newUpdatedProduct.supplier_id ;
        newUpdatedProduct.supplier_item_number = updatedProduct.supplier_item_number || newUpdatedProduct.supplier_item_number ;
        newUpdatedProduct.product_cost = updatedProduct.product_cost || newUpdatedProduct.product_cost;
        newUpdatedProduct.pack_type = updatedProduct.pack_type || newUpdatedProduct.pack_type;


        setProducts(products.map(product => 
            product.seller_sku === newUpdatedProduct.seller_sku? newUpdatedProduct : product
        ));
    }


    const handleDeleteProduct = (seller_sku: string) => {
        setProducts(prevProducts => prevProducts.filter(product => product.seller_sku !== seller_sku));
    };

    return (
        <ProductContext.Provider value={{ createProduct, addingProduct, setAddingProduct, products, updateProduct, handleDeleteProduct, currentPage, totalPages, handleNextPage, handlePreviousPage, setCurrentPage, keyword, handleSetKeyword }}>
          {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = () => useContext(ProductContext);
