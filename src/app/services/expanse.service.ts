import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Expanse} from "../models/expanse";
import {catchError, Observable, throwError} from "rxjs";
import {ExpanseFormSubmission} from "../formModels/ExpanseFormSubmission";
import {PageOfExpanses} from "../models/pageOfExpanses";

@Injectable({
  providedIn: 'root'
})
export class ExpanseService {

  constructor(private http: HttpClient) { }

  getExpansesService(): Observable<Expanse []>{
    // let randomNumber = Math.random();
    // if (randomNumber < 0.5) return throwError(
    //   ()=> new Error("Internet Connexion or Server Error, please try again later."))
    // else
      return this.http.get<Expanse[]>(environment.backendHost + "/api/expanses");
  }
  /**Retrieve Expanses by title, page & size from Backend: */
  getExpansesByTitlePageAndSize(title: string='', page: number=0, size: number=5): Observable<PageOfExpanses>{
    return this.http.get<PageOfExpanses>
                       (environment.backendHost+`/api/expanses?title=${title}&page=${page}&size=${size}`);
  }
  /**'pageOfExpansesObservable$' : is an observable property that gives us the same result as
   *   the 'getExpansesByTitlePageAndSize(...)' above: */
  pageOfExpansesObservable$ = (title: string='', page: number=0, size: number=5): Observable<PageOfExpanses> =>
   this.http.get<PageOfExpanses>(environment.backendHost+`/api/expanses?title=${title}&page=${page}&size=${size}`);

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



}
