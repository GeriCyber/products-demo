import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    loading = true;
    products: Product[] = [];
    filtrado: Product[] = [];

    url = 'https://portfolio-demo-d7899.firebaseio.com/products';

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) {
        this.loadProducts();
    }

    getProduct(id: string) {
        return this.http.get(`${this.url}/${id}.json`);
    }

    searchProduct(text: string) {
        if (this.filtrado.length === 0) {
            this.loadProducts().then(() => {
                this.filtrar(text);
            });
        } else {
            this.filtrar(text);
        }
    }

    private loadProducts() {
        return new Promise((resolve, reject) => {
            this.http
                .get(
                    'https://portfolio-demo-d7899.firebaseio.com/products_idx.json'
                )
                .subscribe((data: Product[]) => {
                    this.products = data;
                    this.loading = false;
                    resolve();
                });
        });
    }

    private filtrar(text: string) {
        text = text.toLocaleLowerCase();
        this.filtrado = [];
        this.products.forEach((prod) => {
            const titulo = prod.titulo.toLocaleLowerCase();
            if (
                prod.categoria.indexOf(text) >= 0 ||
                titulo.indexOf(text) >= 0
            ) {
                this.filtrado.push(prod);
            }
        });
    }
}
