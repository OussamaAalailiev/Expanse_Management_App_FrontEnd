import { Component, OnInit } from '@angular/core';
import {ExpanseService} from "../../services/expanseService/expanse.service";
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {Expanse} from "../../models/expanse";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NewExpanseFormComponent} from "../../forms/new-expanse-form/new-expanse-form.component";
import {UpdateExpanseComponent} from "../../forms/update-expanse/update-expanse.component";
import {PageOfExpanses} from "../../pageModels/pageOfExpanses";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-expanse',
  templateUrl: './expanse.component.html',
  styleUrls: ['./expanse.component.css']
})
export class ExpanseComponent implements OnInit {

  //InitialState :
  initialState: PageOfExpanses = {
    content: []
  };
  //expansesList!: Observable<Expanse []>;
  expansesList!: Expanse [];
  //errorMessage: Observable<never> | undefined;
  errorMessage: string | undefined;
  //'{appState: string, appData?: PageOfExpanses, error?: HttpErrorResponse}' is the State of the app: 'appState$':
  pageOfExpanses$!: Observable<{appState: string, appData?: PageOfExpanses, error?: HttpErrorResponse}>;
  /**(1) The 'BehaviorSubject(...)' will contain the response added in the 'getPageOfExpansesV2' below: */
    //'undefined' could be replaced by 'initialState' below:
  responseSavedBeforePageNav = new BehaviorSubject<PageOfExpanses | undefined>(undefined);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();//'currentPageSubject' will be observed by 'currentPage$'.

  get state(){
    return this.responseSavedBeforePageNav.getValue();
  }
  //'setState(...)': whenever a state is coming we will push it into our subscriber stored in 'BehaviorSubject':
  setState(pageOfExpenses: PageOfExpanses){
    this.responseSavedBeforePageNav.next(pageOfExpenses);
  }

  get state$(){
    return this.responseSavedBeforePageNav.asObservable();
  }

  constructor(public expanseService: ExpanseService,
              private router: Router,
              //public matDialog: MatDialog
              public authService: AuthenticationLoginService
               ) { }

  ngOnInit(): void {
   //this.getAllExpanses();
    //this.getPageOfExpanses();
    this.getPageOfExpansesV2();
  }

