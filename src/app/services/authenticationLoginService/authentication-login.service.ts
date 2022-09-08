import {Injectable} from '@angular/core';
import {UserLogin} from "../../models/userLogin";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationLoginService {

  //This will contain the users populated locally here by the method below:
  users: UserLogin [] = [];
  //To always have the authenticated User inside the system(app) if it was previously
  //  authenticated successfully THEN we save it inside a method below:
  authenticatedUserLogin: UserLogin | undefined;

  constructor() {//Instead of getting Users from DB to perform Login Checking, I just get them from 'constructor' below:
    this.users.push({id: UUID.UUID(), username: "user1", password: "1234", roles: ["USER"]});
    this.users.push({id: UUID.UUID(), username: "user2", password: "1234", roles: ["USER"]});
    this.users.push({id: UUID.UUID(), username: "admin", password: "123456", roles: ["USER", "ADMIN"]});
  }

  /**User's Login Process:
   *  We simulate a Backend Call to find the username, if User exists we check
   *    if 'password' is correct IF Not we throw an Error: */
  public loginUserService(username: string, password: string): Observable<UserLogin>{
    let userExistsForLogin = this.users.find((user) => user.username===username);
    if (!userExistsForLogin) return throwError(()=> new Error("User was not Found!"));
    if (userExistsForLogin.password!==password){
      return throwError(()=> new Error("Your password is incorrect!"));
    }
    //If the user exists && password is correct then we return an Observable<UserLogin>;
    return of(userExistsForLogin);
  }

  /**To not Oblige the user every time to type their 'username & password', whenever is
   *  logged successfully, we save their info in "Local Storage" + Token that represents the user: */
  public authenticateUserService(user: UserLogin): Observable<boolean>{
    this.authenticatedUserLogin = user;
    //JSON.stringify(..): will convert a Javascript Object to a Json Object.
    localStorage.setItem("authUser",
                         JSON.stringify({username: user.username, roles: user.roles, jwt: "JWT_TOKEN"})
                        );
    return of(true);//If the authentication is OK.
  }

  /**We should check if the authenticate User is an 'ADMIN' OR 'USER' OR 'ADMIN' AND 'USER': */
  public isAuthenticateUserHasRoleService(role: string): boolean{
    return this.authenticatedUserLogin!.roles.includes(role);
  }

  /**Check if the user is Authenticated: */
  public isUserAuthenticatedService(): boolean {
    return this.authenticatedUserLogin != undefined;
  }

}
