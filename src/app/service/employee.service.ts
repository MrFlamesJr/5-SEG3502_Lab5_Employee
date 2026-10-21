import { Injectable, inject } from '@angular/core';
import {BehaviorSubject, EMPTY, Observable} from "rxjs";
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
    // TODO: read the employees stored in this.employeesCollection from Firestore
    // use collectionData()
    return EMPTY;
  }

  addEmployee(employee: Employee) {
    // Firestore only accepts plain objects 
    addDoc(this.employeesCollection, {...employee})
      .catch((error) => window.alert(error.message));
    this.employees$.next([...this.employees$.getValue(), employee]);
    return true;
  }

  // Firestore stores dates as Timestamps, so convert dateOfBirth back to a Date
  private convertFromFirestore(employee: Employee): Employee {
    // TODO: return a copy of the employee with dateOfBirth turned into a Date
    // (you can use as Timestamp to cast the dateOfBirth to a Timestamp, then call toDate() on it)
    return employee;
  }
}
