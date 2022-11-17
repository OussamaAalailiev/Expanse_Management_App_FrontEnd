import { Component, OnInit } from '@angular/core';
import {IncomesByCategory} from "../../../models/IncomesByCategory";
import {IncomeService} from "../../../services/incomeService/income.service";
import {AuthenticationLoginService} from "../../../services/authenticationLoginService/authentication-login.service";

@Component({
  selector: 'app-incomes-sum-by-category',
  templateUrl: './incomes-sum-by-category.component.html',
  styleUrls: ['./incomes-sum-by-category.component.css']
})
export class IncomesSumByCategoryComponent implements OnInit {

  incomesByCategory: IncomesByCategory[] | undefined;

  constructor(public incomeService: IncomeService,
              public authService: AuthenticationLoginService ) { }

  ngOnInit(): void {
    this.getIncomesSumByCategoryAndUserId();
  }

  getIncomesSumByCategoryAndUserId(){
    this.incomeService.getTotalIncomesByCategoryAndUserIDDateDescService(this.authService.authenticatedUserLogin!.id)
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
