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
  showAlert=false;
  model = {programId:'', programName:''}
  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit() {
  }
  addProgram(){
    this.adminservice.addProgram(this.model).subscribe(
      (Programs)=>{
       if(Programs!=null)
       console.log(Programs);
       this.showAlert=true
       },
       function (error){console.log("error"+error)},
       function(){console.log("subscription done")}
    );

}

}
