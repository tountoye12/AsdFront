import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { CredentialModel } from 'src/app/model/credentialMode';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

empDetailsForm!: FormGroup;

employeeObj: Employee = new Employee();

employeeList: Employee [] = [];
constructor(private formBuilder: FormBuilder, private empService: EmployeeService){

  this.empDetailsForm = this.formBuilder.group({
    id: [''],
    name: [' '],
    email: [' '],
    phone: [' '],
    title: [' ']
  });

}

ngOnInit(): void{

  this.empService.login().subscribe(
    (res: CredentialModel) => {
      localStorage.setItem("token", `Bearer ${res.token}`);    
      console.log(res)
    }, 
    error => {
      console.log("error")
      console.log(error)
    }
  )
  this.getAllEmployee();
}

addEmployee() {
  this.employeeObj.id =    this.empDetailsForm.value.id;
  this.employeeObj.name =  this.empDetailsForm.value.name;
  this.employeeObj.email = this.empDetailsForm.value.email;
  this.employeeObj.phone = this.empDetailsForm.value.phone;
  this.employeeObj.title = this.empDetailsForm.value.title;

  this.empService.addEmployee(this.employeeObj).subscribe(res => {
    this.getAllEmployee();
    console.log(res);
  }, err => console.log(err)
  );
}

getAllEmployee() {
  this.empService.getAllEmployee().subscribe(res => {
    this.employeeList = res;
    console.log(this.employeeList);
  }, err => console.log(err)
  )
}

editEmployee(emp:Employee) {
  //console.log(emp.id);
  
  this.empDetailsForm.controls['id'].setValue(emp.id)
  this.empDetailsForm.controls['name'].setValue(emp.name);
  this.empDetailsForm.controls['email'].setValue(emp.email);
  this.empDetailsForm.controls['phone'].setValue(emp.phone);
  this.empDetailsForm.controls['title'].setValue(emp.title);
}


updateEmployee() {

  this.employeeObj.id = this.empDetailsForm.value.id;
  this.employeeObj.name = this.empDetailsForm.value.name;
  this.employeeObj.email = this.empDetailsForm.value.email;
  this.employeeObj.phone = this.empDetailsForm.value.phone;
  this.employeeObj.title = this.empDetailsForm.value.title;

  this.empService.updateEmployee(this.employeeObj).subscribe(res => {
    console.log(res);
    this.getAllEmployee();
  }, err => console.log(err)
  );

}

deleteEmployee(employee:Employee){

  this.empService.deleteEmployee(employee).subscribe(res => {
    //this.employeeList.filter(emp => emp.id != employee.id);
    alert('Employee deleted successfully');
    this.getAllEmployee();
    console.log(res);
    
  }, err => console.log(err)
  );
}
  

}
