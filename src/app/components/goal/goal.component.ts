import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {Goal} from "../../models/goal";
import {GoalService} from "../../services/goalService/goal.service";
import {PageOfExpanses} from "../../pageModels/pageOfExpanses";
import {HttpErrorResponse} from "@angular/common/http";
import {PageOfGoals} from "../../pageModels/pageOfGoals";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  goalList!: Observable<Goal []>;

  errorMessage: string | undefined;//I don't know what 'appState' means yet:
  pageOfGoals$!: Observable<{appState: string, appData?: PageOfGoals, error?: HttpErrorResponse}>;
  /**(1) The 'BehaviorSubject(...)' will contain the response added in the 'getPageOfGoalsV2' below: */
  responseSavedBeforePageNav = new BehaviorSubject<PageOfGoals | undefined>(undefined);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();//'currentPageSubject' will be observed by 'currentPage$'.

  constructor( private goalService: GoalService,
               public authService: AuthenticationLoginService) { }

  ngOnInit(): void {
    // this.goalList = this.goalService.getGoalsService();
    // this.goalList.subscribe((date) => console.log(date));
    this.getPageOfGoalsV2();
  }

  getPageOfGoalsV2(): void{
    this.pageOfGoals$ = this.goalService.pageOfGoalsObservable$().pipe(
      map((response)=>{
        this.responseSavedBeforePageNav.next(response);
        this.currentPageSubject.next(response.number);//We get the current page number gotten from Backend
        console.log(response);// response, then we set it to the Behavioral Object 'currentPageSubject':
        return ({appState: 'APP_LOADED', appData: response})
      }),
      startWith({appState: 'APP_LOADING'}),
      catchError((errorResponse: HttpErrorResponse) => of({appState: 'APP_ERROR', errorResponse}))
    )
  }

  //'pageNumber' has a default value of '0':
  goToAnotherPage(title?: string, userId: string=this.authService.authenticatedUserLogin!.id, pageNumber: number = 0): void{
    this.pageOfGoals$ = this.goalService.pageOfGoalsObservable$(title, userId, pageNumber).pipe(
      map((response: PageOfGoals)=>{
        this.responseSavedBeforePageNav.next(response);
        this.currentPageSubject.next(response.number);//Or we can pass the 'pageNumber':
        console.log(response);
        return ({appState: 'APP_LOADED', appData: response})
      }),
      startWith({appState: 'APP_LOADED', appData: this.responseSavedBeforePageNav.value}),//(2)Changed State to 'APP_LOADED' because the data was already loaded.
      //(3) Then we will grab the previous response into the 'startWith(...)':
      catchError((errorResponse: HttpErrorResponse) => of({appState: 'APP_ERROR', errorResponse}))
    )
  }

  goToNextOrPreviousPage(pageDirection?: string, title?: string, userId: string=this.authService.authenticatedUserLogin!.id): void{
    this.goToAnotherPage(title, userId,
      pageDirection === 'NextPage' ? this.currentPageSubject.value+1 : this.currentPageSubject.value-1);
  }

  //TODO: Add Form To Add New Goal:
  handleGoalFormNav() {
    alert("'Form Page' Not Working yet!");
  }
  //TODO: Add Form To Delete Goal:
  handleGoalDelete(goal: Goal) {
    alert("'handleGoalDelete' Function Not Working yet!");
  }
  //TODO: Add Form To Update Goal:
  handleUpdateGoalForm(goal: Goal) {
    alert("'handleUpdateGoalForm' Function Not Working yet!");
  }

}
