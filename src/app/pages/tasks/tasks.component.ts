/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Task page.
===========================================*/

import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { EditTasksComponent } from "../../edit-tasks/edit-tasks.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private empId;
  private loginUrl;
  private todoTasks: Object[] = [];
  private doneTasks: Object[] = [];

  constructor(
    private cookieService: CookieService,
    private http: HttpClient) { }

  // Build on load
  ngOnInit(): void {
    // Get employee ID from cookie and build task request URL
    this.empId = this.cookieService.get('session_user');
    this.loginUrl = 'http://localhost:3000/api/employees/' + this.empId + '/tasks';

    // Request all the tasks for the employee
    this.http.get<{message: string}>(this.loginUrl)
      .subscribe(
        employee => {
          this.todoTasks = employee.todo;
          this.doneTasks = employee.done;
        },
        err => {
          console.log(err);
        }
      );

  }

  // Edit/Create modal window
  showDialog(_id: string): void {
    console.log(_id);

  }

  // Delete task
  onDelete(_id: string): void {
    console.log(_id);
  }

  // Drag&Drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
