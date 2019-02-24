import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { SuccessComponent } from './success/success.component';
import {DepartmentComponent} from './department/department.component';
import {AdminDepartmentComponent} from './administrator/admin-department/admin-department.component'
import { ProgramComponent } from './program/program.component';
import { AdminUnitComponent } from './administrator/admin-unit/admin-unit.component';
import { AdminProgramComponent } from './administrator/admin-program/admin-program.component';
import { DashboardComponent } from './administrator/dashboard/dashboard.component';

const appRoutes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'department',
    component: DepartmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'department/:location/program',
    component: ProgramComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department/:location/program/:location/survey/:surveyId/welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department/:location/program/:location/survey/:surveyId/start',
    component: QuestionnaireComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department/:location/program/:location/survey/:surveyId/success',
    component: SuccessComponent
  },

  {
    path: 'admindepartment',
    component: AdminDepartmentComponent,
    
  },
  {
    path: 'adminUnit',
    component: AdminUnitComponent,
    
  },
  {
    path: 'adminProgram',
    component: AdminProgramComponent,
    
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
    
  },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [

  ]
})
export class AppRoutingModule { }
