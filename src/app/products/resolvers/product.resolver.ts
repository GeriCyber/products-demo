import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Product } from '../../shared/models/product.interface';
import { ProductsService } from '../services/products.service';

/**
 * Resolver to get a product by id
 *
 */
@Injectable()
export class ProductResolver implements Resolve<Product> {
    constructor(private _productsService: ProductsService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        const productId: string = route.paramMap.get('productId');
        return this._productsService.getProduct(productId).pipe(
            map((product) => {
                if (product.exists) {
                    const data = product.data() as Product;
                    const id = product.id;
                    return { id, ...data };
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
