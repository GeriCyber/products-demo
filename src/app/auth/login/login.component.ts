import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    attempt = false;
    userControl = new FormControl('', Validators.required);
    passwordControl = new FormControl('', Validators.required);

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {}

    /**
     * Submit event for login action
     *
     * @returns
     * @memberof LoginComponent
     */
    onSubmit() {
        // If there is not a valid user name or password return
        if (
            this.userControl.invalid ||
            this.passwordControl.invalid
        ) {
            Swal.fire('Debes ingresar usuario y contraseña');
            return;
        }

        this.attempt = true;
        this._authService
            .login(this.userControl.value, this.passwordControl.value)
            .then(() => {
                this._router.navigate(['/']);
                this.attempt = false;
            })
            .catch(() => {
                Swal.fire('Usuario o contraseña inválida');
                this.attempt = false;
            });
    }
}
