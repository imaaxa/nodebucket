/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Task page.
===========================================*/

import { Component, OnInit, Inject, OnDestroy }  from '@angular/core';
import { CookieService }              from 'ngx-cookie-service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders }    from "@angular/common/http";
import { MatDialog } from '@angular/material/dialog';
import { Router }                     from "@angular/router";
import { Subscription, from }         from "rxjs";

import { TaskService }        from "../tasks.services";
import { Task }               from "../task.model";
import { EditTasksComponent } from '../edit-tasks/edit-tasks.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private taskSub: Subscription;

  todoTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(
    public taskService: TaskService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router
  ) { }

  // Retreive tasks on load
  ngOnInit(): void {
    // Reteive tasks for service instance
    this.taskService.getTasks();
    this.taskService.getTaskUpdateListener('todo').subscribe(tasks => {
      this.todoTasks = tasks;
    });

    this.taskService.getTasks();
    this.taskService.getTaskUpdateListener('done').subscribe(tasks => {
      this.doneTasks = tasks;
    });
  }

  // Open the create ne task modal
  openDialog(): void {
    const dialogRef = this.dialog.open(EditTasksComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Edit/Create modal window
  openEditDialog(taskId): void {
    const dialogRef = this.dialog.open(EditTasksComponent, {
      data: {
        taskId: taskId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // Delete task
  onTaskDelete(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }

  // Drag&Drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray( event.container.data, event.previousIndex, event.currentIndex);

      // Update the Database with the change
      this.taskService.updateTasks(this.todoTasks, this.doneTasks);
      console.log('Column to sort order was done');
    } else {
      transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      // Update the Database with the change
      this.taskService.updateTasks(this.todoTasks, this.doneTasks);
      console.log('Column to column was done');

    }
  }
}
