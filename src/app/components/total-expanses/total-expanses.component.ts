import { Component, OnInit } from '@angular/core';
import {ExpanseService} from "../../services/expanseService/expanse.service";
import {AuthenticationLoginService} from "../../services/authenticationLoginService/authentication-login.service";
import {TotalExpansePerMonthDTO} from "../../models/TotalExpansePerMonthDTO";
import {Observable} from "rxjs";

@Component({
  selector: 'app-total-expanses',
  templateUrl: './total-expanses.component.html',
  styleUrls: ['./total-expanses.component.css']
})
export class TotalExpansesComponent implements OnInit {

  totalExpansesList!: TotalExpansePerMonthDTO[];
  constructor(private expanseService: ExpanseService,
              public authService: AuthenticationLoginService) { }

  ngOnInit(): void {
    this.getAllTotalExpansesByUserAndYearAndMonth();
  }

  getAllTotalExpansesByUserAndYearAndMonth(){
    this.expanseService.getTotalExpansesByYearMonthUserIDService(this.authService.authenticatedUserLogin!.id)
      .subscribe(
        (data) =>{
          this.totalExpansesList = data;
          console.log(data)
        }
        ,(error) =>{
          console.log(error);
        });
  }


  handleCalendarMonth(month: string) : string{
    let imgStandardPath = './assets/images/';
    let imgEndPath = '.png';
    switch (month) {
      case '01':
        return `${imgStandardPath}january${imgEndPath}`;
      case '02':
        return `${imgStandardPath}february${imgEndPath}`;
      case '03':
        return `${imgStandardPath}march${imgEndPath}`;
      case '04':
        return `${imgStandardPath}april${imgEndPath}`;
      case '05':
        return `${imgStandardPath}may${imgEndPath}`;
      case '06':
        return `${imgStandardPath}june${imgEndPath}`;
      case '07':
        return `${imgStandardPath}july${imgEndPath}`;
      case '08':
        return `${imgStandardPath}august${imgEndPath}`;
      case '09':
        return `${imgStandardPath}september${imgEndPath}`;
      case '10':
        return `${imgStandardPath}october${imgEndPath}`;
      case '11':
        return `${imgStandardPath}november${imgEndPath}`;
      case '12':
        return `${imgStandardPath}december${imgEndPath}`;
      default:
        return `${imgStandardPath}undefined${imgEndPath}`;
    }
  }

  handleAltOfCalendarMonth(month: string) : string{
    switch (month) {
      case '01':
        return 'January Calendar image';
      case '02':
        return 'February Calendar image';
      case '03':
        return 'March Calendar image';
      case '04':
        return 'April Calendar image';
      case '05':
        return 'May Calendar image';
      case '06':
        return 'June Calendar image';
      case '07':
        return 'July Calendar image';
      case '08':
        return 'August Calendar image';
      case '09':
        return 'September Calendar image';
      case '10':
        return 'October Calendar image';
      case '11':
        return 'November Calendar image';
      case '12':
        return 'December Calendar image';
      default:
        return 'Unfounded Calendar image';
    }

  }
}
