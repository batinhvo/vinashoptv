export interface Product {
    id: number;
    useTax: string;
    tax: string;
    status: string;
    categoryId: number;
    venderId: number;
    isBestSeller: string;
    isSpecial: string;
    minPrice: number;
    total: number;
    totalOut: number;
    totalOutFake: number;
    media: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    howToUse: string;
    categoryName?: string;
    categorySlug?: string;
}

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

export type Skus = {
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

export type ProductDetail = {
    id: number,
    useTax: string,
    tax: number,
    status: string, 
    categoryId: number,
    slug: string,
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
    skus: Skus[],
};

export type skusProduct = {
    id: number,
    price: number,
    productId: number,
    salePrice: number,
    weight: number,
}

export type subImgData = {
    id: number,
    createdBy: number,
    path: string,
    createdAt: number,
    ownerId: number,
    ownerType: string,
    ownerCategoryId: number,
    sort: number,
};