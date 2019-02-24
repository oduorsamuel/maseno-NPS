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
  model={unitCode:'',unitName:'',programId:''}
  constructor(private adminservice:AdminService, private router:Router) { }

  ngOnInit() {
  }

  addUnit(){
    this.adminservice.addUnit(this.model).subscribe(
      (data:Attributes)=>{
       if(data!=null)
       console.log(data);
       this.router.navigate(['/dashboard']);
       },
       function (error){console.log("error"+error)},
       function(){console.log("subscription done")}
    );
  }

}
