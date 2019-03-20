import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Attributes} from '../response';
import {Router} from '@angular/router'

@Component({
  selector: 'app-admin-unit',
  templateUrl: './admin-unit.component.html',
  styleUrls: ['./admin-unit.component.css']
})
export class AdminUnitComponent implements OnInit {
  public units;
  public departments;
  public programs;
  showAlert=false;
  model={department:'', program:'', year:'', unitCode:'',unitName:'',programId:''}
  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit() {
    this.getUnits();
    this.getDepartment();
    this.getPrograms();
  }

  addUnit(){
    this.adminservice.addUnit(this.model).subscribe(
      (units)=>{
       if(units!=null)
       console.log(units);
       this.showAlert=true
       this.router.navigate(['/listUnits'])
       },
       function (error){console.log("error"+error)},
       function(){console.log("subscription done")}
    );
  }

getUnits(){
  return this.adminservice.getUnits().subscribe((results)=>{
    this.units=results.json();
  })
}

getPrograms(){
  return this.adminservice.getPrograms().subscribe((results)=>{
    this.programs=results.json();
  })
}

getDepartment(){
  return this.adminservice.getDepartments().subscribe((results)=>{
    this.departments=results.json();
  })
}

deleteUnit(unitCode){
  return this.adminservice.deleteUnit(unitCode).subscribe(()=>{
    this.getUnits();
  })
}

}
