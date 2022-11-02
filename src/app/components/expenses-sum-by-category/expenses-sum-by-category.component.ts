import { Component, OnInit } from '@angular/core';
import {ExpanseService} from "../../services/expanseService/expanse.service";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";
import {ExpensesByCategory} from "../../models/ExpensesByCategory";

@Component({
  selector: 'app-expenses-sum-by-category',
  templateUrl: './expenses-sum-by-category.component.html',
  styleUrls: ['./expenses-sum-by-category.component.css']
})
export class ExpensesSumByCategoryComponent implements OnInit {

  expensesByCategory: ExpensesByCategory[] | undefined;

  constructor(public expanseService: ExpanseService,
              public authService: AuthenticationLoginService) { }

  ngOnInit(): void {
    this.getExpansesSumByCategoryAndUserId();
  }

  getExpansesSumByCategoryAndUserId(){
    this.expanseService.getTotalExpansesByCategoryAndUserIDService(this.authService.authenticatedUserLogin!.id)
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
