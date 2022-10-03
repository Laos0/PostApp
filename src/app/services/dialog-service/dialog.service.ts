import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogData } from 'src/app/models/confirm-dialog-data';
import { ComfirmDeleteComponent } from 'src/app/views/dialogs/comfirm-delete/comfirm-delete.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean>{
    return this.dialog.open(ComfirmDeleteComponent, {
      data,
      width: '400px',
      disableClose: true
    }).afterClosed();
  }
}
