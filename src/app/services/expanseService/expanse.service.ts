import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Expanse} from "../../models/expanse";
import {catchError, Observable, throwError} from "rxjs";
import {ExpanseFormSubmission} from "../../formModels/ExpanseFormSubmission";
import {PageOfExpanses} from "../../pageModels/pageOfExpanses";
import {ValidationErrors} from "@angular/forms";
import {AuthenticationLoginService} from "../authenticationLoginService/authentication-login.service";
import {TotalExpansePerMonthDTO} from "../../models/TotalExpansePerMonthDTO";
import {UUID} from "angular2-uuid";
import {ExpensesByCategory} from "../../models/ExpensesByCategory";

@Injectable({
  providedIn: 'root'
})
export class ExpanseService {

  constructor(private http: HttpClient,
              private authService: AuthenticationLoginService) { }

  getExpansesService(): Observable<Expanse []>{
    // let randomNumber = Math.random();
    // if (randomNumber < 0.5) return throwError(
    //   ()=> new Error("Internet Connexion or Server Error, please try again later."))
    // else
      return this.http.get<Expanse[]>(environment.backendHost + "/api/expanses");
  }
  /**Retrieve Expanses by title, page & size from Backend: */
  getExpansesByTitlePageAndSize(title: string='', userId: string=this.authService.authenticatedUserLogin!.id,
                                page: number=0, size: number=4): Observable<PageOfExpanses>{
    return this.http.get<PageOfExpanses>
                       (environment.backendHost+`/api/expansesByUser?title=${title}&page=${page}&size=${size}&userId=${userId}`);
  }
  /**'pageOfExpansesObservable$' : is an observable property that gives us the same result as
   *   the 'getExpansesByTitlePageAndSize(...)' above: */
  pageOfExpansesObservable$ = (title: string='', userId: string=this.authService.authenticatedUserLogin!.id,
                               page: number=0, size: number=4): Observable<PageOfExpanses> =>
   this.http.get<PageOfExpanses>(environment.backendHost+`/api/expansesByUser?title=${title}&page=${page}&size=${size}&userId=${userId}`);

