import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authSubject = new BehaviorSubject<boolean>(false);
    constructor(private afAuth: AngularFireAuth) {}

    /**
     * Login with Firebase
     *
     * @param {string} email admin@gericyber.com
     * @param {string} password adminxx5610
     * @returns {Promise<any>}
     * @memberof AuthService
     */
    login(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(
            email,
            password
        );
    }
    /**
     * Logout from Firebase
     *
     * @returns {Promise<any>}
     * @memberof AuthService
     */
    logout(): Promise<any> {
        return this.afAuth
            .signOut()
            .then(() => this.authSubject.next(false));
    }

    /**
     * Check if user is still logged
     *
     * @returns {Observable<boolean>}
     * @memberof AuthService
     */
    isAuth(): Observable<boolean> {
        return this.afAuth.authState.pipe(
            map((fbUser) => {
                if (fbUser) {
                    this.authSubject.next(true);
                    return true;
                } else {
                    this.authSubject.next(false);
                    return false;
                }
            })
        );
    }
}
