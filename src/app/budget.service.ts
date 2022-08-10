import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Budget} from "./budget";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient ) { }

  getBudgetsService(): Observable<Budget[]> {
    return this.http.get< Budget[] >(environment.backendHost+"/api/budgets")
  }
}
