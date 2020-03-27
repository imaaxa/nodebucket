/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Angular module declarations.
===========================================*/

import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { BrowserModule }                    from '@angular/platform-browser';
import { CookieService }                    from 'ngx-cookie-service';
import { DragDropModule }                   from '@angular/cdk/drag-drop';
import { FlexLayoutModule }                 from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient }     from '@angular/common/http';
import { MatButtonModule }                  from '@angular/material/button';
import { MatCardModule }                    from '@angular/material/card';
import { MatDialogModule }                  from '@angular/material/dialog';
import { MatExpansionModule }               from '@angular/material/expansion';
import { MatFormFieldModule }               from '@angular/material/form-field';
import { MatIcon }                          from '@angular/material/icon';
import { MatIconModule }                    from '@angular/material/icon';
import { MatInputModule }                   from '@angular/material/input';
import { MatSnackBar }                      from '@angular/material/snack-bar';
import { MatToolbarModule }                 from '@angular/material/toolbar';
import { MatTooltipModule }                 from '@angular/material/tooltip';
import { NgModule }                         from '@angular/core';
import { RouterModule}                      from '@angular/router';

import { AboutComponent }      from './pages/about/about.component';
import { AppComponent }        from './app.component';
import { AppRoutes }           from './app.routing';
import { AuthGuard }           from './auth.guard';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { EditTasksComponent }  from './pages/edit-tasks/edit-tasks.component';
import { HomeComponent }       from './pages/home/home.component';
import { MissingComponent }    from './pages/missing/missing.component';
import { TasksComponent }      from './pages/tasks/tasks.component';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    EditTasksComponent,
    HomeComponent,
    MissingComponent,
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
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
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
