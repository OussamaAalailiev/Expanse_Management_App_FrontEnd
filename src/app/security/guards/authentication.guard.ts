import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";

@Injectable({
  providedIn: 'root'
})
/**1- This 'guards' Feature protect app routes AND activate protected routes only if we mentioned
 *      them based on condition(s).
 * 2- Protect Routing System: */
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationLoginService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isUserAuthenticatedService()){
      return true;
    }else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
