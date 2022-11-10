import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ValidationErrors} from "@angular/forms";
import {AuthenticationLoginService} from "./services/authenticationLoginService/authentication-login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'budget-angular-management-App';

  constructor(private router: Router,
              public authService: AuthenticationLoginService) {
  }

  handleNewExpanseForm() {
    this.router.navigateByUrl("/expanse/newExpanse")
  }


  handleLogout() {
    this.authService.logoutUser().subscribe({
      next: (data) => {//If the logout process went well, we route the user to Login Page:
        this.router.navigateByUrl('/login');
      }
    });
  }

  handleTotalExpansesPage() {
    this.router.navigateByUrl('totalExpansesByUser');
  }

  handleExpansesByCategoryPage() {
    this.router.navigateByUrl('expensesByCategoryAndUserId');
  }

  handleTotalIncomesPage() {
    this.router.navigateByUrl('totalIncomesByUser');
  }


}
