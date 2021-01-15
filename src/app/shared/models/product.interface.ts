export interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    longDescription?: string;
    image?: string;
    attempt?: boolean;
}
