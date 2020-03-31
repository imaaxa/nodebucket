/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: App login component.
===========================================*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {
  private _loginUrl = '/api/employees/login/';
  form: FormGroup;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {}

  onLogin(form: NgForm) {
    const empId = form.value.employeeId;

    // Call API with form data
    this.http.get<{message: string, token: string}>(this._loginUrl + empId)
      .subscribe(
        res => {
          if (res) {
            console.log(res);

            //this.cookieService.set('session_user', empId);
            this.cookieService.set('session_user', res.token);
            this.cookieService.set('userID', empId);
            this.router.navigate(['/tasks']);
          } else {
            this.snackBar.open(
              'The eployee ID you entered is invalid, please try again',
              'ERROR',
              {
                duration: 2000,
                verticalPosition: 'top'
              }
            );
          }
        }
      );
  }
}
