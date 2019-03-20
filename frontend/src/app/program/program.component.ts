import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
programArray: {'programId': string, 'programName': string}[];
public departmentId;

  constructor(private router: Router,
    private httpService: HttpService,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.params.subscribe(response=>{
        this.departmentId=response.departmentId;
       })
       this.getPrograms(this.departmentId);
      console.log(this.departmentId)
     }
  onSave(program) {
    if (program !== 'Select program') {
      let programId;
      for (const loc of this.programArray) {
        if (loc.programName === program) {
          programId = loc.programId;
        }
      }
      this.router.navigate([programId + '/year'], { relativeTo: this.route });
      // this.router.navigate([programId + '/survey/' + surveyId + '/welcome'], { relativeTo: this.route });
    }
  }

  getPrograms(departmentId){
    return this.httpService.filterPrograms(departmentId).subscribe((response: Response)=>{
         this.programArray=response.json();
    })
  }

}
