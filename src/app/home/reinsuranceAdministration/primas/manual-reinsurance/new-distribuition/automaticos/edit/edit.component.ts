import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Procentajes } from 'src/app/home/commos/porcentajes';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  modulo = 'Prima Automatico';
  money: any;
  mon: any;
  totalingresos: Number;
  totalegresos: Number;
  totalacumulado: Number;
  sucursales: any;
  compania: any;
  dataForm: any;
  porcentajenomina: any;
  poliza: String;
  ctb1: any;
  moneda;
  disabled: string;
  lisRequest: boolean;
  lisRequest2: boolean;
  lisRequest3: boolean;
  nombrecontrato: string;
  listasegurado: any;
  listasegurado2: any;
  listasegurado3: any;
  ///
  cuotaParteForm: FormGroup;
  enviardatos: FormGroup;
  ramospolizafrom: FormGroup;
  cuotaParteFormreasegurador: FormGroup;
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
  contrato: any;
  polizacontrato: any;
  selectpoliza: any;
  selectcontrato: any;
  idsegurador;
  idpoliza;
  polizaramos: any;
  public user: any;
  private _pct = new Procentajes();
  constructor(
    private http: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.user = new SessionUser(this.router);
    this.user.getAuthUser();
  }

  ngOnInit() {
    
    this.disabled = "disabled";
    this.createFormreas();
    this.creatramospoliza();
    this.createFormreasegurador();

    this.http.getQuery('ramos').then(
      res => {
        this.ramos = res;
      }
    );
    if (JSON.parse(sessionStorage.getItem('editarprimasautomatico'))) {
      this.polizacontrato = JSON.parse(sessionStorage.getItem('editarprimasautomatico'));
      console.log(this.polizacontrato)
      this.cargarpolizas(this.polizacontrato)
    } else {
      this.alertService.messageInfo('Hey','No hay datos en la variable');
    }
  }
  porcentajepoliza(key: string) {
    const value = this.cuotaParteForm.controls[key].value;
    this.cuotaParteForm.controls[key].setValue(
      this.procentajedos(value)
    );
  }
  createFormreas() {
    this.cuotaParteForm = new FormGroup({
      poliza: new FormControl({ value: '', disabled: true }, Validators.required),
      certificado: new FormControl({ value: '', disabled: true }, Validators.required),
      fechaemision: new FormControl({ value: '', disabled: true }, Validators.required),
      ciudad: new FormControl({ value: '', disabled: true }, Validators.required),
      idsegurador: new FormControl({ value: '', disabled: true }, Validators.required),
      asegurador: new FormControl({ value: '', disabled: true }),
      nit: new FormControl({ value: '', disabled: true }),
      ramo: new FormControl({ value: '', disabled: true },),
      tipoAsociacion: new FormControl({ value: '', disabled: true },),
      tipofinal: new FormControl({ value: '', disabled: true },),
      codigo: new FormControl({ value: '', disabled: true }, Validators.required),
      ramos: new FormControl({ value: '', disabled: true },),
      contrato: new FormControl({ value: '', disabled: true }, Validators.required),
      sumaLimite: new FormControl({ value: '', disabled: true }, Validators.required),
      primas: new FormControl({ value: '', disabled: true }, Validators.required),
      primascentes: new FormControl({ value: '', disabled: true }, Validators.required),
      reas: new FormControl({ value: '', disabled: true }, Validators.required),
      id: new FormControl({ value: '', disabled: true }, Validators.required),
      idContrato: new FormControl({ value: '', disabled: true }, Validators.required),
      idContratopk: new FormControl({ value: '', disabled: true }, Validators.required),
      moneda: new FormControl({ value: '', disabled: true },),
      descripcion: new FormControl({ value: '', disabled: true },),
      inicio: new FormControl({ value: '', disabled: true },),
      fin: new FormControl({ value: '', disabled: true },),
      word: new FormControl({ value: '', disabled: true }),
      idpoliza: new FormControl({ value: '', disabled: true }),
      primacedente: new FormControl({ value: '', disabled: true }),
      otrosgastos: new FormControl({ value: '', disabled: true },),
      primasreasegurado: new FormControl({ value: '', disabled: true }, Validators.required),
      primacedidapor: new FormControl({ value: '', disabled: true },),
      primacedidavalor: new FormControl({ value: '', disabled: true },),
      depositopor: new FormControl({ value: '', disabled: true }, Validators.required),
      depositovalor: new FormControl({ value: '', disabled: true }, Validators.required),
      interesespor: new FormControl({ value: '', disabled: true }, Validators.required),
      interesevalor: new FormControl({ value: '', disabled: true },),
      siniestrospor: new FormControl({ value: '', disabled: true },),
      siniestrosvalor: new FormControl({ value: '', disabled: true }, Validators.required),
      comisionpor: new FormControl({ value: '', disabled: true },),
      comisionvalor: new FormControl({ value: '', disabled: true },),
      comisionporajuts: new FormControl({ value: '' , disabled: false},),
      comisionvalorajuts: new FormControl({ value: '', disabled: false},),
      interesescomipor: new FormControl({ value: '', disabled: true },),
      interesecomivalor: new FormControl({ value: '', disabled: true },),
      primasretenidaspor: new FormControl({ value: '', disabled: true },),
      primasretenidasvalor: new FormControl({ value: '', disabled: true },),
      depretenidospor: new FormControl({ value: '', disabled: true },),
      depretenidosvalor: new FormControl({ value: '', disabled: true },),
      saldotrimepor: new FormControl({ value: '', disabled: true }, Validators.required),
      saldotrimevalor: new FormControl({ value: '', disabled: true },),
      saldoanteriorpor: new FormControl({ value: '', disabled: true }, Validators.required),
      saldoanteriorvalor: new FormControl({ value: '', disabled: true }, Validators.required),
      idramos: new FormControl({ value: '', disabled: true }, Validators.required),
      idtiporamos: new FormControl({ value: '', disabled: true }, Validators.required),
      idproductos: new FormControl({ value: '', disabled: true }, Validators.required),
      primaneta: new FormControl({ value: '', disabled: true }, Validators.required),
      cuenta: new FormControl({ value: '', disabled: true }, Validators.required),
      fechacuenta: new FormControl({ value: '', disabled: true }, Validators.required),
      fechacuentafin: new FormControl({ value: '', disabled: true }, Validators.required),
      salvamentos: new FormControl({ value: '', disabled: true }, Validators.required),
      salvamentosvalor: new FormControl({ value: '', disabled: true }, Validators.required),
      gastoreasegurador: new FormControl({ value: '', disabled: true }, Validators.required),
      gastoreaseguradorvalor: new FormControl({ value: '', disabled: true }, Validators.required),
      entradasiniestros: new FormControl({ value: '', disabled: true }, Validators.required),
      entradasiniestrosvalor: new FormControl({ value: '', disabled: true }, Validators.required),
      entradasprimas: new FormControl({ value: '', disabled: true }, Validators.required),
      entradasprimasvalor: new FormControl({ value: '', disabled: true }, Validators.required),
      salidasiniestros: new FormControl({ value: '', disabled: true }, Validators.required),
      salidasiniestrosvalor: new FormControl({ value: '', disabled: true }, Validators.required),
      salidasprimas: new FormControl({ value: '', disabled: true }, Validators.required),
      salidasprimasvalor: new FormControl({ value: '', disabled: true }, Validators.required),
    });

  }
  creatramospoliza() {
    this.ramospolizafrom = new FormGroup({
      codigo0: new FormControl('', Validators.required),
      sumaLimite0: new FormControl('', Validators.required),
      primas0: new FormControl('', Validators.required),
      ramos1: new FormControl('', Validators.required),
      sumaLimite1: new FormControl('', Validators.required),
      primas1: new FormControl('', Validators.required),
      ramos2: new FormControl('', Validators.required),
      sumaLimite2: new FormControl('', Validators.required),
      primas2: new FormControl('', Validators.required),
      ramos3: new FormControl('', Validators.required),
      sumaLimite3: new FormControl('', Validators.required),
      primas3: new FormControl('', Validators.required),
      ramos4: new FormControl('', Validators.required),
      sumaLimite4: new FormControl('', Validators.required),
      primas4: new FormControl('', Validators.required),
      ramos5: new FormControl('', Validators.required),
      sumaLimite5: new FormControl('', Validators.required),
      primas5: new FormControl('', Validators.required),
      ramos6: new FormControl('', Validators.required),
      sumaLimite6: new FormControl('', Validators.required),
      primas6: new FormControl('', Validators.required),
      ramos7: new FormControl('', Validators.required),
      sumaLimite7: new FormControl('', Validators.required),
      primas7: new FormControl('', Validators.required),
      ramos8: new FormControl('', Validators.required),
      sumaLimite8: new FormControl('', Validators.required),
      primas8: new FormControl('', Validators.required),
      ramos9: new FormControl('', Validators.required),
      sumaLimite9: new FormControl('', Validators.required),
      primas9: new FormControl('', Validators.required),
    })
  }
  createFormreasegurador() {
    this.cuotaParteFormreasegurador = new FormGroup({
      codigo: new FormControl('', Validators.required),
      ramos: new FormControl('', Validators.required),
      contrato: new FormControl('', Validators.required),
      sumaLimite: new FormControl('', Validators.required),
      primas: new FormControl('', Validators.required),
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
    if (form === 'cuotaParteFormreasegurador') {

      let value = this.cuotaParteFormreasegurador.controls[key].value;
      if (value.split('.').length > 2) {
        value = this.desimal(this.cuotaParteFormreasegurador.controls[key].value);
      }
      const val = this.desimal(value);
      this.cuotaParteFormreasegurador.controls[key].setValue(val.toString());
    }

    if (form === 'tabel') {
      const cortar = this.cortarDesimales(key)
      const quitar = this.desimal(cortar);
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
      } else {
        const val = this.cuotaParteFormreasegurador.controls[key].value;
        this.cuotaParteFormreasegurador.controls.ramos.setValue(val);
      }
    }
  }
  // tslint:disable-next-line:one-line
  verificar() {
    sessionStorage.clear();
    this.cuotaParteForm.reset();
    // tslint:disable-next-line:prefer-const
    let res = 'Contrato creado exitosamente';
    this.alertService.success('Ok',res);
    this.router.navigate(['home/contracs']);
    // tslint:disable-next-line:one-line
  }
  guardarpoliza() {
    sessionStorage.clear();
    this.router.navigate(["home/reinsuranceAdministration/primas"])
  }
  procesarnomina(id: string) {
    this.alertService.loading();
    const data = {
      poliza: this.polizacontrato,
      contrato: this.selectcontrato,
      idramos: id
    }
    console.log(data)
    this.http.postQuery(data, 'aseguradoras/facultativo/procesonomina').then(
      res => {
        console.log(res)
        sessionStorage.setItem('preocesodos', JSON.stringify(res));
        this.procesodos = JSON.parse(sessionStorage.getItem('preocesodos'));
        const data2 = {
          word: this.polizacontrato.a
        }
        this.http.postQuery(data2, 'aseguradoras/facultativo/getaseguradonomina').then(
          res => {
            this.listasegurado = res;
            console.log(res);
            //this.alertService.messagefin();
          },
          err => {
            console.log(err);
            //this.alertService.messagefin();
          });

        console.log(res);
        this.alertService.messagefin();
        this.alertService.messagefin();
        this.alertService.messageInfo('Hey','Esta poliza asignada');
      },
      err => {
        console.log(err);
        this.alertService.messagefin();
      });
  }
  procesarnominas(id: any) {
    this.alertService.loading();
    const data6 = {
      word: parseInt(id.a)
    }
    console.log(id)
    this.http.postQuery(data6, 'aseguradoras/facultativo/getaseguradonomina').then(
      res => {
        this.listasegurado3 = res;
        console.log(res);
        if (this.listasegurado3.length == 0) {
          const data3 = {
            poliza: this.polizacontrato,
            contrato: this.selectcontrato,
            ramopoliza: this.listareasu2,
            ramocontratos: this.listareasu,
            idramos: id
          }
          console.log(data3);
          this.http.postQuery(data3, 'aseguradoras/facultativo/procesonomina').then(
            res => {
              this.listasegurado2 = res[0];
              console.log(res);
              const data5 = {
                word: parseInt(id.a)
              }
              console.log(data5)
              this.http.postQuery(data5, 'aseguradoras/facultativo/getaseguradonomina').then(
                res => {
                  this.listasegurado3 = res;
                  console.log(res);
                },
                err => {
                  console.log(err);
                  //this.alertService.messagefin();
                });
              this.alertService.messagefin();
              this.alertService.messageInfo('Hey','Esta poliza asignada');
            },
            err => {
              console.log(err);
              //this.alertService.messagefin();
            });
        } else {
          this.alertService.messagefin();
          this.alertService.messageInfo('Hey','Esta nomina ya fue asignada');
        }

      },
      err => {
        console.log(err);
        //this.alertService.messagefin();
      });

  }
  cargarpolizas(item) {
    this.cuotaParteForm.controls.asegurador.setValue(item.Asegurado);
    this.cuotaParteForm.controls.idContrato.setValue(item.Id_contrato);
    this.cuotaParteForm.controls.primaneta.setValue(this.desimal(this.cortarDesimalesfinal(item.s2)));
    this.cuotaParteForm.controls.ramo.setValue(item.Ramo);
    this.cuotaParteForm.controls.descripcion.setValue(item.descrip);
    this.cuotaParteForm.controls.inicio.setValue(item.Inicio);
    this.cuotaParteForm.controls.tipofinal.setValue(item.tipo);
    this.cuotaParteForm.controls.tipoAsociacion.setValue(item.producto);
    this.cuotaParteForm.controls.fin.setValue(item.Fin);
    this.cuotaParteForm.controls.primasreasegurado.setValue(item.Reasegurador);
    //this.loadramos();
    if (item.moneda == 3) {
      this.cuotaParteForm.controls.moneda.setValue('COP');
    } else if (item.moneda == 2) {
      this.cuotaParteForm.controls.moneda.setValue('EUR');
    } else {
      this.cuotaParteForm.controls.moneda.setValue('USD');
    }
    if (item.cu == 1) {
      this.cuotaParteForm.controls.cuenta.setValue('Mensual');
    } else if (item.cu == 2) {
      this.cuotaParteForm.controls.cuenta.setValue('Trimestral');
    } else if (item.cu == 3) {
      this.cuotaParteForm.controls.cuenta.setValue('Semanal');
    } else {
      this.cuotaParteForm.controls.cuenta.setValue('Anual');
    }
    this.totalingresos = this.desimal(this.cortarDesimalesfinal(item.r3));
    this.totalegresos = this.desimal(this.cortarDesimalesfinal(item.r5));
    this.totalacumulado = this.desimal(this.cortarDesimalesfinal(item.n2));
    this.cuotaParteForm.controls.fechacuenta.setValue(item.dtci);
    this.cuotaParteForm.controls.fechacuentafin.setValue(item.dtcf);
    this.cuotaParteForm.controls.entradasprimasvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.entrav)));
    this.cuotaParteForm.controls.entradasprimas.setValue(this.porcentaje(item.entrap));
    this.cuotaParteForm.controls.entradasiniestrosvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.entravs)));
    this.cuotaParteForm.controls.entradasiniestros.setValue(this.porcentaje(item.entraps));
    this.cuotaParteForm.controls.otrosgastos.setValue(this.porcentaje(item.c2));
    this.cuotaParteForm.controls.primacedidapor.setValue(this.porcentaje(item.c2))
    this.cuotaParteForm.controls.primacedidavalor.setValue(this.desimal(this.cortarDesimalesfinal(item.s2)));
    this.cuotaParteForm.controls.interesespor.setValue(this.porcentaje(item.t));
    this.cuotaParteForm.controls.interesevalor.setValue(this.desimal(this.cortarDesimalesfinal(item.o2)));
    this.cuotaParteForm.controls.salvamentos.setValue(this.porcentaje(item.salp));
    this.cuotaParteForm.controls.salvamentosvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.salv)));
    this.cuotaParteForm.controls.depositopor.setValue(this.porcentaje(item.u));
    this.cuotaParteForm.controls.depositovalor.setValue(this.desimal(this.cortarDesimalesfinal(item.l)));
    this.cuotaParteForm.controls.interesescomipor.setValue(this.porcentaje(item.a3));
    this.cuotaParteForm.controls.primasretenidaspor.setValue(this.porcentaje(item.r4));
    this.cuotaParteForm.controls.depretenidospor.setValue(this.porcentaje(item.s4));
    this.cuotaParteForm.controls.interesecomivalor.setValue(this.desimal(this.cortarDesimalesfinal(item.c3)));
    this.cuotaParteForm.controls.primasretenidasvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.e3)));
    this.cuotaParteForm.controls.depretenidosvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.a4)));
    this.cuotaParteForm.controls.comisionpor.setValue(this.porcentaje(item.e4));
    this.cuotaParteForm.controls.comisionvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.s5)));
    this.cuotaParteForm.controls.siniestrospor.setValue(this.porcentaje(item.e2));
    this.cuotaParteForm.controls.siniestrosvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.s3)));
    this.cuotaParteForm.controls.gastoreasegurador.setValue(this.porcentaje(item.gastp));
    this.cuotaParteForm.controls.gastoreaseguradorvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.gastv)));

    this.cuotaParteForm.controls.salidasprimas.setValue(this.porcentaje(item.salip));
    this.cuotaParteForm.controls.salidasprimasvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.saliv)));
    this.cuotaParteForm.controls.salidasiniestros.setValue(this.porcentaje(item.salips));
    this.cuotaParteForm.controls.salidasiniestrosvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.salivs)));
    this.cuotaParteForm.controls.saldotrimevalor.setValue(this.desimal(this.cortarDesimalesfinal(item.c4)));
    this.cuotaParteForm.controls.saldoanteriorvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.o3)));

  }
  ajustereporte() {
    this.disabled = "ok";
    this.cuotaParteForm.controls.certificado.setValue(1);
    this.cuotaParteForm.controls.certificado.setValue(1);
  }
  procesar() {
    //console.log(this.ramospolizafrom.value)
    const data = {
      poliza: this.polizacontrato,
      calculo: this.listasegurado,
      ramopoliza: this.listareasu2,
      ramocontratos: this.listareasu,
    }
    console.log(data)
    this.http.postQuery(data, 'aseguradoras/facultativo/proceso/edit').then(
      res => {
        console.log(res);
        localStorage.setItem('preocesoedit', JSON.stringify(res));
        this.proceso = JSON.parse(localStorage.getItem('preoceso'));
        const data2 = {
          word: parseInt(this.polizacontrato.idpoliza)
        }
        this.http.postQuery(data2, 'aseguradoras/facultativo/getasegurado').then(
          res => {
            this.listasegurado = res;
            //console.log(res);
            //this.alertService.messagefin();
          },
          err => {
            console.log(err);
            //this.alertService.messagefin();
          });
      },
      err => {
        console.log(err);
        this.alertService.messagefin();
      });
    const final = {
      id: parseInt(this.polizacontrato.idpoliza),
      nro: this.cuotaParteForm.controls.poliza.value,
      cert: this.cuotaParteForm.controls.certificado.value,
      fech: this.cuotaParteForm.controls.fechaemision.value,
      ciud: this.cuotaParteForm.controls.ciudad.value,
      idasegurador: this.idsegurador,
    }
    console.log(final);
    this.http.postQuery(final, 'aseguradoras/facultativo/proceso/edit/poliza').then(
      res => {
        console.log(res);
        const data = {
          unico: parseInt(this.polizacontrato.idpoliza)
        }
        this.http.postQuery(data, 'aseguradoras/facultativo/reportenomina').then(function () {
          res => {
            sessionStorage.setItem('editarprimas', JSON.stringify(res));
            this.polizacontrato = JSON.parse(sessionStorage.getItem('editarprimas'));
            console.log(this.polizacontrato);
          }
        });
      },
      err => {
        console.log(err);
        //this.alertService.messagefin();
      });
  }
  editarramos(id: string, from: string) {
    var sumalimite = 'sumaLimite' + from;
    var primas = 'primas' + from;
    console.log(sumalimite, primas);
    if (id != null && primas != null && sumalimite != null) {
      this.alertService.loading();
      if (this.ramospolizafrom.controls[sumalimite].value != undefined && this.ramospolizafrom.controls[primas].value != undefined) {
        const data1 = {
          id: parseInt(id),
          sumaLimite: this._pct.removerDesimal(this.ramospolizafrom.controls[sumalimite].value),
          primas: this._pct.removerDesimal(this.ramospolizafrom.controls[primas].value),
          idusers: this.user.authUser.id,
        }
        this.http.postQuery(data1, 'aseguradoras/facultativo/ramos/editar').then(
          res => {
            //this.listasegurado = res;
            console.log(res);
            this.alertService.messagefin();
          },
          err => {
            console.log(err);
            //this.alertService.messagefin();
          });
        const data5 = {
          id: this.polizacontrato.idpoliza
        }
        console.log(data5);
        this.http.postQuery(data5, 'aseguradoras/facultativo/ramos/id').then(
          res => {
            this.listareasu2 = res;
            console.log(res);

          }
        );
      } else {
        this.alertService.messagefin();
        
        this.alertService.messageInfo('Hey','No has editado ningun campo');
      }

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
      this.http.postQuery(item, 'aseguradoras/facultativo/client').then(
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
    this.cuotaParteForm.controls.asegurador.setValue(item.a2);
    this.cuotaParteForm.controls.nit.setValue(item.r2);
    this.idsegurador = item.a;
    this.lisRequest2 = false;

  }
  cerrar() {
    this.cuotaParteForm.reset();
    this.cuotaParteFormreasegurador.reset();
    this.listasegurado = [];
    this.listareasu2 = [];
    this.listasegurado3 = [];
    this.contratofinal = [];
    this.listareasu = [];
    sessionStorage.removeItem("editarprimasautomatico");
    this.router.navigate(['admin/contratos/ajuste/list-primas']);
  }
  cortarDesimalesfinal(item: any) {
    return Math.trunc(item);
  }
  desimal(key: any) {
    return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  renewItemForm() {
    var contra = this.polizacontrato.Id_contrato.substr(0, 7);

    if (contra == "ATL-AUT") {
      //this.messegeInfofinal("Estamos trabajando para dejar la funcionalidad");
      sessionStorage.setItem('renewprimasautomatico', JSON.stringify(this.polizacontrato));
      this.router.navigate(["home/reinsuranceAdministration/primas/new-distribuition/renovar-prima-automaticos"])
    } else if (contra == "ATL-FAC") {
      sessionStorage.setItem('renewrprimas', JSON.stringify(this.polizacontrato));
      this.router.navigate(["/admin/contratos/ajuste/primas-facultativos/edit"])
    } else {
      console.log(contra)
    }
  }

}
