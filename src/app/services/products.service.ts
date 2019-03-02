import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  loading = true;
  products: Product[] = [];
  url = 'https://portfolio-demo-d7899.firebaseio.com/products';

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get('https://portfolio-demo-d7899.firebaseio.com/products_idx.json').
    subscribe((data: Product[]) => {
      this.products = data;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

  getProduct(id: string) {
    return this.http.get(`${this.url}/${id}.json`);
  }
}
