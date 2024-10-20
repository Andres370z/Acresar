import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Menssage } from 'src/app/models/router';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ExcelService } from 'src/app/service/excel.service';
import { PercentageService } from 'src/app/service/percentage.service';

@Component({
  selector: 'app-bordereaux',
  templateUrl: './bordereaux.component.html',
  styleUrls: ['./bordereaux.component.css']
})
export class BordereauxComponent implements OnInit {
  modulo = 'Reporte Siniestros';
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

  constructor(
    private router: Router,
    private _service: AuthService,
    private excelService: ExcelService,
    private alertService: AlertService
  ) {
    _service.getCorredor().then((res: any) => { this.rsltncr = res });
    _service.getReinsurer().then((res: any) => { this.rsltnrsgr = res });
    _service.getCurrency().then((res: any) => { this.currency = res });
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
    this._service.postSinistroReporteNomina(data).then(
      res => {
        localStorage.setItem('idcontratonomi', JSON.stringify(res));
        this.resultado = JSON.parse(localStorage.getItem('idcontratonomi'));
        console.log(res);
        if (this.resultado.lengh == 0) {
          this.alertService.messagefin();
          this.alertService.info('Hey','No hay datos');
        } else {
          this.convertir(this.resultado)
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
          Serie: element.SERIE,
          Asegurado: element.ASEGURADO,
          Poliza: element.NRO_POLIZA,
          Codigo: element.COD_RAMO,
          Ramo: element.RAMO,
          Contrato: element.CONTRATO,
          Inicio: element.INICIO,
          Fin: element.FIN,
          Siniestro: element.SINIESTRO,
          Fecha_ocurrencia: element.FECHA_DE_OCURRENCIA,
          Valor_siniestro: this.cortarDesimales(element.VALOR_SINIESTRO),
          Cesion: element.CESION,
          Reasegurador: element.Reasegurador,
          Participacion_reas: element.PARTICI_REA,
          Siniestro_pagado: this.cortarDesimales(element.SINIESTRO_PAGADO_CEDIDO),
          Siniestro_cedido: this.cortarDesimales(element.SINIESTRO_PAGADO_CEDIDO_REA),
          Observacion: element.OBSERVACIONES,
        }
      );
    }
    console.log(datatmp);
    this.exportAsXLSX(datatmp)
  }
  exportAsXLSX(datatmp: any): void {
    this.excelService.exportAsExcelFile(datatmp, 'BORDERAUX-SINIESTRO');
  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
}
