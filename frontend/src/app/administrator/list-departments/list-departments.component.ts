import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service'
import {Departments} from '../response'
import { Router } from '@angular/router';
import {Response} from '@angular/http';

@Component({
  selector: 'app-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit {
  public departments;

  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit() {
    this.getDepartments();
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
