import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {CategoryExpanse} from "../../models/CategoryExpanse";
import {User} from "../../models/user";
import {ExpanseService} from "../../services/expanseService/expanse.service";
import {DatePipe} from "@angular/common";
import {ExpanseFormSubmission} from "../../formModels/ExpanseFormSubmission";
import {catchError} from "rxjs";
import {BudgetService} from "../../services/budgetService/budget.service";
import {BudgetFormSubmission} from "../../formModels/BudgetFormSubmission";
import {CommonValidationMethods} from "../../services/validations/commonValidationMethods";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.css']
})
export class NewBudgetComponent implements OnInit {

  budgetFormGroup!: FormGroup;
  categoryExpanseList: CategoryExpanse [] = [
    //"Select Category",
    /** Category Group for > 'Transportation': */
    {id: 1, categoryExpanseType: "Taxi"}, {id: 2, categoryExpanseType: "Public_transport"}, {id: 3, categoryExpanseType: "Plane_LongDistance"},
    {id: 4, categoryExpanseType: "Business_trip"}, {id: 5, categoryExpanseType: "Clothes_and_Shoes"}, {id: 6, categoryExpanseType: "Drug_store_Chemist"},
    {id: 7, categoryExpanseType: "Electronics_Accessories"}, {id: 8, categoryExpanseType: "Free_time"}, {id: 9, categoryExpanseType: "Gifts"},
    {id: 10, categoryExpanseType: "Health_and_Beauty"}, {id: 11, categoryExpanseType: "Home_and_Garden"},
    {id: 12, categoryExpanseType: "Jewels_and_Accessories"}, {id: 13, categoryExpanseType: "Kids"},
    {id: 14, categoryExpanseType: "Pets_Animals"}, {id: 15, categoryExpanseType: "Tools"}, {id: 16, categoryExpanseType: "Ancient_Money"},

    /** Category Group for > 'Food & Drinks': */
    {id: 17, categoryExpanseType: "Cafe"}, {id: 18, categoryExpanseType: "Restaurant"}, {id: 19, categoryExpanseType: 'Fast_Food'},
    {id: 20, categoryExpanseType: 'Groceries'},

    /**Category Group > 'Housing': */
    {id: 21, categoryExpanseType: "Mortgage"}, {id: 22, categoryExpanseType: "Property_Insurance"}, {id: 23, categoryExpanseType: "Rent"},
    {id: 24, categoryExpanseType: "Services"}, {id: 25, categoryExpanseType: "Energy_and_Utilities"},

    /** Category Group for > 'Vehicle': */
    {id: 26, categoryExpanseType: "Fuel"}, {id: 27, categoryExpanseType: "Leasing"}, {id: 28, categoryExpanseType: "Parking"},
    {id: 29, categoryExpanseType: "Rentals"}, {id: 30, categoryExpanseType: "Vehicle_insurance"}, {id: 31, categoryExpanseType: "Vehicle_maintenance"},

    /** Category Group for > 'LIFE_AND_ENTERTAINMENT': */
    {id: 32, categoryExpanseType: "Sport_Fitness"}, {id: 33, categoryExpanseType: "Books_audio_subscriptions"}, {id: 34, categoryExpanseType: "Charity"},
    {id: 35, categoryExpanseType: "Self_Improvement"}, {id: 36, categoryExpanseType: "Culture_SportEvents"},
    {id: 37, categoryExpanseType: "Education_development"}, {id: 38, categoryExpanseType: "HealthCare_Doctor"}, {id: 39, categoryExpanseType: "Hobbies"},
    {id: 40, categoryExpanseType: "Life_events"}, {id: 41, categoryExpanseType: "Tv_Streaming"},
    {id: 42, categoryExpanseType: "Cosmetics_beauty"}, {id: 43, categoryExpanseType: "Alcohol_tobacco"},
    {id: 44, categoryExpanseType: "Lottery_gambling"},

    /** Category Group for > 'Financial_expanses': */
    {id: 45, categoryExpanseType: "Charges_Fees"}, {id: 46, categoryExpanseType: "Child_Support"}, {id: 47, categoryExpanseType: "Fines"},
    {id: 48, categoryExpanseType: "Insurance"}, {id: 49, categoryExpanseType: "Loan"}, {id: 50, categoryExpanseType: "Taxes"},

    /** Category Group for > 'INVESTMENT': */
    {id: 51, categoryExpanseType: "Collections"}, {id: 52, categoryExpanseType: "Financial_Investments"}, {id: 53, categoryExpanseType: "Zakat"},
    {id: 54, categoryExpanseType: "Savings"}, {id: 55, categoryExpanseType: "Vehicles_chattels"},

    /** Category Group for > 'Communication & PC': */
    {id: 56, categoryExpanseType: "Internet"}, {id: 57, categoryExpanseType: "Phone"}, {id: 58, categoryExpanseType: "Cell_Phone"},
    {id: 59, categoryExpanseType: "Apps"}, {id: 60, categoryExpanseType: "Games"}, {id: 61, categoryExpanseType: "Drinks"},
    {id: 62, categoryExpanseType: "Homemade Food"}, {id: 63, categoryExpanseType: "Computer_PC"}];

  userList: User [] = [ {id: '3a300bc8-8954-4e93-9136-2b11ad2461b1', name: "Oussama"},
    {id: 'dfa735ec-328b-43c3-ad70-f5dba33eb585', name: "Zakaria"},
    {id: '653eb6f2-a817-4184-af31-4cff631692f8', name: "Safwane"} ];

  minDate!: Date;

  constructor(
    //@Inject(MAT_DIALOG_DATA)
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private datePipe: DatePipe,
    //private matDialogRef: MatDialogRef<NewExpanseFormComponent>,
    public commonValidationMethods : CommonValidationMethods,
    private route: Router
  ) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.initializeAddBudgetForm();
  }

  private initializeAddBudgetForm(): void {
    this.budgetFormGroup = this.fb.group({
      amount: this.fb.control(null, [Validators.required,
        Validators.min(1.0), Validators.max(9000000000000000000.00)]),
      title: this.fb.control(null, [Validators.required,
        Validators.minLength(3), Validators.maxLength(55)]),
      description: this.fb.control('', [ Validators.maxLength(255)]),
      dateDebut: this.fb.control(null, Validators.required),
      endDate: this.fb.control(null, Validators.required),
      categoryExpanse: this.fb.control(null, Validators.required),
      userId: this.fb.control(null, Validators.required)
    })
  }

  transformDateFormatBudget(){
    let dateDebutFormated = this.datePipe.transform
    (this.budgetFormGroup.controls['dateDebut'].value, 'yyyy-MM-dd');
    let endDateFormated = this.datePipe.transform
    (this.budgetFormGroup.controls['endDate'].value, 'yyyy-MM-dd');
    //this.expanseFormGroup.controls['createdDate'];
  }

  handleAddNewBudgetSubmission(budgetFormData: BudgetFormSubmission) {
    if (this.budgetFormGroup.valid){
      //this.http.post<Expanse>(environment.backendHost+"/expanse/admin", this.expanseFormGroup.value)
      this.transformDateFormatBudget();
      this.budgetService.addNewBudgetService(budgetFormData).pipe(
        catchError((err) => {
          console.error(err);
          window.alert("Failed");
          throw err
        })
      ).toPromise();
      console.log(this.budgetFormGroup.value);
      //this.budgetFormGroup.reset();
      this.route.navigateByUrl('/budget');
    }
    // this.expanseFormGroup.value.reset;
  }

  checkIfDateDebutValid(){

  }


}
