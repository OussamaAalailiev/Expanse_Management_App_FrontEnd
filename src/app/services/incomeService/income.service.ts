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
import {ExpensesByCategory} from "../../models/ExpensesByCategory";
import {IncomesByCategory} from "../../models/IncomesByCategory";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient,
              private authService: AuthenticationLoginService) {
  }

  getIncomesService(): Observable<Income []> {
    return this.http.get<Income []>(environment.backendHost + "/api/incomes")
  }

  /**Retrieve Incomes by title, page & size from Backend: */
  getIncomesByTitlePageAndSize(title: string = '', userId: string = this.authService.authenticatedUserLogin!.id,
                               page: number = 0, size: number = 2): Observable<PageOfIncomes> {
    return this.http.get<PageOfIncomes>
    (environment.backendHost + `/api/incomesByUserId?title=${title}&page=${page}&size=${size}&userId=${userId}`);
  }

  /**'pageOfIncomesObservable$' : is an observable property that gives us the same result as
   *   the 'getIncomesByTitlePageAndSize(...)' above: */
  pageOfIncomesObservable$ = (title: string = '', userId: string = this.authService.authenticatedUserLogin!.id,
                              page: number = 0, size: number = 2): Observable<PageOfIncomes> =>
    this.http.get<PageOfIncomes>(environment.backendHost + `/api/incomesByUserId?title=${title}&page=${page}&size=${size}&userId=${userId}`);

  /**Get Total Amount of Incomes per Month & Year By UserID: */
  getTotalIncomesByYearMonthUserIDService(
    userId: string = this.authService.authenticatedUserLogin!.id): Observable<TotalIncomesPerMonthDTO[]> {
    console.log("Inside Service: ");
    console.log("Url= " + environment.backendHost + `/api/incomes/incomesSumByUser/${userId}`);
    return this.http.get<TotalIncomesPerMonthDTO[]>(environment.backendHost + `/api/incomes/incomesSumByUser/${userId}`);
  }

  /**Get Total Amount of Incomes By Category & UserID Ordered By Amount Desc: */
  getTotalIncomesByCategoryAndUserIDAmountDescService(
    userId: string = this.authService.authenticatedUserLogin!.id): Observable<IncomesByCategory[]> {
    console.log("Inside Service: ");
    console.log("Url= " + environment.backendHost + `/api/incomes/incomesByCategoryAndUserId/${userId}`);
    return this.http.get<IncomesByCategory[]>(environment.backendHost + `/api/incomes/incomesByCategoryAndUserIdAmountDesc/${userId}`);
  }
  /**Get Total Amount of Incomes By Category & UserID Ordered By Amount Desc: */
  getTotalIncomesByCategoryAndUserIDDateDescService(
    userId: string = this.authService.authenticatedUserLogin!.id): Observable<IncomesByCategory[]> {
    console.log("Inside Service: ");
    console.log("Url= " + environment.backendHost + `/api/incomes/incomesByCategoryAndUserIdDateDesc/${userId}`);
    return this.http.get<IncomesByCategory[]>(environment.backendHost + `/api/incomes/incomesByCategoryAndUserIdDateDesc/${userId}`);
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

  handleCatIncomeNameByCategory(categoryIncomeType: string): string {
    switch (categoryIncomeType) {
      case 'CHILD_SUPPORT':
        return `Child Support`;
      case 'RENTAL_INCOME':
        return `Rental Income`;
      case 'SALARY':
        return `Salary`;
      case 'DIVIDENDS':
        return `Dividends`;
      case 'TAX_REFUND':
        return `Tax Refund`;
      case 'GIFTS':
        return `Gifts`;
      case 'TRADE_SALES':
        return `Trade - Sales`;
      case 'Dues_and_Grants':
        return `Dues - Grants`;
      case 'Checks_Coupons':
        return `Coupons`;
      case 'SAVINGS':
        return `Savings`;
      case 'ROYALTIES':
        return `Royalties`;
      case 'CONSTRUCTIONS':
        return `Constructions`;
      case 'AGRICULTURE':
        return `Agriculture`;
      case 'SEA_FISHING':
        return `Sea Fishing`;
      case 'MEDICAL_CONSULTATION':
        return `Medical - Consultation`;
      case 'COURT_SERVICE':
        return `Court Service`;
      case 'TOURIST_SERVICE':
        return `Tourist Service`;
      case 'SECURITY_SERVICE':
        return `Security Service`;
      case 'EDUCATION_SERVICE':
        return `Education Service`;
      case 'OTHER_SERVICE':
        return `Other Service`;
      default:
        return `Unknown Category`;//EmptyImage isn't saved in 'assets/images' yet!
    }
  }

  handleImageIncomeById(category_income_id: number): string {
    let imgSamePath = './assets/images/';
    let imgEndPath = '.png';
    switch (category_income_id) {
      case 1:
        return `${imgSamePath}childssupport${imgEndPath}`;
      case 2:
        return `${imgSamePath}rentalincome${imgEndPath}`;
      case 3:
        return `${imgSamePath}salary${imgEndPath}`;
      case 4:
        return `${imgSamePath}DIVIDENDS${imgEndPath}`;
      case 5:
        return `${imgSamePath}taxrefund${imgEndPath}`;
      case 6:
        return `${imgSamePath}gift${imgEndPath}`;
      case 7:
        return `${imgSamePath}trade${imgEndPath}`;
      case 8:
        return `${imgSamePath}duesandgrants${imgEndPath}`;
      case 9:
        return `${imgSamePath}coupon${imgEndPath}`;
      case 10:
        return `${imgSamePath}saving${imgEndPath}`;
      case 11:
        return `${imgSamePath}royalty${imgEndPath}`;//Isn't saved yet!
      case 12:
        return `${imgSamePath}construction${imgEndPath}`;
      case 13:
        return `${imgSamePath}agriculture${imgEndPath}`;
      case 14:
        return `${imgSamePath}seafishing${imgEndPath}`;
      case 15:
        return `${imgSamePath}medicalservice${imgEndPath}`;
      case 16:
        return `${imgSamePath}courtservice${imgEndPath}`;
      case 17:
        return `${imgSamePath}touristservice${imgEndPath}`;
      case 18:
        return `${imgSamePath}securityservice${imgEndPath}`;
      case 19:
        return `${imgSamePath}educationservice${imgEndPath}`;
      case 20:
        return `${imgSamePath}otherservice${imgEndPath}`;
      default:
        return `${imgSamePath}EmptyImage${imgEndPath}`;//EmptyImage isn't saved in 'assets/images' yet!
    }
  }

  handleAltOfImageIncomeById(category_income_id: number): string {
    switch (category_income_id) {
      case 1:
        return `Child Support image`;
      case 2:
        return `Rental Income image`;
      case 3:
        return `Salary image`;
      case 4:
        return `DIVIDENDS image`;
      case 5:
        return `Tax refund image`;
      case 6:
        return `Gift image`;
      case 7:
        return `Trade image`;
      case 8:
        return `Dues and grants image`;
      case 9:
        return `Coupon image`;
      case 10:
        return `Saving image`;
      case 11:
        return `Royalty image`;//Isn't saved yet!
      case 12:
        return `Construction image`;
      case 13:
        return `Agriculture image`;
      case 14:
        return `Sea fishing image`;
      case 15:
        return `Medical service image`;
      case 16:
        return `Court service image`;
      case 17:
        return `Tourist service image`;
      case 18:
        return `Security service image`;
      case 19:
        return `Education service image`;
      case 20:
        return `Other service image`;
      default:
        return 'undefined image';
    }
  }

  handleCatIncomeNameByIncomeCatId(category_income_id: number) : string{
    switch (category_income_id) {
      case 1:
        return `Child Support`;
      case 2:
        return `Rental Income`;
      case 3:
        return `Salary`;
      case 4:
        return `Dividends`;
      case 5:
        return `Tax Refund`;
      case 6:
        return `Gift`;
      case 7:
        return `Trade`;
      case 8:
        return `Dues and grants`;
      case 9:
        return `Coupon`;
      case 10:
        return `Saving`;
      case 11:
        return `Royalty`;//Isn't saved yet!
      case 12:
        return `Construction`;
      case 13:
        return `Agriculture`;
      case 14:
        return `Sea fishing`;
      case 15:
        return `Medical Service`;
      case 16:
        return `Court Service`;
      case 17:
        return `Tourist Service`;
      case 18:
        return `Security Service`;
      case 19:
        return `Education Service`;
      case 20:
        return `Other Service`;
      default:
        return 'undefined Category Service';
    }
  }

}
