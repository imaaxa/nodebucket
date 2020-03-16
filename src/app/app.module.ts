/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Web 450 Capstone Project.
===========================================*/

import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { RouterModule}      from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule }  from '@angular/material/button';
import { MatIconModule }    from '@angular/material/icon';
import { CookieService }    from 'ngx-cookie-service';
import { HttpClientModule, HttpClient }     from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutes }               from './app.routing';
import { AppComponent }            from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseLayoutComponent }     from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent }     from './shared/auth-layout/auth-layout.component';
import { HomeComponent }           from './pages/home/home.component';
import { AboutComponent }          from './pages/about/about.component';
import { TasksComponent }          from './pages/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    AboutComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      AppRoutes,
      {
        useHash: true,
        enableTracing: false,
        scrollPositionRestoration: 'enabled'
      }
    ),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule

  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
