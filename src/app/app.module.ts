import { AuthGuard } from './auth.guard';
/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Angular module declarations.
===========================================*/

import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { RouterModule}      from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule }  from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon }          from '@angular/material/icon';
import { MatIconModule }    from '@angular/material/icon';
import { MatInputModule }   from "@angular/material/input";
import { MatSnackBar }   from "@angular/material/snack-bar";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService }    from 'ngx-cookie-service';
import { HttpClientModule, HttpClient }     from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppRoutes }               from './app.routing';
import { AppComponent }            from './app.component';
import { BaseLayoutComponent }     from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent }     from './shared/auth-layout/auth-layout.component';
import { HomeComponent }           from './pages/home/home.component';
import { AboutComponent }          from './pages/about/about.component';
import { TasksComponent }          from './pages/tasks/tasks.component';
import { EditTasksComponent }      from './edit-tasks/edit-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    AboutComponent,
    TasksComponent,
    EditTasksComponent
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
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    DragDropModule
  ],
  providers: [
    AuthGuard,
    CookieService,
    MatSnackBar
  ],
  entryComponents: [EditTasksComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
