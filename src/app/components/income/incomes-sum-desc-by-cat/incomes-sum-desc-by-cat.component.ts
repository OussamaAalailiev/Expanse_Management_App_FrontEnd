import { Component, OnInit } from '@angular/core';
import {IncomeService} from "../../../services/incomeService/income.service";
import {AuthenticationLoginService} from "../../../services/authenticationLoginService/authentication-login.service";
import {IncomesByCategory} from "../../../models/IncomesByCategory";

@Component({
  selector: 'app-incomes-sum-desc-by-cat',
  templateUrl: './incomes-sum-desc-by-cat.component.html',
  styleUrls: ['./incomes-sum-desc-by-cat.component.css']
})
export class IncomesSumDescByCatComponent implements OnInit {

  incomesByCategory: IncomesByCategory[] | undefined;

  constructor(public incomeService: IncomeService,
              public authService: AuthenticationLoginService) { }

  ngOnInit(): void {
    this.getIncomesSumByCategoryAndUserIdByAmountDesc();
  }

  getIncomesSumByCategoryAndUserIdByAmountDesc(){
    this.incomeService.getTotalIncomesByCategoryAndUserIDAmountDescService(this.authService.authenticatedUserLogin!.id)
      .subscribe(
        (data) =>{
          this.incomesByCategory = data;
          console.log(data)
        }
        ,(error) =>{
          console.log(error);
        });
  }

}
