import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import { PercentageService } from 'src/app/service/percentage.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  
  public form: FormGroup;
  public selectedOption: string = 'selecciona un corredor';
  public corredor: any;
  public asegurador: any;
  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private percentaje: PercentageService
  ) { }

  ngOnInit(): void {
    this.initial()
    this.authService.getCorredor().then
      ((resulta: any) => {
        this.corredor = resulta
        console.log('estos son los corredores', resulta)
    })
    this.authService.getReinsurer().then
      ((resulta: any) => {
        this.asegurador = resulta
        console.log('estos son las aseguradoras', resulta)
    })
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
    })

  }
  saveForm(){
    let value1: any;
    value1 = this.form.controls.corredor.value;
    this.removeProsentaje(value1)
    console.log(value1)
  }
  removeProsentaje(e: any) {
    if (e != "") {
      
      if (typeof e == "string") {
        const a = e.split("%");
        return a[0];
      }
    }
  }
}
