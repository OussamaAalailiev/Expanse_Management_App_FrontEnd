import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Expanse} from "./expanse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpanseService {

  constructor(private http: HttpClient) { }

  getExpansesService(): Observable<Expanse []>{
    return this.http.get<Expanse[]>(environment.backendHost + "/api/expanses");
  }



}
