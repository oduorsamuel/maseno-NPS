import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
public school;
public count;

  constructor(private httpservice:HttpService, private router:Router) { }

  ngOnInit() {
    this.getSchool();
  }

  getSchool(){
    return this.httpservice.getSchool().subscribe((result)=>{
     this.school=result.json();
     console.log(this.school);
     this.count=this.school.length;
     console.log(this.count)
     var cord={
      detractor:[],
      promoters:[]
    }
    for (var i = 0; i < this.school.length; i++) {
      var obj=this.school[i]
      if(obj.answer<7){
        cord.detractor.push(obj.answer);
      };
      if(obj.answer>8){
        cord.promoters.push(obj.answer);
      }
      
    }
    console.log(cord);
    
    })
  }

}
