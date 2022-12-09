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

import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NewBudgetComponent } from './forms/new-budget/new-budget.component';
import { UpdateBudgetComponent } from './forms/update-budget/update-budget.component';
import { LoginComponent } from './components/login/login.component';
import {AuthenticationGuard} from "./security/guards/authentication.guard";
import { TotalExpansesComponent } from './components/total-expanses/total-expanses.component';
import { ExpensesSumByCategoryComponent } from './components/expenses-sum-by-category/expenses-sum-by-category.component';
import { TotalIncomesComponent } from './components/income/total-incomes/total-incomes.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GlobalExpensesByCatComponent } from './global-expenses-by-cat/global-expenses-by-cat.component';
import { ExpensesSumDescByCatComponent } from './components/expenses-sum-desc-by-cat/expenses-sum-desc-by-cat.component';
import { IncomesSumByCategoryComponent } from './components/income/incomes-sum-by-category/incomes-sum-by-category.component';
import { IncomesSumDescByCatComponent } from './components/income/incomes-sum-desc-by-cat/incomes-sum-desc-by-cat.component';
import { GlobalIncomesByCatComponent } from './components/income/global-incomes-by-cat/global-incomes-by-cat.component';
import { UserTotalBalanceComponent } from './components/users/user-total-balance/user-total-balance.component';
import { AddGoalModalPopupComponent } from './forms/add-goal-modal-popup/add-goal-modal-popup.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {ErrorStateMatcher, MatNativeDateModule, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import { UpdateGoalModalComponent } from './forms/update-goal-modal/update-goal-modal.component';
import { AddIncomeModalComponent } from './forms/add-income-modal/add-income-modal.component';




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
    ExpensesSumByCategoryComponent,
    TotalIncomesComponent,
    PageNotFoundComponent,
    GlobalExpensesByCatComponent,
    ExpensesSumDescByCatComponent,
    IncomesSumByCategoryComponent,
    IncomesSumDescByCatComponent,
    GlobalIncomesByCatComponent,
    UserTotalBalanceComponent,
    AddGoalModalPopupComponent,
    UpdateGoalModalComponent,
    AddIncomeModalComponent
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
      {path: 'totalIncomesByUser', component: TotalIncomesComponent, canActivate: [AuthenticationGuard]},
      {path: 'goal', component: GoalComponent, canActivate: [AuthenticationGuard]},
      {path: 'newExpanse', component: NewExpanseFormComponent, canActivate: [AuthenticationGuard]},
      {path: 'expanse/updateExpanse/:expanseId', component: UpdateExpanseComponent, canActivate: [AuthenticationGuard]},
      // {path: '',
      //   redirectTo: '/components/expanse/expanse.component', pathMatch: 'full'},
      {path: 'budgets/newBudget', component: NewBudgetComponent, canActivate: [AuthenticationGuard]},
      {path: 'budgets/updateBudget/:budgetId', component: UpdateBudgetComponent, canActivate: [AuthenticationGuard]},
      //Instead of -> '{path: '', component: LoginComponent}':
      // If the user doesn't specify a path, we redirect the user to the '/login' path:
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'totalExpansesByUser', component: TotalExpansesComponent, canActivate: [AuthenticationGuard]},
      // {path: 'expensesByCategoryAndUserId', component: ExpensesSumByCategoryComponent, canActivate: [AuthenticationGuard]},
      {
        path: 'global-Expenses-By-Cat/expensesByCategoryAndUserId',
        component: ExpensesSumByCategoryComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'global-Expenses-By-Cat/expensesByCategoryAndUserIdAmountDesc',
        component: ExpensesSumDescByCatComponent,
        canActivate: [AuthenticationGuard]
      },
      //If the user specify a path that does Not exist, we display the component down below:
      {path: 'global-Expenses-By-Cat', component: GlobalExpensesByCatComponent, canActivate: [AuthenticationGuard]},
      {path: 'global-Incomes-By-Cat', component: GlobalIncomesByCatComponent, canActivate: [AuthenticationGuard]},
      {
        path: 'global-Incomes-By-Cat/incomesByCategoryAndUserId',
        component: IncomesSumByCategoryComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'global-Incomes-By-Cat/incomesByCategoryAndUserIdAmountDesc',
        component: IncomesSumDescByCatComponent,
        canActivate: [AuthenticationGuard]
      },
      {path: '**', component: PageNotFoundComponent}
    ]),
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    NgCircleProgressModule.forRoot({}),
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule
  ],
  providers: [
    DatePipe,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
