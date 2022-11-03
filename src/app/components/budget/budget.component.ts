import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../services/budgetService/budget.service";
import {BehaviorSubject, catchError, map, Observable, of, startWith} from "rxjs";
import {Budget} from "../../models/budget";
import {Router} from "@angular/router";
import {PageOfExpanses} from "../../pageModels/pageOfExpanses";
import {HttpErrorResponse} from "@angular/common/http";
import {PageOfBudgets} from "../../pageModels/pageOfBudgets";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";
import {ExpanseService} from "../../services/expanseService/expanse.service";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  // budgetList!: Observable<Budget []>;
  budgetList!: Budget [];
  private errorMessage!: string;
  pageOfBudgets$!: Observable<{appState: string, appData?: PageOfBudgets, error?: HttpErrorResponse}>;
  /**(1) The 'BehaviorSubject(...)' will contain the response added in the 'getPageOfExpansesV2' below: */
  responseSavedBeforePageNav = new BehaviorSubject<PageOfBudgets | undefined>(undefined);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();//'currentPageSubject' will be observed by 'currentPage$'.

  constructor(public budgetService: BudgetService,
              public expenseService: ExpanseService,
              private router: Router,
              public authService: AuthenticationLoginService
              ) { }

  ngOnInit(): void {
    // this.budgetList = this.budgetService.getBudgetsService();
    // this.budgetList.subscribe(data => console.log(data));
    //this.getAllBudgets();
    this.getPageOfBudgetsV2()
  }

  getPageOfBudgetsV2(): void{
    this.pageOfBudgets$ = this.budgetService.pageOfBudgetsObservable$().pipe(
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

  goToAnotherPageOfBudgets(title?: string, userId: string=this.authService.authenticatedUserLogin!.id, pageNumber?: number): void{
    this.pageOfBudgets$ = this.budgetService.pageOfBudgetsObservable$(title, userId, pageNumber).pipe(
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

  goToNextOrPreviousPageOfBudgets(pageDirection?: string, title?: string, userId: string=this.authService.authenticatedUserLogin!.id): void{
    this.goToAnotherPageOfBudgets(title, userId,
      pageDirection === 'NextPage' ? this.currentPageSubject.value+1 : this.currentPageSubject.value-1);
  }

  /*
  getAllBudgets(){
    this.budgetService.getBudgetsService()
      .subscribe(
        (data) =>{
          this.budgetList = data;
          console.log(data)
        }
        ,(error) =>{
          //  this.errorMessage = this.expanseService.handleError(error);//If the Backend respond with an error, we save it to 'errorMessage'.
          this.errorMessage = error;//If the Backend respond with an error, we save it to 'errorMessage'.
        });
  }

   */

  handleBudgetDelete(budget: Budget) {
    /**Confirmation to user for Delete: */
    let confMessage = confirm(`Are you sure you want to Delete Budget: "${budget.title}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    let budgetId = budget.id;// else we continue down below:
    this.budgetService.deleteBudgetService(budgetId)
      .subscribe((value) => {
        // this.getAllExpanses();//To refresh the page dynamically after an Expanse Deletion:
        /**Instead of re-request the list of Expanses from backend again, we will refresh the list
         *  by deleting the budget locally: */
        let indexOfBudgetDeleted = this.budgetList.indexOf(budget);
        this.budgetList.splice(indexOfBudgetDeleted, 1);//To delete locally the Object from frontend table.
        console.log(value);
        console.log("indexOfBudgetDeleted: " + indexOfBudgetDeleted);
      },error => {
        console.log(error);
      })
  }

  handleBudgetFormNav() {
    this.router.navigateByUrl('budgets/newBudget');
  }

  handleUpdateBudgetForm(budget: Budget) {
    let confMessage = confirm(`Are you sure you want to update:
                               "${budget.title?budget.title.toUpperCase():budget.title}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    console.log('Inside \'handleUpdateBudgetForm(budget: Budget)\' method')
    this.router.navigateByUrl(`/budgets/updateBudget/${budget.id}`);
  }
}
