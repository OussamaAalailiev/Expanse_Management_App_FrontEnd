import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {CategoryExpanse} from "../../models/CategoryExpanse";
import {CategoryIncome} from "../../models/CategoryIncome";
import {CategoryGoal} from "../../models/CategoryGoal";
import {CommonValidationMethods} from "../../services/validations/commonValidationMethods";
import {Router} from "@angular/router";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {User} from "../../models/user";
import {Goal} from "../../models/goal";
import {catchError} from "rxjs";
import {GoalService} from "../../services/goalService/goal.service";
import {GoalFormSubmission} from "../../formModels/GoalFormSubmission";

@Component({
  selector: 'app-add-goal-modal-popup',
  templateUrl: './add-goal-modal-popup.component.html',
  styleUrls: ['./add-goal-modal-popup.component.css']
})
export class AddGoalModalPopupComponent implements OnInit {

  categoryIncomeAndGoalList: CategoryIncome [] = [//TODO: Should be optimized later!
    //"Select Category",
    /** Category Group for > 'Transportation': */
    {id: 1, categoryIncomeType: "CHILD_SUPPORT"}, {id: 2, categoryIncomeType: "RENTAL_INCOME"},
    {id: 3, categoryIncomeType: "SALARY"}, {id: 4, categoryIncomeType: "DIVIDENDS"},
    {id: 5, categoryIncomeType: "TAX_REFUND"}, {id: 6, categoryIncomeType: "GIFTS"},
    {id: 7, categoryIncomeType: "TRADE_SALES"}, {id: 8, categoryIncomeType: "Dues_and_Grants"},
    {id: 9, categoryIncomeType: "Checks_Coupons"},{id: 10, categoryIncomeType: "SAVINGS"},
    {id: 11, categoryIncomeType: "ROYALTIES"},
    {id: 12, categoryIncomeType: "CONSTRUCTIONS"}, {id: 13, categoryIncomeType: "AGRICULTURE"},
    {id: 14, categoryIncomeType: "SEA_FISHING"}, {id: 15, categoryIncomeType: "MEDICAL_CONSULTATION"},
    {id: 16, categoryIncomeType: "COURT_SERVICE"}, {id: 17, categoryIncomeType: "TOURIST_SERVICE"},
    {id: 18, categoryIncomeType: "SECURITY_SERVICE"},{id: 19, categoryIncomeType: "EDUCATION_SERVICE"},
    {id: 20, categoryIncomeType: "OTHER_SERVICE"},
    {id: 21, categoryIncomeType: "NEW_VEHICLE"}, {id: 22, categoryIncomeType: "NEW_HOME"},
    {id: 23, categoryIncomeType: "HOLIDAY_TRIP"}, {id: 24, categoryIncomeType: "HEALTH_CARE"},
    {id: 25, categoryIncomeType: "PARTY"}, {id: 26, categoryIncomeType: "CHARITY"},
    {id: 27, categoryIncomeType: "ZAKAT"}];

  user?: User = this.authService!.authenticatedUserLogin;

  goalFormGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddGoalModalPopupComponent>,
              private fb: FormBuilder,
              public commonValidationMethods : CommonValidationMethods,
              private datePipe: DatePipe,
              private route: Router,
              public authService: AuthenticationLoginService,
              public goalService: GoalService) { }

  ngOnInit(): void {
    this.initializeGoalForm();
  }

  onClickCloseModal(): void {
    this.dialogRef.close();
  }

  private initializeGoalForm(): void {
    this.goalFormGroup = this.fb.group({
      amount: this.fb.control(null, [Validators.required,
        Validators.min(1.0), Validators.max(9000000000000000000.00)]),
      title: this.fb.control(null, [Validators.required,
        Validators.minLength(3), Validators.maxLength(55)]),
      dateDebut: this.fb.control(null, Validators.required),
      endDate: this.fb.control(null, Validators.required),
      categoryIncome: this.fb.control(null, Validators.required),
      userId: this.user!.id
    })
  }

  transformDateFormat(){
    let dateDebutFormated = this.datePipe.transform
    (this.goalFormGroup.controls['dateDebut'].value, 'yyyy-MM-dd');
    let endDateFormated = this.datePipe.transform
    (this.goalFormGroup.controls['endDate'].value, 'yyyy-MM-dd');
  }

  //TODO: Add Form To Add New Goal:
  handleNewGoalForm(goalFormData: GoalFormSubmission) {
    if (this.goalFormGroup.valid){
      this.transformDateFormat();
      this.goalService.postNewGoalService(goalFormData).pipe(
        catchError((err) => {
          console.error(err);
          window.alert("Failed");
          throw err
        })
      ).toPromise();
      console.log(this.goalFormGroup.value);
      this.route.navigateByUrl('/goal');
    }

  }
  //TODO: Add Form To Delete Goal:
  handleGoalDelete(goal: Goal) {
    alert("'handleGoalDelete' Function Not Working yet!");
  }
  //TODO: Add Form To Update Goal:
  handleUpdateGoalForm(goal: Goal) {
    alert("'handleUpdateGoalForm' Function Not Working yet!");
  }









}
