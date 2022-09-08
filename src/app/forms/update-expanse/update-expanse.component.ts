import {Component, Inject, Input, OnInit} from '@angular/core';
import {Expanse} from "../../models/expanse";
import {ExpanseService} from "../../services/expanseService/expanse.service";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {CategoryExpanse} from "../../models/CategoryExpanse";
import {User} from "../../models/user";
import {CommonValidationMethods} from "../../services/validations/commonValidationMethods";

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
  // @Input() categoryExpanseListCopied: CategoryExpanse[] = [];
  // @Input() userListCopied: User [] = [];
  //categoryExpanse: CategoryExpanse | null | undefined;
  //user: User | undefined;

  constructor(public expanseService: ExpanseService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private fb: FormBuilder,
              public commonValidationMethods : CommonValidationMethods
              // public matDialogRef: MatDialogRef<UpdateExpanseComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: Expanse
             ) { }

  ngOnInit(): void {
   // this.expanse = this.data;
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const expanseIdFromRoute = Number(routeParams.get('expanseId'));
    this.expanseService.getOneExpanseByIdService(expanseIdFromRoute).subscribe(
      (data) => {
        this.expanseReceived = data;
        this.initializeUpdateForm();
       // this.disableDateFromUpdateExpanse();
      }, error => {
        console.log(error.value)
      });
    // this.initializeUpdateForm();
  }

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

  updateExpanseForm(expanse: Expanse){

    this.expanseService.updateExpanseService(expanse)
      .subscribe(dataUpdated => {
        console.log(this.expanseUpdateFormGroup.value);
        this.route.navigateByUrl('/expanse');
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




}
