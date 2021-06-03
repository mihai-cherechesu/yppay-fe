import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment-prod";
import {IUsernameTransaction} from "../interfaces/IUsernameTransaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<IUsernameTransaction> {
    return this.http.get<IUsernameTransaction>(environment.base + '/transaction/get/all');
  }
}
