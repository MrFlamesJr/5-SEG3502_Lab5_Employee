import { Injectable, inject } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {
  Firestore,
  Timestamp,
  collection,
  collectionData,
  addDoc
} from '@angular/fire/firestore';
import {Employee} from "../model/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<readonly Employee[]>([]);
  private firestore: Firestore = inject(Firestore);
  private employeesCollection = collection(this.firestore, 'employees');

  constructor() {
    // Keep the local list in sync with what is stored in Firestore
    this.getEmployees().subscribe(employees => {
      this.employees$.next(employees.map(employee => this.convertFromFirestore(employee)));
    });
  }

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }

  getEmployees(): Observable<Employee[]> {
   return collectionData(this.employeesCollection) as Observable<Employee[]>;
  }

  addEmployee(employee: Employee) {
    // Firestore only accepts plain objects 
    addDoc(this.employeesCollection, {...employee})
      .catch((error) => window.alert(error.message));
    return true;
  }

  // Firestore stores dates as Timestamps, so convert dateOfBirth back to a Date
  private convertFromFirestore(employee: Employee): Employee {
    return {
  ...employee,
  dateOfBirth: (employee.dateOfBirth as unknown as Timestamp).toDate()
  };
  }
}
