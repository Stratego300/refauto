import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementRef, NgModule, Renderer } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiDataUtils, JhiDateUtils, JhiEventManager, JhiLanguageService, JhiParseLinks } from 'ng-jhipster';

import { MockLanguageHelper, MockLanguageService } from './helpers/mock-language.service';
import { AccountService, JhiLanguageHelper, LoginService } from 'app/core';
import { MockAccountService } from './helpers/mock-account.service';
import { MockActivatedRoute, MockRouter } from './helpers/mock-route.service';
import { MockActiveModal } from './helpers/mock-active-modal.service';
import { MockEventManager } from './helpers/mock-event-manager.service';

@NgModule({
    providers: [
        DatePipe,
        JhiDataUtils,
        JhiDateUtils,
        JhiParseLinks,
        {
            provide: JhiLanguageService,
            useClass: MockLanguageService
        },
        {
            provide: JhiLanguageHelper,
            useClass: MockLanguageHelper
        },
        {
            provide: JhiEventManager,
            useClass: MockEventManager
        },
        {
            provide: NgbActiveModal,
            useClass: MockActiveModal
        },
        {
            provide: ActivatedRoute,
            useValue: new MockActivatedRoute({ id: 123 })
        },
        {
            provide: Router,
            useClass: MockRouter
        },
        {
            provide: AccountService,
            useClass: MockAccountService
        },
        {
            provide: LoginService,
            useValue: null
        },
        {
            provide: ElementRef,
            useValue: null
        },
        {
            provide: Renderer,
            useValue: null
        },
        {
            provide: JhiAlertService,
            useValue: null
        },
        {
            provide: NgbModal,
            useValue: null
        }
    ],
    imports: [HttpClientTestingModule]
})
export class RefautoTestModule {}
