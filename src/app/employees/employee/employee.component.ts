import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service :EmployeeService,
    private firestore:AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

resetForm(form?: NgForm){
  if(form != null)
  form.resetForm();
  this.service.formdata={
    id:null,
    fullname:'',
    position:'',
    empCode:'',
    mobile:'',
  }
}

onSubmit(form: NgForm) {
  let data = Object.assign({}, form.value);
  delete data.id;
  if (form.value.id == null)
    this.firestore.collection('employees').add(data);
  else
    this.firestore.doc('employees/' + form.value.id).update(data);
  this.resetForm(form);
  this.toastr.success('Submitted successfully', 'EMP. Register');
}
}
