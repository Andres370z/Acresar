import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  modulo = 'Reporte Prima';
  rsltncr: any;
  currency: any;
  rsltnrsgr: any;
  ramos: any;
  idreas: any;
  ramo: any;
  idbroker: any;
  idmone: any;
  cuotaParteFormreasegurador: FormGroup;
  reseasegurador: any;
  corredor: any;
  resultado: any;
  lisRequest: boolean;
  lisRequest2: boolean;
  lisRequest3: boolean;
  lisRequest4: boolean;
  aseguradorramos: any;
  aseguradorreas: any;
  aseguradorbroker: any;
  aseguradormone: any;
  j: JQuery;
  datatmp: any;
  constructor(
    private router: Router,
    private _service: AuthService,
    private alertService: AlertService,
    private excelService: ExcelService
  ) {
    _service.getCorredor().then((res: any)=> {this.rsltncr = res});
    _service.getReinsurer().then((res: any)=> {this.rsltnrsgr =  res});
    _service.getCurrency().then(((res: any)=>{this.currency = res}));
  }

  ngOnInit() {
    this.createFormreasegurador();
    this._service.getRamos().then(
      res => {
        this.ramos = res;
      }
    );
  }
  createFormreasegurador() {
    this.cuotaParteFormreasegurador = new FormGroup({
      ramos: new FormControl('', Validators.required),
      fInicio: new FormControl('', Validators.required),
      sumaLimite: new FormControl('', Validators.required),
      primas: new FormControl('', Validators.required),
      reas: new FormControl('', Validators.required),
      broker: new FormControl('', Validators.required),
      fFin: new FormControl('', Validators.required),
      moneda: new FormControl(''),
    });
  }
  ramosbuscar() {
    this.lisRequest = true;
    this._service.getRamos().then(
      res => {
        this.ramos = res;
      }
    );
  }
  cargarramos(item) {
    this.cuotaParteFormreasegurador.controls.ramos.setValue(item.a2);
    this.lisRequest = false;
  }
  reasbuscar() {
    this.lisRequest = true;
    this._service.getRamos().then(
      res => {
        this.ramos = res;

      }
    );
  }
  cargarreas(item) {
    this.cuotaParteFormreasegurador.controls.reas.setValue(item.a2);
    this.lisRequest2 = false;
  }
  brokerbuscar() {
    this._service.getRamos().then(
      res => {
        this.ramos = res;
      }
    );
  }
  cargarbroker(item) {
    this.cuotaParteFormreasegurador.controls.broker.setValue(item.a2);
    this.lisRequest3 = false;
  }
  monebuscar() {
    this._service.getRamos().then(
      res => {
        this.ramos = res;
      }
    );
  }
  cargarmone(item) {
    this.cuotaParteFormreasegurador.controls.broker.setValue(item.a2);
    this.lisRequest3 = false;
  }
  enviardatos() {
    const data = {
      ramos: this.ramo,
      reas: this.idreas,
      fInicio: this.cuotaParteFormreasegurador.controls.fInicio.value,
      ciudad: this.cuotaParteFormreasegurador.controls.fFin.value,
      broker: this.idbroker,
      moneda: this.idmone,
    };
    console.log(data);
    this._service.postReporteNomina(data).then(
      res => {
        localStorage.setItem('idcontrato', JSON.stringify(res));
        this.resultado = JSON.parse(localStorage.getItem('idcontrato'));
        console.log(res);
        if (this.resultado.lengh = 0) {
          this.alertService.messagefin();
          this.alertService.messageInfo('No hay datos', '');
        } else {
          this.convertir(this.resultado);
        }
      },
      err => {
        console.log(err);
      });
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
  exportAsXLSX(datatmp: any): void {
    this.excelService.exportAsExcelFile(datatmp, 'BORDERAUX-PRIMAS');
  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
}
