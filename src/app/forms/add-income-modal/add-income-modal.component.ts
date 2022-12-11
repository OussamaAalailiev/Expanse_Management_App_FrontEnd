import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonValidationMethods} from "../../services/validations/commonValidationMethods";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";
import {IncomeService} from "../../services/incomeService/income.service";
import {CategoryIncome} from "../../models/CategoryIncome";
import {User} from "../../models/user";
import {Income} from "../../models/income";
import {IncomeFormSubmission} from "../../formModels/IncomeFormSubmission";
import {catchError} from "rxjs";

@Component({
  selector: 'app-add-income-modal',
  templateUrl: './add-income-modal.component.html',
  styleUrls: ['./add-income-modal.component.css']
})
export class AddIncomeModalComponent implements OnInit {

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

  incomeFormGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddIncomeModalComponent>,
              private fb: FormBuilder,
              public commonValidationMethods : CommonValidationMethods,
              private datePipe: DatePipe,
              private route: Router,
              public authService: AuthenticationLoginService,
              public incomeService: IncomeService) { }

  ngOnInit(): void {
    this.initializeIncomeForm();
  }

  onClickCloseModal(): void {
    this.dialogRef.close();
  }

  private initializeIncomeForm(): void {
    this.incomeFormGroup = this.fb.group({
      amount: this.fb.control(null, [Validators.required,
        Validators.min(1.0), Validators.max(9000000000000000000.00)]),
      title: this.fb.control(null, [Validators.required,
        Validators.minLength(3), Validators.maxLength(55)]),
      createdDate: this.fb.control(null, Validators.required),
      categoryIncome: this.fb.control(null, Validators.required),
      userId: this.user!.id
    })
  }

  transformDateFormat(){
    let createdDateFormatted = this.datePipe.transform
    (this.incomeFormGroup.controls['createdDate'].value, 'yyyy-MM-dd');
  }

  //TODO: Add Form To Add New Income:
  handleNewIncomeForm(incomeFormSubmission: IncomeFormSubmission) {
    if (this.incomeFormGroup.valid){
      this.transformDateFormat();
      this.incomeService.postNewIncomeService(incomeFormSubmission).pipe(
        catchError((err) => {
          console.error(err); window.alert("Failed Request!")
          throw err
          }
        )
      ).toPromise();
      console.log(this.incomeFormGroup.value);
      this.route.navigateByUrl('/income');
    }
  }

}
