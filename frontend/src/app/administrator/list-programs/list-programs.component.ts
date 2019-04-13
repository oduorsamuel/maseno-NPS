import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Programs } from '../response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-programs',
  templateUrl: './list-programs.component.html',
  styleUrls: ['./list-programs.component.css']
})
export class ListProgramsComponent implements OnInit {
  public programs;

  constructor(private adminservice: AdminService, private router: Router) { }

  ngOnInit() {
    this.getPrograms();
  }
  getPrograms() {
    return this.adminservice.getPrograms().subscribe((result) => {
      this.programs = result.json();
    })
  }

  deleteProgram(programId) {
    if (confirm("Are you sure you want to delete program with Id " + programId)) {
      return this.adminservice.deleteProgram(programId).subscribe(() => {
        this.getPrograms();
      })
    }

  }

}
