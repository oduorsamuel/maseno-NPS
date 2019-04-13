import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import * as html2canvas from "html2canvas"
import { HttpService } from '../../http.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  public comments;
  chart = []
  public students;

  constructor(private httpservice: HttpService) { }

  ngOnInit() {
    this.getLab();
  }
  getLab() {
    return this.httpservice.getEncounters().subscribe((result) => {
      var lab = result.json();
      console.log(lab);
      var response = {
        lab: [],
        comment: [],
        date: [],
      }
      for (var i = 0; i < lab.length; i++) {
        var obj = lab[i]
        if (obj.question === "lab") {
          response.lab.push(obj.answer);
          response.date.push(obj.date);
        }
        if (obj.question === "labc") {
          response.comment.push(obj.answer)
        }
      }
      this.comments = response.comment;
      console.log(this.comments);
      console.log(response);


      var lab_response = response.lab;
      var lab_response_count = lab_response.length;
      this.students = lab_response_count;
      console.log(lab_response_count)


      var filter = {
        promoters: [],
        detractors: []
      }

      var l = lab_response.map(Number);
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

      var nps = difference * 100 / lab_response_count;
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
      pdf.save('lab_Report.pdf'); // Generated PDF   
    });
  }

}

