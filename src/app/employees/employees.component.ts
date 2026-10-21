import {Component, inject} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    standalone: true,
    imports: [NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent {
  protected employees: EmployeeService = inject(EmployeeService);
}
