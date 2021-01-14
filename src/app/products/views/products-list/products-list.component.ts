import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../shared/models/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
    products: Product[] = this._activatedRoute.snapshot.data.products;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {}

    goToCreateProduct() {
        this._router.navigate(['/products/create-product']);
    }

    editProduct(productId: string) {
        this._router.navigate(['/products/edit-product', productId]);
    }

    deleteProduct() {}
}
