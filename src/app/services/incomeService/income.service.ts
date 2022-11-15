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

  handleIncomeImage(categoryIncomeType: string): string {
    let imgSamePath = './assets/images/';
    let imgEndPath = '.png';
    switch (categoryIncomeType) {
      case 'CHILD_SUPPORT':
        return `${imgSamePath}childsupport${imgEndPath}`;
      case 'RENTAL_INCOME':
        return `${imgSamePath}rentalincome${imgEndPath}`;
      case 'GIFTS':
        return `${imgSamePath}gift${imgEndPath}`;
      case 'SALARY':
        return `${imgSamePath}salary${imgEndPath}`;
      case 'DIVIDENDS':
        return `${imgSamePath}DIVIDENDS${imgEndPath}`;
      case 'TAX_REFUND':
        return `${imgSamePath}taxrefund${imgEndPath}`;
      case 'TRADE_SALES':
        return `${imgSamePath}trade${imgEndPath}`;
      case 'Dues_and_Grants':
        return `${imgSamePath}duesandgrants2${imgEndPath}`;
      case 'Checks_Coupons':
        return `${imgSamePath}coupon${imgEndPath}`;
      case 'SAVINGS':
        return `${imgSamePath}saving${imgEndPath}`;
      case 'CONSTRUCTIONS':
        return `${imgSamePath}construction2${imgEndPath}`;
      case 'AGRICULTURE':
        return `${imgSamePath}agriculture${imgEndPath}`;
      case 'SEA_FISHING':
        return `${imgSamePath}seafishing${imgEndPath}`;
      case 'MEDICAL_CONSULTATION':
        return `${imgSamePath}medicalservice${imgEndPath}`;
      case 'COURT_SERVICE':
        return `${imgSamePath}courtservice${imgEndPath}`;
      case 'TOURIST_SERVICE':
        return `${imgSamePath}touristservice${imgEndPath}`;
      case 'SECURITY_SERVICE':
        return `${imgSamePath}securityservice${imgEndPath}`;
      case 'EDUCATION_SERVICE':
        return `${imgSamePath}educationservice${imgEndPath}`;
      case 'OTHER_SERVICE':
        return `${imgSamePath}otherservice${imgEndPath}`;
      default:
        return `${imgSamePath}EmptyImage${imgEndPath}`;//EmptyImage isn't saved in 'assets/images' yet!
    }
  }

  handleAltOfIncomeImage(categoryIncomeType: string): string {
    switch (categoryIncomeType) {
      case 'CHILD_SUPPORT':
        return `${categoryIncomeType} image`;
      case 'RENTAL_INCOME':
        return `${categoryIncomeType} image`;
      case 'GIFTS':
        return `${categoryIncomeType} image`;
      case 'SALARY':
        return `${categoryIncomeType} image`;
      case 'DIVIDENDS':
        return `${categoryIncomeType} image`;
      case 'TAX_REFUND':
        return `${categoryIncomeType} image`;
      case 'TRADE_SALES':
        return `${categoryIncomeType} image`;
      case 'Dues_and_Grants':
        return `${categoryIncomeType} image`;
      case 'Checks_Coupons':
        return `${categoryIncomeType} image`;
      case 'SAVINGS':
        return `${categoryIncomeType} image`;
      case 'CONSTRUCTIONS':
        return `${categoryIncomeType} image`;
      case 'AGRICULTURE':
        return `${categoryIncomeType} image`;
      case 'SEA_FISHING':
        return `${categoryIncomeType} image`;
      case 'MEDICAL_CONSULTATION':
        return `${categoryIncomeType} image`;
      case 'COURT_SERVICE':
        return `${categoryIncomeType} image`;
      case 'TOURIST_SERVICE':
        return `${categoryIncomeType} image`;
      case 'SECURITY_SERVICE':
        return `${categoryIncomeType} image`;
      case 'EDUCATION_SERVICE':
        return `${categoryIncomeType} image`;
      case 'OTHER_SERVICE':
        return `${categoryIncomeType} image`;
      default:
        return `Image unfounded`;//EmptyImage isn't saved in 'assets/images' yet!
    }
  }

}
