import { Component, OnInit } from '@angular/core';
import {IncomeService} from "../services/income.service";
import {Income} from "../models/income";
import {Observable} from "rxjs";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  incomeList!: Observable<Income []>;
  constructor( private incomeService: IncomeService) { }

  ngOnInit(): void {
     this.incomeList = this.incomeService.getIncomesService();
     this.incomeList.subscribe(data => {console.log(data)});
  }

}
