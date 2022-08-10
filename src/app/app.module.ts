import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { ExpanseComponent } from './expanse/expanse.component';
import { BudgetComponent } from './budget/budget.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    ExpanseComponent,
    BudgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'users', component: UsersComponent},
      { path: 'home', component: HomeComponent},
      { path: 'expanse', component: ExpanseComponent },
      { path: 'budget', component: BudgetComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
