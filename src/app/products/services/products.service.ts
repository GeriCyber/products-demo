import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    DocumentChangeAction,
    DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private _afDB: AngularFirestore) {}

    /**
     * Add new product to collection
     *
     * @param {Product} product
     * @returns {Promise<DocumentReference<any>>}
     * @memberof ProductsService
     */
    createNewProduct(
        product: Product
    ): Promise<DocumentReference<any>> {
        return this._afDB.collection('products').add(product);
    }

    /**
     * Get the products collection
     *
     * @returns {Observable<DocumentChangeAction<any>[]>}
     * @memberof ProductsService
     */
    getAllProducts(): Observable<DocumentChangeAction<any>[]> {
        return this._afDB.collection('products').snapshotChanges();
    }

    /**
     * Get a product from collection by id
     *
     * @param {string} productId
     * @returns {Observable<any>}
     * @memberof ProductsService
     */
    getProduct(productId: string): Observable<any> {
        return this._afDB.collection('products').doc(productId).get();
    }

    /**
     * Edit a product from collection by id
     *
     * @param {string} productId
     * @param {Product} product
     * @returns {Promise<any>}
     * @memberof ProductsService
     */
    editProduct(productId: string, product: Product): Promise<any> {
        return this._afDB
            .collection('products')
            .doc(productId)
            .update(product);
    }

    /**
     * Delete product from collection by id
     *
     * @param {string} productId
     * @returns {Promise<any>}
     * @memberof ProductsService
     */
    deleteProduct(productId: string): Promise<any> {
        return this._afDB
            .collection('products')
            .doc(productId)
            .delete();
    }
}
