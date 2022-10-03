import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from 'src/app/models/confirm-dialog-data';

@Component({
  selector: 'app-comfirm-delete',
  templateUrl: './comfirm-delete.component.html',
  styleUrls: ['./comfirm-delete.component.scss']
})
export class ComfirmDeleteComponent implements OnInit {

  public message: string = "Are you sure you want to delete this post?"
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

  ngOnInit(): void {
  }
  
  deletePost(){

  }
}
