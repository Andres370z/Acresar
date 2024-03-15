import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ExcelService } from 'src/app/service/excel.service';

@Component({
  selector: 'app-siniestro-reasegurador',
  templateUrl: './siniestro-reasegurador.component.html',
  styleUrls: ['./siniestro-reasegurador.component.css']
})
export class SiniestroReaseguradorComponent implements OnInit {
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
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private alert: AlertService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.initial()
  }
  initial() {
    this.form = this.myFormBuilder.group({
      ramos: [Menssage.empty, Validators.compose([Validators.required])],
      reasegurador: [Menssage.empty, Validators.compose([Validators.required])],
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

  }
  downloadData() {
    if (this.form.valid) {
      const data = {
        rea: this.form.controls.reasegurador.value,
        ramo: this.form.controls.ramos.value,
        anno: null
      };
      console.log('UNO', data);
      this.authService.postPolizaReporteNomina(data).then((res: any) => {
        this.resultado = res;
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
          //Año: element.anno,
          Reasegurador: element.reasegurador,
          Ramo: element.RAMO,
          Prima: element.Prima,
          Deposito_dev: element.Deposito_dev,
          Salvamento: element.Salvamento,
          Ingresos: element.Ingresos,
          Comision: element.Comision,
          Depositoretenido: element.Depositoretenido,
          Siniestro: element.Siniestro,
          Saldoanterior: element.Saldoanterior,
          Saldosiniestroanterior: element.Saldosiniestroanterior,
          Egresos: element.Egresos,
          Resultados: element.Resultados,
          Porcomision: element.Porcomision,
          Porsiniestro: element.Porsiniestro,
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
