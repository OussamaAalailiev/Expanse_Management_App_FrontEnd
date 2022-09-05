import {Component, Inject, Input, OnInit} from '@angular/core';
import {Expanse} from "../../models/expanse";
import {ExpanseService} from "../../services/expanse.service";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {CategoryExpanse} from "../../models/CategoryExpanse";
import {User} from "../../models/user";

@Component({
  selector: 'app-update-expanse',
  templateUrl: './update-expanse.component.html',
  styleUrls: ['./update-expanse.component.css']
})
export class UpdateExpanseComponent implements OnInit {

  expanse!: Observable<Expanse>;
  expanseReceived!: Expanse;
  expanseUpdateFormGroup!: FormGroup;
  //'@Input' : used to get data from another file or component in same project into this place:
  @Input() categoryExpanseListCopied: CategoryExpanse[] = [];
  @Input() userListCopied: User [] = [];
  //categoryExpanse: CategoryExpanse | null | undefined;
  //user: User | undefined;

  constructor(private expanseService: ExpanseService,
              private route: ActivatedRoute,
              private fb: FormBuilder
              // public matDialogRef: MatDialogRef<UpdateExpanseComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: Expanse
             ) { }

  ngOnInit(): void {
   // this.expanse = this.data;
    const routeParams = this.route.snapshot.paramMap;
    const expanseIdFromRoute = Number(routeParams.get('expanseId'));
    // this.categoryExpanse = this.getCategoryExpanseByType(this.categoryExpanseListCopied,
    //   this.expanseReceived.categoryExpanse.categoryExpanseType);
    // this.categoryExpanse =this.categoryExpanseListCopied.filter((categoryExpanse) => {
    //   return categoryExpanse.categoryExpanseType===this.expanseReceived.categoryExpanse.categoryExpanseType;
    // })
    // console.log(this.categoryExpanse);
    // this.user = this.userListCopied.find((user)=>{
    //   user.id === this.expanseReceived.user.id;
    // })
    // console.log(this.user);
    this.expanseService.getOneExpanseByIdService(expanseIdFromRoute).subscribe(
      (data) => {
        this.expanseReceived = data;
        this.initializeUpdateForm();
       // this.disableDateFromUpdateExpanse();
      }, error => {
        console.log(error)
      });
    // this.initializeUpdateForm();
  }

  /*
  handleExpanseUpdate(expanse: Expanse){
     //this.initUpdateExpanseForm(expanse);
      this.expanseService.getOneExpanseByIdService(expanse.id).subscribe(
         (data) => {
          this.expanseReceived = data;
      }, error => {
        console.log(error)
      });
      //this.expanseService.updateExpanseService(expanse);
  }
   */

   /*
   getCategoryExpanseByType(arr: CategoryExpanse[], type: string) {

     var result  = arr.filter(function(categoryExpanse)
                                 {return categoryExpanse.categoryExpanseType == type;} ).pop();
     console.log("CategoryExpanse Found: "+result);
     return result? result : null; // or undefined
  }
    */

  private initializeUpdateForm(): void {
    this.expanseUpdateFormGroup = this.fb.group({
      id: this.fb.control(this.expanseReceived.id),
      amount: this.fb.control(this.expanseReceived.amount, [Validators.required,
        Validators.min(1.0), Validators.max(9000000000000000000.00)]),
      title: this.fb.control(this.expanseReceived.title, [Validators.required,
        Validators.minLength(3), Validators.maxLength(55)]),
      // createdDate: this.fb.control(this.expanseReceived.createdDate),
      // categoryExpanse: this.fb.control(this.expanseReceived.categoryExpanse.categoryExpanseType),
      // userId: this.fb.control(this.expanseReceived.user.id)

      // categoryExpanse: this.fb.control(this.categoryExpanse),
      // userId: this.fb.control(this.user)
    })
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

  updateExpanseForm(expanse: Expanse){

    this.expanseService.updateExpanseService(expanse)
      .subscribe(dataUpdated => {
        console.log(this.expanseUpdateFormGroup.value);
      }, error => {
        console.log(error);
      });
  }

  /*
  disableDateFromUpdateExpanse(){
     document.getElementById('createdDate')!.hidden = Boolean(String(true));
  }
   */

  // onNoClick(): void {
  //   this.matDialogRef.close();
  // }

  // initUpdateExpanseForm(expanse: Expanse){
  //
  // }



}
