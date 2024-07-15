import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
//to solve *ngFor problem we have to put the below line 
//and add CommonModule in the imports
import { CommonModule } from '@angular/common';
//this import is to fix "ngForm" no directive foun problem, add (FormsModule)
//to imports below
import { FormsModule, NgForm } from '@angular/forms';

//we have our service set and ready to use here in the component.ts

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  //first we have to define a variable to hold all the employees 
 //coming from the backend through the created service
 //by injecting the service here
   public employees: Employee[] = [];
   
   //creating an employee to hold the employee passed to onOpenModel
   //to repopulate the loaded employee to the form
   //by setting it to the employee passed to onOpenModel 
   public editEmployee!: any;

   public deleteEmployee!: Employee;

   //injecting the employeeservice to get access to it
   constructor(private employeeService: EmployeeService){}
     //to call the getEmployees() wherever this component is initalized or loaded
     //calling the getEmployees() which is defined below
     //and in turn if the getEmployees() gets a response from the service
     //it gonna set our employees
     //and if no response we get an error message
     ngOnInit(): void {
      this.getEmployees();
      this.editEmployee = {};
    }
   
   //then we have to create a function to call the service
   public getEmployees(): void{
       this.employeeService.getEmployees().subscribe(
         //if we got a response back which is gonna be a employee array
         (response: Employee[]) => {
            //setting the variable that defined on top (employees)
            //to be equal to the body of the request
            this.employees = response;
         },
         //in case of getting an error which will be an http error
         (error: HttpErrorResponse) =>{
            alert(error.message);
         }
       );
   }

     public onAddEmployee(addForm: NgForm): void{
      document.getElementById('add-employee-form')?.click();
      //addForm.value this value will be every name attribute in the .html file in json representation
      this.employeeService.addEmployee(addForm.value).subscribe(
              (response: Employee) =>{
                console.log(response);
                this.getEmployees();
                addForm.reset();
              },
              (error: HttpErrorResponse) =>{
                alert(error.message);
                addForm.reset();
              }
      );
          
     }

     public onUpdateEmployee(employee: Employee): void{
      this.employeeService.updateEmployee(employee).subscribe(
             (response: Employee) =>{
                       console.log(response);
                       this.getEmployees();
             },
             (error: HttpErrorResponse) =>{
              alert(error.message);
             }
      );
     }

     public onDeleteEmployee(employeeId: number): void{
        this.employeeService.deleteEmployee(employeeId).subscribe(
          (response: void) =>{
                   console.log(response);
                   this.getEmployees();
          },
          (error: HttpErrorResponse) =>{
            alert(error.message);
          }
        );
     }

     //for search function
     public SearchEmployees(key: string): void{
          console.log(key);
          const results: Employee[] = [];
          for(const employee of this.employees){
               if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
              || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
              || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
              || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){

                results.push(employee);
              }
          }

          this.employees = results;
          if(results.length === 0 || !key){
               this.getEmployees();
          }
     }
     //to trigger which button is clicked or triggered
     //mode is for helping what the user is trying to do
    //and which modal is gonna open 
    public onOpenModal(employee: Employee | null, mode: string): void{
      
       //getting access to the main container or dev
       const container = document.getElementById('main-container');
        //create the button
        const button = document.createElement('button');
        //the button type by default is submit
        //so here we are not going to submit data
        //so we have to change the type from submit to button
        button.type = 'button';
        //since we already have a button for editing and deleting (pencil and x buttons)
        //we have to hide that button in the UI using some css
        button.style.display = 'none';
        //adding the data-toggle and modal to the button
        button.setAttribute('data-toggle', 'modal');
        //detect which button is clicked by the user
        //since it referening an 'id' we have to put # before the modal
        if(mode === 'add'){
          button.setAttribute('data-target', '#addEmployeeModal');
        }
        if(mode === 'edit'){
          //this editEmployee will be binded to the html form
          this.editEmployee = employee as Employee;
          button.setAttribute('data-target', '#updateEmployeeModal');
        }
        if(mode === 'delete'){
          this.deleteEmployee = employee as Employee;
          button.setAttribute('data-target', '#deleteEmployeeModal');
        }

        //append the button to the html
        container?.appendChild(button);

        //clicking the button
        //now the button we created has all that attributes on it
        //and when clicked it will open the approperiate model
        button.click();

    }
   

    
}
