import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';


@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onSave(semester) {
    const surveyId = 1;
    if (semester !== 'Select semester') {
      this.router.navigate([semester + '/unit'], { relativeTo: this.route });
    }
  }

}

