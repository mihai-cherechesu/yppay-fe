import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {StorageService} from '../services/storage.service';
import {catchError} from "rxjs/operators";
import {HttpStatusCode} from "../shared/HttpStatusCode";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService,
              private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const access  = this.storage.get('access');
    const refresh = this.storage.get('refresh');

    return next.handle(this.addAuthorizationHeader(request, access))
    .pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === HttpStatusCode.Unauthorized && refresh) {
          this.auth.getAccessFromRefresh(refresh)
            .subscribe(tokenPair => {
                this.auth.storeTokenPair(tokenPair.access_token, tokenPair.refresh_token);
                return next.handle(this.addAuthorizationHeader(request, tokenPair.access_token));
              }
            );
        }

        return throwError(error);
      })
    );

  }

  addAuthorizationHeader(request: HttpRequest<unknown>, access: string): HttpRequest<unknown> {
    if (access) {
      return request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + access
        }
      });
    }

    return request;
  }

}
