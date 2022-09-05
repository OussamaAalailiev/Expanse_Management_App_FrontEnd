import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Budget} from "../models/budget";
import {Observable} from "rxjs";
import {Expanse} from "../models/expanse";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient ) { }

  getBudgetsService(): Observable<Budget[]> {
    return this.http.get< Budget[] >(environment.backendHost+"/api/budgets")
  }

  deleteBudgetService(budgetId: number){
    return this.http.delete<Budget>(environment.backendHost+`/api/budgets/admin/delete/${budgetId}`);
  }

}
