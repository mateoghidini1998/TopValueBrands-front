export type ProductType = {
    id: number,
    ASIN: string,
    product_image: string,
    product_name: string,
    seller_sku: string,
    FBA_available_inventory: number,
    reserved_quantity: number,
    Inbound_to_FBA: number,
    supplier_name?: string,
    supplier_item_number?: string,
    product_cost?: number,
    pack_type?: string,
    is_active: boolean
}