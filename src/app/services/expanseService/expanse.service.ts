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

  // readonly imgSamePath : string = './assets/images/';
  // readonly imgEndPath : string = '.png';

  /** Return Images Dynamically: */
  handleImageExpense(categoryExpanseType: string) : string {
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
      case 'Electronics_Accessories':
        return `${imgSamePath}Electronics_Accessories${imgEndPath}`;
      case 'Sport_Fitness':
        return `${imgSamePath}Sport_Fitness${imgEndPath}`;
      case 'Books_audio_subscriptions':
        return `${imgSamePath}Books_audio_subscriptions${imgEndPath}`;
      case 'Alcohol_tobacco':
        return `${imgSamePath}Alcohol_tobacco${imgEndPath}`;
      default:
        return `${imgSamePath}EmptyImage${imgEndPath}`;//EmptyImage isn't saved in 'assets/images' yet!
    }
  }

  /** To return ALT of Image dynamically: */
  handleAltOfImageExpense(categoryExpanseType: string) : string{
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
      case 'Electronics_Accessories':
        return `${categoryExpanseType} image`;
      case 'Sport_Fitness':
        return `${categoryExpanseType} image`;
      case 'Books_audio_subscriptions':
        return `${categoryExpanseType} image`;
      case 'Alcohol_tobacco':
        return `${categoryExpanseType} image`;
      default:
        return `Image unfounded`;//EmptyImage isn't saved in 'assets/images' yet!
    }
  }


  handleImageExpenseById(category_expanse_id: number) : string{
    let imgSamePath = './assets/images/';
    let imgEndPath = '.png';
    switch (category_expanse_id) {
      case 20:
        return `${imgSamePath}grocery${imgEndPath}`;
      case 61:
        return `${imgSamePath}drinks2${imgEndPath}`;
      case 9:
        return `${imgSamePath}gift${imgEndPath}`;
      case 3:
        return `${imgSamePath}airplane${imgEndPath}`;
      case 49:
        return `${imgSamePath}loan2${imgEndPath}`;
      case 56:
        return `${imgSamePath}internet${imgEndPath}`;
      case 58:
        return `${imgSamePath}cellphone${imgEndPath}`;
      case 17:
        return `${imgSamePath}coffee${imgEndPath}`;
      case 19:
        return `${imgSamePath}fastfood${imgEndPath}`;
      case 18:
        return `${imgSamePath}restaurant2${imgEndPath}`;
      case 62:
        return `${imgSamePath}HomemadeFood${imgEndPath}`;
      case 45:
        return `${imgSamePath}financialfees${imgEndPath}`;
      case 6:
        return `${imgSamePath}pharmacy${imgEndPath}`;
      case 60:
        return `${imgSamePath}games2${imgEndPath}`;
      case 14:
        return `${imgSamePath}animals${imgEndPath}`;
      case 63:
        return `${imgSamePath}Computer_PC${imgEndPath}`;
      case 2:
        return `${imgSamePath}trainOrTram${imgEndPath}`;
      case 7:
        return `${imgSamePath}Electronics_Accessories${imgEndPath}`;
      case 32:
        return `${imgSamePath}Sport_Fitness${imgEndPath}`;
      case 33:
        return `${imgSamePath}Books_audio_subscriptions${imgEndPath}`;
      case 43:
        return `${imgSamePath}Alcohol_tobacco${imgEndPath}`;
      default:
        return `${imgSamePath}EmptyImage${imgEndPath}`;//EmptyImage isn't saved in 'assets/images' yet!
    }
  }


  handleAltOfImagesExpenseById(category_expanse_id: number) : string{
    switch (category_expanse_id) {
      case 20:
        return `Groceries image`;
      case 61:
        return `Drinks image`;
      case 9:
        return `Gift image`;
      case 3:
        return `Airplane image`;
      case 49:
        return `Loan image`;
      case 56:
        return `internet image`;
      case 58:
        return `Cell_Phone image`;
      case 17:
        return `Cafe image`;
      case 19:
        return `Fast_Food image`;
      case 18:
        return `Restaurant image`;
      case 62:
        return `Homemade_Food image`;
      case 45:
        return `Charges_Fees image`;
      case 6:
        return `Drug_store_Chemist image`;
      case 60:
        return `Games image`;
      case 14:
        return `Pets_Animals image`;
      case 63:
        return `Computer_PC image`;
      case 2:
        return `Train/Tram image`;
      case 7:
        return `Electronics_Accessories image`;
      case 32:
        return `Sport_Fitness image`;
      case 33:
        return `Books_audio_subscriptions image`;
      case 43:
        return `Alcohol_tobacco image`;
      default:
        return `Image unfounded`;//EmptyImage isn't saved in 'assets/images' yet!
    }
  }

  handleCalendarMonth(month: string) : string{
    let imgStandardPath = './assets/images/';
    let imgEndPath = '.png';
    switch (month) {
      case '01':
        return `${imgStandardPath}january${imgEndPath}`;
      case '02':
        return `${imgStandardPath}february${imgEndPath}`;
      case '03':
        return `${imgStandardPath}march${imgEndPath}`;
      case '04':
        return `${imgStandardPath}april${imgEndPath}`;
      case '05':
        return `${imgStandardPath}may${imgEndPath}`;
      case '06':
        return `${imgStandardPath}june${imgEndPath}`;
      case '07':
        return `${imgStandardPath}july${imgEndPath}`;
      case '08':
        return `${imgStandardPath}august${imgEndPath}`;
      case '09':
        return `${imgStandardPath}september${imgEndPath}`;
      case '10':
        return `${imgStandardPath}october${imgEndPath}`;
      case '11':
        return `${imgStandardPath}november${imgEndPath}`;
      case '12':
        return `${imgStandardPath}december${imgEndPath}`;
      default:
        return `${imgStandardPath}undefined${imgEndPath}`;
    }
  }

  handleAltOfCalendarMonth(month: string) : string{
    switch (month) {
      case '01':
        return 'January Calendar image';
      case '02':
        return 'February Calendar image';
      case '03':
        return 'March Calendar image';
      case '04':
        return 'April Calendar image';
      case '05':
        return 'May Calendar image';
      case '06':
        return 'June Calendar image';
      case '07':
        return 'July Calendar image';
      case '08':
        return 'August Calendar image';
      case '09':
        return 'September Calendar image';
      case '10':
        return 'October Calendar image';
      case '11':
        return 'November Calendar image';
      case '12':
        return 'December Calendar image';
      default:
        return 'Unfounded Calendar image';
    }
  }

}
