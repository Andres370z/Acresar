import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalsOneComponent } from '../home/modals/modals-one/modals-one.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog: MatDialog
  ) { }


  openDialog() {
    console.log('Llamando a openDialog en ModalService');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30%';
    dialogConfig.disableClose = true;
    console.log('Llamando a openDialog en ModalService 2');
    return this.dialog.open(ModalsOneComponent, dialogConfig);
  }

  
}
