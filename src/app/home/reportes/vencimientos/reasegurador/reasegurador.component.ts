import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ExcelService } from 'src/app/service/excel.service';

@Component({
  selector: 'app-reasegurador',
  templateUrl: './reasegurador.component.html',
  styleUrls: ['./reasegurador.component.css']
})
export class ReaseguradorComponent implements OnInit {
  form: FormGroup;
  ramos: any
  reasegradores: any;
  reporte: any;
  asegurado: any;
  selectedOptionramos: any;
  selectedOption: any;
  selectedOptionreporte: any;
  resultado: any;
  constructor(
    public myFormBuilder: FormBuilder,
    public authService: AuthService,
    public excelService: ExcelService,
    public alert: AlertService,
  ) { }
  
  ngOnInit(): void {
    this.initial();
  }
  initial() {
    this.form = this.myFormBuilder.group({
      ramos: [Menssage.empty, Validators.compose([Validators.required])],
      reasegurador: [Menssage.empty, Validators.compose([Validators.required])],
      asegurado: [Menssage.empty, Validators.compose([Validators.required])],
      reporte: [Menssage.empty, Validators.compose([Validators.required])],
      startDate: [Menssage.empty, Validators.compose([Validators.required])],
      endDate: [Menssage.empty, Validators.compose([Validators.required])],
    });
    //Trae Ramoss
    this.authService.getRamos().then((resulta: any) => {
      this.ramos = resulta;
    }).catch((err) => {
      console.log(err);
    });
    //Trae Reasegurador
    this.authService.getReinsurer().then((resulta: any) => {
      this.reasegradores = resulta;
    }).catch((err) => {
      console.log(err);
    });
    //Trae reporte
    this.authService.getCurrency().then((resulta: any) => {
      this.reporte = resulta
    }).catch((err) => {
      console.log(err);
    });
    //Trae asegurado
    this.authService.getAsegurado().then((resulta: any) => {
      this.asegurado = resulta;
    }).catch((err) => {
      console.log(err);
    });
  }

  downloadData() {
    if (this.form.valid) {
      const data = {
        ramos: this.ramos,
        reas: this.reasegradores,
        fInicio: this.form.controls.startDate.value,
        ciudad: this.form.controls.endDate.value,
        broker: this.asegurado,
        moneda: this.reporte,
      };
      console.log('UNO', data);
      this.authService.postSinistroReporteNomina(data).then((res: any) => {
        localStorage.setItem('idcontratonomi', JSON.stringify(res));
        this.resultado = JSON.parse(localStorage.getItem('idcontratonomi'));
        console.log('DOS', res);
        if (this.resultado.length = 0) {
          this.alert.error('Vacio', 'no hay nada por aqui')
        } else {
          this.convertir(this.resultado)
        }
      })
    }else {
      this.alert.error('Falta algo', 'Todavia no llenas el formulario')
    }

  }
  convertir(item: any) {
    var toReturn = {}
    const datatmp = [];
    for (let index = 0; index < item.length; index++) {
      const element = item[index];
      datatmp.push(
        {
          Serie: element.Serie,
          Asegurado: element.Asegurado,
          Poliza: element.Poliza,
          Certificado: element.Certificado,
          Id_contrato: element.Id_contrato,
          Codigo: element.Codigo,
          Ramo: element.Ramo,
          Inicio: element.Inicio,
          Fin: element.Fin,
          Reasegurador: element.Reasegurador,
          Participacion: element.Participacion,
          Prima: this.cortarDesimales(element.Prima),
          Cesion: element.Cesion,
          Prima_cedida: this.cortarDesimales(element.Prima_cedida),
          Prima_rea: this.cortarDesimales(element.Prima_rea),
          Comision: element.Comision,
          Valor_comision: this.cortarDesimales(element.Valor_comision),
          Desposito: element.Desposito,
          Valor_deposito: this.cortarDesimales(element.Valor_deposito),
          Impuesto: element.Impuesto,
          Valor_impuesto: this.cortarDesimales(element.Valor_impuesto),
          Broke: element.Broke,
          Valor_Broke: this.cortarDesimales(element.Valor_Broke),
        }
      );
    }
    console.log(datatmp);
    this.exportAsXLSX(datatmp)
  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
  exportAsXLSX(item: any) {
    this.excelService.exportAsExcelFile(item, 'REPORTE-BORDERAUX')
  }

}
