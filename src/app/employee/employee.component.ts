import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Employee} from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {
  @Input() employee: Employee;
  @Input() employees: Employees;
  @Output() sendNotification = new EventEmitter<any>();
  constructor() {
  }

  editEmp(id: number): void {
    this.sendNotification.emit({type: 'edit', id: id});
  }
  deleteEmp(id: number): void {
    this.sendNotification.emit({type: 'delete', id: id});
  }

  getEmpName(empID: number) {
    let emp: Employee = this.employees.filter((emp) => {
      return emp.id == empID;
    })[0];
    return `${emp.firstName} ${emp.lastName}`;
  }
}
