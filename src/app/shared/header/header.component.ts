import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuth: boolean = null;
    private _subscription: Subscription = new Subscription();

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.checkAuth();
    }

    /**
     * Check the auth status
     *
     * @memberof HeaderComponent
     */
    checkAuth() {
        this._subscription.add(
            this._authService.isAuth().subscribe((isAuth) => {
                this.isAuth = isAuth;
            })
        );
    }

    /**
     * Logout
     *
     * @memberof HeaderComponent
     */
    logout() {
        this._authService
            .logout()
            .then(() => this._router.navigate(['/']));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
