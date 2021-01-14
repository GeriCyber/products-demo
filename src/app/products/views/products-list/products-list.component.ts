import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../../shared/models/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
    products: Product[] = this._activatedRoute.snapshot.data.products;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _productsService: ProductsService
    ) {}

    goToCreateProduct() {
        this._router.navigate(['/products/create-product']);
    }

    editProduct(productId: string) {
        this._router.navigate(['/products/edit-product', productId]);
    }

    /**
     * Delete product
     *
     * @param {string} productId
     * @param {number} productIndex
     * @memberof ProductsListComponent
     */
    deleteProduct(productId: string, productIndex: number) {
        this.products[productIndex].attempt = true;
        this._productsService
            .deleteProduct(productId)
            .then(() => {
                Swal.fire('Se eliminó el producto exitosamente');
                this.products = this.products.filter(
                    (product) => product.id !== productId
                );
            })
            .catch(() => {
                Swal.fire(
                    'Ocurrió un error, por favor intenta nuevamente'
                );
                this.products[productIndex].attempt = false;
            });
    }
}
