import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { resolve } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  loading = true;
  products: Product[] = [];
  filtrado: Product[] = [];

  url = 'https://portfolio-demo-d7899.firebaseio.com/products';

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.loadProducts();
  }

  private loadProducts() {
    return new Promise((resolve, reject) => {

      this.http.get('https://portfolio-demo-d7899.firebaseio.com/products_idx.json').
      subscribe((data: Product[]) => {
        this.products = data;
        this.loading = false;
        resolve();
      });
    });
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

  private filtrar(text: string) {
    text = text.toLocaleLowerCase();
    this.filtrado = [];
    this.products.forEach(prod => {
      const titulo = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(text) >= 0 || titulo.indexOf(text) >= 0) {
        this.filtrado.push(prod);
      }
    });
  }
}
