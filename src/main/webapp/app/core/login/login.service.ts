import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { StateStorageService } from '../auth/state-storage.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(
        private accountService: AccountService,
        private authServerProvider: AuthServerProvider,
        private eventManager: JhiEventManager,
        private router: Router,
        private stateStorageService: StateStorageService
    ) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.accountService
                        .identity(true)
                        .then(() => {
                            resolve(data);
                        })
                        .then(() => {
                            // After a successful login, broadcast the event everywhere
                            this.eventManager.broadcast({
                                name: 'authenticationSuccess',
                                content: 'Sending Authentication Success'
                            });
                        });
                    this.tryRedirect();
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        this.authServerProvider.logout().subscribe();
        this.accountService.authenticate(null);
    }

    tryRedirect() {
        // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // since login is succesful, go to stored previousState and clear previousState
        let redirect = this.stateStorageService.getUrl();
        redirect = redirect && redirect !== 'login' ? redirect : '';
        this.router.navigateByUrl(redirect);
    }
}
