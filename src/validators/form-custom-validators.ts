import { FormControl, ValidationErrors} from '@angular/forms';
import * as moment from "moment";
import { SsnFormatValidators } from "./ssn-format-validators";

export class FormCustomValidators {
  /**
   * Person is 18 years old or more-> valid
   * @param {FormControl} c
   * @return {ValidationErrors}
   */
  static validBirthDate(c: FormControl): ValidationErrors {
    // Parse the date parts to integers
    let dateNumbers = c.value;//format from ion-datetime "YYYY-MM-DD"
    let year = parseInt((dateNumbers.substr(0, 4)), 10);
    let month = parseInt((dateNumbers.substr(5, 2)), 10);
    let day = parseInt((dateNumbers.substr(8, 2)), 10);

    let date = moment({month: month - 1, year: year, day: day});
    let isValid = (moment().diff(date, 'y') > 17);

    return isValid ? null : { age: true};
  }

  /**
   *
   * @param {FormControl} c
   * @return {ValidationErrors}
   */
  static evaluateSsnDNI(c: FormControl): ValidationErrors {
    return SsnFormatValidators.validDNI(c.value) ? null : {pattern: true};
  }

  /**
   *
   * @param {FormControl} c
   * @return {ValidationErrors}
   */
  static evaluateSsnNIE(c: FormControl): ValidationErrors {
    return SsnFormatValidators.validNIE(c.value) ? null : {pattern: true};
  }
}
