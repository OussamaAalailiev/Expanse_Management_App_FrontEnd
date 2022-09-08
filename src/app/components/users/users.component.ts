import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/userService/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[]=[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsersFromUserService();
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

}