   handleError(errorResponse: HttpErrorResponse){
    if (errorResponse.status===0){
      // A client-side or network error occurred. Handle it accordingly.
      console.error(errorResponse.error);
    }else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned status code: ${errorResponse.status} body was: `, errorResponse.error )
    }
    // Return an observable with a user-facing error message.
    return throwError(()=> new Error('Something bad happened; please try again later.'));

  }

  postNewExpanseService(expanseFormData: ExpanseFormSubmission) {
    console.log("Service -> Post: "+expanseFormData);
    return this.http.post(environment.backendHost+"/api/expanses/admin", expanseFormData);
      // .pipe(catchError(this.handleError()));
  }

  deleteExpanseService(expanseId: number){
    return this.http.delete<Expanse>(environment.backendHost+`/api/expanses/admin/delete/${expanseId}`);
  }

  updateExpanseService(expanse: Expanse): Observable<Expanse>{
    return this.http.put<Expanse>(environment.backendHost+`/api/expanses/admin/${expanse.id}`, expanse);
  }

  getOneExpanseByIdService(expanseId: number): Observable<Expanse>{
    return this.http.get<Expanse>(environment.backendHost+`/api/expanses/${expanseId}`)
  }

  /**Get Total Amount of Expanses per Month & Year By UserID: */
  getTotalExpansesByYearMonthUserIDService(
                     userId: string = this.authService.authenticatedUserLogin!.id): Observable<TotalExpansePerMonthDTO[]>{
    console.log("Inside Service: ");
    console.log("Url= " + environment.backendHost+`/api/expansesSumByUser/${userId}`);
    return this.http.get<TotalExpansePerMonthDTO[]>(environment.backendHost+`/api/expansesSumByUser/${userId}`);
  }

  /**Get Total Amount of Expanses By Category & UserID: */
  getTotalExpansesByCategoryAndUserIDService(
    userId: string = this.authService.authenticatedUserLogin!.id): Observable<ExpensesByCategory[]>{
    console.log("Inside Service: ");
    console.log("Url= " + environment.backendHost+`/api/expensesSumByCategoryAndUserId/${userId}`);
    return this.http.get<ExpensesByCategory[]>(environment.backendHost+`/api/expensesSumByCategoryAndUserId/${userId}`);
  }

  /** Return Images Dynamically: */
  handleImagesExpense(categoryExpanseType: string) : string {
    let imgSamePath = './assets/images/';
    let imgEndPath = '.png';
    switch (categoryExpanseType) {
      case 'Groceries':
        return `${imgSamePath}grocery${imgEndPath}`;
      case 'Drinks':
        return `${imgSamePath}drinks2${imgEndPath}`;
      case 'Gifts':
        return `${imgSamePath}gift${imgEndPath}`;
      case 'Plane_LongDistance':
        return `${imgSamePath}airplane${imgEndPath}`;
      case 'Loan':
        return `${imgSamePath}loan2${imgEndPath}`;
      case 'Internet':
        return `${imgSamePath}internet${imgEndPath}`;
      case 'Cell_Phone':
        return `${imgSamePath}cellphone${imgEndPath}`;
      case 'Cafe':
        return `${imgSamePath}coffee${imgEndPath}`;
      case 'Fast_Food':
        return `${imgSamePath}fastfood${imgEndPath}`;
      case 'Restaurant':
        return `${imgSamePath}restaurant2${imgEndPath}`;
      case 'Homemade_Food':
        return `${imgSamePath}HomemadeFood${imgEndPath}`;
      case 'Charges_Fees':
        return `${imgSamePath}financialfees${imgEndPath}`;
      case 'Drug_store_Chemist':
        return `${imgSamePath}pharmacy${imgEndPath}`;
      case 'Games':
        return `${imgSamePath}games2${imgEndPath}`;
      case 'Pets_Animals':
        return `${imgSamePath}animals${imgEndPath}`;
      case 'Computer_PC':
        return `${imgSamePath}Computer_PC${imgEndPath}`;
      case 'Public_transport':
        return `${imgSamePath}trainOrTram${imgEndPath}`;
      default:
        return `${imgSamePath}EmptyImage${imgEndPath}`;//EmptyImage isn't saved in 'assets/images' yet!
    }
  }

  /** To return ALT of Image dynamically: */
  handleAltOfImagesExpense(categoryExpanseType: string) : string{
    switch (categoryExpanseType) {
      case 'Groceries':
        return `${categoryExpanseType} image`;
      case 'Drinks':
        return `${categoryExpanseType} image`;
      case 'Gifts':
        return `${categoryExpanseType} image`;
      case 'Plane_LongDistance':
        return `${categoryExpanseType} image`;
      case 'Loan':
        return `${categoryExpanseType} image`;
      case 'Internet':
        return `${categoryExpanseType} image`;
      case 'Cell_Phone':
        return `${categoryExpanseType} image`;
      case 'Cafe':
        return `${categoryExpanseType} image`;
      case 'Fast_Food':
        return `${categoryExpanseType} image`;
      case 'Restaurant':
        return `${categoryExpanseType} image`;
      case 'Homemade_Food':
        return `${categoryExpanseType} image`;
      case 'Charges_Fees':
        return `${categoryExpanseType} image`;
      case 'Drug_store_Chemist':
        return `${categoryExpanseType} image`;
      case 'Games':
        return `${categoryExpanseType} image`;
      case 'Pets_Animals':
        return `${categoryExpanseType} image`;
      case 'Computer_PC':
        return `${categoryExpanseType} image`;
      default:
        return `Image unfounded`;//EmptyImage isn't saved in 'assets/images' yet!
    }
  }


}
