import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Budget} from "../../models/budget";
import {Observable} from "rxjs";
import {Expanse} from "../../models/expanse";
import {ExpanseFormSubmission} from "../../formModels/ExpanseFormSubmission";
import {BudgetFormSubmission} from "../../formModels/BudgetFormSubmission";
import {ValidationErrors} from "@angular/forms";
import {PageOfExpanses} from "../../pageModels/pageOfExpanses";
import {PageOfBudgets} from "../../pageModels/pageOfBudgets";

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

  addNewBudgetService(budgetFormData: BudgetFormSubmission) {
    console.log("Service -> Post: "+budgetFormData);
    return this.http.post(environment.backendHost+"/api/budgets/admin", budgetFormData);
  }

  updateBudgetService(budget: Budget): Observable<Budget>{
    return this.http.put<Budget>(environment.backendHost+`/api/budgets/admin/${budget.id}`, budget);
  }

  getOneBudgetByIdService(budgetId: number): Observable<Budget>{
    return this.http.get<Budget>(environment.backendHost+`/api/budgets/${budgetId}`)
  }

  /**Retrieve Budgets by title, page & size from Backend: */
  getBudgetsByTitlePageAndSize(title: string='', page: number=0, size: number=4): Observable<PageOfBudgets>{
    return this.http.get<PageOfBudgets>
    (environment.backendHost+`/api/budgets?title=${title}&page=${page}&size=${size}`);
  }
  /**'pageOfBudgetsObservable$' : is an observable property that gives us the same result as
   *   the 'getBudgetsByTitlePageAndSize(...)' above: */
  pageOfBudgetsObservable$ = (title: string='', page: number=0, size: number=4): Observable<PageOfBudgets> =>
    this.http.get<PageOfBudgets>(environment.backendHost+`/api/budgets?title=${title}&page=${page}&size=${size}`);


}
