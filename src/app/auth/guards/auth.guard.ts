import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
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
        return this._auth.isAuth();
    }
}
