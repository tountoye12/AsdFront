import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { CredentialModel } from 'src/app/model/credentialMode';
import { Employee } from 'src/app/model/employee';
import { EmployeeRequest } from 'src/app/model/employee-request';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

empDetailsForm!: FormGroup;
empResquestForm!: FormGroup;

employeeObj: Employee = new Employee();
employeerequest: EmployeeRequest = new EmployeeRequest();

employeeList: Employee [] = [];
constructor(private formBuilder: FormBuilder, private empService: EmployeeService){

  this.empDetailsForm = this.formBuilder.group({
    id: [''],
    firstName: [' '],
    lastName: [' '],
    yearlySalary: [' '],
    retirementPlan: [' ']
  });

  this.empResquestForm = this.formBuilder.group({
    firstName: [' '],
    lastName: [' '],
    yearlySalary: [' '],
    referenceNumber: [' '],
    retirementDate: [' '],
    enrollmentDate: [' '],
    monthlyContribution: [' '],

  });

}

ngOnInit(): void{

  this.empService.login().subscribe(
    (res: CredentialModel) => {
      localStorage.setItem("token", `Bearer ${res.token}`);    
      // console.log(res)
    }, 
    // error => {
    //   console.log("error")
    //   console.log(error)
    // }
  )
  this.getAllEmployee();
}

addEmployee() {
  // this.employeeObj.id =    this.empDetailsForm.value.id;
  this.employeerequest.firstName =  this.empResquestForm.value.firstName;
  this.employeerequest.lastName = this.empResquestForm.value.lastName;
  this.employeerequest.yearlySalary = this.empResquestForm.value.yearlySalary;
  this.employeerequest.referenceNumber = this.empResquestForm.value.referenceNumber;
  this.employeerequest.retirementDate = this.empResquestForm.value.retirementDate;
  this.employeerequest.enrollmentDate = this.empResquestForm.value.enrollmentDate;
  this.employeerequest.monthlyContribution = this.empResquestForm.value.monthlyContribution;

  this.empService.addEmployee(this.employeerequest).subscribe(res => {
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
  this.empDetailsForm.controls['firstName'].setValue(emp.firstName);
  this.empDetailsForm.controls['lastName'].setValue(emp.lastName);
  this.empDetailsForm.controls['yearlySalary'].setValue(emp.yearlySalary);
  this.empDetailsForm.controls['retirementPlan'].setValue(emp.retirementPlan);
}


updateEmployee() {

  this.employeeObj.id = this.empDetailsForm.value.id;
  this.employeeObj.firstName = this.empDetailsForm.value.firstName;
  this.employeeObj.lastName = this.empDetailsForm.value.lastName;
  this.employeeObj.yearlySalary = this.empDetailsForm.value.yearlySalary;
  this.employeeObj.retirementPlan = this.empDetailsForm.value.retirement;

  this.empService.updateEmployee(this.employeeObj).subscribe(res => {
    console.log(res);
    this.getAllEmployee();
  }, err => console.log(err)
  );

}

deleteEmployee(employee:Employee){

  this.empService.deleteEmployee(employee).subscribe(res => {
    //this.employeeList.filter(emp => emp.id != employee.id);
    //alert('Employee deleted successfully');
    this.getAllEmployee();
    console.log(res);
    
  }, err => console.log(err)
  );
}
  

}
