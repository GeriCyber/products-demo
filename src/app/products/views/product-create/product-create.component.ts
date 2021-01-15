import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../../shared/models/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
    productForm: FormGroup;
    attempt = false;
    randomSeed = Math.floor(Math.random() * (300 - 1 + 1) + 1);
    randomWidth = Math.floor(Math.random() * (800 - 200 + 1) + 200);
    randomHeight = Math.floor(Math.random() * (400 - 200 + 1) + 200);

    constructor(
        private _fb: FormBuilder,
        private _productsService: ProductsService,
        private _router: Router
    ) {}

    ngOnInit() {
        this.productForm = this._createProductForm();
    }

    backToProducts() {
        this._router.navigate(['products']);
    }

    /**
     * Handle form data to create new product
     *
     * @returns
     * @memberof ProductCreateComponent
     */
    submitForm() {
        if (this.productForm.invalid) {
            Swal.fire('El formulario es inválido');
            return;
        }

        this.attempt = true;
        const {
            name,
            price,
            description,
            longDescription,
        } = this.productForm.value;

        const product: Product = {
            name,
            price,
            description,
            longDescription,
            image: `https://picsum.photos/seed/${this.randomSeed}demo/${this.randomWidth}/${this.randomHeight}`,
        };

        this._productsService
            .createNewProduct(product)
            .then(() => {
                this._router
                    .navigate(['products'])
                    .then(() => (this.attempt = false));
            })
            .catch(() => {
                Swal.fire(
                    'Ocurrió un error, por favor intenta nuevamente'
                );
                this.attempt = false;
            });
    }

    /**
     * Create reactive form for product
     *
     * @private
     * @returns
     * @memberof ProductCreateComponent
     */
    private _createProductForm() {
        return this._fb.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                ],
            ],
            price: ['', [Validators.required, Validators.min(1)]],
            description: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                ],
            ],
            longDescription: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(300),
                ],
            ],
        });
    }
}
