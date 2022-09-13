import { Component, OnInit } from '@angular/core';
import {IncomeService} from "../../services/incomeService/income.service";
import {Income} from "../../models/income";
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {PageOfIncomes} from "../../pageModels/pageOfIncomes";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  incomeList!: Observable<Income []>;

  errorMessage: string | undefined;//I don't know what 'appState' means yet:
  pageOfIncomes$!: Observable<{appState: string, appData?: PageOfIncomes, error?: HttpErrorResponse}>;
  /**(1) The 'BehaviorSubject(...)' will contain the response added in the 'getPageOfIncomesV2' below: */
  responseSavedBeforePageNav = new BehaviorSubject<PageOfIncomes | undefined>(undefined);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();//'currentPageSubject' will be observed by 'currentPage$'.

  constructor( private incomeService: IncomeService,
               public authService: AuthenticationLoginService) { }

  ngOnInit(): void {
     // this.incomeList = this.incomeService.getIncomesService();
     // this.incomeList.subscribe(data => {console.log(data)});
    this.getPageOfIncomesV2();
  }

  getPageOfIncomesV2(): void{
    this.pageOfIncomes$ = this.incomeService.pageOfIncomesObservable$().pipe(
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
    this.pageOfIncomes$ = this.incomeService.pageOfIncomesObservable$(title, userId, pageNumber).pipe(
      map((response)=>{
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

  //TODO: Add Form To Add New Income:
  handleIncomeFormNav() {
    alert("'Form Page' Not Working yet!");
  }
  //TODO: Add Form To Delete Income:
  handleIncomeDelete(income: Income) {
    alert("'handleIncomeDelete' Function Not Working yet!");
  }
  //TODO: Add Form To Update Income:
  handleUpdateIncomeForm(income: Income) {
    alert("'handleUpdateIncomeForm' Function Not Working yet!");
  }

}
