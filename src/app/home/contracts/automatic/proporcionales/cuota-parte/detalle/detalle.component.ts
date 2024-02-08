import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  public form: FormGroup
  constructor(
    private myFormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initial()
  }
  initial(){
    this.form = this.myFormBuilder.group({
      corredor: [Menssage.empty, Validators.compose([Validators.required])],
      reasegurador: [Menssage.empty, Validators.compose([Validators.required])],
      participacion: [Menssage.empty, Validators.compose([Validators.required])],
      comision: [Menssage.empty, Validators.compose([Validators.required])],
      depositosRetenidos: [Menssage.empty, Validators.compose([Validators.required])],
      comisionUtilidadespor: [Menssage.empty, Validators.compose([Validators.required])],
      comisionUtilidades: [Menssage.empty, Validators.compose([Validators.required])],
      gastos: [Menssage.empty, Validators.compose([Validators.required])],
      impuestos: [Menssage.empty, Validators.compose([Validators.required])],
      impRenta: [Menssage.empty, Validators.compose([Validators.required])],
      traspaso: [Menssage.empty, Validators.compose([Validators.required])],
      arrastrePerdida: [Menssage.empty, Validators.compose([Validators.required])],
      cuentas: [Menssage.empty, Validators.compose([Validators.required])],
    })
  }

}
