import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: BaseLayoutComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
