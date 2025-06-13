import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Procentajes } from 'src/app/home/commos/porcentajes';
import { SessionUser } from 'src/app/home/global/sessionUser';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-renew-automatic',
  templateUrl: './renew-automatic.component.html',
  styleUrls: ['./renew-automatic.component.css']
})
export class RenewAutomaticComponent implements OnInit {
  idcomision: number;
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
      if (JSON.parse(sessionStorage.getItem('renewprimasautomatico'))) {
        this.polizacontrato = JSON.parse(sessionStorage.getItem('renewprimasautomatico'));
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
        nit: new FormControl({ value: '', disabled: false }),
        idproductos: new FormControl({ value: '', disabled: false }),
        idproductos2: new FormControl({ value: '', disabled: false }),
        ramo: new FormControl({ value: '', disabled: true },),
        tipoAsociacion: new FormControl({ value: '', disabled: true },),
        tipofinal: new FormControl({ value: '', disabled: true },),
        tipofinal2: new FormControl({ value: '', disabled: false },),
        codigo: new FormControl({ value: '', disabled: false }, Validators.required),
        ramos: new FormControl({ value: '', disabled: true },),
        contrato: new FormControl({ value: '', disabled: false }, Validators.required),
        sumaLimite: new FormControl({ value: '', disabled: false }, Validators.required),
        primas: new FormControl({ value: '', disabled: false }, Validators.required),
        primascentes: new FormControl({ value: '', disabled: false }, Validators.required),
        reas: new FormControl({ value: '', disabled: false }, Validators.required),
        id: new FormControl({ value: '', disabled: false }, Validators.required),
        idContrato: new FormControl({ value: '', disabled: true }, Validators.required),
        idContratopk: new FormControl({ value: '', disabled: false }, Validators.required),
        moneda: new FormControl({ value: '', disabled: true },),
        moneda2: new FormControl({ value: '', disabled: false },),
        descripcion: new FormControl({ value: '', disabled: true },),
        inicio: new FormControl({ value: '', disabled: true },),
        fin: new FormControl({ value: '', disabled: true },),
        word: new FormControl({ value: '', disabled: false }),
        idpoliza: new FormControl({ value: '', disabled: false }),
        primacedente: new FormControl({ value: '', disabled: false }),
        otrosgastos: new FormControl({ value: '', disabled: false },),
        primasreasegurado: new FormControl({ value: '', disabled: true }, Validators.required),
        primacedidapor: new FormControl({ value: '', disabled: false },),
        primacedidavalor: new FormControl({ value: '', disabled: false },),
        depositopor: new FormControl({ value: '', disabled: false }, Validators.required),
        depositovalor: new FormControl({ value: '', disabled: false }, Validators.required),
        interesespor: new FormControl({ value: '', disabled: false }, Validators.required),
        interesevalor: new FormControl({ value: '', disabled: false },),
        siniestrospor: new FormControl({ value: '', disabled: false },),
        siniestrosvalor: new FormControl({ value: '', disabled: false }, Validators.required),
        comisionpor: new FormControl({ value: '', disabled: false },),
        comisionvalor: new FormControl({ value: '', disabled: false },),
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
        interesescomipor: new FormControl({ value: '', disabled: false },),
        interesecomivalor: new FormControl({ value: '', disabled: false },),
        primasretenidaspor: new FormControl({ value: '', disabled: false },),
        primasretenidasvalor: new FormControl({ value: '', disabled: false },),
        depretenidospor: new FormControl({ value: '', disabled: false },),
        depretenidosvalor: new FormControl({ value: '', disabled: false },),
        saldotrimepor: new FormControl({ value: '', disabled: false }, Validators.required),
        saldotrimevalor: new FormControl({ value: '', disabled: false },),
        saldoanteriorpor: new FormControl({ value: '', disabled: false }, Validators.required),
        saldoanteriorvalor: new FormControl({ value: '', disabled: false }, Validators.required),
        idramos: new FormControl({ value: '', disabled: false }, Validators.required),
        idtiporamos: new FormControl({ value: '', disabled: false }, Validators.required),
        primaneta: new FormControl({ value: '', disabled: false }, Validators.required),
        cuenta: new FormControl({ value: '', disabled: false }, Validators.required),
        fechacuenta: new FormControl({ value: '', disabled: false }, Validators.required),
        fechacuentafin: new FormControl({ value: '', disabled: false }, Validators.required),
        salvamentos: new FormControl({ value: '', disabled: false }, Validators.required),
        salvamentosvalor: new FormControl({ value: '', disabled: false }, Validators.required),
        gastoreasegurador: new FormControl({ value: '', disabled: false }, Validators.required),
        gastoreaseguradorvalor: new FormControl({ value: '', disabled: false }, Validators.required),
        entradasiniestros: new FormControl({ value: '', disabled: false }, Validators.required),
        entradasiniestrosvalor: new FormControl({ value: '', disabled: false }, Validators.required),
        entradasprimas: new FormControl({ value: '', disabled: false }, Validators.required),
        entradasprimasvalor: new FormControl({ value: '', disabled: false }, Validators.required),
        salidasiniestros: new FormControl({ value: '', disabled: false }, Validators.required),
        salidasiniestrosvalor: new FormControl({ value: '', disabled: false }, Validators.required),
        salidasprimas: new FormControl({ value: '', disabled: false }, Validators.required),
        salidasprimasvalor: new FormControl({ value: '', disabled: false }, Validators.required),
        primasreasegurado2: new FormControl({ value: '', disabled: false }, Validators.required),
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
      console.log("contra", item)
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
      this.cuotaParteForm.controls.comisionporajuts.setValue(this.porcentaje(item.cmsn));
      this.cuotaParteForm.controls.comisionvalorajuts.setValue(this.desimal(this.cortarDesimalesfinal(item.cmsnv)));
      this.cuotaParteForm.controls.entradasiniestrosvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.entravs)));
      this.cuotaParteForm.controls.entradasiniestros.setValue(this.porcentaje(item.entraps));
      this.cuotaParteForm.controls.otrosgastos.setValue(this.porcentaje(item.c2));
      this.cuotaParteForm.controls.primacedidapor.setValue(this.porcentaje(item.c2))
      this.cuotaParteForm.controls.primacedidavalor.setValue(this.desimal(this.cortarDesimalesfinal(item.s2)));
      this.cuotaParteForm.controls.interesespor.setValue(this.porcentaje(item.t));
      this.cuotaParteForm.controls.interesevalor.setValue(this.desimal(this.cortarDesimalesfinal(item.o2)));
      this.cuotaParteForm.controls.salvamentos.setValue(this.porcentaje(item.salp));
      this.cuotaParteForm.controls.salvamentosvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.salv)));
      this.cuotaParteForm.controls.depositopor.setValue(this.porcentaje(item.s4));
      this.cuotaParteForm.controls.depositovalor.setValue(this.desimal(this.cortarDesimalesfinal(item.a4)));
      this.cuotaParteForm.controls.depretenidospor.setValue(this.porcentaje('0'));
      this.cuotaParteForm.controls.interesecomivalor.setValue(this.desimal(this.cortarDesimalesfinal(item.c3)));
      this.cuotaParteForm.controls.primasretenidasvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.e3)));
      this.cuotaParteForm.controls.depretenidosvalor.setValue(this.desimal(this.cortarDesimalesfinal(0)));
      this.cuotaParteForm.controls.interesescomipor.setValue(this.porcentaje(item.a3));
      this.cuotaParteForm.controls.primasretenidaspor.setValue(this.porcentaje(item.r4));
      this.cuotaParteForm.controls.comisionpor.setValue(this.porcentaje(item.e4));
      this.cuotaParteForm.controls.comisionvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.s5)));
      this.cuotaParteForm.controls.siniestrospor.setValue(this.porcentaje(item.e2));
      this.cuotaParteForm.controls.siniestrosvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.s3)));
      this.cuotaParteForm.controls.gastoreasegurador.setValue(this.porcentaje(item.gastp));
      this.cuotaParteForm.controls.gastoreaseguradorvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.gastv)));
      this.cuotaParteForm.controls.comisionutilidadespor.setValue(this.porcentaje(item.ctld));
      this.cuotaParteForm.controls.comisionutilidadesvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.ctldv)));
      this.cuotaParteForm.controls.sobrecomision.setValue(this.porcentaje(item.sbcn));
      this.cuotaParteForm.controls.sobrecomisionvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.sbcnv)));
      this.cuotaParteForm.controls.corretaje.setValue(this.porcentaje(item.crrt));
      this.cuotaParteForm.controls.corretajevalor.setValue(this.desimal(this.cortarDesimalesfinal(item.crrtv)));
      this.cuotaParteForm.controls.interesescomiretefuente.setValue(this.porcentaje(item.ntrsc));
      this.cuotaParteForm.controls.interesescomiretefuentevalor.setValue(this.desimal(this.cortarDesimalesfinal(item.ntrscv)));
      this.cuotaParteForm.controls.salidasprimas.setValue(this.porcentaje(item.salip));
      this.cuotaParteForm.controls.salidasprimasvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.saliv)));
      this.cuotaParteForm.controls.salidasiniestros.setValue(this.porcentaje(item.salips));
      this.cuotaParteForm.controls.salidasiniestrosvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.salivs)));
      this.cuotaParteForm.controls.saldotrimevalor.setValue(this.desimal(this.cortarDesimalesfinal(item.c4)));
      this.cuotaParteForm.controls.saldoanteriorvalor.setValue(this.desimal(this.cortarDesimalesfinal(item.o3)));
      this.idsegurador = item.a2;
      this.idcomision = item.idcomi;
      this.prima = item.er;
      this.cuotaParteForm.controls.tipofinal2.setValue(item.e);
      this.cuotaParteForm.controls.moneda2.setValue(item.moneda);
      this.cuotaParteForm.controls.idramos.setValue(item.r);
      this.cuotaParteForm.controls.idproductos2.setValue(item.s);
      this.cuotaParteForm.controls.idproductos.setValue(item.s);
      this.cuotaParteForm.controls.idContratopk.setValue(item.c);
      this.cuotaParteForm.controls.primasreasegurado2.setValue(item.o)
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
      sessionStorage.removeItem("renewprimasautomatico");
      this.router.navigate(['admin/contratos/ajuste/list-primas']);
    }
    cortarDesimalesfinal(item: any) {
      return Math.trunc(item);
    }
    desimal(key: any) {
      return key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    guardardatos() {
      const form = this.cuotaParteForm.value
      console.log("result",this.cuotaParteForm.value);
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
        this.alertService.info('Hey', 'El % de la comisión utilidades es obligatoria 1');
      } else if (this.cuotaParteForm.controls.comisionutilidadesvalor.value === '') {
        this.alertService.info('Hey', 'El valor de la comisión utilidades es obligatoria');
      } else if (this.cuotaParteForm.controls.sobrecomision.value === '') {
        this.alertService.info('Hey', 'El % del sobrecomisión es obligatoria 2');
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
          idtipoaso: this.cuotaParteForm.controls.tipofinal2.value,
          idproducto: this.cuotaParteForm.controls.idproductos.value,
          idasegurador: this.idsegurador,
          idcomision: this.idcomision,
          primaneta: this._pct.removerDesimal(this.cuotaParteForm.controls.primaneta.value),
          primasreasegurado: this.cuotaParteForm.controls.primasreasegurado2.value,
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
            this.router.navigate(["home/reinsuranceAdministration/primas/new-distribuition"])
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
    removeProsentaje(e: any) {
      if (e != "") {
        if (typeof e == "string") {
          const a = e.split("%");
          return a[0];
        }
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
}
