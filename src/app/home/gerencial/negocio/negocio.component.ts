import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Procentajes } from '../../commos/porcentajes';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { SessionUser } from '../../global/sessionUser';
import { AlertService } from 'src/app/service/alert.service';


declare var $: any;
const now = new Date();
@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css']
})




export class NegocioComponent implements OnInit {

  @ViewChild('table') table: ElementRef;
  @ViewChild('inter') inter: ElementRef;
  @ViewChild('aseguradora') aseguradora: ElementRef;

  formReporte: FormGroup;
  corredorView = false;
  estadoData = [
    { id: '', value: '-- Selecione --' },
    { id: 1, value: 'cotizacion' },
    { id: 2, value: 'Renovacion' },
    { id: 3, value: 'Orden en Firme' },
    { id: 4, value: 'Declinado' }
  ];
  aseguradornit: any;
  lisRequest2: boolean;
  lisRequest3: boolean;
  nombrecontrato: string;
  listasegurado: any;
  listasegurado2: any;
  listasegurado3: any;
  intermediario: any = [];
  aseguradorea: any = [];
  listareasu2: any;
  listareasu3: any;
  listareasu4: any;
  listareasu5: any;
  facultativo: boolean = false;
  automatico: boolean = false;
  trasform: Procentajes;
  intermedario: any;
  corredores: any;
  aseguradoras: any;
  reaseguradores: any;
  calendarfi: JQuery;
  calendarff: JQuery;
  idsegurador: string;
  sumaramos: string;
  sumapoliza: string;
  restaramospoliza: string;
  date: { year: number, month: number };
  model;
  modulo = 'Negocios';
  ok: string;

  estadosContizacion: any = {
    solicitud: false,
    corredor: false,
    reasegurador: false,
    cotizacion: false,
    confirmacion: false
  };
  cuotaParteForm: FormGroup;
  enviardatos: FormGroup;
  cuotaParteFormreasegurador: FormGroup;
  intermediariosObj: any = [];
  aseguradoresObj: any = [];
  filesData: any = {};
  hiddenState = false;
  dataReq: any;
  hiddenStateCuota: any;
  lisRequest: any = false;
  modal: any = {
    r: '',
    c: '',
    rt: ''
  };
  monedaopt: any;
  totalPrima = 0;
  public form: any = {
    // cartera: '',
    //depositoRetenido: '',
    iduser: 0,
    comision: '',
    corredor: 0,
    dtbrok: '',
    garantia: '',
    garantia_list: [],
    totalPrima: '',

  };
  public user: any;
  constructor(
    public _http: AuthService,
    private _rd: Renderer2,
    private _nv: Router,
    private alertService: AlertService
  ) {
    this.user = new SessionUser(this._nv);
    this.user.getAuthUser();
    this.trasform = new Procentajes;
  }

  ngOnInit() {

    const json = sessionStorage.getItem('cotizacionform');
    console.log(JSON.parse(json));
    if (json !== null) {
      const ctz = JSON.parse(json);
      this.createFormUpd(ctz);
    } else {
      this.createForm();

    }
    this._http.getCurrency().then(
      res => {
        this.monedaopt = res;
        console.log(this.monedaopt);
      },
      err => {
        console.log(err);
      }
    );

    this._http.getIntermediarios().then(
      res => {
        this.intermedario = res;
      }
    );
    this._http.getCorredor().then(
      res => {
        this.corredores = res;
      }
    );
    this._http.getAseguradoras().then(
      res => {
        this.aseguradoras = res;
      }
    );

    this._http.getReinsurer().then(
      res => {
        this.reaseguradores = res;
      }
    );

  }

  participacion() {
    const data = this.formReporte.value;
    console.log(data);
    if (data.corredor !== "") {
      this.corredorView = true;
    } else {
      this.corredorView = false;
    }
  }

