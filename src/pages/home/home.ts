import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormCustomValidators } from "../../validators/form-custom-validators";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  public formData: FormGroup;
  public ssnType: any[] = [];
  public passportWarning:boolean = false;
  constructor(public navCtrl: NavController, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.ssnType = [
      {id:'1', description: 'NIF'},
      {id:'2', description: 'NIE'},
      {id:'3', description: 'Passport'}
    ];

    //Create reactive form
    this.formData = this.fb.group({
      'name': new FormControl('', Validators.required),
      'surname1': new FormControl('', Validators.required),
      'birthDate': new FormControl('', [Validators.required, FormCustomValidators.validBirthDate]),
      'phone': new FormControl('', [Validators.required, Validators.pattern("\\+?\\d\\d\\d\\d\\d\\d\\d\\d\\d+")] ),
      'ssnType': new FormControl('', Validators.required),
      'ssn': new FormControl('', Validators.required),
      'surname2': new FormControl('')
    });

    //When ssnType value changes, start checking conditions
    this.formData.get('ssnType').valueChanges.subscribe((ssnTypeId: string) => {
      this.setSsnTypeValidations(ssnTypeId);
    });

  }

  /**
   * Depending on ssnType selected value, we apply different validations
   * @param ssnTypeId
   */
  private setSsnTypeValidations(ssnTypeId){
    if(ssnTypeId){
      switch (ssnTypeId) {
        case '1': // with NIF document type surname2 not empty is mandatory and ssn format should be valid
          this.formData.get('surname2').setValidators([Validators.required]);
          this.formData.get('ssn').setValidators([Validators.required, FormCustomValidators.evaluateSsnDNI]);
          this.passportWarning = false;
          break;
        case '2': // with NIE document surname2 is optional and ssn format should be valid
          this.formData.get('surname2').setValidators(null);
          this.formData.get('ssn').setValidators([Validators.required, FormCustomValidators.evaluateSsnNIE]);
          this.passportWarning = false;
          break;
        default: // passport does not have format validations. We show warning advice
          this.formData.get('surname2').setValidators(null);
          this.formData.get('ssn').setValidators([Validators.required]);
          this.passportWarning = true;
          break;
      }
      this.formData.get('surname2').updateValueAndValidity();
      this.formData.get('ssn').updateValueAndValidity();
    }
  }

  /**
   *
   * @return {number}
   */
  private getFormValidationErrors() {
    let numErrors = 0;
    Object.keys(this.formData.controls).forEach(key => {

      const controlErrors = this.formData.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          numErrors++;
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
    return numErrors;
  }

  /**
   * Check if there are errors. If not, send data.
   */
  public sendForm() {
    Object.keys(this.formData.controls).forEach(field => {
      const control = this.formData.get(field);
      control.markAsTouched({onlySelf: true});
    });

    if (this.getFormValidationErrors() > 0) {
      return;
    }

    //Get form info example
    let formInfo = {
      name: this.formData.get('name').value,
      surname1: this.formData.get('surname1').value,
      surname2: this.formData.get('surname2').value,
      birthDate: this.formData.get('birthDate').value,//Note: ion-datetime return date in YYYY-MM-DD format
      phone: this.formData.get('phone').value,
      ssnType: this.formData.get('ssnType').value,
      ssn: this.formData.get('ssn').value
    };

    alert('Valid form. Info: '+JSON.stringify(formInfo));
    //Call to server sending formInfo should be here
  }
}
