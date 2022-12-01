import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Goal} from "../../models/goal";
import {Observable} from "rxjs";
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


  postNewGoalService(goalFormData: GoalFormSubmission) {
    console.log("Service -> Post: "+goalFormData);
    return this.http.post(environment.backendHost+"/api/expanses/admin", goalFormData);
  }


}
