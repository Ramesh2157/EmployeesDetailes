import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formdata : Employee

  constructor(private firestore:AngularFirestore) { }

  getEmployees(){
    return this.firestore.collection('employees').snapshotChanges();
  }
}
