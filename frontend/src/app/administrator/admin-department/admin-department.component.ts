import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service'
import {Departments} from '../response'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-department',
  templateUrl: './admin-department.component.html',
  styleUrls: ['./admin-department.component.css']
})
export class AdminDepartmentComponent implements OnInit {
model={departmentId:'', departmentName:'',}

  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit() {
  }

  addDepartment(){
    this.adminservice.addDepartment(this.model).subscribe(
      (data:Departments)=>{
       if(data!=null)
       console.log(data);
       this.router.navigate(['/update']);
       },
       function (error){console.log("error"+error)},
       function(){console.log("subscription done")}
    );

}

}
