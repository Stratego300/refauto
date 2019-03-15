import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { HasAnyAuthorityDirective, JhiLoginComponent, RefautoSharedCommonModule, RefautoSharedLibsModule } from './';

@NgModule({
    imports: [RefautoSharedLibsModule, RefautoSharedCommonModule],
    declarations: [JhiLoginComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginComponent],
    exports: [RefautoSharedCommonModule, JhiLoginComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RefautoSharedModule {
    static forRoot() {
        return {
            ngModule: RefautoSharedModule
        };
    }
}
