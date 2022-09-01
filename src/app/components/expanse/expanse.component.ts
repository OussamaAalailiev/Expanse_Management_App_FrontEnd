import { Component, OnInit } from '@angular/core';
import {ExpanseService} from "../../services/expanse.service";
import {Observable} from "rxjs";
import {Expanse} from "../../models/expanse";

@Component({
  selector: 'app-expanse',
  templateUrl: './expanse.component.html',
  styleUrls: ['./expanse.component.css']
})
export class ExpanseComponent implements OnInit {

  //expansesList!: Observable<Expanse []>;
  expansesList!: Expanse [];
  //errorMessage: Observable<never> | undefined;
  errorMessage: string | undefined;

  constructor(private expanseService: ExpanseService) { }

  ngOnInit(): void {
   this.getAllExpanses();
  }

  getAllExpanses(){
    this.expanseService.getExpansesService()
      .subscribe(
      (data) =>{
          this.expansesList = data;
          console.log(data)
      }
      ,(error) =>{
        //  this.errorMessage = this.expanseService.handleError(error);//If the Backend respond with an error, we save it to 'errorMessage'.
        this.errorMessage = error;//If the Backend respond with an error, we save it to 'errorMessage'.
      });
  }

  handleExpanseDelete(expanse: Expanse) {
    /**Confirmation to user for Delete: */
    let confMessage = confirm("Are you sure you want to delete this Expanse!");
    if (!confMessage) return;//If the user cancel the deletion of the expanse we break out of this method,
    let expanseId = expanse.id;// else we continue down below:
    this.expanseService.deleteExpanseService(expanseId)
      .subscribe(value => {
        // this.getAllExpanses();//To refresh the page dynamically after an Expanse Deletion:
        /**Instead of re-request the list of Expanses from backend again, we will refresh the list
         *  by deleting the expanse locally:
         * */
        let indexOfExpanseDeleted = this.expansesList.indexOf(expanse);
        this.expansesList.splice(indexOfExpanseDeleted, 1);
        console.log(value);
      },error => {
        console.log(error);
      })
  }


}
