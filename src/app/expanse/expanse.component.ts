import { Component, OnInit } from '@angular/core';
import {ExpanseService} from "../expanse.service";
import {Observable} from "rxjs";
import {Expanse} from "../expanse";

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
  }

}
