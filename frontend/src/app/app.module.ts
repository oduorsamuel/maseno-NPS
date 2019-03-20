import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule, MatNativeDateModule, MatFormFieldModule, MatInputModule,MatDialogModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatTooltipModule, MatMenuModule,MatSidenavModule, MatListModule } from '@angular/material';

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
import { YearComponent } from './year/year.component';
import { SemesterComponent } from './semester/semester.component';
import { SchoolComponent } from './graphs/school/school.component';
import { LabComponent } from './graphs/lab/lab.component';
import { AdminLoginComponent } from './administrator/admin-login/admin-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminNavComponent } from './administrator/admin-nav/admin-nav.component';
import { ClassroomComponent } from './graphs/classroom/classroom.component';
import { UnitsComponent } from './graphs/units/units.component';
import { ListUnitsComponent } from './administrator/list-units/list-units.component';
import { ListDepartmentsComponent } from './administrator/list-departments/list-departments.component';
import { ListProgramsComponent } from './administrator/list-programs/list-programs.component';



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
    YearComponent,
    SemesterComponent,
    SchoolComponent,
    LabComponent,
    AdminLoginComponent,
    NavbarComponent,
    AdminNavComponent,
    ClassroomComponent,
    UnitsComponent,
    ListUnitsComponent,
    ListDepartmentsComponent,
    ListProgramsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [HttpService, AuthGuard,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
