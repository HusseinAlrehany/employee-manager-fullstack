//here we are gonna define all the attributes the employee is gonna have
//and this represents the type of data whereever a call send to the backend
export interface Employee{
    id: number;
    name: string;
    email: string;
    jobTitle: string;
    phone: string;
    imageUrl: string;
    employeeCode: string;
}