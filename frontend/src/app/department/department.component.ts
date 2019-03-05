import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
 departmentArray: {'departmentId': string, 'departmentName': string}[];

  constructor(private router: Router,
    private httpService: HttpService,
    private route: ActivatedRoute) { }

    onSave(department) {
      if (department !== 'Select Department') {
        let departmentId;
        for (const loc of this.departmentArray) {
          if (loc.departmentName === department) {
            departmentId = loc.departmentId;
          }
        }
        this.router.navigate([departmentId + '/program'], { relativeTo: this.route });
      }
    }

  ngOnInit() {
      this.getDepartments();
  }
getDepartments(){
  return this.httpService.getDepartments().subscribe(
    (response:Response)=>{
      this.departmentArray=response.json();
    }
  )
}
}
