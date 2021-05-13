import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProfile} from '../interfaces/IProfile';
import {environment} from '../environments/environment-prod';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(environment.base + '/user/profile');
  }
}
