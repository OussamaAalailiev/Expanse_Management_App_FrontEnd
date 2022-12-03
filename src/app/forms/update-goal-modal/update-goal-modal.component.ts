import {Component, Inject, OnInit} from '@angular/core';
import {GoalService} from "../../services/goalService/goal.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Goal} from "../../models/goal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonValidationMethods} from "../../services/validations/commonValidationMethods";
import {DatePipe} from "@angular/common";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";
import {CategoryIncome} from "../../models/CategoryIncome";
import {User} from "../../models/user";
import {catchError, startWith} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-goal-modal',
  templateUrl: './update-goal-modal.component.html',
  styleUrls: ['./update-goal-modal.component.css']
})
export class UpdateGoalModalComponent implements OnInit {

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

  public categoryIncomeSelected : string = this.data.categoryIncome.categoryIncomeType;

  constructor(public dialogRef: MatDialogRef<UpdateGoalModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Goal,
              public goalService: GoalService,
              private fb: FormBuilder,
              public commonValidationMethods : CommonValidationMethods,
              private datePipe: DatePipe,
              public authService: AuthenticationLoginService,
              private route: Router) { }

  ngOnInit(): void {
    this.initializeGoalForm();
  }

  private initializeGoalForm(): void {
    this.goalFormGroup = this.fb.group({
      id: this.fb.control(this.data.id),
      amount: this.fb.control(this.data.amount, [Validators.required,
        Validators.min(1.0), Validators.max(9000000000000000000.00)]),
      title: this.fb.control(this.data.title, [Validators.required,
        Validators.minLength(3), Validators.maxLength(55)]),
      dateDebut: this.fb.control(this.data.dateDebut, Validators.required),
      endDate: this.fb.control(this.data.endDate, Validators.required),
      categoryIncome: this.fb.control(this.data.categoryIncome.id, Validators.required),
      userId: this.user!.id
    })
  }

  onClickCloseModal(): void {
    this.dialogRef.close();
  }

  transformDateFormat(){
    let dateDebutFormated = this.datePipe.transform
    (this.goalFormGroup.controls['dateDebut'].value, 'yyyy-MM-dd');
    let endDateFormated = this.datePipe.transform
    (this.goalFormGroup.controls['endDate'].value, 'yyyy-MM-dd');
  }

  handleGoalUpdate(goal: Goal) {
    if (this.goalFormGroup.valid){
      this.transformDateFormat();
      let idGoal = this.data.id.toString();
      this.goalService.updateGoal$(goal, idGoal).pipe(
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

}
