import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ExcelService } from 'src/app/service/excel.service';
import { PercentageService } from 'src/app/service/percentage.service';

@Component({
  selector: 'app-borderaux',
  templateUrl: './borderaux.component.html',
  styleUrls: ['./borderaux.component.css']
})
export class BorderauxComponent implements OnInit {
  money: any;
  ramos: any;
  reasegradores: any;
  broker: any;
  form: FormGroup;
  idreas: any;
  ramo: any;
  idbroker: any;
  idmone: any;
  reseasegurador: any;
  corredor: any;
  resultado: any;
  public selectedOption: any;
  constructor(
    private authService: AuthService,
    private alert: AlertService,
    private myFormBuilder: FormBuilder,
    private porcentajes: PercentageService,
    private router: Router,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.initial();
  }
  initial() {
    this.form = this.myFormBuilder.group({
      ramos: [Menssage.empty, Validators.compose([Validators.required])],
      reasegurador: [Menssage.empty, Validators.compose([Validators.required])],
      broker: [Menssage.empty, Validators.compose([Validators.required])],
      currency: [Menssage.empty, Validators.compose([Validators.required])],
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
    //Trae Broker
    this.authService.getCorredor().then((resulta: any) => {
      this.broker = resulta
    }).catch((err) => {
      console.log(err);
    });
    //Trae Monedas
    this.authService.getCurrency().then((resulta: any) => {
      this.money = resulta;
    }).catch((err) => {
      console.log(err);
    });
  }

  downloadData() {
    const data = {
      ramos: this.ramo,
      reas: this.idreas,
      fInicio: this.form.controls.startDate.value,
      ciudad: this.form.controls.endDate.value,
      broker: this.idbroker,
      moneda: this.idmone,
    };
    console.log('UNO', data);
    this.authService.postReporteNomina(data).then((res: any) => {
      localStorage.setItem('idcontrato', JSON.stringify(res));
      this.resultado = JSON.parse(localStorage.getItem('idcontrato'));
      console.log('DOS',res);
      if (this.resultado.length = 0) {
        this.alert.error('Vacio', 'no hay nada por aqui')
      }else {
        this.convertir(this.resultado)
      }
    })
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
  exportAsXLSX(item: any){
    this.excelService.exportAsExcelFile(item, 'REPORTE-BORDERAUX')
  }

}
