import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    products: Product[] = this._activatedRoute.snapshot.data.products;
    constructor(private _activatedRoute: ActivatedRoute) {
    }
}
