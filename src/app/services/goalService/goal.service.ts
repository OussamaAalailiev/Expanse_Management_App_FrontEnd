import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Goal} from "../../models/goal";
import {catchError, Observable, tap, throwError} from "rxjs";
import {AuthenticationLoginService} from "../authenticationLoginService/authentication-login.service";
import {PageOfGoals} from "../../pageModels/pageOfGoals";
import {GoalFormSubmission} from "../../formModels/GoalFormSubmission";

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor( private http: HttpClient,
               private authService: AuthenticationLoginService) { }

  getGoalsService(): Observable<Goal[]>{
    return this.http.get< Goal[] >(environment.backendHost+"/api/goals");
  }

  /**Retrieve Goals by title, page & size from Backend: */
  getGoalsByTitlePageAndSize(title: string='', userId: string=this.authService.authenticatedUserLogin!.id,
                                page: number=0, size: number=4): Observable<PageOfGoals>{
    return this.http.get<PageOfGoals>
    (environment.backendHost+`/api/goalsByUserId?title=${title}&page=${page}&size=${size}&userId=${userId}`);
  }
  /**'pageOfGoalsObservable$' : is an observable property that gives us the same result as
   *   the 'getGoalsByTitlePageAndSize(...)' above: */
  pageOfGoalsObservable$ = (title: string='', userId: string=this.authService.authenticatedUserLogin!.id,
                               page: number=0, size: number=4): Observable<PageOfGoals> =>
    this.http.get<PageOfGoals>(environment.backendHost+`/api/goalsByUserId?title=${title}&page=${page}&size=${size}&userId=${userId}`);

  getPercentageOfAmountAchieved(amountAchieved: number, amountGoal: number): number{
    return Math.floor(((amountAchieved)/(amountGoal)) * 100);
  }

  //'<T>' : represents a Response return Type of type 'T'.
  postNewGoalService(goalFormData: GoalFormSubmission) {
    console.log("Service -> Post: "+goalFormData);
    return this.http.post<void>(environment.backendHost+"/api/goals/addGoal", goalFormData);
  }

  deleteGoal$ = (goalId: number) : Observable<PageOfGoals> =>
    this.http.delete<PageOfGoals>(environment.backendHost+`/api/goals/delete/${goalId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  private handleError(errorResponse: HttpErrorResponse){
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



}
