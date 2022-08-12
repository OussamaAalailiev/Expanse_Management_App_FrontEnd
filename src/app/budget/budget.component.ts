import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../services/budget.service";
import {Observable} from "rxjs";
import {Budget} from "../models/budget";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budgetList!: Observable<Budget []>;

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetList = this.budgetService.getBudgetsService();
    this.budgetList.subscribe(data => console.log(data));


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

}
