import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
locationArray: {'uuid': string, 'name': string}[];

  constructor(private router: Router,
    private httpService: HttpService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.httpService.getLocations().subscribe(
      (response: Response) => {
        this.locationArray = response.json();
      });
  }
  onSave(location) {
    const surveyId = 1;
    if (location !== 'Select Program') {
      let uuid;
      for (const loc of this.locationArray) {
        if (loc.name === location) {
          uuid = loc.uuid;
        }
      }
      this.router.navigate([uuid + '/survey/' + surveyId + '/welcome'], { relativeTo: this.route });
    }
  }

}
