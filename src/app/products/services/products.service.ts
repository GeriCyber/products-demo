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

    createNewProduct(
        product: Product
    ): Promise<DocumentReference<any>> {
        return this._afDB.collection('products').add(product);
    }

    getAllProducts(): Observable<DocumentChangeAction<any>[]> {
        return this._afDB.collection('products').snapshotChanges();
    }
}
