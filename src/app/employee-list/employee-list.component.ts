import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UpdateDialogComponent} from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }

  updateEmployee(event) {
    if (event.type === 'edit') {
      const dialogRef = this.dialog.open(UpdateDialogComponent, {
        width: '300px',
        data: { type: event.type, empData: this.getEmpData(event.id) };
      });
    } else {
      const dialogRef = this.dialog.open(UpdateDialogComponent, {
        width: '500px',
        data: { type: event.type, empData: this.getEmpData(event.id) };
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      if (result.type == 'edit') {
        for (let i = 0; i < this.employees.length; i++) {
          if (this.employees[i].id == event.id) {
            this.employees[i].firstName = result.newEmployeeData.firstName;
            this.employees[i].lastName = result.newEmployeeData.lastName;
            this.employees[i].position = result.newEmployeeData.position;
            this.employees[i].compensation = result.newEmployeeData.compensation;
          }
        }
      } else {
        for (let i = 0; i < this.employees.length; i++) {
          if (this.employees[i].directReports) {
            this.employees[i].directReports = this.employees[i].directReports.filter(empID => {
              return empID != event.id;
            })
          }
        }
        this.employees = this.employees.filter(emp => {
          return emp.id != event.id;
        });
      }
    });
  }
  getEmpData(id: number): Employee{
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id == id) return this.employees[i];
    }
  }
}
