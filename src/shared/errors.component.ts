import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
    <div *ngIf="showErrors()">
      <div style="color: red;" *ngFor="let error of errors()">{{error}}</div>
    </div>
  `,
})
export class ErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'Required field',
    'pattern': () => 'Pattern error',
    'age': () => 'You must be over 18 years old'
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  showErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  errors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ErrorsComponent.errorMessages[type](params);
  }

}
