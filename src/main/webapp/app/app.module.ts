import './vendor.ts';

import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JhiEventManager, NgJhipsterModule } from 'ng-jhipster';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageService, Ng2Webstorage, SessionStorageService } from 'ngx-webstorage';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { RefautoSharedModule } from 'app/shared';
import { RefautoCoreModule } from 'app/core';
import { RefautoAppRoutingModule } from './app-routing.module';
import { RefautoHomeModule } from './home/home.module';
import { RefautoEntityModule } from './entities/entity.module';
import { ConfigurationService } from 'app/core/configuration/configuration.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { ActiveMenuDirective, ErrorComponent, FooterComponent, JhiMainComponent, NavbarComponent, PageRibbonComponent } from './layouts';

export function configServiceFactory(config: ConfigurationService) {
    return () => config.load();
}

@NgModule({
    imports: [
        BrowserModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'fr'
        }),
        RefautoSharedModule.forRoot(),
        RefautoCoreModule,
        RefautoHomeModule,
        RefautoEntityModule,
        RefautoAppRoutingModule,
        LoadingBarHttpClientModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        },
        ConfigurationService,
        {
            provide: APP_INITIALIZER,
            useFactory: configServiceFactory,
            deps: [ConfigurationService],
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class RefautoAppModule {}
