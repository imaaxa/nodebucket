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
    private http: HttpClient,
    private router: Router
  ) { }

  // Retreive tasks on load
  ngOnInit(): void {
    // Reteive tasks for service instance
    this.taskService.getTasks('todo');
    this.taskService.getTaskUpdateListener('todo').subscribe((tasks: Task[]) => {
      this.todoTasks = tasks;
    });

    this.taskService.getTasks('done');
    this.taskService.getTaskUpdateListener('done').subscribe((tasks: Task[]) => {
      this.doneTasks = tasks;
    });
  }

  // Edit/Create modal window
  showDialog(_id: string): void {
    console.log(_id);
  }

  // Delete task
  onDelete(_id: string): void {
    console.log(_id);
  }

  // Update the task arrays in DB
  onPut(): void {
  }

  onTaskCreated(task) {
    this.todoTasks.push(task);
  }

  // Drag&Drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
