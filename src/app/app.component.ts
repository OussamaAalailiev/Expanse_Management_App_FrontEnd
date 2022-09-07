import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ValidationErrors} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'budget-angular-management-App';

  constructor(private router: Router) {
  }

  handleNewExpanseForm() {
    this.router.navigateByUrl("/expanse/newExpanse")
  }


}
