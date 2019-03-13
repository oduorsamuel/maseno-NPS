import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import {Chart} from 'chart.js';
import {Router} from '@angular/router'

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  chart=[]

  constructor(private httpservice: HttpService, private router:Router) { }

  ngOnInit() {
    this.getClassrooms();
  }

  getClassrooms(){
    return this.httpservice.getClassroom().subscribe((result)=>{
      var classroom=result.json();
      console.log(classroom)
      var response_count=classroom.length;
      var response={
        promoters:[],
        detractors:[]
      }
      for(var i=0; i<classroom.length; i++){
        var obj= classroom[i];
        if(obj.answer<7){
          response.detractors.push(obj.answer);
        }
        if(obj.answer>8){
          response.promoters.push(obj.answer);
        }
      }
      console.log(response);
      var p=response.promoters;
      var d= response.detractors;
      var promoters_count=p.length;
      var detractor_count=d.length;
      var response_difference=promoters_count-detractor_count;
      var nps= response_difference*100/response_count;
      console.log(nps);
      this.chart= new Chart ('canvas',{
        type:'bar',
        data:{
          labels:[2019,2018],
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
    
    