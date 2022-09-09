import {Injectable} from '@angular/core';
import {UserLogin} from "../../models/userLogin";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationLoginService {

  //This will contain the users populated locally here by the method below:
  //users: UserLogin [] = [];
  users: User [] = [
    {id: '3a300bc8-8954-4e93-9136-2b11ad2461b1', name: "Oussama", password: "oussama123", roles: ["USER"]},
    {id: 'dfa735ec-328b-43c3-ad70-f5dba33eb585', name: "Zakaria", password: "zakaria123", roles: ["USER"]},
    {id: '653eb6f2-a817-4184-af31-4cff631692f8', name: "Safwane", password: "safwane123", roles: ["USER"]}
  ];
  //To always have the authenticated User inside the system(app) if it was previously
  //  authenticated successfully THEN we save it inside a method below:
  authenticatedUserLogin: User | undefined;

  constructor() {//Instead of getting Users from DB to perform Login Checking, I just get them from 'constructor' below:
    // this.users.push({id: UUID.UUID(), username: "user1", password: "1234", roles: ["USER"]});
    // this.users.push({id: UUID.UUID(), username: "user2", password: "1234", roles: ["USER"]});
    // this.users.push({id: UUID.UUID(), username: "admin", password: "123456", roles: ["USER", "ADMIN"]});
  }

  /**User's Login Process:
   *  We simulate a Backend Call to find the username, if User exists we check
   *    if 'password' is correct IF Not we throw an Error: */
  public loginUserService(username: string, password: string): Observable<User>{
    let userExistsForLogin = this.users.find((user) => user.name===username);
    if (!userExistsForLogin) return throwError(()=> new Error("User was not Found!"));
    if (userExistsForLogin.password!==password){
      return throwError(()=> new Error("Your password is incorrect!"));
    }
    //If the user exists && password is correct then we return an Observable<UserLogin>;
    return of(userExistsForLogin);
  }

  /**To not Oblige the user every time to type their 'username & password', whenever is
   *  logged successfully, we save their info in "Local Storage" + Token that represents the user: */
  public authenticateUserService(user: User): Observable<boolean>{
    this.authenticatedUserLogin = user;
    //JSON.stringify(..): will convert a Javascript Object to a Json Object.
    localStorage.setItem("authUser",
                         JSON.stringify({username: user.name, roles: user.roles, jwt: "JWT_TOKEN"})
                        );
    return of(true);//If the authentication is OK.
  }

  /**We should check if the authenticate User is an 'ADMIN' OR 'USER' OR 'ADMIN' AND 'USER': */
  public isAuthenticateUserHasRoleService(role: string): boolean{
    return this.authenticatedUserLogin!.roles!.includes(role);
  }

  /**Check if the user is Authenticated: */
  public isUserAuthenticatedService(): boolean {
    return this.authenticatedUserLogin != undefined;
  }

  /**Logout Method: */
  logoutUser(): Observable<boolean>{
    this.authenticatedUserLogin = undefined;
    //Empty the user authenticated from Application Context before log it out:
    localStorage.removeItem("authUser");//we just simulate in this line:
    return of(true);
  }

}
