import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {CategoryExpanse} from "../../models/CategoryExpanse";
import {User} from "../../models/user";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Expanse} from "../../models/expanse";
import {ExpanseService} from "../../services/expanse.service";
import {catchError, throwError} from "rxjs";
import {ExpanseFormSubmission} from "../../formModels/ExpanseFormSubmission";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-new-expanse-form',
  templateUrl: './new-expanse-form.component.html',
  styleUrls: ['./new-expanse-form.component.css']
})
export class NewExpanseFormComponent implements OnInit {

  expanseFormGroup!: FormGroup;
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
    {id: 62, categoryExpanseType: "Homemade Food"}];

    userList: User [] = [ {id: '3a300bc8-8954-4e93-9136-2b11ad2461b1', name: "Oussama"},
                          {id: 'dfa735ec-328b-43c3-ad70-f5dba33eb585', name: "Zakaria"},
                          {id: '653eb6f2-a817-4184-af31-4cff631692f8', name: "Safwane"} ];

  constructor(private fb: FormBuilder,
              private expanseService: ExpanseService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.expanseFormGroup = this.fb.group({
      amount: this.fb.control(null, [Validators.required,
        Validators.min(1.0), Validators.max(9000000000000000000.00)]),
      title: this.fb.control(null, [Validators.required,
        Validators.minLength(3), Validators.maxLength(55)]),
      createdDate: this.fb.control(null, Validators.required),
      categoryExpanse: this.fb.control(null, Validators.required),
      userId: this.fb.control(null, Validators.required)
      // categoryExpanse: this.fb.control(CategoryExpanse.arguments.categoryExpanseType),

      // user: User
    })
  }

  transformDateFormat(){
    let createdDateFormated = this.datePipe.transform(this.expanseFormGroup.controls['createdDate'].value, 'yyyy-MM-dd');
    //this.expanseFormGroup.controls['createdDate'];
  }

  handleAddNewExpanseSubmission(expanseFormData: ExpanseFormSubmission) {
    if (this.expanseFormGroup.valid){
      //this.http.post<Expanse>(environment.backendHost+"/expanse/admin", this.expanseFormGroup.value)
      this.transformDateFormat();
      this.expanseService.postNewExpanseService(expanseFormData).pipe(
        catchError((err) => {
          console.error(err);
          window.alert("Failed");
          throw err
        })
      ).toPromise();
      console.log(this.expanseFormGroup.value);
      this.expanseFormGroup.reset();
    }
    // this.expanseFormGroup.value.reset;
  }

  getAmountErrorMessage(amountField: string, errors: ValidationErrors): string {

    if (errors['required']){
      return amountField + " is required";
    }else if (errors['min']){
      return amountField + " should be at least equal or greater than " + 1.00+" .";
    }else if (errors['max']){
      return amountField + " should be less than " + errors['max']['max']+" .";
    }else {
      return "";
    }

  }

  // get myControls(): { [p: string]: AbstractControl }{
  //   return this.expanseFormGroup.controls;
  // }

  /*
  getCategoryExpByNameFromInput(categoryExpanseType: string){
    for (let i=0; i< this.categoryExpanseList.length; i++){
      if (categoryExpanseType==this.categoryExpanseList[i].categoryExpanseType){
        console.log(this.categoryExpanseList[i])
        return this.categoryExpanseList[i];
      }else if (categoryExpanseType!==this.categoryExpanseList[i].categoryExpanseType && i<this.categoryExpanseList.length){
        console.log("Continue Keyword");
        continue;
      }else {
        console.log("Object()..."  + Object());
        return Object();
      }
    }
  }
   */

  getTitleErrorMessage(title: string, errors: ValidationErrors) {
    if (errors['required']){
      return title + " is required";
    }else if (errors['minlength']){
      console.log(errors.valueOf())
      return title + " should be at least equal or greater than " + errors['minlength']['requiredLength'] +" Characters.";
     // return title + " should be at least equal or greater than " + ""+" Characters.";
    }else if (errors['maxlength']){
      console.log(errors.valueOf())
      return title + " should be less than " + errors['maxlength']['requiredLength'] +" Characters.";
    }else {
      return "";
    }

  }



}
