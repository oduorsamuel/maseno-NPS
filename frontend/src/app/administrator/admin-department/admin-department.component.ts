import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'
import { Departments } from '../response'
import { Router } from '@angular/router';
import { Response } from '@angular/http'

@Component({
  selector: 'app-admin-department',
  templateUrl: './admin-department.component.html',
  styleUrls: ['./admin-department.component.css']
})
export class AdminDepartmentComponent implements OnInit {
  public departments;
  showAlert = false;
  serverErrorMessages: boolean;
  model = { departmentId: '', departmentName: '', }
  isplayedColumn = ['departmentId', 'departmentName', 'action']

  constructor(private adminservice: AdminService, private router: Router) { }

  ngOnInit() {
  }

  addDepartment() {
    this.adminservice.addDepartment(this.model).subscribe((res) => {
      if (res['_body'] === "ER_DUP_ENTRY") {

        this.serverErrorMessages = true;
        setTimeout(() => this.serverErrorMessages = false, 4000);
      }
      else {
        this.router.navigate(['../listDepartments'])
      }
      console.log(res);
    });

  }

}
