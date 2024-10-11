import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Menssage } from 'src/app/models/router';
import { FacultativoComponent } from '../proporcionales/facultativo/facultativo.component';
import { AlertService } from 'src/app/service/alert.service';
import { Route, Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None,


})

export class ModalComponent implements OnInit {
  //selectedYear: any;
  today = new Date();
  sixMonthsAgo = new Date();
  selectedMonth: number = null;

  md = { r: "", c: "" };
  myinform: any
  public form: FormGroup;


  selectedYear: number = 2024; // Almacena el año seleccionado
  years: number[] = []; // Array para los años

  constructor(
    private myformBuilder: FormBuilder,
    public dialog: MatDialogRef<FacultativoComponent>,
    public alert: AlertService,
    public router: Router,
    private auth: AuthService
  ) {
    // Cambia el rango de años a 2000-2100
    for (let i = 2012; i <= 2100; i++) {
      this.years.push(i); // Agregar años al array
    }
  }

  ngOnInit(): void {
    localStorage.removeItem('rsltntmpcntrt')
    this.initial()
  }
  initial() {
    this.form = this.myformBuilder.group({
      year: [this.selectedYear, Validators.compose([Validators.required])],
      id: [Menssage.empty, Validators.compose([Validators.required])],
    })
  }
  saveData(inform: any) {
    this.auth.setData(inform)
    console.log(this.form);
    localStorage.setItem('rsltntmpcntrt', JSON.stringify(this.md));
    this.dialog.close()
    this.alert.success('Ok', 'puedes continuar')
  }
  cancel() {
    this.dialog.close()
    this.navigate('home/contracts')
  }
  navigate(item: string) {
    this.router.navigate([item])
  }

}
