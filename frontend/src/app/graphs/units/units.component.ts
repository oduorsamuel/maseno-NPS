import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  unitCode="CIT 101";
  chart=[]
  public comments;

  constructor(private httpservice: HttpService) { }

  ngOnInit() {
    this.getUnits(this.unitCode)
  }

  getUnits(unitCode:any){
    return this.httpservice.getSearch(unitCode).subscribe((result)=>{
      var response=result.json();
      console.log(response);

      //manipulating Json Data from HttpService
      var filter={
        unit:[],
        comment:[],
        date:[],
      }
      for(var i=0; i<response.length; i++){
        var obj= response[i]
        if(obj.question==="unit"){
          filter.unit.push(obj.answer);
          filter.date.push(obj.date);
        }
        if(obj.question==="unit comment"){
          filter.comment.push(obj.answer)
        }
      }
      this.comments=filter.comment;
      console.log(this.comments);
      console.log(filter);

      //counting total number of student who participated in the survey
      var number_of_respondents=filter.unit.length;
      console.log(number_of_respondents);

     //separating promoters from detractors
      var category_of_respondents={
        promoters:[],
        detractors:[]
      }
      var l=filter.unit;
      l.forEach(function(number){
        if(number<7){
          category_of_respondents.detractors.push(number);
        }
        if(number>8){
          category_of_respondents.promoters.push(number);
        }
      });
      console.log(category_of_respondents);

      //culculating net Promoter score
      var promoters_count=category_of_respondents.promoters.length;
      var detractors_count=category_of_respondents.detractors.length;
      var difference=promoters_count-detractors_count;
      console.log(difference);
  
      var nps=difference*100/number_of_respondents;
      console.log(nps);

      //drawing Graph
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
              tricks:{
                beginAtZero:true,
              },
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
    
    }
    
    }
  
