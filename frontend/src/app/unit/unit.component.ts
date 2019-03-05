import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  unitArray: {'unitCode': string, 'unitName': string}[];

  constructor(private router: Router,
    private httpService: HttpService,
    private route: ActivatedRoute) { }

  ngOnInit() {
  this.getUnits();
  }

  getUnits(){
    return this.httpService.getUnits().subscribe((response : Response)=>{
    this.unitArray=response.json();
    })
  }
  onSave(unit) {
     let surveyId=1
    if (unit !== 'Select Unit') {
      let unitCode;
      for (const loc of this.unitArray) {
        if (loc.unitName === unit) {
          unitCode = loc.unitCode;
        }
      }
      this.router.navigate([unitCode + '/survey/' + surveyId + '/welcome'], { relativeTo: this.route });
      // this.router.navigate([uuid + '/survey/' + surveyId + '/welcome'], { relativeTo: this.route });
    }
  }

}

