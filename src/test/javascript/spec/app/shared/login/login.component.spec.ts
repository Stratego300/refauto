import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { LoginService } from 'app/core/login/login.service';
import { JhiLoginComponent } from 'app/shared/login/login.component';
import { RefautoTestModule } from '../../../test.module';
import { MockLoginService } from '../../../helpers/mock-login.service';

describe('Component Tests', () => {
    describe('LoginComponent', () => {
        let comp: JhiLoginComponent;
        let fixture: ComponentFixture<JhiLoginComponent>;
        let mockLoginService: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RefautoTestModule],
                declarations: [JhiLoginComponent],
                providers: [
                    {
                        provide: LoginService,
                        useClass: MockLoginService
                    }
                ]
            })
                .overrideTemplate(JhiLoginComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JhiLoginComponent);
            comp = fixture.componentInstance;
            mockLoginService = fixture.debugElement.injector.get(LoginService);
        });

        it('should authenticate the user and redirect to home when redirect is null', inject(
            [],
            fakeAsync(() => {
                // GIVEN
                const credentials = {
                    username: 'admin',
                    password: 'admin',
                    rememberMe: true
                };
                comp.username = 'admin';
                comp.password = 'admin';
                comp.rememberMe = true;
                comp.credentials = credentials;
                mockLoginService.setResponse({});

                // WHEN/
                comp.login();
                tick(); // simulate async

                // THEN
                expect(comp.authenticationError).toEqual(false);
                expect(mockLoginService.loginSpy).toHaveBeenCalledWith(credentials);
            })
        ));

        it('should authenticate the user and redirect', inject(
            [],
            fakeAsync(() => {
                // GIVEN
                const credentials = {
                    username: 'admin',
                    password: 'admin',
                    rememberMe: true
                };
                comp.username = 'admin';
                comp.password = 'admin';
                comp.rememberMe = true;
                comp.credentials = credentials;
                mockLoginService.setResponse({});

                // WHEN/
                comp.login();
                tick(); // simulate async

                // THEN
                expect(comp.authenticationError).toEqual(false);
                expect(mockLoginService.loginSpy).toHaveBeenCalledWith(credentials);
            })
        ));

        it('should not authenticate and not redirect', inject(
            [],
            fakeAsync(() => {
                // GIVEN
                const credentials = {
                    username: 'admin',
                    password: 'admin',
                    rememberMe: false
                };
                comp.username = 'admin';
                comp.password = 'admin';
                comp.rememberMe = false;
                comp.credentials = credentials;
                mockLoginService.setResponse(Promise.reject(Error('Error')));

                // WHEN
                comp.login();
                tick(); // simulate async

                // THEN
                expect(comp.authenticationError).toEqual(true);
                expect(mockLoginService.loginSpy).toHaveBeenCalledWith(credentials);
            })
        ));
    });
});
