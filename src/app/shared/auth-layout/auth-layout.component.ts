/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Web 450 Capstone Project.
===========================================*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {
  private _loginUrl = 'http://localhost:3000/api/employees/login/';

  constructor( private http: HttpClient, private cookie: CookieService ) { }

  ngOnInit() { }

  onLogin(form: NgForm) {
    const value = form.value;
    console.log(value);

    // Call API with form data
    //const userToken = this.http.post<string>(this._loginUrl, this.loginForm.value);

    // Get API responce
    //this.cookie.set('userId', this.loginForm.value.employeeId);
    //this.cookie.set('userToken', '123456');
  }
}
