import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';


@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }
  onSave(year) {
    if (year !== 'Select Year of Study') {
      this.router.navigate([year + '/semester'], { relativeTo: this.route });
    }
  }

}
