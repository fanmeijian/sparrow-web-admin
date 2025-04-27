import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formio } from 'formiojs';
import { switchMap, take } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class FormioTokenInterceptor implements HttpInterceptor {
  constructor(private keycloakService: KeycloakService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.headers)
    return next.handle(req);

  }
}
