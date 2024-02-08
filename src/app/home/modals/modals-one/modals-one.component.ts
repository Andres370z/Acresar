import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FacultativoEspecialesComponent } from '../../contracts/facultativos/especiales/facultativo-especiales/facultativo-especiales.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/service/alert.service';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';

@Component({
  selector: 'app-modals-one',
  templateUrl: './modals-one.component.html',
  styleUrls: ['./modals-one.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalsOneComponent implements OnInit {
  public form: any;
  md = { r: "", c: "" };
  constructor(
    private myformBuilder: FormBuilder,
    public dialog: MatDialogRef<FacultativoEspecialesComponent>,
    public alert: AlertService,
    public router: Router
  ) { }

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
