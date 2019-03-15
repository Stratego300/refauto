import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
    constructor(
        private http: HttpClient,
        private $localStorage: LocalStorageService,
        private $sessionStorage: SessionStorageService,
        private configurationService: ConfigurationService
    ) {}

    getToken() {
        return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    }

    login(credentials): Observable<any> {
        if (this.configurationService.get('security-type') === 'local') {
            this.storeAuthenticationToken(credentials.username, credentials.rememberMe);
            return of(credentials.username);
        } else {
            const url = this.configurationService.get('auth-url');

            if (credentials.username) {
                const data = {
                    username: credentials.username,
                    password: credentials.password,
                    rememberMe: credentials.rememberMe
                };
                return this.http.post(url, data, { observe: 'response', responseType: 'text' }).pipe(map(authenticateSuccess.bind(this)));
            } else {
                return this.http
                    .get(url, { observe: 'response', responseType: 'text', withCredentials: true })
                    .pipe(map(authenticateSuccess.bind(this)));
            }
        }

        function authenticateSuccess(resp) {
            const bearerToken = resp.headers.get('Authorization');
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken.slice(7, bearerToken.length);
                this.storeAuthenticationToken(jwt, credentials.rememberMe);
                return jwt;
            }
        }
    }

    loginWithToken(jwt, rememberMe) {
        if (jwt) {
            this.storeAuthenticationToken(jwt, rememberMe);
            return Promise.resolve(jwt);
        } else {
            return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
        }
    }

    storeAuthenticationToken(jwt, rememberMe) {
        if (rememberMe) {
            this.$localStorage.store('authenticationToken', jwt);
        } else {
            this.$sessionStorage.store('authenticationToken', jwt);
        }
    }

    logout(): Observable<any> {
        return new Observable(observer => {
            this.$localStorage.clear('authenticationToken');
            this.$sessionStorage.clear('authenticationToken');
            observer.complete();
        });
    }
}
