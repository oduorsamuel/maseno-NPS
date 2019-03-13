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
  showAlert=false;
  model={unitCode:'',unitName:'',programId:''}
  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit() {
    this.getUnits();
  }

  addUnit(){
    this.adminservice.addUnit(this.model).subscribe(
      (units)=>{
       if(units!=null)
       console.log(units);
       this.showAlert=true
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

deleteUnit(unitCode){
  return this.adminservice.deleteUnit(unitCode).subscribe(()=>{
    this.getUnits();
  })
}

}
