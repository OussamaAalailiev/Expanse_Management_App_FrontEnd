import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Goal} from "../models/goal";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor( private http: HttpClient ) { }

  getGoalsService(): Observable<Goal[]>{
    return this.http.get< Goal[] >(environment.backendHost+"/api/goals");
  }

}
