import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private _auth: AuthService) {}

    /**
     * Protect some routes only for logged users
     *
     * @returns
     * @memberof AuthGuard
     */
    canActivate() {
        return this._auth.isAuth().pipe(
            map((isAuth) => {
                if (!isAuth) {
                    Swal.fire(
                        'Debes autenticarte para poder editar productos'
                    );
                }
                return isAuth;
            })
        );
    }
}
