import { Component, OnInit } from '@angular/core';
import {ExpanseService} from "../../services/expanseService/expanse.service";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";
import {TotalExpansePerMonthDTO} from "../../models/TotalExpansePerMonthDTO";
import {Observable} from "rxjs";

@Component({
  selector: 'app-total-expanses',
  templateUrl: './total-expanses.component.html',
  styleUrls: ['./total-expanses.component.css']
})
export class TotalExpansesComponent implements OnInit {

  totalExpansesList!: TotalExpansePerMonthDTO[];
  constructor(public expanseService: ExpanseService,
              public authService: AuthenticationLoginService) { }

  ngOnInit(): void {
    this.getAllTotalExpansesByUserAndYearAndMonth();
  }

  getAllTotalExpansesByUserAndYearAndMonth(){
    this.expanseService.getTotalExpansesByYearMonthUserIDService(this.authService.authenticatedUserLogin!.id)
      .subscribe(
        (data) =>{
          this.totalExpansesList = data;
          console.log(data)
        }
        ,(error) =>{
          console.log(error);
        });
  }

}
