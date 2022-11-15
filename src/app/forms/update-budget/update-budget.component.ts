import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Expanse} from "../../models/expanse";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Budget} from "../../models/budget";
import {ExpanseService} from "../../services/expanseService/expanse.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BudgetService} from "../../services/budgetService/budget.service";
import {CommonValidationMethods} from "../../services/validations/commonValidationMethods";

@Component({
  selector: 'app-update-budget',
  templateUrl: './update-budget.component.html',
  styleUrls: ['./update-budget.component.css']
})
export class UpdateBudgetComponent implements OnInit {

  budget!: Observable<Budget>;
  budgetReceived!: Budget;
  budgetUpdateFormGroup!: FormGroup;

  constructor(public budgetService: BudgetService,
              public expense: ExpanseService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private fb: FormBuilder,
              public commonValidationMethods : CommonValidationMethods//To add Common Fields Validation's Functions:
              ) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const budgetIdFromRoute = Number(routeParams.get('budgetId'));
    this.budgetService.getOneBudgetByIdService(budgetIdFromRoute).subscribe(
      (data) => {
        this.budgetReceived = data;
        this.initializeUpdateForm();
        // this.disableDateFromUpdateExpanse();
      }, error => {
        console.log(error.value)
      });
  }

  private initializeUpdateForm() {
    this.budgetUpdateFormGroup = this.fb.group({
      id: this.fb.control(this.budgetReceived.id),
      amount: this.fb.control(this.budgetReceived.amount, [Validators.required,
        Validators.min(1.0), Validators.max(9000000000000000000.00)]),
      title: this.fb.control(this.budgetReceived.title, [Validators.required,
        Validators.minLength(3), Validators.maxLength(55)]),
      description: this.fb.control(this.budgetReceived.description, [Validators.maxLength(255)])
    })
  }

  updateBudgetForm(budget: Budget){

    this.budgetService.updateBudgetService(budget)
      .subscribe((budgetUpdated) => {
        console.log(this.budgetUpdateFormGroup.value);
        this.route.navigateByUrl('/budget');
      }, error => {
        console.log(error);
      });
  }

}
