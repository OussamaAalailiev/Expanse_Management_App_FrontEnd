import { Component, OnInit } from '@angular/core';
import {IncomeService} from "../../services/incomeService/income.service";
import {Income} from "../../models/income";
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {PageOfIncomes} from "../../pageModels/pageOfIncomes";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";
import {MatDialog} from "@angular/material/dialog";
import {AddIncomeModalComponent} from "../../forms/add-income-modal/add-income-modal.component";
import {UpdateIncomeModalComponent} from "../../forms/update-income-modal/update-income-modal.component";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  incomeList!: Observable<Income []>;

  errorMessage: string | undefined;//I don't know what 'appState' means yet:
  pageOfIncomes$!: Observable<{ appState: string, appData?: PageOfIncomes, error?: HttpErrorResponse }>;
  /**(1) The 'BehaviorSubject(...)' will contain the response added in the 'getPageOfIncomesV2' below: */
  responseSavedBeforePageNav = new BehaviorSubject<PageOfIncomes | undefined>(undefined);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();//'currentPageSubject' will be observed by 'currentPage$'.

  constructor(public incomeService: IncomeService,
              public authService: AuthenticationLoginService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.incomeList = this.incomeService.getIncomesService();
    // this.incomeList.subscribe(data => {console.log(data)});
    this.getPageOfIncomesV2();
  }

  getPageOfIncomesV2(): void {
    this.pageOfIncomes$ = this.incomeService.pageOfIncomesObservable$().pipe(
      map((response) => {
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
  goToAnotherPage(title?: string, userId: string = this.authService.authenticatedUserLogin!.id, pageNumber: number = 0): void {
    this.pageOfIncomes$ = this.incomeService.pageOfIncomesObservable$(title, userId, pageNumber).pipe(
      map((response) => {
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

  goToNextOrPreviousPage(pageDirection?: string, title?: string, userId: string = this.authService.authenticatedUserLogin!.id): void {
    this.goToAnotherPage(title, userId,
      pageDirection === 'NextPage' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

  //TODO: Add Form To Delete Income:
  handleIncomeDelete(income: Income, number: number, last: boolean,
                     totalPages: number, length: number, totalElements: number,
                     first: boolean, numberOfElements: number,
                     empty: boolean, pageableSortEmpty: boolean,
                     pageableSortSorted: boolean, pageableSortUnsorted: boolean,
                     pageableOffset: number, pageablePageNumber: number, pageablePageSize: number,
                     pageableUnpaged: boolean, pageablePaged: boolean, sortEmpty: boolean,
                     sortSorted: boolean, sortUnsorted: boolean) {
    /**Confirmation to user for Delete: */
    let confMessage = confirm(`Are you sure you want to Delete Expanse: "${income.categoryIncome.categoryIncomeType}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    this.pageOfIncomes$ = this.incomeService.deleteIncome$(income.id)
      .pipe(
        map((response) => {
          console.log('Page Number: '+ number); console.log('Page Last: '+ last); console.log('Page Total: '+ totalPages);
          console.log('Page TotalElements: '+ totalElements); console.log('Page content length: '+ length);
          this.responseSavedBeforePageNav.next(
            {...response,
              content: this.responseSavedBeforePageNav.value!.content!.filter((e)=> e.id!==income.id),
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

  //TODO: Add Form To Update Income:
  handleUpdateIncomeForm(income: Income) {
    alert("'handleUpdateIncomeForm' Function Not Working yet!");
  }


  openDialogOnAddNewIncome() {
    this.dialog.open(AddIncomeModalComponent, {
      width: '65%',
      minWidth: '60%'
    });
  }

  openDialogOnUpdateIncome(income: Income) {
    this.dialog.open(UpdateIncomeModalComponent, {
      width: '65%',
      minWidth: '60%',
      data: income
    })
  }


}
