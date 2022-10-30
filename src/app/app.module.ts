import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { ExpanseComponent } from './components/expanse/expanse.component';
import { BudgetComponent } from './components/budget/budget.component';
import { IncomeComponent } from './components/income/income.component';
import { GoalComponent } from './components/goal/goal.component';
import { NewExpanseFormComponent } from './forms/new-expanse-form/new-expanse-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import { UpdateExpanseComponent } from './forms/update-expanse/update-expanse.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
// import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { NewBudgetComponent } from './forms/new-budget/new-budget.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import { UpdateBudgetComponent } from './forms/update-budget/update-budget.component';
import {CommonValidationMethods} from "./services/validations/commonValidationMethods";
import { LoginComponent } from './components/login/login.component';
import {AuthenticationGuard} from "./security/guards/authentication.guard";
import { TotalExpansesComponent } from './components/total-expanses/total-expanses.component';
import { ExpensesSumByCategoryComponent } from './components/expenses-sum-by-category/expenses-sum-by-category.component';




@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    ExpanseComponent,
    BudgetComponent,
    IncomeComponent,
    GoalComponent,
    NewExpanseFormComponent,
    UpdateExpanseComponent,
    NewBudgetComponent,
    UpdateBudgetComponent,
    LoginComponent,
    TotalExpansesComponent,
    ExpensesSumByCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'users', component: UsersComponent, canActivate: [AuthenticationGuard]},
      {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
      {path: 'expanse', component: ExpanseComponent, canActivate: [AuthenticationGuard]},
      {path: 'budget', component: BudgetComponent, canActivate: [AuthenticationGuard]},
      {path: 'income', component: IncomeComponent, canActivate: [AuthenticationGuard]},
      {path: 'goal', component: GoalComponent, canActivate: [AuthenticationGuard]},
      {path: 'expanse/newExpanse', component: NewExpanseFormComponent, canActivate: [AuthenticationGuard]},
      {path: 'expanse/updateExpanse/:expanseId', component: UpdateExpanseComponent, canActivate: [AuthenticationGuard]},
      // {path: '',
      //   redirectTo: '/components/expanse/expanse.component', pathMatch: 'full'},
      {path: 'budgets/newBudget', component: NewBudgetComponent, canActivate: [AuthenticationGuard]},
      {path: 'budgets/updateBudget/:budgetId', component: UpdateBudgetComponent, canActivate: [AuthenticationGuard]},
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'totalExpansesByUser', component: TotalExpansesComponent, canActivate: [AuthenticationGuard]},
      {path: 'expensesByCategoryAndUserId', component: ExpensesSumByCategoryComponent, canActivate: [AuthenticationGuard]}
    ]),
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    NgCircleProgressModule.forRoot({})
  ],
  providers: [
    DatePipe,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
