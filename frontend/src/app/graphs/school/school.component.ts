import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
chart= [];
public school;
public total_response;

  constructor(private httpservice:HttpService, private router:Router) { }

  ngOnInit() {
    this.getSchool();
  }

  getSchool(){
    return this.httpservice.getSchool().subscribe((result)=>{
     this.school=result.json();
     console.log(this.school);
     this.total_response=this.school.length;
     console.log(this.total_response)
     var response={
      detractors:[],
      promoters:[]
    }
    for (var i = 0; i < this.school.length; i++) {
      var obj=this.school[i]
      if(obj.answer<7){
        response.detractors.push(obj.answer);
      };
      if(obj.answer>8){
        response.promoters.push(obj.answer);
      }
      
    }
    var p=response.promoters
    var d=response.detractors
    var number_of_detractors=d.length;
    var number_of_promoters=p.length;
    console.log(number_of_promoters);
    console.log(number_of_detractors);
    var response_difference=number_of_promoters-number_of_detractors;
    console.log(response_difference);

    var percentage=response_difference*100/this.total_response;
    var nps = Math.trunc( percentage );
    console.log(nps);

    // Graphical representation of NPS
    this.chart= new Chart ('canvas',{
      type:'bar',
      data:{
        labels:[2018,2019],
        datasets:[
          {
          data:[nps],
          label:'score',
          borderColor:'#3aaa9f',
          backgroundColor:'#ff4081',
          fill: false
        }
      ]
      },
      options:{
        lagend:{
          display:false
        },
        scales:{
          xAxes:[{
            display:true,
            scaleLabel:{
              display:true,
            labelString:'Academic Year'
            }
          }],
          yAxes:[{
            display:true,
            scaleLabel:{
              display:true,
            labelString:'Net Promoter Score'
            }
            
          }],
        }
      }
      })
    })




    // var formatPromoters = p.map(Number);
    // var sum_of_promoters = formatPromoters.reduce(function(formatPromoters, b) { return formatPromoters + b; }, 0);
    //     var d=response.detractors
    //     var formatDetractors = d.map(Number);
    //     console.log(formatDetractors);
    //     var sum_of_detractors = formatDetractors.reduce(function(formatPromoters, b) { return formatPromoters + b; }, 0);
    //     console.log(sum_of_detractors);

  }

}
