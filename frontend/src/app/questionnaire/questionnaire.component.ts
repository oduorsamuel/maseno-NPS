import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  json: JSON;

  constructor(private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.httpService.getSurveys().subscribe(
      (response: Response) => {
        this.json = response.json().survey;
      });
  }

  onSurveyDone(response) {
    const date = new Date().toISOString().slice(0, 10);

    this.route.params.subscribe((params) => {
      const encounterInfo = {
        'departmentId': params.location,
        'date': date,
        'semester': 1,
        'unitCode': 1,
        'yearOfStudy': 1,
        'programId': params.location,
      };
      const toServer = {
        'encounterInfo': encounterInfo,
        'responseInfo': response
      };
      this.httpService.storeSurveys(toServer).subscribe();

    });

    this.router.navigate(['../success'],
                         { relativeTo: this.route }
                        );
  }

}
