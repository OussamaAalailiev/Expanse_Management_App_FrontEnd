import { Component, OnInit } from '@angular/core';
import {ExpanseService} from "../../services/expanse.service";
import {Observable} from "rxjs";
import {Expanse} from "../../models/expanse";

@Component({
  selector: 'app-expanse',
  templateUrl: './expanse.component.html',
  styleUrls: ['./expanse.component.css']
})
export class ExpanseComponent implements OnInit {

  expansesList!: Observable<Expanse []>;

  constructor(private expanseService: ExpanseService) { }

  ngOnInit(): void {
    this.expansesList = this.expanseService.getExpansesService();
    this.expansesList.subscribe(date => console.log(date));
  }

}
