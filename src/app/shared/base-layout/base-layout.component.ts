/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Base app layout component.
===========================================*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();
  sessionUser = this.cookieService.get('session_user');

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }

  logoutUser() {
    this.sessionUser = null;
    this.cookieService.delete('session_user');
    this.router.navigate(['/']);
  }

}
