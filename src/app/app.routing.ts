/*============================================;
Title: Node Bucket
Author: Cory Gilliam
Date:  March 2020;
Modified By:
Description: Handles Angular application routing.
===========================================*/

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';

export const AppRoutes: Routes = [
  {
    path: '', component: BaseLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'login', component: AuthLayoutComponent },
    ]
  }
];
