import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment-prod';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private storage: StorageService) { }

  getTokenPair(username: string, password: string): Observable<any> {
    const body = new HttpParams()
        .set('username', username)
        .set('password', password);

    return this.http.post(environment.base + '/oauth/token?grant_type=password&scope=webclient',
        body.toString(),
        {
          headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
              .set('Authorization', 'Basic ' + btoa(environment.clientName + ':' + environment.clientSecret))
        }
    );
  }

  getAccessFromRefresh(refresh: string): Observable<any> {
      const body = new HttpParams()
          .set('refresh_token', refresh);

      return this.http.post(environment.base + '/oauth/token?grant_type=refresh_token&scope=webclient',
          body.toString(),
          {
              headers: new HttpHeaders()
                  .set('Content-Type', 'application/x-www-form-urlencoded')
                  .set('Authorization', 'Basic ' + btoa(environment.clientName + ':' + environment.clientSecret))
          }
      );
  }

  storeTokenPair(access: string, refresh: string): void {
    this.storage.set('access', access);
    this.storage.set('refresh', refresh);
  }

  removeTokenPair(): void {
    this.storage.remove('access');
    this.storage.remove('refresh');
  }

}
