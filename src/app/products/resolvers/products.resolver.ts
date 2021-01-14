import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Product } from '../../shared/models/product.interface';
import { ProductsService } from '../services/products.service';

/**
 * Resolver to get all products created
 *
 */
@Injectable()
export class ProductsResolver implements Resolve<Product[]> {
    constructor(private _productsService: ProductsService) {}
    resolve(): Observable<Product[]> {
        return this._productsService.getAllProducts().pipe(
            map((products) => {
                if (products) {
                    return products.map((product) => {
                        const data = product.payload.doc.data() as Product;
                        const id = product.payload.doc.id;
                        return { id, ...data };
                    });
                }
            }),
            take(1),
            catchError((error) => {
                console.error(error);
                return of(error);
            })
        );
    }
}
