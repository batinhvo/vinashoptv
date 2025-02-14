export type VariantOption = {
    id: number,
    name: string,
    media: string,
};

export type Variant = {
    id: number,
    name: string,
    options: VariantOption[],
};

export type Skud = {
    id: number,
    skuCode: string,
    price: number,
    salePrice: number,
    total: number,
    totalOut: number,
    totalOutFake: number,
    weight: number,
    status: string,
    stock: number,
    variantOptionIds: string,
};

export type ProductDetails = {
    id: number,
    useTax: string,
    tax: number,
    status: string, 
    categoryId: number,
    venderId: number,
    isBestSeller: string, 
    isSpecial: string,
    minPrice: number,
    total: number,
    totalOut: number,
    totalOutFake: number,
    media: string,
    title: string,
    summary: string,
    content: string,
    howToUse: string,
    stock: number,
    variants: Variant[],
    skud: Skud[],
};