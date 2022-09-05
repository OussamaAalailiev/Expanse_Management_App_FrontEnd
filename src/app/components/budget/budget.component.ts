import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../services/budget.service";
import {Observable} from "rxjs";
import {Budget} from "../../models/budget";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  // budgetList!: Observable<Budget []>;
  budgetList!: Budget [];
  private errorMessage!: string;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    // this.budgetList = this.budgetService.getBudgetsService();
    // this.budgetList.subscribe(data => console.log(data));
    this.getAllBudgets();

    // this.budgetService.getBudgetsService()
    //   .subscribe(
    //   (data: any) =>{
    //     this.budgetList = data;
    //     console.log(data);
    //   },(error: any)=>{
    //     console.log(error);
    //   }
    // )
  }

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

  handleBudgetDelete(budget: Budget) {
    //TODO: Uncompleted Function to delete Budget!
    /**Confirmation to user for Delete: */
    let confMessage = confirm(`Are you sure you want to delete: ${budget.title}!`);
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    let budgetId = budget.id;// else we continue down below:
    this.budgetService.deleteBudgetService(budgetId)
      .subscribe(value => {
        // this.getAllExpanses();//To refresh the page dynamically after an Expanse Deletion:
        /**Instead of re-request the list of Expanses from backend again, we will refresh the list
         *  by deleting the budget locally:
         * */
        let indexOfBudgetDeleted = this.budgetList.indexOf(budget);
        this.budgetList.splice(indexOfBudgetDeleted, 1);//To delete locally the Object from frontend table.
        console.log(value);
      },error => {
        console.log(error);
      })
  }
}
