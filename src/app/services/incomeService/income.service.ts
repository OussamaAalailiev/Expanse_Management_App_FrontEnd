import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Income} from "../../models/income";
import {AuthenticationLoginService} from "../authenticationLoginService/authentication-login.service";
import {PageOfGoals} from "../../pageModels/pageOfGoals";
import {PageOfIncomes} from "../../pageModels/pageOfIncomes";
import {TotalExpansePerMonthDTO} from "../../models/TotalExpansePerMonthDTO";
import {TotalIncomesPerMonthDTO} from "../../models/TotalIncomesPerMonthDTO";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient,
              private authService: AuthenticationLoginService) { }

  getIncomesService(): Observable<Income []>{
    return this.http.get<Income []>(environment.backendHost+"/api/incomes")
  }

  /**Retrieve Incomes by title, page & size from Backend: */
  getIncomesByTitlePageAndSize(title: string='', userId: string=this.authService.authenticatedUserLogin!.id,
                             page: number=0, size: number=2): Observable<PageOfIncomes>{
    return this.http.get<PageOfIncomes>
    (environment.backendHost+`/api/incomesByUserId?title=${title}&page=${page}&size=${size}&userId=${userId}`);
  }
  /**'pageOfIncomesObservable$' : is an observable property that gives us the same result as
   *   the 'getIncomesByTitlePageAndSize(...)' above: */
  pageOfIncomesObservable$ = (title: string='', userId: string=this.authService.authenticatedUserLogin!.id,
                            page: number=0, size: number=2): Observable<PageOfIncomes> =>
    this.http.get<PageOfIncomes>(environment.backendHost+`/api/incomesByUserId?title=${title}&page=${page}&size=${size}&userId=${userId}`);

  /**Get Total Amount of Incomes per Month & Year By UserID: */
  getTotalIncomesByYearMonthUserIDService(
    userId: string = this.authService.authenticatedUserLogin!.id): Observable<TotalIncomesPerMonthDTO[]>{
    console.log("Inside Service: ");
    console.log("Url= " + environment.backendHost+`/api/incomes/incomesSumByUser/${userId}`);
    return this.http.get<TotalIncomesPerMonthDTO[]>(environment.backendHost+`/api/incomes/incomesSumByUser/${userId}`);
  }

}
