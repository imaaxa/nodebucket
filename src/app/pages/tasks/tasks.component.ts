/*============================================;
Title: Node Bucket
Author: Prof R. Krasso
Date:  March 2020;
Modified By: Cory Gilliam
Description: Task page.
===========================================*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatDialog } from '@angular/material/dialog';

import { Task } from "../task.model";
import { EditTasksComponent } from '../edit-tasks/edit-tasks.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  // Guard data
  private empId = this.cookieService.get('userID');
  private apiUrl = 'http://localhost:3000/api/employees/';
  private opts = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('session_user')
    })
  };

  private todoTasks: Task[] = [];
  private doneTasks: Task[] = [];

  constructor(
      private cookieService: CookieService,
      private http: HttpClient,
      private dialog: MatDialog
    ) {
    this.http.get<{ empId: string, todo: Task[], done: Task[] }>(this.apiUrl + this.empId + '/tasks', this.opts)
      .subscribe(res => {
        this.todoTasks = res.todo;
        this.doneTasks = res.done;
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  // Initial load
  ngOnInit() {}

  // Open the create new task modal
  openDialog() {
    const dialogRef = this.dialog.open(EditTasksComponent, {
      disableClose: true,
      autoFocus: true
    });

    // Save the new task if form has data
    dialogRef.afterClosed()
      .subscribe(data => {
        console.log('Create task data: ' + data);

        if (data) {
          this.http.post<{ todo: Task[], done: Task[] }>(
            this.apiUrl + this.empId + '/tasks',
            { title: data.titleValue, text: data.textValue},
            this.opts
          ).subscribe(employee => {
            this.todoTasks = employee.todo;
            this.doneTasks = employee.done;
          }, err => {
            console.log(err);

          });
        }
      });
  }

  // Remove if not able to get working
  // Edit/Create modal window
  openEditDialog(taskId) {
    const dialogRef = this.dialog.open(EditTasksComponent, {});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // Delete task
  onTaskDelete(taskId: string) {
    if (taskId) {
      console.log('Removing task: ' + taskId);
      this.http.delete<{todo: Task[], done: Task[]}>(
          this.apiUrl + this.empId + '/tasks/' + taskId,
          this.opts
        ).subscribe(res => {
          this.todoTasks = res.todo;
          this.doneTasks = res.done;
        }, err => {
          console.log(err);
        });
    }
  }

  // Drag and Drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.updateTasks(this.todoTasks, this.doneTasks)
        .subscribe(res => {
          this.todoTasks = res.todo;
          this.doneTasks = res.done;
        }, err => {
          console.log(`Error saving update tasks: ${err}`);
        });
      console.log('Moved task with in existing column');
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.updateTasks(this.todoTasks, this.doneTasks)
        .subscribe(res => {
          this.todoTasks = res.todo;
          this.doneTasks = res.done;
        }, err => {
          console.log(`Error saving update tasks: ${err}`);
        });
      console.log('Moved tasks to a new column');
    }
  }

  // Update tasks
  updateTasks(todo: Task[], done: Task[]) {
    return this.http.put<{todo: Task[], done: Task[]}>(
      this.apiUrl + this.empId + '/tasks',
      {todo, done},
      this.opts
    );
  }
}
