import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {Goal} from "../../models/goal";
import {GoalService} from "../../services/goalService/goal.service";
import {HttpErrorResponse} from "@angular/common/http";
import {PageOfGoals} from "../../pageModels/pageOfGoals";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";
import {IncomeService} from "../../services/incomeService/income.service";
import {MatDialog} from "@angular/material/dialog";
import {AddGoalModalPopupComponent} from "../../forms/add-goal-modal-popup/add-goal-modal-popup.component";

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  goalList!: Observable<Goal []>;
  //progressCircleVal : number = this.getPercentageOfAmountAchievedToCircularBar();

  errorMessage: string | undefined;//I don't know what 'appState' means yet:
  pageOfGoals$!: Observable<{appState: string, appData?: PageOfGoals, error?: HttpErrorResponse}>;
  /**(1) The 'BehaviorSubject(...)' will contain the response added in the 'getPageOfGoalsV2' below: */
  responseSavedBeforePageNav = new BehaviorSubject<PageOfGoals | undefined>(undefined);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();//'currentPageSubject' will be observed by 'currentPage$'.

  constructor( public goalService: GoalService,
               public incomeService: IncomeService,
               public authService: AuthenticationLoginService,
               public dialog: MatDialog) { }

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

  openDialogOnAddNewGoal(): void{
    this.dialog.open(AddGoalModalPopupComponent, {
      width: '65%',
      minWidth: '60%'
    })
  }

  handleGoalDeleteFinalV2(goal: Goal, number: number , last: boolean ,
                          totalPages: number , length: number, totalElements: number ,
                          first: boolean , numberOfElements: number ,
                          empty: boolean , pageableSortEmpty: boolean,
                          pageableSortSorted: boolean, pageableSortUnsorted: boolean,
                          pageableOffset: number, pageablePageNumber: number, pageablePageSize: number,
                          pageableUnpaged: boolean, pageablePaged: boolean, sortEmpty: boolean,
                          sortSorted: boolean, sortUnsorted: boolean) {
    let confMessage = confirm(`Are you sure you want to Delete "${goal.categoryIncome.categoryIncomeType}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the goal we break out of this method,

    this.pageOfGoals$ = this.goalService.deleteGoal$(goal.id)
      .pipe(
        map((response) => {
          console.log('Page Number: '+ number); console.log('Page Last: '+ last); console.log('Page Total: '+ totalPages);
          console.log('Page TotalElements: '+ totalElements); console.log('Page content length: '+ length);
          this.responseSavedBeforePageNav.next(
            {...response,
              content: this.responseSavedBeforePageNav.value!.content!.filter((e)=> e.id!==goal.id),
              pageable: {sort: {empty: pageableSortEmpty, sorted: pageableSortSorted, unsorted: pageableSortUnsorted},
                offset: pageableOffset, pageNumber: pageablePageNumber, pageSize: pageablePageSize,
                unpaged: pageableUnpaged, paged: pageablePaged},
              last: last, totalElements: totalElements, totalPages: totalPages, size: length,
              sort: {empty: sortEmpty, sorted: sortSorted, unsorted: sortUnsorted},
              first: first, numberOfElements: numberOfElements, number: number, empty: empty}
          );
          if (this.responseSavedBeforePageNav.value!.number != null) {
            this.currentPageSubject.next(this.responseSavedBeforePageNav.value!.number);
          }
          return ({appState: 'APP_LOADED', appData: this.responseSavedBeforePageNav.value});
        }),
        startWith({appState: 'APP_LOADED', appData: this.responseSavedBeforePageNav.value}),
        catchError((errorResponse: HttpErrorResponse) => of({appState: 'APP_ERROR', errorResponse}))
      );

  }

  handleGoalUpdate(goal: Goal) {
    let confMessage = confirm(`Are you sure you want to Update "${goal.categoryIncome.categoryIncomeType}"!`);
    if (!confMessage) return;

  }


}
