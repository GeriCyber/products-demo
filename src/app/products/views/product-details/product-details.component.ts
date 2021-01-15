import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product.interface';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
    background: string = 'assets/img/background.jpg';
    product: Product = this._activatedRoute.snapshot.data.product;
    constructor(private _activatedRoute: ActivatedRoute) {}
}
