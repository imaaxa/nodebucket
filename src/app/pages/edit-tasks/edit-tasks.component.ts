/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Create/Edit Task page.
===========================================*/

import { CookieService }      from 'ngx-cookie-service';
import { Component, OnInit, Inject }  from '@angular/core';
import { HttpClient }         from "@angular/common/http";
import { MatInputModule }     from "@angular/material/input";
import { MatCardModule }      from "@angular/material/card";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar }        from "@angular/material/snack-bar";
import { NgForm }             from "@angular/forms";
import { Router }             from "@angular/router";

import { TaskService }  from "../tasks.services";

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.css']
})
export class EditTasksComponent implements OnInit {
  taskType:   string = 'Create';
  titleValue: string = '';
  textValue:  string = '';

  constructor(
    public dialogRef: MatDialogRef<EditTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public taskService: TaskService
  ) { }

  ngOnInit() {
  }

  onCancel() {
    // Close dialog modal
    this.dialogRef.close();
  }

  // Create/Update task on Save button click
  onSave(form: NgForm) {
    // Send the form data to the task Service and reset form
    this.taskService.addTask(form.value.titleValue, form.value.textValue);

    // Close dialog modal
    this.dialogRef.close();
  }

}
