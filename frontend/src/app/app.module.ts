import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { LoginComponent } from './login/login.component';

import { HttpService } from './http.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { SuccessComponent } from './success/success.component';
import { ReactiveFormsModule} from '@angular/forms';
import { ProgramComponent } from './program/program.component';
import { UnitComponent } from './unit/unit.component';
import { DepartmentComponent } from './department/department.component';
import { AdminDepartmentComponent } from './administrator/admin-department/admin-department.component';
import { AdminProgramComponent } from './administrator/admin-program/admin-program.component';
import { AdminUnitComponent } from './administrator/admin-unit/admin-unit.component';
import { AdminService } from './administrator/admin.service';
import { DashboardComponent } from './administrator/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    QuestionnaireComponent,
    LoginComponent,
    WelcomeComponent,
    SuccessComponent,
    ProgramComponent,
    UnitComponent,
    DepartmentComponent,
    AdminDepartmentComponent,
    AdminProgramComponent,
    AdminUnitComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [HttpService, AuthGuard,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
