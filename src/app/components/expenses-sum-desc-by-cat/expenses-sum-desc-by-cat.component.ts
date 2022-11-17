import { Component, OnInit } from '@angular/core';
import {ExpensesByCategory} from "../../models/ExpensesByCategory";
import {ExpanseService} from "../../services/expanseService/expanse.service";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";

@Component({
  selector: 'app-expenses-sum-desc-by-cat',
  templateUrl: './expenses-sum-desc-by-cat.component.html',
  styleUrls: ['./expenses-sum-desc-by-cat.component.css']
})
export class ExpensesSumDescByCatComponent implements OnInit {

  expensesByCategory: ExpensesByCategory[] | undefined;

  constructor(public expanseService: ExpanseService,
              public authService: AuthenticationLoginService) { }

  ngOnInit(): void {
    this.getExpansesSumByCategoryAndUserIdByAmountDesc();
  }

  getExpansesSumByCategoryAndUserIdByAmountDesc(){
    this.expanseService.getTotalExpansesByCategoryAndUserAmountDescIDService(this.authService.authenticatedUserLogin!.id)
      .subscribe(
        (data) =>{
          this.expensesByCategory = data;
          console.log(data)
        }
        ,(error) =>{
          console.log(error);
        });
  }

}
