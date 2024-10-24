import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { Menssage } from 'src/app/models/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Procentajes } from 'src/app/home/commos/porcentajes';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-automaticos',
  templateUrl: './automaticos.component.html',
  styleUrls: ['./automaticos.component.css'],

})



export class AutomaticosComponent implements OnInit {

  /************ */
  modulo = 'Prima Automatico';
  money: any;
  mon: any;
  idcomision: number;
  sucursales: any;
  compania: any;
  dataForm: any;
  poliza: String;
  ctb1: any;
  final: any;
  finaldetalle: any;
  valor: number;
  valor1: number;
  moneda;
  lisRequest: boolean;
  lisRequest2: boolean;
  lisRequest3: boolean;
  nombrecontrato: string;
  listasegurado: any;
  listasegurado2: any;
  listasegurado3: any;
  ramoscomision: any;
  select1: any;
  select2: any;
  ///
  cuotaParteForm: FormGroup;
  enviardatos: FormGroup;
  cuotaParteFormreasegurador: FormGroup;
  fromajustes: FormGroup;
  certificado;
  modeda;
  inicio = '';
  fin;
  sucursalesSelect;
  companiaSelect;
  ramo;
  descripcion;
  sumaAsegurada;
  sumaDistribucion;
  prima;
  identificacion;
  fecha1;
  fecha2;
  statefinal;
  ciudad;
  ramos: any;
  proceso: any;
  procesodos: any;
  polizafinal: any;
  tabla = {
    contrato: '',
    tramo: '',
    sumaRetencion: '',
    sumaCedida: '',
    primaRetenida: '',
    primaCedida: ''
  };
  ramotecnico;
  primaDistribucion;
  ProductoSubramo;
  listareasu: any;
  listareasu2: any;
  contratofinal: any;
  aseguradornit: any;
  aseguradorpoliza: any;
  porcentajenomina: any;
  contrato: any;
  polizacontrato: any;
  selectpoliza: any;
  selectcontrato: any;
  idsegurador;
  idpoliza;
  corredorList: any;
  polizaramos: any;
  tiposAsoc: any;
  nomina: any;
  dataReq: any;
  showList = false;
  showAssoc = false;
  detail: any;
  totalingresos: number = 0;
  totalegresos: number = 0;
  totalacumulado: number = 0;
  calculo: number;
  selectedDetailItems = [];
  public user: any;
  reasegurador: any;
  /***********************+ */
  private _pct = new Procentajes();
  constructor(
    private myFormBuilder: FormBuilder,
    private authService: AuthService,
    private http: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.http.getReinsurer().then(
      res => {
        this.reasegurador = res;
      }
    );
    //this.http.getQuery('/reaseguradoras').then(res => { this.corredorList = res; });
    this.http.getAsoTipos().then(
      res => {
        this.tiposAsoc = res;
        console.log(this.tiposAsoc)
      }
    );
    this.createFormreas();
    this.createFormreasegurador();
    this.fromajustesfinales();
    console.log(localStorage.getItem('idcontrato'));
    this.http.getRamos().then(
      res => {
        this.ramos = res;
      }
    );
    this.valor = 0;
    this.valor1 = 0;
    this.calculos();
  }
  calculos() {
    this.cuotaParteForm.controls.depositopor.valueChanges.subscribe(
      (res) => {
        if (this.calculo !== 0) {
          const valor = this.removeProsentaje(res);
          const valo = (Number(valor) * this.calculo) / 100;
          this.cuotaParteForm.controls.depositovalor.setValue(this.desimal(valo));
          console.log('hola' + valo);
        } else {
          this.alertService.info('Hey', 'El valor de la prima neta es obligatoria');
        }
      }
    );
    this.cuotaParteForm.controls.interesespor.valueChanges.subscribe(
      (res) => {
        const valor = this._pct.removerDesimal(this.cuotaParteForm.controls.depositovalor.value);
        if (valor !== '') {
          this.cuotaParteForm.controls.depositovalor.value;
          const valor = this.removeProsentaje(res);
          const valo = (Number(valor) * Number(this._pct.removerDesimal(this.cuotaParteForm.controls.depositovalor.value))) / 100;
          this.cuotaParteForm.controls.interesevalor.setValue(this.desimal(valo));
        } else {
          this.alertService.info('Hey', 'El valor del deposito es obligatoria');
        }
      }
    );
    this.cuotaParteForm.controls.depositovalor.valueChanges.subscribe(
      (res) => {
        const valor = this._pct.removerDesimal(this.cuotaParteForm.controls.depositovalor.value);
        if (valor !== '') {
          const valor = this.removeProsentaje(this.cuotaParteForm.controls.interesespor.value);
          const valo = (Number(valor) * Number(this._pct.removerDesimal(this.cuotaParteForm.controls.depositovalor.value))) / 100;
          this.cuotaParteForm.controls.interesevalor.setValue(this.desimal(valo));
          this.cuotaParteForm.controls.interesecomivalor.setValue(this.desimal(Number(this.removeProsentaje(this.cuotaParteForm.controls.interesescomipor.value)) * Number(this._pct.removerDesimal(this.cuotaParteForm.controls.interesecomivalor.value)) / 100));
        } else {
          this.alertService.error('Hey', 'El valor del deposito es obligatoria');
        }
      }
    );
    this.cuotaParteForm.controls.salvamentosvalor.valueChanges.subscribe(
      (res) => {
        const valor = this._pct.removerDesimal(this.cuotaParteForm.controls.depositovalor.value);
        if (valor !== '') {
          const valor = this._pct.removerDesimal(res);
          this.totalingresos = this.desimal((
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.entradasiniestrosvalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.entradasprimasvalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.interesevalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.primacedidavalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.depositovalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.salvamentosvalor.value))))

        } else {
          this.alertService.info('Hey', 'El valor del deposito es obligatoria');
        }
      }
    );
    
    this.cuotaParteForm.controls.salidasiniestrosvalor.valueChanges.subscribe(
      (res) => {
        if (res !== '' && res !== undefined) {
          const valor = this.cortarDesimales(res);
          this.totalegresos = this.desimal(
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.siniestrosvalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.comisionvalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.interesecomivalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.depretenidosvalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.primasretenidasvalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.gastoreaseguradorvalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.comisionvalorajuts.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.comisionutilidadesvalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.sobrecomisionvalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.corretajevalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.interesescomiretefuentevalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.salidasprimasvalor.value)) +
            Number(this._pct.removerDesimal(this.cuotaParteForm.controls.salidasiniestrosvalor.value)));
          console.log(Number(this._pct.removerDesimal(this.cuotaParteForm.controls.salidasiniestrosvalor.value)));
          console.log('ETSE ES TOTAL INGRESOS ', this._pct.removerDesimal(this.totalingresos), 'ESTE ES TOTAL EGRESOS ', this._pct.removerDesimal(this.totalegresos), 'TOTAL EGRESOS SIN CONVERTIR ', this.totalegresos);
          
          const valook = Number(this._pct.removerDesimal(this.totalingresos)) - Number(this._pct.removerDesimal(this.totalegresos));
          this.cuotaParteForm.controls.saldotrimevalor.setValue(this.desimal(valook));
        } else {
          this.alertService.info('Hey', 'El valor de la gasto reasegurador es obligatoria');
        }
      }
    );
    this.cuotaParteForm.controls.saldotrimepor.valueChanges.subscribe(
      (res) => {
        if (this.calculo !== 0) {
          const valor = this.removeProsentaje(res);
          const valo = (Number(valor) * this.calculo) / 100;
          this.cuotaParteForm.controls.saldotrimevalor.setValue(this.desimal(valo));
          console.log(valo);
        } else {
          this.alertService.info('Hey', 'El valor de la prima neta es obligatoria');
        }
      }
    );
    this.cuotaParteForm.controls.saldoanteriorvalor.valueChanges.subscribe(
      (res) => {
        if (res !== '') {
          this.totalacumulado = this.desimal((Number(this._pct.removerDesimal(res)) + Number(this._pct.removerDesimal(this.cuotaParteForm.controls.saldotrimevalor.value))))
        } else {
          this.alertService.info('Hey', 'El valor de la prima neta es obligatoria');
        }
      }
    );
    this.cuotaParteForm.controls.primasreasegurado.valueChanges.subscribe(
      (res) => {
        if (res !== '' && this.polizafinal !== res) {
          var ramos = res;
          this.polizafinal = res;
          const data = {
            id: this.cuotaParteForm.controls.idContratopk.value,
            rm: res
          }
          this.http.postValid(data).then(
            res => {
              console.log(res);
              const valor = this._pct.removerDesimal(this.cuotaParteForm.controls.primaneta.value)
              console.log('hla una' + valor);
              if (valor !== '') {
                this.ramoscomision.forEach(element => {
                  console.log('hla dos' + element.c + 'r' + ramos);
                  if (parseInt(element.c) === parseInt(ramos)) {
                    this.calculo = (Number(valor) * Number(element.s)) / 100;
                    this.cuotaParteForm.controls.otrosgastos.setValue(this.porcentaje(element.s));
                    this.cuotaParteForm.controls.primacedidapor.setValue(this.porcentaje(element.s));
                    this.cuotaParteForm.controls.siniestrospor.setValue(this.porcentaje(element.s));
                    //const valo = (element.s * this.calculo) / 100;
                    //console.log('Este es siniestros: ', valo);
                    ///this.cuotaParteForm.controls.siniestrosvalor.setValue(this.desimal(valo));
                    this.cuotaParteForm.controls.primacedidavalor.setValue(this.desimal(this.calculo));
                    console.log('hla tres' + element.s + 'r' + this.calculo);
                    this.http.getAutomaticoComision(element.a).then(
                      res => {
                        console.log('hla final' + res);
                        this.porcentajenomina = res;
                        this.cuotaParteForm.controls.cuenta.setValue(element.s2);
                        this.idcomision = parseInt(this.porcentajenomina['cps']['nominas']['comision'][0].r);
                        this.cuotaParteForm.controls.comisionpor.setValue(this.porcentaje(this.porcentajenomina['cps']['nominas']['comision'][0].e));
                        this.cuotaParteForm.controls.interesescomipor.setValue(this.porcentaje(element.o));
                        this.cuotaParteForm.controls.primasretenidaspor.setValue(this.porcentaje(element.c2));
                        this.cuotaParteForm.controls.interesespor.setValue(this.porcentaje(this.porcentajenomina['cps']['nominas']['deposito'][0].r2));
                        this.cuotaParteForm.controls.depretenidospor.setValue(this.porcentaje(this.porcentajenomina['cps']['nominas']['deposito'][0].a2));
                        this.cuotaParteForm.controls.comisionvalor.setValue(this._pct.desimalDeMiles((this.porcentajenomina['cps']['nominas']['comision'][0].e * this.calculo) / 100));
                        this.cuotaParteForm.controls.primasretenidasvalor.setValue(this._pct.desimalDeMiles((element.c2 * this.calculo) / 100));
                        this.cuotaParteForm.controls.depretenidosvalor.setValue(this._pct.desimalDeMiles((this.porcentajenomina['cps']['nominas']['deposito'][0].a2 * this.calculo) / 100));
                        console.log();
                        this.alertService.messagefin();
                      },
                      err => {
                        console.log(err);
                        this.alertService.messagefin();
                      }
                    );
                  }
                });
              } else {
                this.cuotaParteForm.controls.primasreasegurado.setValue('');
                this.alertService.info('Hey', 'El valor de la prima neta es obligatoria');
              }
              /* if (res.length != 0) {
               this.listareasu2 = res;
               this.statefinal = true;
               this.cuotaParteForm.controls.primasreasegurado.setValue('');
               this.alertService('Poliza ya fue asignada');
              } */
            },
            err => {
              console.log(err);
              this.alertService.messagefin();
            }
          );
        }
      }
    );
  }
  idReasegurador(id: any) {
    console.log(id);
    const idfinal = parseInt(id)
    if (this.reasegurador !== undefined) {
      if (id > 0 && id !== null) {
        for (let i = 0; i <= this.reasegurador.length; i++) {
          const e = this.reasegurador[i];
          if (idfinal === e.a) {
            return e.e;
          }
        }
      }
    }
  }
  idCorredor(id: any) {
    console.log(id);
    const idfinal = parseInt(id)
    if (id > 0 && id != null) {
      for (let i = 0; i <= this.corredorList.length; i++) {
        const e = this.corredorList[i];
        if (idfinal === e.a) {
          return e.a2;
        }
      }
      return;
    }
  }

  createFormreas() {
    this.cuotaParteForm = new FormGroup({
      poliza: new FormControl('', Validators.required),
      certificado: new FormControl('', Validators.required),
      fechaemision: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      idsegurador: new FormControl('', Validators.required),
      asegurador: new FormControl(''),
      nit: new FormControl({ value: '', disabled: true }),
      ramo: new FormControl({ value: '', disabled: true }),
      tipoAsociacion: new FormControl({ value: '', disabled: true }),
      tipofinal: new FormControl({ value: '', disabled: true }),
      codigo: new FormControl('', Validators.required),
      ramos: new FormControl({ value: '', disabled: true }),
      contrato: new FormControl('', Validators.required),
      sumaLimite: new FormControl('', Validators.required),
      primas: new FormControl('', Validators.required),
      primascentes: new FormControl('', Validators.required),
      reas: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      idContrato: new FormControl('', Validators.required),
      idContratopk: new FormControl('', Validators.required),
      moneda: new FormControl({ value: '', disabled: true }),
      descripcion: new FormControl({ value: '', disabled: true }),
      inicio: new FormControl({ value: '', disabled: true }),
      fin: new FormControl({ value: '', disabled: true }),
      word: new FormControl(''),
      idpoliza: new FormControl(''),
      primacedente: new FormControl(''),
      otrosgastos: new FormControl({ value: '', disabled: true }),
      primasreasegurado: new FormControl('', Validators.required),
      primacedidapor: new FormControl({ value: '', disabled: true }),
      primacedidavalor: new FormControl({ value: '', disabled: true }),
      depositopor: new FormControl('', Validators.required),
      depositovalor: new FormControl('', Validators.required),
      interesespor: new FormControl({ value: '', disabled: true }, Validators.required),
      interesevalor: new FormControl({ value: '', disabled: true }),
      siniestrospor: new FormControl({ value: '', disabled: true }),
      siniestrosvalor: new FormControl('', Validators.required),
      comisionpor: new FormControl({ value: '', disabled: true }),
      comisionvalor: new FormControl({ value: '', disabled: true }),
      comisionporajuts: new FormControl(''),
      comisionvalorajuts: new FormControl(''),
      comisionutilidadespor: new FormControl(''),
      comisionutilidadesvalor: new FormControl(''),
      sobrecomision: new FormControl(''),
      sobrecomisionvalor: new FormControl(''),
      corretaje: new FormControl(''),
      corretajevalor: new FormControl(''),
      interesescomiretefuente: new FormControl(''),
      interesescomiretefuentevalor: new FormControl(''),
      interesescomipor: new FormControl({ value: '', disabled: true }),
      interesecomivalor: new FormControl({ value: '', disabled: true }),
      primasretenidaspor: new FormControl({ value: '', disabled: true }),
      primasretenidasvalor: new FormControl({ value: '', disabled: true }),
      depretenidospor: new FormControl({ value: '', disabled: true }),
      depretenidosvalor: new FormControl({ value: '', disabled: true }),
      saldotrimepor: new FormControl('', Validators.required),
      saldotrimevalor: new FormControl({ value: '', disabled: true }),
      saldoanteriorpor: new FormControl('', Validators.required),
      saldoanteriorvalor: new FormControl('', Validators.required),
      idramos: new FormControl('', Validators.required),
      idtiporamos: new FormControl('', Validators.required),
      idproductos: new FormControl('', Validators.required),
      primaneta: new FormControl('', Validators.required),
      cuenta: new FormControl('', Validators.required),
      fechacuenta: new FormControl('', Validators.required),
      fechacuentafin: new FormControl('', Validators.required),
      salvamentos: new FormControl('', Validators.required),
      salvamentosvalor: new FormControl('', Validators.required),
      gastoreasegurador: new FormControl('', Validators.required),
      gastoreaseguradorvalor: new FormControl('', Validators.required),
      entradasiniestros: new FormControl('', Validators.required),
      entradasiniestrosvalor: new FormControl('', Validators.required),
      entradasprimas: new FormControl('', Validators.required),
      entradasprimasvalor: new FormControl('', Validators.required),
      salidasiniestros: new FormControl('', Validators.required),
      salidasiniestrosvalor: new FormControl('', Validators.required),
      salidasprimas: new FormControl('', Validators.required),
      salidasprimasvalor: new FormControl('', Validators.required),
    });
  }
  prueba(item: any) {
    this.nomina = item;
    console.log(this.nomina);
  }
  fromajustesfinales() {
    this.fromajustes = new FormGroup({
      codigoedit: new FormControl('', Validators.required),
      ramosedit: new FormControl('', Validators.required),
      contratoedit: new FormControl('', Validators.required),
      sumaLimiteedit: new FormControl('', Validators.required),
      primasedit: new FormControl('', Validators.required),
      primascentesedit: new FormControl('', Validators.required),
    });
  }
  createFormreasegurador() {
    this.cuotaParteFormreasegurador = new FormGroup({
      codigo: new FormControl('', Validators.required),
      ramos: new FormControl('', Validators.required),
      contrato: new FormControl('', Validators.required),
      sumaLimite: new FormControl('', Validators.required),
      primas: new FormControl('', Validators.required),
      primascentes: new FormControl('', Validators.required),
      reas: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      idContrato: new FormControl('', Validators.required),
      idContratopk: new FormControl('', Validators.required),
      moneda: new FormControl(''),
      descripcion: new FormControl(''),
      inicio: new FormControl(''),
      fin: new FormControl(''),
      word: new FormControl(''),
      idpoliza: new FormControl(''),
    });
  }

  contratosfacultativos() {
    this.lisRequest = true;
    console.log(this.cuotaParteForm.controls.idContrato.value);
    if (this.cuotaParteForm.controls.idContrato.value) {
      const item = {
        contr: this.cuotaParteForm.controls.idContrato.value,
      };
      console.log(item);
      this.alertService.loading();
      this.http.postFcultativos(item).then(
        res => {
          this.contratofinal = res;
          console.log(this.contratofinal);
          this.alertService.messagefin();
        },
        err => {
          console.log(err);
          this.alertService.messagefin();
        }
      );
    }
  }
  aseguradorfinal() {
    this.lisRequest2 = true;
    console.log(this.cuotaParteForm.controls.asegurador.value);
    if (this.cuotaParteForm.controls.asegurador.value) {
      const item = {
        word: this.cuotaParteForm.controls.asegurador.value
      };
      console.log(item);
      this.alertService.loading();
      this.http.postBuscarAse(item).then(
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


  consultar(item: any) {
    console.log(item);
    const data2 = {
      id: item.c
    }
    this.http.postContratosGet(data2).then(
      res => {
        console.log(res);
        this.listareasu2 = res;
        this.statefinal = true;
      },
      err => {
        console.log(err);
      });
  }

  polizabuscar() {
    this.lisRequest3 = true;
    console.log(this.cuotaParteForm.controls.poliza.value);
    if (this.cuotaParteForm.controls.poliza.value) {
      const item = {
        word: this.cuotaParteForm.controls.poliza.value
      };
      console.log(item);
      this.alertService.loading();
      this.http.postBuscarAseguadora(item).then(
        res => {
          this.aseguradorpoliza = res;
          this.alertService.messagefin();

        },
        err => {
          console.log(err);
          this.alertService.messagefin();
        }
      );
    }
  }
  cargar(item) {
    console.log(item)
    this.select1 = item;
    this.prima = item.a;
    this.cuotaParteForm.controls.idContratopk.setValue(item.ctn);
    this.cuotaParteForm.controls.idContrato.setValue(item.o);
    this.cuotaParteForm.controls.descripcion.setValue(item.c);
    this.cuotaParteForm.controls.inicio.setValue(item.fi);
    this.cuotaParteForm.controls.fin.setValue(item.ff);
    this.cuotaParteForm.controls.ramo.setValue(item.rm);
    this.cuotaParteForm.controls.tipofinal.setValue(item.s);
    this.cuotaParteForm.controls.tipoAsociacion.setValue(item.tp);
    this.cuotaParteForm.controls.idpoliza.setValue(item.tpa);
    this.cuotaParteForm.controls.idramos.setValue(item.ramo);
    this.cuotaParteForm.controls.idproductos.setValue(item.tpa);
    this.cuotaParteForm.controls.reas.setValue(item.a);
    this.select1 = item;
    if (item.m === '3') {
      this.cuotaParteForm.controls.moneda.setValue('COP');
    } else if (item.m === '2') {
      this.cuotaParteForm.controls.moneda.setValue('EUR');
    } else {
      this.cuotaParteForm.controls.moneda.setValue('USD');
    }
    this.lisRequest = false;
    this.selectcontrato = item;
    this.http.getDtaRamos(item.rct).then(
      res => {
        this.listareasu = res[0];
        console.log(this.listareasu);
        this.loadramos(this.listareasu.a);
        this.alertService.messagefin();
      },
      err => {
        console.log(err);
        this.alertService.messagefin();
      }
    );
  }
  cargarnit(item) {
    this.cuotaParteForm.controls.asegurador.setValue(item.c);
    this.cuotaParteForm.controls.nit.setValue(item.r2);
    this.idsegurador = item.a;
    this.lisRequest2 = false;
  }
  cargarpoliza(item) {
    this.alertService.loading();
    this.consultar(item);
  }
  ramosEvent(key: any, num: any, tb: any) {
    const from = this.cuotaParteFormreasegurador.value;
    let data = this.cuotaParteFormreasegurador.controls[tb];
    data = data.value;
    if (key === 'codigo') {

      from[tb][`ramos${num}`] = Number(from[tb][`codigo${num}`]);

      this.cuotaParteForm.setValue(from);
    } else if (key === 'ramos') {
      from[tb][`codigo${num}`] = Number(from[tb][`ramos${num}`]);
      this.cuotaParteForm.setValue(from);
    }

  }
  desimalPor(key: any) {
    let e = key;
    if (e !== undefined) {
      e = e.split('');
      let count = 0, rst = '';
      for (let i = e.length - 1; i >= 0; i--) {
        count = count + 1;
        rst = e[i] + rst;
        if (count === 2) {
          if (e[i - 1] !== undefined) {
            rst = '.' + rst;
          }
          count = 0;
        }
      }
      return rst + '%';
    }
  }
  desimaldo(key: any) {
    let e = key;
    if (e !== undefined) {
      e = e.split('');
      let count = 0, rst = '';
      for (let i = e.length - 1; i >= 0; i--) {
        count = count + 1;
        rst = e[i] + rst;
        if (count === 3) {
          if (e[i - 1] !== undefined) {
            rst = '.' + rst;
          }
          count = 0;
        }
      }
      return rst;
    }
  }
  miles(form: string, key: string) {
    console.log(form, key)
    if (form === 'cuotaParteFormreasegurador') {

      let value = this.cuotaParteForm.controls[key].value;
      const val = this._pct.desimalDeMiles(value);
      this.cuotaParteForm.controls[key].setValue(val.toString());
      
    }

    if (form === 'tabel') {
      const cortar = this.cortarDesimales(key)
      const quitar = this._pct.desimalDeMiles(cortar);
      return quitar;
    }

  }
  cortarDesimales(item: any) {
    return Math.trunc(item);
  }
  porcentaje(key: string, form?) {
    if (!!form) {
      const value = this.cuotaParteFormreasegurador.controls[key].value;
      this.cuotaParteFormreasegurador.controls[key].setValue(
        this.procentajedos(value)
      );
    } else {
      return this.procentajedos(key);
    }
  }
  porcentajepoliza(key: string) {
    const value = this.cuotaParteForm.controls[key].value;
    this.cuotaParteForm.controls[key].setValue(
      this.procentajedos(value)
    );

  }
  procentajedos(item: any) {
    if (item != null && item !== '') {
      const e = parseFloat(item);
      return e + '%';
    }
  }
  evenRamos(key: string) {
    if (!!key) {
      if (key === 'ramos') {
        const val = this.cuotaParteFormreasegurador.controls[key].value;
        this.cuotaParteFormreasegurador.controls.codigo.setValue(val);
      } else if (key === 'codigoedit') {
        const val = this.fromajustes.controls[key].value;
        this.fromajustes.controls.ramosedit.setValue(val);
      } else if (key === 'ramosedit') {
        const val = this.fromajustes.controls[key].value;
        this.fromajustes.controls.codigoedit.setValue(val);
      } else {
        const val = this.cuotaParteFormreasegurador.controls[key].value;
        this.cuotaParteFormreasegurador.controls.ramos.setValue(val);
      }
    }
  }
  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  // tslint:disable-next-line:one-line
  verificar() {
    sessionStorage.clear();
    this.cuotaParteForm.reset();
    // tslint:disable-next-line:prefer-const
    let res = 'Contrato creado exitosamente';
    this.alertService.success('ok', res);
    this.router.navigate(['admin/contratos']);
    // tslint:disable-next-line:one-line
  }
  enviardatosfinal() {

  }
  create() {
    if (this.cuotaParteForm.controls.poliza.value === undefined || this.cuotaParteForm.controls.poliza.value === '') {
      this.alertService.error('Ups', 'Campo del número de poliza es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.certificado.value === undefined || this.cuotaParteForm.controls.certificado.value === '') {
      this.alertService.error('Ups', 'Campo certificado es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.fechaemision.value === undefined || this.cuotaParteForm.controls.fechaemision.value === '') {
      this.alertService.error('Ups', 'Campo fecha es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.ciudad.value === undefined || this.cuotaParteForm.controls.ciudad.value === '') {
      this.alertService.error('Ups', 'Campo ciudad es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.asegurador.value === undefined || this.cuotaParteForm.controls.asegurador.value === '') {
      this.alertService.error('Ups', 'Campo Asegurador  es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.poliza.value !== '') {
      // sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const data = {
        poliza: this.cuotaParteForm.controls.poliza.value,
        certificado: this.cuotaParteForm.controls.certificado.value,
        fechaemision: this.cuotaParteForm.controls.fechaemision.value,
        ciudad: this.cuotaParteForm.controls.ciudad.value,
        idsegurador: this.idsegurador,
        idusers: this.user.authUser.id,
      };
      console.log(data);
      this.http.postFacultativosAseguradoras(data).then(
        res => {
          localStorage.setItem('idcontrato', JSON.stringify(res));
          this.polizacontrato = JSON.parse(localStorage.getItem('idcontrato'));
          this.statefinal = true;
          //this.selectpoliza = JSON.parse(localStorage.getItem('idcontrato'));;
          console.log(res);

        },
        err => {
          console.log(err);
        });
    }


  }
  createnomina() {
    if (this.cuotaParteFormreasegurador.controls.codigo.value === undefined || this.cuotaParteFormreasegurador.controls.codigo.value === '') {
      this.alertService.error('Error', 'Campo del codigo es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.ramos.value === undefined || this.cuotaParteFormreasegurador.controls.ramos.value === '') {
      this.alertService.error('Error', 'Campo ramos es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.sumaLimite.value === undefined || this.cuotaParteFormreasegurador.controls.sumaLimite.value === '') {
      this.alertService.error('Error', 'Campo suma limite es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteFormreasegurador.controls.primas.value === undefined || this.cuotaParteFormreasegurador.controls.primas.value === '') {
      this.alertService.error('Error', 'Campo total primas es obligatorio');
    }
    else if (this.cuotaParteFormreasegurador.controls.codigo.value !== '') {
      // sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const data = {
        codigo: this.cuotaParteFormreasegurador.controls.codigo.value,
        ramos: this.cuotaParteFormreasegurador.controls.ramos.value,
        sumaLimite: this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls.sumaLimite.value),
        primas: this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls.primas.value),
        primascedentes: this._pct.removerDesimal(this.cuotaParteFormreasegurador.controls.primascentes.value),
        idpoliza: this.polizacontrato.a,
        idusers: this.user.authUser.id,
      };
      console.log(data);
      this.alertService.loading();
      this.http.postFacultativoRamo(data).then(
        res => {
          this.statefinal = true;
          localStorage.setItem('idramos', JSON.stringify(res));
          this.polizaramos = JSON.parse(localStorage.getItem('idramos'));
          console.log(this.polizacontrato.a);
          this.cuotaParteFormreasegurador.reset();
          this.idpoliza = this.polizacontrato.a;
        },
        err => {
          console.log(err);
        });
    }
  }
  loadramos(id: string) {
    if (id) {
      this.http.getLoadRamos(id).then(
        res => {
          this.ramoscomision = res
          console.log('hola' + res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  procesar() {
    this.alertService.loading();
    if (this.cuotaParteForm.controls.ramo.value === "") {
      this.alertService.messageInfo('Hey', 'Debes seleccionar un ramo');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.tipofinal.value === "") {
      this.alertService.messageInfo('Hey', 'Debes seleccionar un tipo de asociación');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.tipoAsociacion.value === "") {
      this.alertService.messageInfo('Hey', 'Debes seleccionar un producto');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.primasreasegurado.value === "") {
      this.alertService.messageInfo('Hey', 'Debes llenar la prima');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.otrosgastos.value === "") {
      this.alertService.messageInfo('Hey', 'Debes llenar otro gastos');
    }
    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.primacedente.value === "") {
      this.alertService.messageInfo('Hey', 'Debes llenar la prima cedente');
    }

    // tslint:disable-next-line:one-line
    else if (this.cuotaParteForm.controls.idContrato.value != "" && this.cuotaParteForm.controls.asegurador.value != "") {
      const data1 = {
        auto: this.selectcontrato.a
      }
      this.http.postAseGetAse(data1).then(
        res => {
          this.listasegurado = res;
          console.log(res);
          this.alertService.messagefin();
          if (this.listasegurado.length != 0) {
            this.alertService.messageInfo('Hey', 'Este contrato ya fue asignado');
          } else {
            let stepfinal = this.cuotaParteForm.value;
            stepfinal.primasreasegurado = this._pct.removerDesimal(this.cuotaParteForm.controls.primasreasegurado.value);
            stepfinal.otrosgastos = this._pct.removerDesimal(this.cuotaParteForm.controls.otrosgastos.value);
            stepfinal.primacedente = this._pct.removerDesimal(this.cuotaParteForm.controls.primacedente.value);
            const data = {
              asegurador: this.idsegurador,
              contrato: this.selectcontrato,
              ramocontratos: this.listareasu,
              from: stepfinal
            }
            console.log(data)
            this.http.postAseProcesp(data).then(
              res => {
                localStorage.setItem('preoceso', JSON.stringify(res));
                this.proceso = JSON.parse(localStorage.getItem('preoceso'));
                const data2 = {
                  auto: this.selectcontrato.a
                }
                this.http.postFacultativoGasto(data2).then(
                  res => {
                    this.listasegurado = res;
                    console.log(res);
                  },
                  err => {
                    console.log(err);
                  });
                console.log(res);
                this.alertService.messagefin();
                this.alertService.messageInfo('Hey', 'Esta poliza asignada');
              },
              err => {
                console.log(err);
                this.alertService.messagefin();
              });
          }
        },
        err => {
          console.log(err);
          this.alertService.messagefin();
        });
    } else {
      this.alertService.messagefin();
    }
  }
  guardarpoliza() {
    console.log(this.listasegurado)
    if (this.listasegurado == undefined) {
      this.alertService.messageInfo('Quieres salir sin agregar tu poliza a un contrato', 'Quieres salir sin agregar tu poliza a un contrato');
      this.cuotaParteForm.reset();
      this.cuotaParteFormreasegurador.reset();
      this.fromajustes.reset();
      this.listasegurado = [];
      this.listareasu2 = [];
      sessionStorage.clear();
    } else {
      this.alertService.success('Hey', 'Tu poliza fue asignada con exito');
      sessionStorage.clear();
      this.cuotaParteForm.reset();
      this.cuotaParteFormreasegurador.reset();
      this.fromajustes.reset();
      this.listasegurado = [];
      this.listareasu2 = [];
      this.listasegurado3 = [];
      this.contratofinal = [];
      this.listareasu = [];
      this.router.navigate(['home/reinsuranceAdministration/primas']);
    }
  }
  procesarnomina(id: string) {
    this.alertService.loading();
    const data = {
      poliza: this.polizacontrato,
      contrato: this.selectcontrato,
      idramos: id
    }
    console.log(data);
    this.http.postFacultaProcesoNomina(data).then(
      res => {
        console.log(res);
        sessionStorage.setItem('preocesodos', JSON.stringify(res));
        this.procesodos = JSON.parse(sessionStorage.getItem('preocesodos'));
        const data2 = {
          word: this.polizacontrato.a
        }
        this.http.postAseguradoraNomina(data2).then(
          res => {
            this.listasegurado = res;
            console.log(res);
          },
          err => {
            console.log(err);
          });
        console.log(res);
        this.alertService.messagefin();
        this.alertService.info('Hey', 'Esta poliza asignada');
      },
      err => {
        console.log(err);
        this.alertService.messagefin();
      });
  }
  procesarnominas(id: any) {
    this.alertService.loading();
    const data6 = {
      auto: Number(id.a)
    }
    console.log(id),
      this.http.postAsegetNomi(data6).then(
        res => {
          this.listasegurado3 = res;
          console.log(res);
          if (this.listasegurado3.length === 0) {
            const data3 = {
              poliza: this.polizacontrato,
              contrato: this.selectcontrato,
              ramopoliza: this.listareasu2,
              ramocontratos: this.listareasu,
              idramos: id
            }
            console.log(data3);
            this.http.postAseNomina(data3).then(
              res => {
                this.listasegurado2 = res[0];
                console.log(res);
                const data5 = {
                  auto: Number(id.a),
                }
                console.log(data5);
                this.http.postAseguradoraNomina(data5).then(
                  res => {
                    this.listasegurado3 = res;
                    console.log(res);
                  },
                  err => {
                    console.log(err);
                    //this.messagefin();
                  });
                this.alertService.messagefin();
                this.alertService.info('Hey', 'Esta poliza asignada');
              },
              err => {
                console.log(err);
                //this.messagefin();
              });
          } else {
            this.alertService.messagefin();
            this.alertService.messageInfo('Hey', 'Esta nomina ya fue asignada');
          }

        },
        err => {
          console.log(err);
          //this.messagefin();
        });

  }

  editarramos(res: any) {
    this.final = res;
    this.valor = 1;
    console.log(this.final);
    this.fromajustes.controls.codigoedit.setValue(res.re);
    this.fromajustes.controls.ramosedit.setValue(res.re);
    this.fromajustes.controls.sumaLimiteedit.setValue(this.desimal(this.cortarDesimales(res.e)));
    this.fromajustes.controls.primasedit.setValue(this.desimal(this.cortarDesimales(res.s)));
    this.fromajustes.controls.primascentesedit.setValue(this.desimal(this.cortarDesimales(res.a2)));

  }
  eliminarramos(res: any) {
    console.log(res);
    const data = {
      idusers: this.user.authUser.id,
    };
    this.alertService.loading();
    this.http.putFacul(res, data)
      .then(
        res => {
          //this.loadramos()
          this.alertService.success('Ok', "Ramo Eliminado correctamente");
        },
        err => {
          console.log(err);
        }
      )
  }
  removeProsentaje(e: any) {
    if (e != "") {
      if (typeof e == "string") {
        const a = e.split("%");
        return a[0];
      }
    }
  }
  guardareditarramos(item: any) {
    this.alertService.loading();
    if (this.fromajustes.controls.codigoedit.value === undefined || this.fromajustes.controls.codigoedit.value === '') {
      this.alertService.info('Hey', 'Campo del codigo es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustes.controls.ramosedit.value === undefined || this.fromajustes.controls.ramosedit.value === '') {
      this.alertService.info('Hey', 'Campo ramos es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustes.controls.sumaLimiteedit.value === undefined || this.fromajustes.controls.sumaLimiteedit.value === '') {
      this.alertService.info('Hey', 'Campo suma limite es obligatorio');
    }
    // tslint:disable-next-line:one-line
    else if (this.fromajustes.controls.primasedit.value === undefined || this.fromajustes.controls.primasedit.value === '') {
      this.alertService.info('Hey', 'Campo total primas es obligatorio');
    }
    else if (this.fromajustes.controls.codigoedit.value !== '') {
      // sessionStorage.setItem('formCuotaP', JSON.stringify(form));
      const data = {
        codigo: parseInt(item.r),
        ramos: this.fromajustes.controls.ramosedit.value,
        sumaLimite: this._pct.removerDesimal(this.fromajustes.controls.sumaLimiteedit.value),
        primas: this._pct.removerDesimal(this.fromajustes.controls.primasedit.value),
        primascedentes: this._pct.removerDesimal(this.fromajustes.controls.primascentesedit.value),
        idpoliza: item.a,
        idusers: this.user.authUser.id,
      };
      console.log(data);
      this.alertService.loading();
      this.http.putFaculUpdate(item.a, data).then(
        res => {
          //this.loadramos()
        },
        err => {
          console.log(err);
        });
    }

  }
  verdetalle(item: any) {
    this.finaldetalle = item;
    this.valor1 = 1;
  }
  nuevoContrato() {
    this.cuotaParteForm.reset();
    this.cuotaParteFormreasegurador.reset();
    this.fromajustes.reset();
    this.listasegurado = [];
    this.listareasu2 = [];
    this.listasegurado3 = [];
    this.contratofinal = [];
    this.listareasu = [];
  }
  cerrar() {
    this.cuotaParteForm.reset();
    this.cuotaParteFormreasegurador.reset();
    this.fromajustes.reset();
    this.listasegurado = [];
    this.listareasu2 = [];
    this.listasegurado3 = [];
    this.contratofinal = [];
    this.listareasu = [];
    this.router.navigate(['home']);
  }

  ShowAssoc() {
    this.showAssoc = false;
    this.showAssoc = this.cuotaParteForm.controls.ramo.value != '' ? true : false;
  }
  getDetail() {
    if (this.cuotaParteForm.controls.tipofinal.value != 5) {
      const item = { ramo: this.cuotaParteForm.controls.ramo.value, tipo: this.cuotaParteForm.controls.tipofinal.value };
      this.http.postContratosDetail(item).then(
        res => {
          this.showList = true;
          this.detail = res;
        }
      );

    } else {
      this.showList = false;
      this.selectedDetailItems = [];
      this.detail = {};
    }
  }
  guardardatos() {
    const form = this.cuotaParteForm.value
    console.log(this.cuotaParteForm.controls.tipoAsociacion.value);
    if (this.cuotaParteForm.controls.idContrato.value === '') {
      this.alertService.info('Hey', 'El número del contrato es obligatorio');
    } else if (this.cuotaParteForm.controls.idContratopk.value === '') {
      this.alertService.info('Hey', 'El id del contrato es obligatorio');
    } else if (this.cuotaParteForm.controls.idramos.value === '') {
      this.alertService.info('Hey', 'El id del ramos es obligatorio');
    } else if (this.cuotaParteForm.controls.idproductos.value === '') {
      this.alertService.info('Hey', 'El id del producto es obligatorio');
    } else if (this.cuotaParteForm.controls.tipoAsociacion.value === '') {
      this.alertService.info('Hey', 'El id del tipo de asociación es obligatorio');
    } else if (this.idsegurador === '') {
      this.alertService.info('Hey', 'El id del asegurador es obligatorio');
    } else if (this.cuotaParteForm.controls.primaneta.value === '') {
      this.alertService.info('Hey', 'El valor de la prima neta es obligatoria');
    } else if (this.cuotaParteForm.controls.primasreasegurado.value === '') {
      this.alertService.info('Hey', 'El id del reasegurador es obligatorio');
    } else if (this.cuotaParteForm.controls.primacedidapor.value === '') {
      this.alertService.info('Hey', 'El % de la prima cedida es obligatoria');
    } else if (this.cuotaParteForm.controls.primacedidavalor.value === '') {
      this.alertService.info('Hey', 'El valor de la prima cedida es obligatoria');
    } else if (this.cuotaParteForm.controls.entradasprimasvalor.value === '') {
      this.alertService.info('Hey', 'El valor de la entrada prima cedida es obligatoria');
    } else if (this.cuotaParteForm.controls.entradasiniestrosvalor.value === '') {
      this.alertService.info('Hey', 'El valor de la entrada siniestros es obligatoria');
    } else if (this.cuotaParteForm.controls.depositopor.value === '') {
      this.alertService.info('Hey', 'El % del devolución depósito es obligatoria');
    } else if (this.cuotaParteForm.controls.depositovalor.value === '') {
      this.alertService.info('Hey', 'El valor del devolución depósito es obligatoria');
    } else if (this.cuotaParteForm.controls.interesespor.value === '') {
      this.alertService.info('Hey', 'El % del interes sobre depósitos es obligatoria');
    } else if (this.cuotaParteForm.controls.interesevalor.value === '') {
      this.alertService.info('Hey', 'El valor del interes sobre depósitos es obligatoria');
    } else if (this.totalingresos === 0) {
      this.alertService.info('Hey', 'El total ingreso no puede ser 0');
    } else if (this.cuotaParteForm.controls.siniestrospor.value === '') {
      this.alertService.info('Hey', 'El % del siniestro es obligatoria');
    } else if (this.cuotaParteForm.controls.siniestrosvalor.value === '') {
      this.alertService.info('Hey', 'El valor del siniestro es obligatoria');
    } else if (this.cuotaParteForm.controls.comisionpor.value === '') {
      this.alertService.info('Hey', 'El % de la comisión es obligatoria');
    } else if (this.cuotaParteForm.controls.comisionvalor.value === '') {
      this.alertService.info('Hey', 'El valor de la comisión es obligatoria');
    } else if (this.cuotaParteForm.controls.comisionporajuts.value === '') {
      this.alertService.info('Hey', 'El % del ajuste comisión es obligatoria');
    } else if (this.cuotaParteForm.controls.comisionvalorajuts.value === '') {
      this.alertService.info('Hey', 'El valor del ajuste comisión es obligatoria');
    } else if (this.cuotaParteForm.controls.comisionutilidadespor.value === '') {
      this.alertService.info('Hey', 'El % de la comisión utilidades es obligatoria');
    } else if (this.cuotaParteForm.controls.comisionutilidadesvalor.value === '') {
      this.alertService.info('Hey', 'El valor de la comisión utilidades es obligatoria');
    } else if (this.cuotaParteForm.controls.sobrecomision.value === '') {
      this.alertService.info('Hey', 'El % del sobrecomisión es obligatoria');
    } else if (this.cuotaParteForm.controls.sobrecomisionvalor.value === '') {
      this.alertService.info('Hey', 'El valor de la sobrecomisión es obligatoria');
    } else if (this.cuotaParteForm.controls.interesescomipor.value === '') {
      this.alertService.info('Hey', 'El % del interes de comisión es obligatoria');
    } else if (this.cuotaParteForm.controls.interesecomivalor.value === '') {
      this.alertService.info('Hey', 'El valor del interes de comisión es obligatoria');
    } else if (this.cuotaParteForm.controls.interesescomiretefuente.value === '') {
      this.alertService.info('Hey', 'El % del impuesto retefuente interes de comisión es obligatoria');
    } else if (this.cuotaParteForm.controls.interesescomiretefuentevalor.value === '') {
      this.alertService.info('Hey', 'El valor del impuesto retefuente interes de comisión es obligatoria');
    } else if (this.cuotaParteForm.controls.corretaje.value === '') {
      this.alertService.info('Hey', 'El % del corretaje es obligatoria');
    } else if (this.cuotaParteForm.controls.corretajevalor.value === '') {
      this.alertService.info('Hey', 'El valor del corretaje es obligatoria');
    } else if (this.cuotaParteForm.controls.primasretenidaspor.value === '') {
      this.alertService.info('Hey', 'El % de la prima retenida es obligatoria');
    } else if (this.cuotaParteForm.controls.primasretenidasvalor.value === '') {
      this.alertService.info('Hey', 'El valor de la prima retenida es obligatoria');
    } else if (this.cuotaParteForm.controls.depretenidospor.value === '') {
      this.alertService.info('Hey', 'El % del deposito retenido es obligatoria');
    } else if (this.cuotaParteForm.controls.depretenidosvalor.value === '') {
      this.alertService.info('Hey', 'El valor del deposito retenido es obligatoria');
    } else if (this.totalegresos === 0) {
      this.alertService.info('Hey', 'El total de egresoi no puede ser 0');
    } else if (this.cuotaParteForm.controls.saldotrimevalor.value === '') {
      this.alertService.info('Hey', 'El valor del saldo trimestral es obligatoria');
    } else if (this.cuotaParteForm.controls.saldoanteriorvalor.value === '') {
      this.alertService.info('Hey', 'El valor del saldo trimestral es obligatoria');
    } else if (this.cuotaParteForm.controls.cuenta.value === '') {
      this.alertService.info('Hey', 'El campo cuenta es obligatorio');
    } else if (this.cuotaParteForm.controls.fechacuenta.value === '') {
      this.alertService.info('Hey', 'La fecha inicial de la cuenta es obligatoria');
    } else if (this.cuotaParteForm.controls.fechacuentafin.value === '') {
      this.alertService.info('Hey', 'La fecha final de la cuenta es obligatoria');
    } else if (this.cuotaParteForm.controls.salvamentosvalor.value === '') {
      this.alertService.info('Hey', 'El valor del salvamentos es obligatoria');
    } else if (this.cuotaParteForm.controls.gastoreaseguradorvalor.value === '') {
      this.alertService.info('Hey', 'El valor del gasto de reasegurador es obligatoria');
    } else if (this.cuotaParteForm.controls.salidasprimasvalor.value === '') {
      this.alertService.info('Hey', 'El valor de la salida de prima es obligatoria');
    } else if (this.cuotaParteForm.controls.salidasiniestrosvalor.value === '') {
      this.alertService.info('Hey', 'El valor de la salida de siniestros es obligatoria');
    } else {
      this.alertService.loading();
      const data2 = {
        idasocicacion: this.prima,
        idcontrato: this.cuotaParteForm.controls.idContratopk.value,
        idramo: this.cuotaParteForm.controls.idramos.value,
        idtipoaso: this.cuotaParteForm.controls.tipofinal.value,
        idproducto: this.cuotaParteForm.controls.idproductos.value,
        idasegurador: this.idsegurador,
        idcomision: this.idcomision,
        primaneta: this._pct.removerDesimal(this.cuotaParteForm.controls.primaneta.value),
        primasreasegurado: this.cuotaParteForm.controls.primasreasegurado.value,
        primacedidapor: this.removeProsentaje(this.cuotaParteForm.controls.primacedidapor.value),
        primacedidavalor: this._pct.removerDesimal(this.cuotaParteForm.controls.primacedidavalor.value),
        depositopor: this.removeProsentaje(this.cuotaParteForm.controls.depositopor.value),
        depositovalor: this._pct.removerDesimal(this.cuotaParteForm.controls.depositovalor.value),
        interesespor: this.removeProsentaje(this.cuotaParteForm.controls.interesespor.value),
        interesevalor: this._pct.removerDesimal(this.cuotaParteForm.controls.interesevalor.value),
        totalingresos: this._pct.removerDesimal(this.totalingresos),
        siniestrospor: this.removeProsentaje(this.cuotaParteForm.controls.siniestrospor.value),
        siniestrosvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.siniestrosvalor.value),
        comisionpor: this.removeProsentaje(this.cuotaParteForm.controls.comisionpor.value),
        comisionvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.comisionvalor.value),
        comisionporajuts: this.removeProsentaje(this.cuotaParteForm.controls.comisionporajuts.value),
        comisionvalorajuts: this._pct.removerDesimal(this.cuotaParteForm.controls.comisionvalorajuts.value),
        comisionutilidadespor: this.removeProsentaje(this.cuotaParteForm.controls.comisionutilidadespor.value),
        comisionutilidadesvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.comisionutilidadesvalor.value),
        sobrecomision: this.removeProsentaje(this.cuotaParteForm.controls.sobrecomision.value),
        sobrecomisionvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.sobrecomisionvalor.value),
        corretaje: this.removeProsentaje(this.cuotaParteForm.controls.corretaje.value),
        corretajevalor: this._pct.removerDesimal(this.cuotaParteForm.controls.corretajevalor.value),
        interesescomiretefuente: this.removeProsentaje(this.cuotaParteForm.controls.comisionporajuts.value),
        interesescomiretefuentevalor: this._pct.removerDesimal(this.cuotaParteForm.controls.interesescomiretefuentevalor.value),
        interesescomipor: this.removeProsentaje(this.cuotaParteForm.controls.interesescomipor.value),
        interesecomivalor: this._pct.removerDesimal(this.cuotaParteForm.controls.interesecomivalor.value),
        primasretenidaspor: this.removeProsentaje(this.cuotaParteForm.controls.primasretenidaspor.value),
        primasretenidasvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.primasretenidasvalor.value),
        depretenidospor: this.removeProsentaje(this.cuotaParteForm.controls.depretenidospor.value),
        depretenidosvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.depretenidosvalor.value),
        totalegresos: this._pct.removerDesimal(this.totalegresos),
        saldotrimevalor: this._pct.removerDesimal(this.cuotaParteForm.controls.saldotrimevalor.value),
        saldoanteriorvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.saldoanteriorvalor.value),
        totalacumulado: this._pct.removerDesimal(this.totalacumulado),
        cuenta: this.cuotaParteForm.controls.cuenta.value,
        fechacuenta: this.cuotaParteForm.controls.fechacuenta.value,
        fechacuentafin: this.cuotaParteForm.controls.fechacuentafin.value,
        salvamentos: this.removeProsentaje(this.cuotaParteForm.controls.salvamentos.value),
        gastoreasegurador: this.removeProsentaje(this.cuotaParteForm.controls.gastoreasegurador.value),
        salvamentosvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.salvamentosvalor.value),
        gastoreaseguradorvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.gastoreaseguradorvalor.value),
        entradasprimas: this.removeProsentaje(this.cuotaParteForm.controls.entradasprimas.value),
        entradasiniestros: this.removeProsentaje(this.cuotaParteForm.controls.entradasiniestros.value),
        entradasprimasvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.entradasprimasvalor.value),
        entradasiniestrosvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.entradasiniestrosvalor.value),
        salidasprimas: this.removeProsentaje(this.cuotaParteForm.controls.salidasprimas.value),
        salidasiniestros: this.removeProsentaje(this.cuotaParteForm.controls.salidasiniestros.value),
        salidasprimasvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.salidasprimasvalor.value),
        salidasiniestrosvalor: this._pct.removerDesimal(this.cuotaParteForm.controls.salidasiniestrosvalor.value),
        idusers: this.user.authUser.id,
      }
      console.log(data2)
      this.alertService.loading();
      this.http.postContraPoliza(data2).then(
        res => {
          console.log(res);
          const recorrer = res;
          this.alertService.messagefin();
          this.consultar(res);
          if (recorrer.c2 === 100) {
            this.cuotaParteForm.reset();
          } else {
            this.cuotaParteForm.controls.primaneta.setValue('');
            this.cuotaParteForm.controls.primasreasegurado.setValue('');
            this.cuotaParteForm.controls.primacedidapor.setValue('');
            this.cuotaParteForm.controls.primacedidavalor.setValue('');
            this.cuotaParteForm.controls.depositopor.setValue('');
            this.cuotaParteForm.controls.depositovalor.setValue('');
            this.cuotaParteForm.controls.interesespor.setValue('');
            this.cuotaParteForm.controls.interesevalor.setValue('');
            this.totalingresos = 0;
            this.idcomision = 0;
            this.cuotaParteForm.controls.siniestrospor.setValue('');
            this.cuotaParteForm.controls.siniestrosvalor.setValue('');
            this.cuotaParteForm.controls.interesescomipor.setValue('');
            this.cuotaParteForm.controls.interesecomivalor.setValue('');
            this.cuotaParteForm.controls.primasretenidaspor.setValue('');
            this.cuotaParteForm.controls.primasretenidasvalor.setValue('');
            this.cuotaParteForm.controls.depretenidospor.setValue('');
            this.totalegresos = 0;
            this.cuotaParteForm.controls.saldotrimevalor.setValue('');
            this.cuotaParteForm.controls.saldoanteriorvalor.setValue('');
            this.totalacumulado = 0;
            this.cuotaParteForm.controls.cuenta.setValue('');
            this.cuotaParteForm.controls.comisionpor.setValue('');
            this.cuotaParteForm.controls.interesescomipor.setValue('');
            this.cuotaParteForm.controls.depretenidosvalor.setValue('');
            this.cuotaParteForm.controls.otrosgastos.setValue('');
          }
          this.alertService.info('Hey', 'Esta poliza asignada correctamente');
        },
        err => {
          console.log(err);
          this.alertService.messagefin();
        });
    }
  }
  /************************************ */


}
