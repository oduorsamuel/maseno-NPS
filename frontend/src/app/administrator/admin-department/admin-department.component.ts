import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service'
import {Departments} from '../response'
import { Router } from '@angular/router';
import {Response} from '@angular/http'

@Component({
  selector: 'app-admin-department',
  templateUrl: './admin-department.component.html',
  styleUrls: ['./admin-department.component.css']
})
export class AdminDepartmentComponent implements OnInit {
public departments;
showAlert = false;
model={departmentId:'', departmentName:'',}

  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit() {
    this.getDepartments();
  }

  addDepartment(){
    this.adminservice.addDepartment(this.model).subscribe(
      (departments)=>{
       if(departments!=null)
       console.log(departments);
       this.showAlert = true;
       },
       function (error){console.log("error"+error)},
       function(){console.log("subscription done")}
    );

}

getDepartments(){
  return this.adminservice.getDepartments().subscribe((results:Response)=>{
    this.departments=results.json()
  })
}

deleteDepartment(departmentId){
  return this.adminservice.deleteDepartment(departmentId).subscribe(()=>{
  this.getDepartments()
  })
}

}
