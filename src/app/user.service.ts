import { Injectable } from '@angular/core';
import {User} from "./user";
import { HttpClient } from '@angular/common/http';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Configure CartService to use HttpClient:
  //Inject the HttpClient service into your service so your application
  // can fetch data and interact with external APIs and resources:
  constructor(private http: HttpClient) { }

  getUsersService(){
    return this.http.get(environment.backendHost+"/api/users");
  }
}
