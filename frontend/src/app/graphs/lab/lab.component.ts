import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../http.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  chart=[]

  constructor(private httpservice:HttpService) { }

  ngOnInit() {
    this.getlab();
  }
getlab(){
  return this.httpservice.getLab().subscribe((result)=>{
  var lab=result.json();
  console.log(lab);
  var response_count=lab.length;
  console.log(response_count);
  var response={
    promoters:[],
    detractors:[]
  }
  for(var i=0; i<lab.length; i++){
    var obj=lab[i]
    if(obj.answer>8){
      response.promoters.push(obj.answer);
    }
    if(obj.answer<7){
      response.detractors.push(obj.answer)
    }
  }
  console.log(response)
  var p=response.promoters;
  var promoters_count=p.length;
  var d=response.detractors;
  var detractors_count=d.length;
  var response_difference=promoters_count-detractors_count;
  var nps=response_difference*100/response_count;
  // var nps=Math.trunc(percentage);
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

