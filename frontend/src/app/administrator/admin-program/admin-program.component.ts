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
  public programs;
  public departments;
  showAlert=false;
  model = {department:'',programId:'', programName:''}
  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit() {
    this.getPrograms();
    this.getDepartments();
  }
  addProgram(){
    this.adminservice.addProgram(this.model).subscribe(
      (Programs)=>{
       if(Programs!=null)
       console.log(Programs);
       this.showAlert=true
       this.router.navigate(['/listPrograms'])
       },
       function (error){console.log("error"+error)},
       function(){console.log("subscription done")}
    );

}
getPrograms(){
  return this.adminservice.getPrograms().subscribe((result)=>{
   this.programs=result.json();
  })
}

getDepartments(){
  return this.adminservice.getDepartments().subscribe((result)=>{
   this.departments=result.json();
  })
}

deleteprogram(programId){
  return this.adminservice.deleteProgram(programId).subscribe(()=>{
    this.getPrograms()
  })
}

}