  createForm() {
    this.formReporte = new FormGroup({
      corredor: new FormControl(),
      participacionCorredor: new FormControl(),
      intermediario: new FormControl(),
      partcipacionIntermediario: new FormControl(),
      comisionIntermediario: new FormControl(),
      aseguradora: new FormControl(),
      participacionAsegurada: new FormControl(),
      comisionAsegurada: new FormControl(),
      reasegurador: new FormControl(),
      nit_asegurado: new FormControl(),
      estado: new FormControl(),
      tipoContrato: new FormControl(),
      financiacion: new FormControl(),
      otrosGastos: new FormControl(),
      notaCobertura: new FormControl(),
      notaDebitada: new FormControl(),
      detalle: new FormControl(),
      codigo: new FormControl('', Validators.required),
      anno: new FormControl('', Validators.required),
      sumaLimite: new FormControl('', Validators.required),
      secion: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      ramos: new FormControl('', Validators.required),
      poliza: new FormControl('', Validators.required),
      codigo0: new FormControl('', Validators.required),
      sumaLimite0: new FormControl('', Validators.required),
      secion0: new FormControl('', Validators.required),
      id0: new FormControl('', Validators.required),
      codigo1: new FormControl('', Validators.required),
      sumaLimite1: new FormControl('', Validators.required),
      secion1: new FormControl('', Validators.required),
      id1: new FormControl('', Validators.required),
      codigo2: new FormControl('', Validators.required),
      sumaLimite2: new FormControl('', Validators.required),
      secion2: new FormControl('', Validators.required),
      id2: new FormControl('', Validators.required),
      codigo3: new FormControl('', Validators.required),
      sumaLimite3: new FormControl('', Validators.required),
      secion3: new FormControl('', Validators.required),
      id3: new FormControl('', Validators.required),
      codigo4: new FormControl('', Validators.required),
      sumaLimite4: new FormControl('', Validators.required),
      secion4: new FormControl('', Validators.required),
      id4: new FormControl('', Validators.required),
      codigo5: new FormControl('', Validators.required),
      sumaLimite5: new FormControl('', Validators.required),
      secion5: new FormControl('', Validators.required),
      id5: new FormControl('', Validators.required),
      codigo6: new FormControl('', Validators.required),
      sumaLimite6: new FormControl('', Validators.required),
      secion6: new FormControl('', Validators.required),
      id6: new FormControl('', Validators.required),
      codigo7: new FormControl('', Validators.required),
      sumaLimite7: new FormControl('', Validators.required),
      secion7: new FormControl('', Validators.required),
      id7: new FormControl('', Validators.required),
      codigo8: new FormControl('', Validators.required),
      sumaLimite8: new FormControl('', Validators.required),
      secion8: new FormControl('', Validators.required),
      id8: new FormControl('', Validators.required),
      codigo9: new FormControl('', Validators.required),
      sumaLimite9: new FormControl('', Validators.required),
      secion9: new FormControl('', Validators.required),
      id9: new FormControl('', Validators.required),
      codigo10: new FormControl('', Validators.required),
      sumaLimite10: new FormControl('', Validators.required),
      secion10: new FormControl('', Validators.required),
      id10: new FormControl('', Validators.required),
      epi: new FormControl('', Validators.required),
    });

  }

  createFormUpd(data: any) {
    this.createForm();
    this.formReporte.setValue(
      {
        corredor: data.corredor,
        participacionCorredor: data.participacionCorredor,
        intermediario: data.intermediario,
        partcipacionIntermediario: data.partcipacionIntermediario,
        comisionIntermediario: data.comisionIntermediario,
        aseguradora: data.aseguradora,
        participacionAsegurada: data.participacionAsegurada,
        comisionAsegurada: data.comisionAsegurada,
        reasegurador: data.reasegurador,
        nit_asegurado: data.nit_asegurado,
        estado: data.estado,
        tipoContrato: data.tipoContrato,
        financiacion: data.financiacion,
        otrosGastos: data.otrosGastos,
        notaCobertura: data.notaCobertura,
        notaDebitada: data.notaDebitada,

      }
    );
  }

