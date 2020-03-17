import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  title;
  firstName: string;
  lastName: string;
  position: string;
  compensation: number;
  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.title = this.data.type === 'edit' ? "Edit Employee" : "Delete Employee";
    this.firstName = this.data.empData.firstName;
    this.lastName = this.data.empData.lastName;
    this.position = this.data.empData.position;
    this.compensation = this.data.empData.compensation;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(){
    if ((!this.compensation || isNaN(this.compensation)) && this.data.type === 'edit') {
      alert('Enter a valid compensation');
    } else {
      this.dialogRef.close({type: this.data.type, newEmployeeData: {
        firstName: this.firstName,
        lastName: this.lastName,
        position: this.position,
        compensation: this.compensation,
      }});
    }
  }
}
