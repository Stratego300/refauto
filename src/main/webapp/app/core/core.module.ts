import { LOCALE_ID, NgModule } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import locale from '@angular/common/locales/fr';

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'fr'
        },
        DatePipe
    ]
})
export class RefautoCoreModule {
    constructor() {
        registerLocaleData(locale);
    }
}
