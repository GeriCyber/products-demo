import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
    constructor(private _router: Router) {}

    goToCreateProduct() {
        this._router.navigate(['/products/create-product']);
    }
}
