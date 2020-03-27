/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Create/Edit Task page.
===========================================*/

import { CookieService }      from 'ngx-cookie-service';
import { Component, OnInit }  from '@angular/core';
import { HttpClient }         from "@angular/common/http";
import { MatInputModule }     from "@angular/material/input";
import { MatCardModule }      from "@angular/material/card";
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

  constructor(public taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  onCancel(form: NgForm) {
    this.router.navigate(['/tasks']);
  }

  // Create/Update task on Save button click
  onSave(form: NgForm) {
    // Send the form data to the task Service and reset form
    this.taskService.addTask(null, form.value.titleValue, form.value.textValue);
    form.resetForm();

    // Redirect to task page
    this.router.navigate(['/tasks']);
  }

}
