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
import { YearComponent } from './year/year.component';
import { SemesterComponent } from './semester/semester.component';
import { UnitComponent } from './unit/unit.component';
import { AdminLoginComponent } from './administrator/admin-login/admin-login.component';
import { SchoolComponent } from './graphs/school/school.component';
import { LabComponent } from './graphs/lab/lab.component';
import { ClassroomComponent } from './graphs/classroom/classroom.component';
import { UnitsComponent } from './graphs/units/units.component';
import { ListUnitsComponent } from './administrator/list-units/list-units.component';
import { ListProgramsComponent } from './administrator/list-programs/list-programs.component';
import { ListDepartmentsComponent } from './administrator/list-departments/list-departments.component';

const appRoutes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminLoginComponent
  },
  {
    path: 'department',
    component: DepartmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'department/:departmentId/program',
    component: ProgramComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department/:department/program/:program/year',
    component: YearComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department/:department/program/:program/year/:year/semester',
    component: SemesterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department/:department/program/:program/year/:year/semester/:semester/unit',
    component: UnitComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department/:department/program/:program/year/:year/semester/:semester/unit/:unit/survey/:surveyId/welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department/:department/program/:program/year/:year/semester/:semester/unit/:unit/survey/:surveyId/start',
    component: QuestionnaireComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department/:department/program/:program/year/:year/semester/:semester/unit/:unit/survey/:surveyId/success',
    component: SuccessComponent
  },

  {
    path: 'admindepartment',
    component: AdminDepartmentComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'adminUnit',
    component: AdminUnitComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'adminProgram',
    component: AdminProgramComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
    
  },

  {
    path: 'school',
    component: SchoolComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'lab',
    component: LabComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'classroom',
    component: ClassroomComponent,
    canActivate: [AuthGuard]
    
  },

  {
    path: 'units',
    component: UnitsComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'listUnits',
    component: ListUnitsComponent,
    canActivate: [AuthGuard]
    
  },

  {
    path: 'listUnits',
    component: ListUnitsComponent,
    canActivate: [AuthGuard]
    
  }, 
   {
    path: 'listPrograms',
    component: ListProgramsComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'listDepartments',
    component: ListDepartmentsComponent,
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
