import { Component, OnInit } from '@angular/core';
import {TotalIncomesPerMonthDTO} from "../../../models/TotalIncomesPerMonthDTO";
import {IncomeService} from "../../../services/incomeService/income.service";
import {AuthenticationLoginService} from "../../../services/authenticationLoginService/authentication-login.service";
import {ExpanseService} from "../../../services/expanseService/expanse.service";

@Component({
  selector: 'app-total-incomes',
  templateUrl: './total-incomes.component.html',
  styleUrls: ['./total-incomes.component.css']
})
export class TotalIncomesComponent implements OnInit {

  totalIncomesList!: TotalIncomesPerMonthDTO[];
  constructor( private incomeService: IncomeService,
               public authService: AuthenticationLoginService,
               public expanseService: ExpanseService) { }

  ngOnInit(): void {
    this.getAllTotalIncomesByUserAndYearAndMonth();
  }

  private getAllTotalIncomesByUserAndYearAndMonth() {
    this.incomeService.getTotalIncomesByYearMonthUserIDService(this.authService.authenticatedUserLogin!.id)
      .subscribe(
        (data) =>{
          this.totalIncomesList = data;
          console.log(data)
        }
        ,(error) =>{
          console.log(error);
        });
  }



}
