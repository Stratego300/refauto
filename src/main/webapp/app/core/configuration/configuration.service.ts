import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';

@Injectable()
export class ConfigurationService {
    config: any;

    constructor(private http: HttpClient, private eventManager: JhiEventManager) {}

    load(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.http.get('/management/configuration').subscribe(response => {
                this.config = response;
                // After a successful configuration load, broadcast the event everywhere
                this.eventManager.broadcast({
                    name: 'configurationReady',
                    content: 'Configuration has sucessfully been loaded'
                });
                resolve(true);
            });
        });
    }

    get(key: string) {
        return this.config[key];
    }
}
