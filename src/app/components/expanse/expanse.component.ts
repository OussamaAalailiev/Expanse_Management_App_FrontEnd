import { Component, OnInit } from '@angular/core';
import {ExpanseService} from "../../services/expanse.service";
import {BehaviorSubject, catchError, map, never, Observable, of, startWith} from "rxjs";
import {Expanse} from "../../models/expanse";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NewExpanseFormComponent} from "../../forms/new-expanse-form/new-expanse-form.component";
import {UpdateExpanseComponent} from "../../forms/update-expanse/update-expanse.component";
import {PageOfExpanses} from "../../models/pageOfExpanses";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-expanse',
  templateUrl: './expanse.component.html',
  styleUrls: ['./expanse.component.css']
})
export class ExpanseComponent implements OnInit {

  //expansesList!: Observable<Expanse []>;
  expansesList!: Expanse [];
  //errorMessage: Observable<never> | undefined;
  errorMessage: string | undefined;//I don't know what 'appState' means yet:
  pageOfExpanses$!: Observable<{appState: string, appData?: PageOfExpanses, error?: HttpErrorResponse}>;
  /**(1) The 'BehaviorSubject(...)' will contain the response added in the 'getPageOfExpansesV2' below: */
  responseSavedBeforePageNav = new BehaviorSubject<PageOfExpanses | undefined>(undefined);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();//'currentPageSubject' will be observed by 'currentPage$'.

  constructor(private expanseService: ExpanseService,
              private router: Router,
              public matDialog: MatDialog) { }

  ngOnInit(): void {
   //this.getAllExpanses();
    //this.getPageOfExpanses();
    this.getPageOfExpansesV2();
  }

  // public getExpansesFromComponent(): Expanse[] {
  //   return this.expansesList;
  // }

  getPageOfExpansesV2(): void{
    this.pageOfExpanses$ = this.expanseService.pageOfExpansesObservable$().pipe(
      map((response: PageOfExpanses)=>{
        this.responseSavedBeforePageNav.next(response);
        this.currentPageSubject.next(response.number);//We get the current page number gotten from Backend
        console.log(response);// response, then we set it to the Behavioral Object 'currentPageSubject':
        return ({appState: 'APP_LOADED', appData: response})
      }),
      startWith({appState: 'APP_LOADING'}),
      catchError((errorResponse: HttpErrorResponse) => of({appState: 'APP_ERROR', errorResponse}))
    )
  }

  goToAnotherPage(title?: string, pageNumber?: number): void{
    this.pageOfExpanses$ = this.expanseService.pageOfExpansesObservable$(title, pageNumber).pipe(
      map((response: PageOfExpanses)=>{
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

  goToNextOrPreviousPage(pageDirection?: string, title?: string): void{
    this.goToAnotherPage(title,
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
    let confMessage = confirm("Are you sure you want to delete this Expanse!");
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    let expanseId = expanse.id;// else we continue down below:
    this.expanseService.deleteExpanseService(expanseId)
      .subscribe(value => {
        // this.getAllExpanses();//To refresh the page dynamically after an Expanse Deletion:
        /**Instead of re-request the list of Expanses from backend again, we will refresh the list
         *  by deleting the expanse locally:
         * */
        let indexOfExpanseDeleted = this.expansesList.indexOf(expanse);
        this.expansesList.splice(indexOfExpanseDeleted, 1);//To delete locally the Object from frontend table.
        console.log(value);
      },error => {
        console.log(error);
      })
  }

  //Only Amount can be modified in Expanse:
  handleUpdateExpanseForm(expanse: Expanse) {
    let confMessage = confirm(`Are you sure you want to update:
                               "${expanse.title?expanse.title.toUpperCase():expanse.title}"!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
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


}
