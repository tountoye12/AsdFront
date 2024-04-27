import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { CredentialModel } from '../model/credentialMode';
import { EmployeeRequest } from '../model/employee-request';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private addEmployeeUrl:string;
  private getAllEmployeeUrl:string;
  private deleteEmployeeUrl:string;
  private updateEmployeeUrl:string;

  constructor(private http: HttpClient) {
    
    this.addEmployeeUrl = 'http://localhost:8080/api/v1/employees/add';
    this.getAllEmployeeUrl = 'http://localhost:8080/api/v1/employees/list';
    this.deleteEmployeeUrl = 'http://localhost:8080/api/v1/employees/';
    this.updateEmployeeUrl = 'http://localhost:8080/api/v1/employees/edit/';

   }

   addEmployee(empRequest: EmployeeRequest): Observable<EmployeeRequest> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem("token") || ""
      // add any other headers if needed
    });

    console.log(empRequest);
    

    return this.http.post<EmployeeRequest>(this.addEmployeeUrl, empRequest, {headers});
   }

   getAllEmployee(): Observable<Employee[]>{
      const headers = new HttpHeaders({
         'Content-Type': 'application/json',
         "Authorization": localStorage.getItem("token") || ""
         // add any other headers if needed
       });
    return this.http.get<Employee[]>(this.getAllEmployeeUrl, {headers});
   }

   login(): Observable<CredentialModel>{
      const url = "http://localhost:8080/api/v1/users/auth/login";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // add any other headers if needed
    });
    const data = {
      "username": "diallo",
      "password": "Diallo10@"                                       
    }

    return this.http.post<CredentialModel>(url, data, { headers });
   }


   updateEmployee(emp: Employee): Observable<Employee> {
      return this.http.put<Employee>(this.updateEmployeeUrl + emp.id, emp);
   }


   deleteEmployee(emp:Employee): Observable<Employee> {
    console.log("Deleting");
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem("token") || ""
      // add any other headers if needed
    });
      return this.http.delete<Employee>(this.deleteEmployeeUrl + emp.id, {headers});
   }
}
