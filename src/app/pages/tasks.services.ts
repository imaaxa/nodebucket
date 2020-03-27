/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Task service.
===========================================*/

import { CookieService }  from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable }     from '@angular/core';
import { Subject }        from 'rxjs';

import { Task }               from './task.model';

@Injectable({providedIn: 'root'})
export class TaskService {
  private todoTasksUpdated = new Subject<Task[]>();
  private doneTasksUpdated = new Subject<Task[]>();
  private todoTasks: Task[] = [];
  private doneTasks: Task[] = [];
  private empId = this.cookieService.get('userID');
  private apiUrl = 'http://localhost:3000/api/employees/';
  private opts = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('session_user')
    })
  };

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) {}

  // Get the todo/done task arrays
  getTasks() {
    this.http.get<{ empId: string, todo: Task[], done: Task[] }>(this.apiUrl + this.empId + '/tasks', this.opts)
      .subscribe((tasksData) => {
        this.todoTasks = tasksData.todo;
        this.doneTasks = tasksData.done;
        this.todoTasksUpdated.next([...this.todoTasks]);
        this.doneTasksUpdated.next([...this.doneTasks]);
      });
  }

  // Update any listeners of a change of data
  getTaskUpdateListener(list: string) {
    if (list === 'todo') {
      return this.todoTasksUpdated.asObservable();
    } else if (list === 'done') {
      return this.doneTasksUpdated.asObservable();
    }
  }

  // Add a new task to the todo Database and update todo array
  addTask(_id: string, title: string, text: string) {
    const task: Task = { _id: _id, title: title, text: text };
    const postUrl = this.apiUrl + this.empId + '/tasks';

    this.http
      .post<{ message: string }>(postUrl, task, this.opts)
      .subscribe(responseDate => {
        console.log(responseDate.message);

        const task: Task = { _id: null, title: title, text: text };
        this.todoTasks.push(task);
        this.todoTasksUpdated.next([...this.todoTasks]);
      });
  }

  // Delete a task from the Database and update the todo/done arrays
  deleteTask(taskId: string) {
    console.log(`${this.apiUrl}${this.empId}/tasks/${taskId}`);

    this.http
      .delete(
        `${this.apiUrl}${this.empId}/tasks/${taskId}`,
        this.opts
      )
      .subscribe(res => {
        this.getTasks();
      }, err => {
        console.log(err);
      })
  }
}
