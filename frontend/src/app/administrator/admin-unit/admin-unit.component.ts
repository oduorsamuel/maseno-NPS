import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Attributes } from '../response';
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin-unit',
  templateUrl: './admin-unit.component.html',
  styleUrls: ['./admin-unit.component.css']
})
export class AdminUnitComponent implements OnInit {
  public units;
  public departments;
  public programs;
  showAlert = false;
  model = { department: '', program: '', year: '', unitCode: '', unitName: '', programId: '' }
  showSucessMessage: boolean;
  serverErrorMessages: boolean;
  constructor(private adminservice: AdminService, private router: Router) { }

  ngOnInit() {
    this.getUnits();
    this.getDepartment();
    this.getPrograms();
  }

  addUnit() {
    this.adminservice.addUnit(this.model).subscribe((res) => {
      if (res['_body'] === "ER_DUP_ENTRY") {

        this.serverErrorMessages = true;
        setTimeout(() => this.serverErrorMessages = false, 4000);
      }
      else {
        this.router.navigate(['../listUnits'])
      }
      console.log(res);
    });
  }


  // addUnit() {
  //   this.adminservice.addUnit(this.model).subscribe(
  //     res => {
  //       this.showSucessMessage = true;
  //       setTimeout(() => this.showSucessMessage = false, 4000);
  //     },
  //     err => {
  //       if (err.status === 422) {
  //         this.serverErrorMessages = err.error.join('<br/>');
  //       }
  //       else
  //         this.serverErrorMessages = 'Something went wrong.Please contact admin.';
  //     }
  //   );
  // }

  getUnits() {
    return this.adminservice.getUnits().subscribe((results) => {
      this.units = results.json();
    })
  }

  getPrograms() {
    return this.adminservice.getPrograms().subscribe((results) => {
      this.programs = results.json();
    })
  }

  getDepartment() {
    return this.adminservice.getDepartments().subscribe((results) => {
      this.departments = results.json();
    })
  }

  deleteUnit(unitCode) {
    return this.adminservice.deleteUnit(unitCode).subscribe(() => {
      this.getUnits();
    })
  }

}
