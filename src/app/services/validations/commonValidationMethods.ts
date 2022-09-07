import {ValidationErrors} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
}) //Created class to provide common validation methods:
export class CommonValidationMethods {

  //constructor() {}

  public getAmountErrorMessage(amountField: string, errors: ValidationErrors): string {

    if (errors['required']){
      return amountField + " is required";
    }else if (errors['min']){
      return amountField + " should be at least equal or greater than " + 1.00+" .";
    }else if (errors['max']){
      return amountField + " should be less than " + errors['max']['max']+" .";
    }else {
      return "";
    }

  }

  public  getTitleErrorMessage(title: string, errors: ValidationErrors) {
    if (errors['required']){
      return title + " is required";
    }else if (errors['minlength']){
      console.log(errors.valueOf())
      return title + " should be at least equal or greater than " + errors['minlength']['requiredLength'] +" Characters.";
      // return title + " should be at least equal or greater than " + ""+" Characters.";
    }else if (errors['maxlength']){
      console.log(errors.valueOf())
      return title + " should be less than " + errors['maxlength']['requiredLength'] +" Characters.";
    }else {
      return "";
    }
  }

  getDescriptionErrorMessage(description: string, errors: ValidationErrors) {
    if (errors['maxlength']){
      console.log(errors.valueOf())
      return description + " should be less than " + errors['maxlength']['requiredLength'] +" Characters.";
    }else {
      return "";
    }
  }

}
