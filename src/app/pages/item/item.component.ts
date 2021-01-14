import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductoCompleto } from 'src/app/shared/models/complete-product.interface';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
    product: ProductoCompleto;
    id: string;

    constructor(
        private route: ActivatedRoute,
        public productService: ProductService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((info) => {
            this.productService
                .getProduct(info['id'])
                .subscribe((data: ProductoCompleto) => {
                    this.product = data;
                    this.id = info['id'];
                });
        });
    }
}
