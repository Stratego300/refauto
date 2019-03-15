import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

import { BG_COUNT } from '../shared';
import { Account, AccountService } from 'app/core';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;

    randomImage = Math.floor(Math.random() * BG_COUNT) + 1;

    constructor(private accountService: AccountService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }
}
