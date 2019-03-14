import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../http.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  public comments;
  chart=[]

  constructor(private httpservice:HttpService) { }

  ngOnInit() {
    this.getAnswers();
  }
getAnswers(){
  return this.httpservice.getAnswers().subscribe((result)=>{
    var res=result.json();
    console.log(res);
    var response={
      lab:[],
      comment:[]
    }
    for(var i=0; i<res.length; i++){
      var obj=res[i]
      if(obj.question==="lab"){
        response.lab.push(obj.answer);
      }
      if(obj.question==="labc"){
        response.comment.push(obj.answer)
      }
    }
    this.comments=response.comment;
    console.log(this.comments);
    console.log(response);


    var lab_response=response.lab;
    var lab_response_count=lab_response.length;
    console.log(lab_response_count)


     var filter={
      promoters:[],
      detractors:[]
    }

    var l=lab_response.map(Number);
    l.forEach(function(number){
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

    var nps=difference*100/lab_response_count;
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
