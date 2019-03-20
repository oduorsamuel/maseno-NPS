import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Attributes} from '../response';
import {Router} from '@angular/router'

@Component({
  selector: 'app-list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.css']
})
export class ListUnitsComponent implements OnInit {
  public units;

  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit() {
    this.getUnits();
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
