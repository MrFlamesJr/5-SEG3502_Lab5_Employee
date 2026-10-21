import {Component, inject} from '@angular/core';
import { AbstractControl, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import {EmployeeService} from "../service/employee.service";
import { Router } from "@angular/router";
import { NgFor } from "@angular/common";
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";
import {Employee} from "../model/employee";

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgFor, NgbTooltip]
})
export class EmployeeComponent {
  private builder: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);
  private router: Router = inject(Router);
  employeeForm = this.builder.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    city: ['', Validators.required],
    salary: [0, Validators.required],
    gender: ['', Validators.pattern('^[MFX]$')],
    email: ['', Validators.email]
  });

  get name(): AbstractControl<string> {return <AbstractControl<string>>this.employeeForm.get('name'); }
  get dateOfBirth(): AbstractControl<string> {return <AbstractControl<string>>this.employeeForm.get('dateOfBirth'); }
  get city(): AbstractControl<string> {return <AbstractControl>this.employeeForm.get('city'); }
  get salary(): AbstractControl<number> {return <AbstractControl<number>>this.employeeForm.get('salary'); }
  get gender(): AbstractControl<string> {return <AbstractControl<string>>this.employeeForm.get('gender'); }
  get email(): AbstractControl<string> {return <AbstractControl<string>>this.employeeForm.get('email'); }

  // Same messages as the alerts in the template, shown together when hovering the disabled Submit button
  private errorMessages: Record<string, string> = {
    name: 'Employee Name is required.',
    dateOfBirth: 'Date of birth is required.',
    city: 'City of employment is required.',
    salary: 'Salary is required.',
    gender: 'Gender should be M, F or X.',
    email: 'Wrong email format.'
  };

  get submitErrors(): string[] {
    return Object.keys(this.errorMessages)
      .filter(control => this.employeeForm.get(control)?.invalid)
      .map(control => this.errorMessages[control]);
  }

  onSubmit() {
    const employee: Employee = new Employee(this.name.value,
      new Date(this.dateOfBirth.value),
      this.city.value,
      this.salary.value,
      this.gender.value,
      this.email.value);
    this.employeeService.addEmployee(employee);
    this.employeeForm.reset();
    this.router.navigate(['/employees']).then(() => {});
  }
}
