import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-goal-modal-popup',
  templateUrl: './add-goal-modal-popup.component.html',
  styleUrls: ['./add-goal-modal-popup.component.css']
})
export class AddGoalModalPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddGoalModalPopupComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