  addIntermediario() {
    const values = this.formReporte.value;

    const data = {
      intermediario: values.intermediario,
      participacion: values.partcipacionIntermediario,
      comision: values.comisionIntermediario
    };



    const inyect = this.trasform.verificarDatos(data, this.intermediariosObj, ['intermediario', 'participacion']);
    if (inyect) {
      const interData = this.trasform.claveValor('a', this.intermedario, values.intermediario);
      const span = this._rd.createElement('span');
      const txt = this._rd.createText('INTERMEDIARIO: ' + interData['a2'] + ' PARTICIPACION: ' + values.partcipacionIntermediario
        + ' COMISIÓN: ' + values.comisionIntermediario);
      this._rd.appendChild(span, txt);
      this._rd.addClass(span, 'block');
      this.intermediariosObj.push(data);
      this._rd.appendChild(this.inter.nativeElement, span);
    }

    values.intermediario = 0;
    values.partcipacionIntermediario = '';
    values.comisionIntermediario = '';

    this.formReporte.setValue(values);

    console.log(this.intermediariosObj);
  }



  addAseguradora() {
    const values = this.formReporte.value;
    const data = {
      aseguradora: values.aseguradora,
      participacion: values.participacionAsegurada,
      comision: values.comisionAsegurada
    };

    const inyect = this.trasform.verificarDatos(data, this.aseguradoresObj, ['aseguradora', 'participacionAsegurada']);
    if (inyect) {
      const aseguData = this.trasform.claveValor('a', this.aseguradoras, values.aseguradora);
      const span = this._rd.createElement('span');
      const txt = this._rd.createText('ASEGURADORA ' + aseguData['a2'] + ' PARTICIPACION: ' + values.participacionAsegurada
        + ' COMISIÓN: ' + values.comisionAsegurada);
      this._rd.addClass(span, 'block');
      this._rd.appendChild(span, txt);
      this.aseguradoresObj.push(data);
      this._rd.appendChild(this.aseguradora.nativeElement, span);
    }

    values.aseguradora = 0;
    values.participacionAsegurada = '';
    values.comisionAsegurada = '';

    this.formReporte.setValue(values);
  }

  cotizacionF() {
    const contratoInfo = this.modal;
    const data = this.formReporte.value;
    localStorage.setItem('rsltntmpcntrt', JSON.stringify(contratoInfo));
    this.aseguradoresObj.push(
      {
        aseguradora: data.aseguradora,
        participacion: data.participacion
      }
    );

    this.intermediariosObj.push(
      {
        intermediario: data.intermediario,
        participacion: data.partcipacionIntermediario
      }
    );
    data['datInte'] = this.intermediariosObj;
    data['daAeguradores'] = this.aseguradoresObj;

    const json = JSON.stringify(data);
    sessionStorage.setItem('cotizacionform', json);
    this._nv.navigate([this.modal.rt]);
  }

  estadosChange() {
    const idState = this.formReporte.controls.estado.value;
    if (Number(idState) == 3) {
      this.hiddenState = true;
    } else {
      this.hiddenState = false;
      this.hiddenStateCuota = false;
    }
  }

  buscadorContratos() {
    this.lisRequest = true;
    if (this.formReporte.controls.tipoContrato.value) {
      const item = { word: this.formReporte.controls.tipoContrato.value, anno: this.formReporte.controls.anno.value };

      this._http.postContratoFinal(item)
        .then(
          res => {
            console.log(res);
            this.dataReq = res;
          }
        );
    }
  }

