import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CategoryExpanse} from "../../models/CategoryExpanse";
import {CategoryIncome} from "../../models/CategoryIncome";
import {CategoryGoal} from "../../models/CategoryGoal";

@Component({
  selector: 'app-add-goal-modal-popup',
  templateUrl: './add-goal-modal-popup.component.html',
  styleUrls: ['./add-goal-modal-popup.component.css']
})
export class AddGoalModalPopupComponent implements OnInit {
  //TODO : I should add the 9 CategoryGoals below to the List of CategoryIncome
  //        in the Frontend & Backend before use the Form popup:

  /*  SAVING_AMOUNT,
    NEW_VEHICLE,
    NEW_HOME,
    HOLIDAY_TRIP,
    EDUCATION,
    HEALTH_CARE,
    PARTY,
    CHARITY,
    ZAKAT */
  categoryGoalList: CategoryGoal [] = [
    //"Select Category",
    /** Category Group for > 'Transportation': */
    {id: 1, categoryGoalType: "SAVING_AMOUNT"}, {id: 2, categoryGoalType: "NEW_VEHICLE"},
    {id: 3, categoryGoalType: "NEW_HOME"}, {id: 4, categoryGoalType: "HOLIDAY_TRIP"},
    {id: 5, categoryGoalType: "EDUCATION"}, {id: 6, categoryGoalType: "HEALTH_CARE"},
    {id: 7, categoryGoalType: "PARTY"}, {id: 8, categoryGoalType: "CHARITY"},
    {id: 9, categoryGoalType: "ZAKAT"}];

  constructor(public dialogRef: MatDialogRef<AddGoalModalPopupComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
