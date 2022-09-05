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
import { UpdateExpanseComponent } from './forms/update-expanse/update-expanse.component';
// import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { NewBudgetComponent } from './forms/new-budget/new-budget.component';




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
    NewBudgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'users', component: UsersComponent},
      {path: 'home', component: HomeComponent},
      {path: 'expanse', component: ExpanseComponent},
      {path: 'budget', component: BudgetComponent},
      {path: 'income', component: IncomeComponent},
      {path: 'goal', component: GoalComponent},
      {path: 'expanse/newExpanse', component: NewExpanseFormComponent},
      {path: 'expanse/updateExpanse/:expanseId', component: UpdateExpanseComponent},
      {path: '',
        redirectTo: '/components/expanse/expanse.component', pathMatch: 'full'}
    ]),
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSliderModule
  ],
  providers: [
    DatePipe,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
