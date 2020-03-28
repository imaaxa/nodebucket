/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Create/Edit Task page.
===========================================*/

import { Component, OnInit } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.css']
})
export class EditTasksComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditTasksComponent>) { }

  ngOnInit() {
  }

  // Cancel click handler
  onCancel() {
    // Close dialog modal
    this.dialogRef.close();
  }

  // Save click handler
  onSave(form: NgForm) {
    // Close dialog modal
    this.dialogRef.close(form.value);
  }

}
