import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { AuthService } from './auth/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    splashScreen = true;
    constructor(private _authService: AuthService) {
        this._authService.authSubject
            .pipe(delay(2000))
            .subscribe(() => (this.splashScreen = false));
    }
}