  getPageOfExpansesV2(): void{
    this.pageOfExpanses$ = this.expanseService.pageOfExpansesObservable$().pipe(
      map((response)=>{
        //We save the current pageOfExpanses of type Observable in 'responseSavedBeforePageNav'
        // using 'next(response)':
        this.responseSavedBeforePageNav.next(response);
        if (response.number != null) {
          this.currentPageSubject.next(response.number);
        }//We get the current page number gotten from Backend
        console.log(response);// response, then we set it to the Behavioral Object 'currentPageSubject':
        return ({appState: 'APP_LOADED', appData: response})
      }),
      startWith({appState: 'APP_LOADING'}),
      catchError((errorResponse: HttpErrorResponse) => of({appState: 'APP_ERROR', errorResponse}))
    )
  }
//'pageNumber' has a default value of '0':
  goToAnotherPage(title?: string, userId: string=this.authService.authenticatedUserLogin!.id, pageNumber: number = 0): void{
    this.pageOfExpanses$ = this.expanseService.pageOfExpansesObservable$(title, userId, pageNumber).pipe(
      map((response: PageOfExpanses)=>{
        this.responseSavedBeforePageNav.next(response);
        if (response.number != null) {
          this.currentPageSubject.next(response.number);
        }//Or we can pass the 'pageNumber':
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

  // getPageOfExpansesV1(){
  //   this.pageOfExpanses = this.expanseService.getExpansesByTitlePageAndSize().subscribe(
  //     (pageOfExpanses) => {
  //       // pageOfExpanses.content;
  //         console.log(pageOfExpanses);
  //     },(error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  /*
  getAllExpanses(){
    this.expanseService.getExpansesService()
      .subscribe(
      (data) =>{
          this.expansesList = data;
          console.log(data)
      }
      ,(error) =>{
        //  this.errorMessage = this.expanseService.handleError(error);//If the Backend respond with an error, we save it to 'errorMessage'.
        this.errorMessage = error;//If the Backend respond with an error, we save it to 'errorMessage'.
      });
  }
   */

  handleExpanseDelete(expanse: Expanse) {
    /**Confirmation to user for Delete: */
    let confMessage = confirm(`Are you sure you want to Delete Expanse: "${expanse.title}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    let expanseId = expanse.id;// else we continue down below:
    this.expanseService.deleteExpanseService(expanseId)
      .subscribe((value) => {
        // this.getAllExpanses();//To refresh the page dynamically after an Expanse Deletion:
        /**Instead of re-request the list of Expanses from backend again, we will refresh the list
         *  by deleting the expanse locally:
         * */
        // this.responseSavedBeforePageNav.next(
        //   {...,content: {this.responseSavedBeforePageNav.}}
        // );
          //TODO : Expense Delete Locally doesn't Work!

        /*
        //Get the current items 'currentPageOfExpenses' from the BehavioralSubject:
        const currentPageOfExpenses = this.responseSavedBeforePageNav.getValue()?.content;
        // Use the id of the argument item to remove it from the currentItems 'currentPageOfExpenses':
        const pageOfExpensesWithoutExpenseDeleted = currentPageOfExpenses?.filter(({id})=> id!==expanseId);
        //Emit the new Array of Expenses:
        this.responseSavedBeforePageNav.next(pageOfExpensesWithoutExpenseDeleted);
         */


       /*
        let indexOfExpanseDeleted = this.expansesList.indexOf(value);
        if(indexOfExpanseDeleted!==-1){//To ensure that if the index of element isn't found then it won't remove an item(last item) from the Array:
          this.expansesList.splice(indexOfExpanseDeleted, 1);
        }//To delete locally the Object from frontend table.
        */

      },error => {
        console.log("Inside Error IndexOf! :(");
        console.log(error);
      })
  }

  handleExpanseDelete2(expanse: Expanse){
    /**Confirmation to user for Delete: */
    let confMessage = confirm(`Are you sure you want to Delete Expanse: "${expanse.title}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    this.expanseService.deleteExpanseService(expanse.id)
      .pipe(
        map((response) => {
          this.responseSavedBeforePageNav.next(
            // {this.responseSavedBeforePageNav,
            //        content: this.responseSavedBeforePageNav.value!.content!.filter((e)=> e.id!==expanse.id)}
          {...response,content: this.responseSavedBeforePageNav.value!.content!.filter((e)=> e.id!==expanse.id)}
          )
          // if (response.number != null) {
          //   this.currentPageSubject.next(response.number);
          // }
          return ({appState: 'APP_LOADED', appData: this.responseSavedBeforePageNav})
        }),
      startWith({appState: 'APP_LOADED', appData: this.responseSavedBeforePageNav}),//(2)Changed State to 'APP_LOADED' because the data was already loaded.
      //(3) Then we will grab the previous response into the 'startWith(...)':
      catchError((errorResponse: HttpErrorResponse) => of({appState: 'APP_ERROR', errorResponse}))
      )
      .subscribe(
        (value) => {
          this.responseSavedBeforePageNav.next(
            {...value,
              content: this.responseSavedBeforePageNav.value!.content}
          );
          window.location.reload();
        }
      )
  }

  handleExpanseDelete3(expanse: Expanse){
    /**Confirmation to user for Delete: */
    let confMessage = confirm(`Are you sure you want to Delete Expanse: "${expanse.title}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    this.expanseService.deleteExpanseService(expanse.id)
      .subscribe(
        (expense) => {
          const newState = {...this.responseSavedBeforePageNav,
                            content: this.responseSavedBeforePageNav.value!.content!.filter((e)=> e.id!==expanse.id)};
          this.setState(newState);
          // this.responseSavedBeforePageNav.next(
          //   {content: this.responseSavedBeforePageNav.value!.content!.filter((e)=> e.id!==expense.id)}
          // )
          console.log("responseSavedBeforePageNav Content: "+this.responseSavedBeforePageNav.value?.content);
          console.log("responseSavedBeforePageNav Value: "+this.responseSavedBeforePageNav.value);
          return ({appState: 'APP_LOADED', appData: this.responseSavedBeforePageNav.value})
        },error => {
          console.log("Inside Error IndexOf! :(");
          console.log(error);
        }
      )
  }

  handleExpanseDelete4(expanse: Expanse){
    /**Confirmation to user for Delete: */
    let confMessage = confirm(`Are you sure you want to Delete Expanse: "${expanse.title}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    this.expanseService.deleteExpanseService(expanse.id).subscribe();
  }

  handleExpenseDeleteFinal(expense: Expanse): void{
    /**Confirmation to user for Delete: */
    let confMessage = confirm(`Are you sure you want to Delete Expanse: "${expense.title}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    this.pageOfExpanses$ = this.expanseService.deleteExpense$(expense.id)
      .pipe(
        map((response) => {
          console.log('Response Before -> from Expense Component: '+ response);
          this.responseSavedBeforePageNav.next(
            {...response,
              content: this.responseSavedBeforePageNav.value!.content!.filter((e)=> e.id!==expense.id)}
          );
          console.log('responseSavedBeforePageNav Content -> from Expense Component: '+
            this.responseSavedBeforePageNav.value?.content);
          console.log('responseSavedBeforePageNav PageNumber -> from Expense Component: '+
            this.responseSavedBeforePageNav.value?.number);
          return ({appState: 'APP_LOADED', appData: this.responseSavedBeforePageNav.value});
        }),

        startWith({appState: 'APP_LOADED', appData: this.responseSavedBeforePageNav.value}),
        catchError((errorResponse: HttpErrorResponse) => of({appState: 'APP_ERROR', errorResponse}))
      );
  }


  //Only Amount can be modified in Expanse:
  handleUpdateExpanseForm(expanse: Expanse) {
    let confMessage = confirm(`Are you sure you want to update:
                               "${expanse.title?expanse.title.toUpperCase():expanse.title}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    console.log('Inside \'handleUpdateExpanseForm(expanse: Expanse)\' method')
    this.router.navigateByUrl(`/expanse/updateExpanse/${expanse.id}`);
  }

  /*
  openModal(){
    const dialogRef = this.matDialog.open(NewExpanseFormComponent, {
      width: '70%',
      //maxHeight: '50%',
     // "autoFocus": false
      // data: {amount: this.ex}
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
    //dialogRef.close();
  }
   */


  /*
  openModalExpanseUpdate(expanse: Expanse) {
    // let confMessage = confirm(`Are you sure you want to update: "${expanse.title.toUpperCase()}"!`);
    // if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    const dialogRef = this.matDialog.open(UpdateExpanseComponent, {
      data: {
        value: expanse
      }
      //maxHeight: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }
   */


  handleExpanseFormNav() {
    // this.router.navigateByUrl('expanse/newExpanse');
    this.router.navigateByUrl('newExpanse');
  }

  handleExpenseDeleteFinalV2(expense: Expanse, number: number | undefined, last: boolean | undefined,
                             totalPages: number | undefined, length: number, totalElements: number | undefined,
                             first: boolean | undefined, numberOfElements: number | undefined,
                             empty: boolean | undefined, pageableSortEmpty: boolean,
                             pageableSortSorted: boolean, pageableSortUnsorted: boolean,
                             pageableOffset: number, pageablePageNumber: number, pageablePageSize: number,
                             pageableUnpaged: boolean, pageablePaged: boolean, sortEmpty: boolean,
                             sortSorted: boolean, sortUnsorted: boolean,) {
    /**Confirmation to user for Delete: */
    let confMessage = confirm(`Are you sure you want to Delete Expanse: "${expense.title}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    this.pageOfExpanses$ = this.expanseService.deleteExpense$(expense.id)
      .pipe(
        map((response) => {
          // this.responseSavedBeforePageNav.value!.number=number;
          // this.responseSavedBeforePageNav.value!.last = last;
          // this.responseSavedBeforePageNav.value!.totalPages = totalPages;
          // this.responseSavedBeforePageNav.value!.content.length = length;
          // this.responseSavedBeforePageNav.value!.totalElements = totalElements;
          console.log('Page Number: '+ number);
          console.log('Page Last: '+ last);
          console.log('Page Total: '+ totalPages);
          console.log('Page TotalElements: '+ totalElements);
          console.log('Page content length: '+ length);
          this.responseSavedBeforePageNav.next(
            {...response,
              content: this.responseSavedBeforePageNav.value!.content!.filter((e)=> e.id!==expense.id),
              number: number, last: last, size: length, totalPages: totalPages, totalElements: totalElements,
              first: first, numberOfElements: numberOfElements, empty: empty,
              pageable: {sort: {empty: pageableSortEmpty, sorted: pageableSortSorted, unsorted: pageableSortUnsorted},
                         offset: pageableOffset, pageNumber: pageablePageNumber, pageSize: pageablePageSize,
                         unpaged: pageableUnpaged, paged: pageablePaged},
              sort: {empty: sortEmpty, sorted: sortSorted, unsorted: sortUnsorted}}
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

}
