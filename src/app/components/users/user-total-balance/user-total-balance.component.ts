import { Component, OnInit } from '@angular/core';
import {TotalExpansePerMonthDTO} from "../../../models/TotalExpansePerMonthDTO";
import {TotalIncomesPerMonthDTO} from "../../../models/TotalIncomesPerMonthDTO";
import {ExpanseService} from "../../../services/expanseService/expanse.service";
import {IncomeService} from "../../../services/incomeService/income.service";
import {AuthenticationLoginService} from "../../../services/authenticationLoginService/authentication-login.service";

@Component({
  selector: 'app-user-total-balance',
  templateUrl: './user-total-balance.component.html',
  styleUrls: ['./user-total-balance.component.css']
})
export class UserTotalBalanceComponent implements OnInit {

  totalExpensesPerLifeTime: TotalExpansePerMonthDTO | undefined;
  totalIncomesPerLifeTime: TotalIncomesPerMonthDTO | undefined;

  constructor(public expenseService: ExpanseService,
              public incomeService: IncomeService,
              public authService: AuthenticationLoginService) { }

  ngOnInit(): void {
    this.getTotalIncomeBalanceService();
    this.getTotalExpensesBalanceService();
  }

  getTotalIncomeBalanceService(){
    this.incomeService.getTotalIncomesByUserOnLifeTimeIDService()
      .subscribe(
        (data) =>{
          this.totalIncomesPerLifeTime = data;
          console.log(data);
        },(error: any)=>{
          console.log(error);
        }
      )
  }
  getTotalExpensesBalanceService(){
    this.expenseService.getTotalExpansesByUserPerLifeTimeIDService()
      .subscribe(
        (data) =>{
          this.totalExpensesPerLifeTime = data;
          console.log(data);
        },(error: any)=>{
          console.log(error);
        }
      )
  }

}
