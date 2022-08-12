import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Goal} from "../models/goal";
import {GoalService} from "../services/goal.service";

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  goalList!: Observable<Goal []>;
  constructor( private goalService: GoalService) { }

  ngOnInit(): void {
    this.goalList = this.goalService.getGoalsService();
    this.goalList.subscribe(date => console.log(date));
  }

}
