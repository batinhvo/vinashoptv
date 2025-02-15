export interface Category {
    id: number;
    quantity: number;
    parentId: number;
    sort: number;
    status: string;
    name: string;
    slug: string;
    media: string;
    summary: string;
    children?: Category[];
}