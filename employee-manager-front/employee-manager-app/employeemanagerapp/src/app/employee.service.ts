import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

//in this service we have to implement some functions
//to reach to the back end and perform operations
//and we have to use HttpClient of angular to do such functions
//and once we have access to that http client we are able to send http 
//requests to the backend
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
   //DEFINE A METHOD TO GET ALL EMPLOYEES FROM THE BACKEND
   //we have to design the UI to detect the type of data that gonna return for this request
   public getEmployees(): Observable<Employee[]> {
        return this.http.get<any>(`${this.apiServerUrl}/employee/all`);
   }
   
   //DEFINE A METHOD TO ADD AN EMPLOYEE
   public addEmployee(employee: Employee): Observable<Employee>{
       return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
   } 

   //DEFINE A METHOD TO UPDATE EMPLOYEE
   public updateEmployee(employee: Employee): Observable<Employee>{
      return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
   }

   //DEFINE A METHOD TO DELETE EMPLOYEE
   public deleteEmployee(employeeId: number): Observable<void>{
      return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
   }

}
