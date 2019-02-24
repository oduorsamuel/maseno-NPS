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
 locationArray: {'uuid': string, 'name': string}[];

  constructor(private router: Router,
    private httpService: HttpService,
    private route: ActivatedRoute) { }

    onSave(location) {
      if (location !== 'Select Department') {
        let uuid;
        for (const loc of this.locationArray) {
          if (loc.name === location) {
            uuid = loc.uuid;
          }
        }
        this.router.navigate([uuid + '/program'], { relativeTo: this.route });
      }
    }

  ngOnInit() {
    this.httpService.getLocations().subscribe(
      (response: Response) => {
        this.locationArray = response.json();
      });
  }

}
