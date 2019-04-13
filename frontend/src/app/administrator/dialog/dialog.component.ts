
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

 constructor(private route:Router, public thisDialogRef:MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data:String) { }

  ngOnInit() {
  }
onCloseConfirm(){
  this.thisDialogRef.close('The dialog has been closed');
}
onCloseCancel(){
  this.thisDialogRef.close('The dialog has been canceled');
}
}
