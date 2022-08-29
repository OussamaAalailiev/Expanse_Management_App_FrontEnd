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
import {ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    ExpanseComponent,
    BudgetComponent,
    IncomeComponent,
    GoalComponent,
    NewExpanseFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'users', component: UsersComponent},
      {path: 'home', component: HomeComponent},
      {path: 'expanse', component: ExpanseComponent},
      {path: 'budget', component: BudgetComponent},
      {path: 'income', component: IncomeComponent},
      {path: 'goal', component: GoalComponent},
      {path: 'expanse/newExpanse', component: NewExpanseFormComponent}
    ]),
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
