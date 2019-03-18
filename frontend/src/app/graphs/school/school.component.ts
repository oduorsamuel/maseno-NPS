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
    return this.httpservice.getEncounters().subscribe((result)=>{
      var school=result.json();
      console.log(school);
      var response={
        school:[],
        date:[]
      }
      for(var i=0; i<school.length; i++){
        var obj= school[i];
        if(obj.question==="school"){
          response.school.push(obj.answer);
          response.date.push(obj.date);
        }
      }
      console.log(response);
      var total_response=response.school.length;
      var s=response.school;

      var filter={
        detractors:[],
        promoters:[]
      }
      s.forEach(function(number){
        if(number<7){
          filter.detractors.push(number);
        }
        if(number>8){
          filter.promoters.push(number);
        }
      });
      console.log(filter);

        
      var promoters_count=filter.promoters.length;
      var detractors_count=filter.detractors.length;
      var difference=promoters_count-detractors_count;
      console.log(difference);
  
      var nps=difference*100/total_response;
      console.log(nps);
      this.chart= new Chart ('canvas',{
        type:'bar',
        data:{
          labels:[2019,2020],
          datasets:[
            {
            data:[nps,0],
            label:'score%',
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
  