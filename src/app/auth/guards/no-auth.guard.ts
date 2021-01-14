import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
    constructor(private _auth: AuthService) {}

    /**
     * If user is already logged cannot navigate to login view
     *
     * @returns
     * @memberof NoAuthGuard
     */
    canActivate() {
        return this._auth.isAuth().pipe(
            map((isAuth) => {
                if (isAuth) {
                    return false;
                }
                return true;
            })
        );
    }
}
