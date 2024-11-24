import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { ExcelService } from 'src/app/service/excel.service';

@Component({
  selector: 'app-reporte-automatico',
  templateUrl: './reporte-automatico.component.html',
  styleUrls: ['./reporte-automatico.component.css']
})
export class ReporteAutomaticoComponent implements OnInit {
  modulo = 'Reporte contratos automatico';
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
  contratofinal: any;
  j: JQuery;
  form: FormGroup;
  public options: any
  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private _service: AuthService,
    private alert: AlertService,
    private excelService: ExcelService,
  ) {
    _service.getQuery('/corredores').then((res: any) => { this.rsltncr = res });
    _service.getQuery('/reaseguradoras').then((res: any) => { this.rsltnrsgr = res });
    _service.getQuery('/monedas').then((res: any) => { this.currency = res });
  }

  ngOnInit(): void {
    this.createForm();
    this.authService.getRamos().then((res: any) => {
      this.ramos = res
    })
  }
  createForm() {
    /*Este es el Formulario*/
    this.form = this.myFormBuilder.group({
      tipoContrato: ['', Validators.compose([Validators.required])],
    });
  }
  searchContracs() {
    if (this.form.controls.tipoContrato.valid) {
      const data = {
        type: true,
        word: this.form.controls.tipoContrato.value

      }
      this.authService.postSearchIdcontracs(data).then(
        res => {
          this.options = res
        }, err => {
          this.alert.error('Error', 'Solicitud no enviada');
          console.log(err)
        }
      )
    }
  }
  upload(item: any) {
    console.log(item);
    this.form.controls.tipoContrato.setValue(item.o);
    this.contrato(item.a);
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
      idContrato: new FormControl('', Validators.required),
    });
  }
  ramosbuscar() {
    this.lisRequest = true;
    this._service.getQuery('ramos').then(
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
    this._service.getQuery('ramos').then(
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
    this._service.getQuery('ramos').then(
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
    this._service.getQuery('ramos').then(
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
    this._service.postQuery(data, 'aseguradoras/facultativo/proceso/siniestro/reportenomina').then(
      res => {
        localStorage.setItem('idcontratonomi', JSON.stringify(res));
        this.resultado = JSON.parse(localStorage.getItem('idcontratonomi'));
        console.log(res);
        if (this.resultado.lengh == 0) {
          this.alert.messagefin();
          this.alert.info('Hey','No hay datos');
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
    this.exportAsXLSX(datatmp, "BORDERAUX-SINIESTRO")
  }
  exportAsXLSX(datatmp: any, title: string): void {
    this.excelService.exportAsExcelFile(datatmp, title);
  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
  contratosfacultativos() {
    this.lisRequest = true;
    console.log(this.cuotaParteFormreasegurador.controls.idContrato.value);
    if (this.cuotaParteFormreasegurador.controls.idContrato.value) {
      const item = {
        contr: this.cuotaParteFormreasegurador.controls.idContrato.value,
      };
      console.log(item);
      this.alert.loading();
      this._service.postQuery(item, '/contratos/asociacion/search').then(
        res => {
          this.contratofinal = res;
          console.log(this.contratofinal);
          this.alert.messagefin();
        },
        err => {
          console.log(err);
          this.alert.messagefin();
        }
      );
    }
  }
  cargar(item) {
    console.log(item);
    this.cuotaParteFormreasegurador.controls.idContrato.setValue(item.o);
    this.lisRequest = false;
    this.contrato(item.ctn);
  }
  contrato(id) {
    this._service.getQuery(`contratos/automaticos/get/excel/${id}`).then(
      res => {
        this.ramos = res;
        console.log(res);
      }
    );
  }
  descargarfinal() {
    if (this.ramos.length === 0) {
      this.alert.error('Ups','Debes seleccionar un contrato');
    } else {
      this.exportAsXLSX(this.ramos, 'BORDERAUX-AUTOMATICO');
    }
  }
}
