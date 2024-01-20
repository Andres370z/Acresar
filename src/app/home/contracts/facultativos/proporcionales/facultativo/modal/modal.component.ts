import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Menssage } from 'src/app/models/router';
import { FacultativoComponent } from '../facultativo.component';
import { AlertService } from 'src/app/service/alert.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None,
  

})

export class ModalComponent implements OnInit {
  selectedYear: any;
  today = new Date();
  sixMonthsAgo = new Date();
  selectedMonth: number = null;

  md = { r: "", c: "" };
  myinform: any
  public form: FormGroup;
  constructor(
    private myformBuilder: FormBuilder,
    public dialog: MatDialogRef<FacultativoComponent>,
    public alert: AlertService,
    public router: Router
  ) { }
  startDate = new Date(1990, 0, 1);
  ngOnInit(): void {
    this.initial()
  }
  initial() {
    this.form = this.myformBuilder.group({
      year: [Menssage.empty, Validators.compose([Validators.required])],
      id: [Menssage.empty, Validators.compose([Validators.required])],
    })
  }
  saveData(inform: any) {
    console.log(this.form);
    localStorage.setItem('rsltntmpcntrt', JSON.stringify(this.md));
    this.dialog.close()
    this.alert.success('Ok', 'puedes continuar')
  }
  cancel(){
    this.dialog.close()
    this.navigate('home/contracts')
  }
  navigate(item: string){
    this.router.navigate([item])
  }
}
