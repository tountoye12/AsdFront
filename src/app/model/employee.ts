import { RetirementPlan } from "./retirement-plan";


export class Employee {

    id:number = 0;
    firstName: string = '';
    lastName:string ='';
    yearlySalary: number = 0;
    retirementPlan: RetirementPlan | null = null;
}
