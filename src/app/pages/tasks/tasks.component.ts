/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Web 450 Capstone Project.
===========================================*/

import { Component, OnInit, Inject } from '@angular/core';

import { EditTasksComponent } from "../../edit-tasks/edit-tasks.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  todoTasks = [
    { _id: "5e70fc6050826e2465ba3314", text: "Second created task." },
    { _id: "5e720eb4b63cf645968a82ea", text: "First created task." }
  ];
  doneTasks = [];

  constructor() { }

  ngOnInit(): void {

  }

  showDialog(): void {
    console.log('Dialog open event.');

  }

}
