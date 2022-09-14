import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginFormGroup!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationLoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.initiateLoginForm();
  }

  initiateLoginForm(): void{
    this.userLoginFormGroup = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    })
  }

  /**To Log in OR Authenticate the user, I need to Inject the Authentication Service Above: */
  handleUserLogin() {
    let username = this.userLoginFormGroup.value.username;
    let password = this.userLoginFormGroup.value.password;
    this.authService.loginUserService(username, password).subscribe({
      next: (userLogin) => {//If the logging process went well:
        this.authService.authenticateUserService(userLogin).subscribe({
          next: (data) => {
            this.router.navigateByUrl('/budget');
          }
        })
      },
      error: (err) => {//If the logging process Failed:
        this.errorMessage = err;
      }
    })
  }



}
