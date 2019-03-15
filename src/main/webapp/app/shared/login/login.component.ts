import { AfterViewInit, Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { BG_COUNT } from '..';

import { LoginService } from 'app/core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
    selector: 'jhi-login',
    templateUrl: './login.component.html'
})
export class JhiLoginComponent implements OnInit, AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;

    randomImage = Math.floor(Math.random() * BG_COUNT) + 1;

    constructor(
        private loginService: LoginService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        private accountService: AccountService
    ) {
        this.credentials = {};
    }

    ngOnInit() {
        if (this.accountService.isAuthenticated()) {
            this.router.navigate(['']);
        }
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }
}
