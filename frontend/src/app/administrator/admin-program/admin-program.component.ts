import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {Programs} from '../response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-program',
  templateUrl: './admin-program.component.html',
  styleUrls: ['./admin-program.component.css']
})
export class AdminProgramComponent implements OnInit {
  model = {programId:'', programName:'',departmentId:''}
  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit() {
  }
  addProgram(){
    this.adminservice.addProgram(this.model).subscribe(
      (data:Programs)=>{
       if(data!=null)
       console.log(data);
       this.router.navigate(['/update']);
       },
       function (error){console.log("error"+error)},
       function(){console.log("subscription done")}
    );

}

}