  cargarContrato(item: any) {
    if (item.a2 === 10) {

      this.dataReq = [];
      this.lisRequest = false;
      this.formReporte.controls.tipoContrato.setValue(item.o);
      this.formReporte.controls.detalle.setValue(item.c);
      if (item.cat == "Cuota Parte") {
        this.hiddenStateCuota = true;
      } else {
        this.hiddenStateCuota = false;
        const data = {
          negocio: item.a
        }
        this._http.postFacultativoGasto(data)
          .then(
            res => {
              console.log(res);
              this.listareasu5 = res;
              this.formReporte.controls.poliza.setValue(res[0].cod);
              const data = {
                id: res[0].idpoliza
              }
              console.log(data);
              this._http.postFacultativosRamos(data).then(
                res => {
                  this.listareasu4 = res;
                  console.log(res);

                }
              );
              const data2 = {
                word: item.o
              }
              this._http.postFacultativosContratos(data2).then(
                res => {
                  console.log(res);
                  this._http.getFacultativoContra(res[0].pro_id).then(
                    res => {
                      this.listareasu3 = res;
                      this.convertir();
                      console.log(this.listareasu3);
                    },
                    err => {
                      console.log(err);
                    }
                  );
                },
                err => {
                  console.log(err);
                }
              );

            }
          );
      }
    } else if (item.a2 === 3) {

    }
    if (item.a2 === 10) {
      this.dataReq = [];
      this.lisRequest = false;
      this.facultativo = true;
      this.automatico = false;
      this.formReporte.controls.tipoContrato.setValue(item.o);
      this.formReporte.controls.detalle.setValue(item.c);
      if (item.cat == "Cuota Parte") {
        this.hiddenStateCuota = true;
      } else {
        this.hiddenStateCuota = false;
        const data = {
          negocio: item.a
        }
        this._http.postFacultativoGasto(data)
          .then(
            res => {
              console.log(res);
              this.listareasu5 = res;
              this.formReporte.controls.poliza.setValue(res[0].cod);
              const data = {
                id: res[0].idpoliza
              }
              console.log(data);
              this._http.postFacultativosRamos(data).then(
                res => {
                  this.listareasu4 = res;
                  console.log(res);

                }
              );
              const data2 = {
                word: item.o
              }
              this._http.postFacultativosContratos(data2).then(
                res => {
                  console.log(res);
                  this._http.getFacultativoContra(res[0].pro_id).then(
                    res => {
                      this.listareasu3 = res;
                      this.convertir();
                      console.log(this.listareasu3);
                    },
                    err => {
                      console.log(err);
                    }
                  );
                },
                err => {
                  console.log(err);
                }
              );

            }
          );
      }
    } else if (item.a2 === 3) {
      this.dataReq = [];
      this.lisRequest = false;
      this.facultativo = false;
      this.automatico = true;
      this.formReporte.controls.tipoContrato.setValue(item.o);
      this.formReporte.controls.detalle.setValue(item.c);
      const data = {
        contr: item.a
      }
      this._http.postContratoAsociacionFinal(data)
        .then(
          res => {
            console.log(res);
            this.listareasu4 = res;
          }
        );
    }

  }
  convertir() {
    if (this.listareasu4.lenght != 0 || this.listareasu3.lenght != 0) {
      const datatmp = [];
      var sumar2 = 0;
      var sumapa = 0;
      for (let index = 0; index < this.listareasu3.length; index++) {
        const poliza = this.listareasu4[index];
        const asegurado = this.listareasu5[index];
        sumar2 = sumar2 + parseInt(this.listareasu3[index]['ttl']);
        sumapa = sumapa + parseInt(poliza.s);
        this.listareasu3.forEach(element => {
          if (element.nme == poliza.re) {
            datatmp.push(
              {
                id: asegurado.a,
                r2: element.ttl,
                code: element.e,
                codr: element.nm,
                codr1: element.nme,
                pa: poliza.s
              }
            );
          }
        });


      }
      this.listareasu2 = datatmp;
      this.sumaramos = sumar2.toString();
      this.sumapoliza = sumapa.toString();
      var resta = sumapa - sumar2;
      this.restaramospoliza = resta.toString();
      console.log(datatmp)
    }
    console.log(this.listareasu4)
    console.log(this.listareasu3)
  }
  selectToday() {
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

  fecha(item: string) {

    if (item == 'fini') {
      this.formReporte.controls.inicioVigencia.setValue($('#' + item).val());
    }
    if (item == 'ffin') {
      this.formReporte.controls.finVigencia.setValue($('#' + item).val());
    }
  }

  guardar() {
    const data = this.formReporte.value;
    const datase = sessionStorage.getItem('cotizacionform');
    const dataCoti = sessionStorage.getItem('cotizacionFacu');
    const jsonRequest = new FormData();
    if (datase !== null && dataCoti != null) {
      const datatmp = JSON.parse(datase);
      const cotizacionCuota = JSON.parse(dataCoti);

      datatmp.datInte.push(
        {
          intermediario: data.intermediario,
          participacion: this.removerDesimal(data.partcipacionIntermediario),
          comision: this.removerDesimal(data.comisionIntermediario)
        }
      );

      datatmp.daAeguradores.push(
        {
          aseguradora: data.aseguradora,
          participacion: this.removerDesimal(data.participacion),
          comision: this.removerDesimal(data.comisionAsegurada)
        }
      );

      jsonRequest.append('corredor', data.corredor);
      jsonRequest.append('participacionCorredor', this.removerDesimal(data.participacionCorredor));
      jsonRequest.append('intermediario', this.removerDesimal(data.intermediario));
      jsonRequest.append('partcipacionIntermediario', this.removerDesimal(data.partcipacionIntermediario));
      jsonRequest.append('comisionIntermediario', this.removerDesimal(data.comisionIntermediario));
      jsonRequest.append('aseguradora', data.aseguradora);
      jsonRequest.append('participacionAsegurada', this.removerDesimal(data.participacionAsegurada));
      jsonRequest.append('comisionAsegurada', this.removerDesimal(data.comisionAsegurada));
      jsonRequest.append('reasegurador', data.reasegurador);
      jsonRequest.append('nit_asegurado', data.nit_asegurado);
      jsonRequest.append('estado', data.estado);
      jsonRequest.append('tipoContrato', data.tipoContrato);
      jsonRequest.append('daAeguradores', JSON.stringify(datatmp.daAeguradores));
      jsonRequest.append('datInte', JSON.stringify(datatmp.datInte));
      jsonRequest.append('cuota', JSON.stringify(cotizacionCuota));
      jsonRequest.append('financiacion', this.removerDesimal(data.financiacion));
      jsonRequest.append('otrosGastos', this.removerDesimal(data.otrosGastos));
      jsonRequest.append('notaCobertura', this.removerDesimal(data.notaCobertura));
      jsonRequest.append('notaDebitada', this.removerDesimal(data.notaDebitada));
      jsonRequest.append('idusers', this.user.authUser.id);
      jsonRequest.append('idpoliza', this.listareasu2[0].idpoliza);
      jsonRequest.append('idseguro', this.listareasu2[0].idseguro);


    } else {

      jsonRequest.append('corredor', data.corredor);
      jsonRequest.append('participacionCorredor', this.removerDesimal(data.participacionCorredor));
      jsonRequest.append('intermediario', this.removerDesimal(data.intermediario));
      jsonRequest.append('partcipacionIntermediario', this.removerDesimal(data.partcipacionIntermediario));
      jsonRequest.append('comisionIntermediario', this.removerDesimal(data.comisionIntermediario));
      jsonRequest.append('aseguradora', data.aseguradora);
      jsonRequest.append('participacionAsegurada', this.removerDesimal(data.participacionAsegurada));
      jsonRequest.append('comisionAsegurada', this.removerDesimal(data.comisionAsegurada));
      jsonRequest.append('reasegurador', data.reasegurador);
      jsonRequest.append('nit_asegurado', data.nit_asegurado);
      jsonRequest.append('estado', data.estado);
      jsonRequest.append('tipoContrato', data.tipoContrato);
      jsonRequest.append('financiacion', this.removerDesimal(data.financiacion));
      jsonRequest.append('otrosGastos', this.removerDesimal(data.otrosGastos));
      jsonRequest.append('notaCobertura', this.removerDesimal(data.notaCobertura));
      jsonRequest.append('notaDebitada', this.removerDesimal(data.notaDebitada));
      jsonRequest.append('idusers', this.user.authUser.id);
      jsonRequest.append('idpoliza', this.listareasu2[0].idpoliza);
      jsonRequest.append('idseguro', this.listareasu2[0].idseguro);

    }

    console.log(data);

    jsonRequest.append('estadocontizacion', JSON.stringify(this.estadosContizacion));

    Object.keys(this.filesData).forEach(element => {
      jsonRequest.append(`file_${element}`, this.filesData[element])
    });

    if (this.formReporte.valid) {
      this._http.postSaveReportes(jsonRequest).then(
        res => {
          if (res.hs !== false) {

            this.formReporte.reset();
            this.alertService.success('Ok',res.mensaje);
          }
        },
        err => {
          this.alertService.error('Ups',err.mensaje);
          console.log('err', err);
        }
      );
    }
    sessionStorage.clear();
    this._nv.navigate(['/admin/gerencial/reporte']);

  }

  files(tipo: string, file: any) {
    this.filesData[tipo] = file[0];
  }

  desimalPor(key: string) {
    const data = this.formReporte.value;
    const p = this.trasform.desimalPor(this.trasform.removerDesimal(this.trasform.removerPor(data[key])));
    this.formReporte.controls[key].setValue(p);
  }
  removerDesimal(val: any) {
    return this.trasform.removerPor(this.trasform.removerDesimal(val));
  }
  miles(key: any) {
    const data = this.formReporte.value;
    const p = this.trasform.desimalDeMiles(this.trasform.removerDesimal(data[key]));
    this.formReporte.controls[key].setValue(p);
  }
  milesfinal(form: string, key: string) {
    if (form === 'formReporte') {

      let value = this.formReporte.controls[key].value;
      if (value.split('.').length > 2) {
        value = this.desimal(this.formReporte.controls[key].value);
      }
      const val = this.desimal(value);
      this.formReporte.controls[key].setValue(val.toString());
    }

    if (form === 'tabel') {
      const cortar = this.cortarDesimales(key)
      const quitar = this.desimal(cortar);
      return quitar;
    }

  }
  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
  nominasfinales(id: string) {
    console.log(id)
    const item = {
      id: id,
    }
    this._http.postGarantias(item).then(
      res => {
        const contar = res;
        this.listareasu3 = res;
        console.log(this.listareasu3);
        if (this.listareasu3.length == 0) {
          this.ok = "list";
        } else {
          this.ok = "ok"
        }

        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
    this.form.corredor = id;
  }
  calcular() {
    this.totalPrima = 0;
    const e = document.querySelector('#gpagos').children;

    for (let i = 0; i <= e.length - 1; i++) {
      const data = [];
      const v = e[i].children;
      for (let j = 0; j <= v.length - 1; j++) {
        const n = v[j].children[0];
        if (n.getAttribute('name') === 'valor') {
          if (n['value'] != '') {
            const numero = parseInt(n['value']);
            console.log(numero);
            this.totalPrima = this.totalPrima + numero;
          }
        }
      }
    }

  }
  garantiaList() {
    const element = this.table.nativeElement.children;

    for (let i = 0; i <= this.table.nativeElement.childElementCount - 1; i++) {
      const t = element[i];
      let json = {};
      for (let e = 0; e <= t.childElementCount - 1; e++) {
        const j = t.cells[e];
        const atr = j.children[0].getAttribute('name');
        const vl = j.children[0].value;
        json[atr] = vl;
      }
      this.form.garantia_list.push(json);
    }
    this.form.garantia = this.form.garantia_list[0].fecha;
    this.form.totalPrima = this.totalPrima;
    this.form.iduser = this.user.authUser.id;
    console.log(this.listareasu3.lenght)
    if (this.listareasu3.lenght == 0) {
      console.log(this.listareasu3.lenght)
      this.garantiasfinales(this.form);
    } else {
      this.editargarantias(this.form);
    }

  }
  adicionar() {
    const tr = this._rd.createElement('tr');
    const td = this._rd.createElement('td');
    const input = this._rd.createElement('input');

    const td2 = this._rd.createElement('td');
    const input2 = this._rd.createElement('input');

    const td3 = this._rd.createElement('td');
    const select = this._rd.createElement('select');


    const td4 = this._rd.createElement('td');
    const input4 = this._rd.createElement('input');

    this._rd.addClass(input, 'form-control');
    this._rd.addClass(input, 'pagon');
    this._rd.setAttribute(input, 'name', 'n_pago');
    this._rd.appendChild(td, input);

    this._rd.addClass(input2, 'form-control');
    this._rd.addClass(input2, 'fecha');
    this._rd.setAttribute(input2, 'placeholder', 'dd/mm/yyyy');
    this._rd.setAttribute(input2, 'name', 'fecha');
    this._rd.setAttribute(input2, 'type', 'date');
    this._rd.appendChild(td2, input2);

    this._rd.addClass(select, 'form-control');
    this._rd.addClass(select, 'moneda');
    this._rd.setAttribute(select, 'name', 'moneda');
    const optT = this._rd.createElement('option');
    this._rd.setAttribute(optT, 'value', '');
    this._rd.appendChild(optT, this._rd.createText('Selecione una moneda'));
    this._rd.appendChild(select, optT);
    for (let i = 0; i <= Object.keys(this.monedaopt).length - 1; i++) {
      const v = this.monedaopt[i];
      const opt = this._rd.createElement('option');
      this._rd.setAttribute(opt, 'value', v.a);
      this._rd.appendChild(opt, this._rd.createText(v.c));
      this._rd.appendChild(select, opt);
    }

    this._rd.appendChild(td3, select);

    this._rd.addClass(input4, 'form-control');
    this._rd.addClass(input4, 'valor');
    this._rd.setAttribute(input4, 'name', 'valor');
    this._rd.listen(input4, 'change', (event) => {
      this.calcular();
    });
    this._rd.appendChild(td4, input4);

    this._rd.appendChild(tr, td);
    this._rd.appendChild(tr, td2);
    this._rd.appendChild(tr, td3);
    this._rd.appendChild(tr, td4);
    this._rd.appendChild(this.table.nativeElement, tr);
  }
  garantiasfinales(item: any) {
    this._http.postDetallesGarantias(item).then(
      res => {
        this.removeElement()
        //this.messageSuccess('Haz complertado el 100% de participación');
        this.form.garantia_list = [];
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

  }
  editargarantias(item: any) {
    this._http.postDetallesGarantias(item).then(
      res => {
        this.removeElement()
        //this.messageSuccess('Haz complertado el 100% de participación');
        this.form.garantia_list = [];
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

  }
  removeElement() {
    var element = document.getElementById("gpagos");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  aseguradorfinal() {
    this.lisRequest2 = true;
    console.log(this.formReporte.controls.aseguradora.value);
    if (this.formReporte.controls.aseguradora.value) {
      const item = {
        word: this.formReporte.controls.aseguradora.value
      };
      console.log(item);
      this.alertService.loading();
      this._http.postFacultativoClient(item).then(
        res => {
          this.aseguradornit = res;
          console.log(this.aseguradornit);
          this.alertService.messagefin();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  cargarnit(item) {
    this.formReporte.controls.aseguradora.setValue(item.a2);
    this.formReporte.controls.nit_asegurado.setValue(item.r2);
    this.idsegurador = item.a;
    this.lisRequest2 = false;
  }
}
