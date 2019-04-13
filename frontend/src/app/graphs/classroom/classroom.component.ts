
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import * as html2canvas from "html2canvas"
import { HttpService } from '../../http.service';
import { Chart } from 'chart.js';
import { Router } from '@angular/router'

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  chart = []
  public comments;
  public students;

  constructor(private httpservice: HttpService, private router: Router) { }

  ngOnInit() {
    this.getClassroom();
  }

  getClassroom() {
    return this.httpservice.getEncounters().subscribe((result) => {
      var classroom = result.json();
      console.log(classroom);
      var response = {
        classroom: [],
        comment: [],
        date: [],
      }
      for (var i = 0; i < classroom.length; i++) {
        var obj = classroom[i]
        if (obj.question === "classroom") {
          response.classroom.push(obj.answer);
          response.date.push(obj.date);
        }
        if (obj.question === "classroom comment") {
          response.comment.push(obj.answer)
        }
      }
      this.comments = response.comment;
      console.log(this.comments);
      console.log(response);


      var classroom_response = response.classroom;
      var classroom_response_count = classroom_response.length;
      this.students = classroom_response_count;
      console.log(classroom_response_count)


      var filter = {
        promoters: [],
        detractors: []
      }

      var l = classroom_response.map(Number);
      l.forEach(function (number) {
        if (number < 7) {
          filter.detractors.push(number);
        }
        if (number > 8) {
          filter.promoters.push(number);
        }
      });
      console.log(filter);


      var promoters_count = filter.promoters.length;
      var detractors_count = filter.detractors.length;
      var difference = promoters_count - detractors_count;
      console.log(difference);

      var nps = difference * 100 / classroom_response_count;
      console.log(nps);
      var score = Math.round(nps) + '%';

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: [2019, 2020],
          datasets: [
            {
              data: [nps, 0],
              label: [score],
              borderColor: '#3aaa9f',
              backgroundColor: '#ff4081',
              fill: false
            }
          ]
        },
        options: {
          lagend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true,
              tricks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Academic Year'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Net Promoter Score'
              }

            }],
          }
        }
      })
    })

  }

  public captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('lecture_Hall_Report.pdf'); // Generated PDF   
    });
  }

}

