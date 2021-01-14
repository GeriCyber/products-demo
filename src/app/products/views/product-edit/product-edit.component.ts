import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../../shared/models/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
    productForm: FormGroup;
    attempt = false;
    random = Math.floor(Math.random() * (300 - 1) + 1);
    product: Product = this._activatedRoute.snapshot.data.product;

    constructor(
        private _fb: FormBuilder,
        private _productsService: ProductsService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.productForm = this._createProductForm();
        this._patchForm();
    }

    backToProducts() {
        this._router.navigate(['products']);
    }

    /**
     *
     * Handle form data to edit the product
     *
     * @returns
     * @memberof ProductEditComponent
     */
    submitForm() {
        if (this.productForm.invalid) {
            Swal.fire('El formulario es inválido');
            return;
        }

        this.attempt = true;
        const {
            name,
            description,
            longDescription,
        } = this.productForm.value;

        const product: Product = {
            name,
            description,
            longDescription,
            image: `https://picsum.photos/seed/${this.random}demo/600`,
        };

        this._productsService
            .editProduct(this.product.id, product)
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
     * Patch data of the current product
     *
     * @private
     * @memberof ProductEditComponent
     */
    private _patchForm() {
        const { name, description, longDescription } = this.product;

        this.productForm.patchValue({
            name,
            description,
            longDescription,
        });
    }

    /**
     * Create reactive form for product
     *
     * @private
     * @returns
     * @memberof ProductEditComponent
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
                    Validators.maxLength(200),
                ],
            ],
        });
    }
}
