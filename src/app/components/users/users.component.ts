import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/userService/user.service";
import {User} from "../../models/user";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[]=[];
  user: User | undefined;

  constructor(private userService: UserService,
              public authService: AuthenticationLoginService) { }

  ngOnInit(): void {
    this.getUsersFromUserService();
    this.getUserById(this.authService.authenticatedUserLogin!.id);
  }

  getUsersFromUserService(){
    this.userService.getUsersService()
      .subscribe(
        (data: any) =>{
          this.users = data;
          console.log(data);
        },(error: any)=>{
          console.log(error);
        }
      )
  }

  //TODO: Get User By Id Not Tested yet!
  getUserById(userId: string){
    this.userService.getUserByIdService(userId).subscribe(
      (user) => {
        this.user = user;
      },(error) => {
      console.log(error)
    });
  }

}
