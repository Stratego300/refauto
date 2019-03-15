import { Route } from '@angular/router';

import { JhiLoginComponent } from 'app/shared';

export const loginRoute: Route = {
    path: 'login',
    component: JhiLoginComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
